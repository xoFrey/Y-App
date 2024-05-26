import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import { Link, NavLink, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./css/Profile.css";
import Quacks from "../components/Quacks";


const Profile = () => {
  const { user } = useContext(UserContext);
  const [quacks, setQuacks] = useState();
  const { token } = useContext(TokenContext);
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const { profileId } = useParams();

  useEffect(() => {
    const fetchOwnQuacks = async () => {
      const res = await fetch(`${backendUrl}/api/v1/quacks/user/${profileId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch OwnQuacks");
      setQuacks(data.result);
    };
    fetchOwnQuacks();
    setIsFollowing(user.following.includes(profileId));

    const getProfileUser = async () => {
      const res = await fetch(`${backendUrl}/api/v1/user/${profileId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch OwnQuacks");
      setUserProfile(data.result);
    };
    getProfileUser();

  }, []);

  const followUser = async () => {
    const res = await fetch(`${backendUrl}/api/v1/user/follow/${profileId}`,
      {
        method: "PATCH",
        headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id })
      }
    );
    const data = await res.json();
    if (!data.result)
      return setErrorMessage(data.message || "Failed to Follow");
    setIsFollowing(user.following.includes(profileId));

  };

  const unfollowUser = async () => {
    const res = await fetch(`${backendUrl}/api/v1/user/unfollow/${profileId}`,
      {
        method: "PATCH",
        headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id })
      }
    );
    const data = await res.json();
    if (!data.result)
      return setErrorMessage(data.message || "Failed to Follow");

    setIsFollowing(data.result.user.following.includes(profileId));
  };

  const handleOnClick = () => {
    setActive(!active);
  };

  return (
    <section className="profile">
      <div className="header">
        <Link to="/home">
          <FaArrowLeft /></Link>
        <h3>Place a banner here</h3>
      </div>
      <main>
        <div className="pic-button">
          <div className="img-container">
            <img src="/img/goose_white.png" alt="" />
          </div>
          {isFollowing ? <button onClick={() => unfollowUser()}>Unfollow</button> : <button onClick={() => followUser()}>Follow</button>}

        </div>
        <div className="profile-info">
          <h2>{userProfile.firstname} {userProfile.lastname} </h2>
          <h4>@{userProfile.username}</h4>
          <p>{userProfile.bio}</p>
          <div className="follow">
            <p>{userProfile.following.length} Following</p>
            <p>{userProfile.following.length} Followers</p>
          </div>
          <div className="likes-quacks">
            <h3 className={active ? "" : `active-button`} onClick={() => handleOnClick()}>Quacks</h3>
            <h3 className={active ? `active-button` : ""} onClick={() => handleOnClick()}>Likes</h3>
          </div>
        </div>

        <section >
          {quacks ? quacks.map((quack) => (
            <Quacks key={quack._id} quack={quack} />
          ))
            :
            <p> You gotta Quack something!</p>
          }
        </section>
      </main>
    </section>
  );
};

export default Profile;
