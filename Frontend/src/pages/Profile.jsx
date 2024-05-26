import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import { Link, NavLink, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./css/Profile.css";
import Quacks from "../components/Quacks";


const Profile = () => {
  const { profileId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [quacks, setQuacks] = useState();
  const { token } = useContext(TokenContext);
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(user.following?.includes(profileId));
  const [userProfile, setUserProfile] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [bio, setBio] = useState("");
  const [upload, setUpload] = useState();



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
    setIsFollowing(user.following.includes(profileId));

  }, [user.following, user]);

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

    setUser((user) => ({ ...user, following: [...user.following, profileId] }));
    setIsFollowing(true);
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
    setUser((user) => ({ ...user, following: user.following.filter((id) => id !== profileId) }));
    setIsFollowing(false);
  };

  const handleOnClick = () => {
    setActive(!active);
  };

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
    setUsername(user.username);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setBio(user.bio);
    // setUpload(user.imgUrl);
  };

  const editProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pictures", upload);
    const res = await fetch(`${backendUrl}/api/v1/files/upload`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await res.json();
    console.log(data);
    const updateInfo = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      bio: bio,
      imgUrl: data.imgUrl
    };
    const update = await fetch(`${backendUrl}/api/v1/user/${user._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify(updateInfo)
    });

    const updatedProfile = await update.json();
    const data2 = updatedProfile.result;
    setUser((info) => ({ info, ...data2 }));
    setShowEdit(false);
  };

  console.log(user);

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
            {/* <img src={`${backendUrl}/${user.imgUrl}`} alt="" /> */}
          </div>

          {user._id === profileId ? <button onClick={() => handleShowEdit()}>Edit Profile</button> : (isFollowing ? <button onClick={unfollowUser}>Unfollow</button> : <button onClick={followUser}>Follow</button>)}
        </div>
        <form className={`${showEdit ? "form-edit  " : "hide"}`}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          <input type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          <input type="text" placeholder="Biography" value={bio} onChange={(e) => setBio(e.target.value)} />
          <div>
            <label className="custom-upload">  <input type="file" onChange={(e) => setUpload(e.target.files[0])} /> Upload Picture</label>
            <button onClick={editProfile}>Submit</button>
          </div>

        </form>
        <div className="profile-info">
          <h2>{userProfile.firstname} {userProfile.lastname} </h2>
          <h4>@{userProfile.username}</h4>
          <p>{userProfile.bio}</p>
          <div className="follow">
            <p>{userProfile.following?.length} Following</p>
            <p>{userProfile.following?.length} Followers</p>
          </div>
          <div className="likes-quacks">
            <h3 className={active ? "" : `active-button`} onClick={() => handleOnClick()}>Quacks</h3>
            <h3 className={active ? `active-button` : ""} onClick={() => handleOnClick()}>Likes</h3>
          </div>
        </div>

        <section >
          {quacks?.length > 0 ? quacks.map((quack) => (
            <Quacks key={quack._id} quack={quack} />
          ))
            :
            <div className="empty"><p >Quack something!</p></div>
          }
        </section>
      </main>
    </section >
  );
};

export default Profile;
