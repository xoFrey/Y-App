import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../components/context";
import QuackButton from "../components/QuackButton";
import { backendUrl } from "../api/api";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./css/Profile.css";
import Comments from "../components/Comments";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [quacks, setQuacks] = useState();
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const fetchOwnQuacks = async () => {
      const res = await fetch(`${backendUrl}/api/v1/quacks/user/${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch OwnQuacks");
      setQuacks(data.result);
    };
    fetchOwnQuacks();
  }, []);

  return (
    <section className="profile">
      <div className="head">
        <Link to="/home">
          <FaArrowLeft />
        </Link>
      </div>
      <main>
        <div className="profileInfo">
          <div className="imageContainer">
            <img src="/img/goose_white.png" alt="" />
          </div>
          <div className="button">
            <h2>
              {user.firstname} {user.lastname}
            </h2>
            <button>Edit Profile</button>
          </div>
          <h3>@{user.username}</h3>
          <p>{user.bio}</p>
          {/* <div><p>{user.date}</p></div> */}
        </div>
        <section className="following">
          <p>
            {" "}
            <span> {user.following.length} </span>Following
          </p>
        </section>
        <section className="quacks">
          <h4>Quacks</h4>
          <div className="border"></div>
          {quacks?.map((quack) => (
            <div key={quack._id} className="ownquacks">
              <div>
                <h4>
                  {quack.userId.firstname} {quack.userId.lastname}
                </h4>
                <p>@{quack.userId.username}</p>
              </div>
              <p>{quack.quackText}</p>
              <Link to={`/quackdetail/${quack._id}`}>
                <Comments quack={quack} />
              </Link>
            </div>
          ))}
        </section>
      </main>
      <QuackButton />
    </section>
  );
};

export default Profile;
