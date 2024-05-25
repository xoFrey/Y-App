import { useContext, useEffect, useState } from "react";
import { RefreshContext, TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import "./css/Home.css";
import Header from "../components/Header";
import QuackButton from "../components/QuackButton";

import Quacks from "../components/Quacks";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";




const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [quacks, setQuacks] = useState();


  useEffect(() => {

    const fetchAllQuacks = async () => {

      const res = await fetch(`${backendUrl}/api/v1/quacks`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch Quacks");

      console.log(data.result);

      const filtered = data.result.filter(async (item) => await user.following.includes(item.userId._id) || await user.quacks.includes(item._id));
      console.log(filtered);


      setQuacks(filtered);
    };
    fetchAllQuacks();
  }, [refresh]);




  return (
    <section className="home">
      <div className="home-head">
        <Link to={`/profile/${user._id}`}>
          <div className="container img-container">
            <img className="profilepic" src="/img/goose_white.png" alt="" />
          </div>
        </Link>
        <img className="middlepic" src="/img/goose_white.png" alt="" />
        <CiSettings />
      </div>

      <QuackButton />
      {quacks?.map((quack) => (
        <Quacks quack={quack} />
      ))}
    </section>
  );
};

export default Home;
