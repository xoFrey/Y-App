import { useContext, useEffect, useState } from "react";
import { RefreshContext, TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import "./css/Home.css";
import QuackButton from "../components/QuackButton";
import Quacks from "../components/Quacks";
import { CiSettings } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Verification from "../components/Verification";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [quacks, setQuacks] = useState();
  const [filteredQuacks, setFilteredQuacks] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {

    const fetchAllQuacks = async () => {

      const res = await fetch(`${backendUrl}/api/v1/quacks`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch Quacks");


      setQuacks(data.result);
    };
    fetchAllQuacks();

  }, [refresh]);

  useEffect(() => {
    if (user && quacks?.length > 0) {
      const filtered = quacks?.filter((item) => (user.quacks.includes(item._id) || user.following.includes(item.userId._id)));
      console.log({ filtered });
      setFilteredQuacks(filtered);
    }
  }, [user.following, user, quacks]);




  const logoutUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/api/v1/user/logout`, {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();
    if (!data.result) return alert("Could not log out");
    console.log(data.result);
    setToken("");
    navigate("/login");
  };


  return (
    <section className="home">
      <div className="home-head">
        <Link to={`/profile/${user._id}`}>
          <div className="container img-container">
            <img className="prof-pic" src={`${backendUrl}/${user.imgUrl}`} alt="" />
          </div>
        </Link>
        <img className="middlepic" src="/img/goose_white.png" alt="" />
        <div onClick={() => setShowSidebar(true)}>
          <CiSettings />
        </div>
      </div>
      <Sidebar logoutUser={logoutUser} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <QuackButton />
      <Verification />
      {filteredQuacks.length > 0 ? filteredQuacks?.map((quack) => (
        <div key={quack._id}>
          <Quacks quack={quack} />
        </div>
      )) : <div className="empty"><p >Quack something! Or follow someones Quacks!</p></div>}
    </section >
  );
};

export default Home;
