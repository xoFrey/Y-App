import { useContext, useEffect, useState } from "react";
import { RefreshContext, TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import "./css/Home.css";
import Header from "../components/Header";
import QuackButton from "../components/QuackButton";
import Comments from "../components/Comments";
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
      <Header />
      <QuackButton />
      {quacks?.map((quack) => (
        <div key={quack._id} className="quack">
          <div>
            <h4>
              {quack.userId.firstname} {quack.userId.lastname}
            </h4>
            <p>@{quack.userId.username}</p>
          </div>
          {/* <p>{quack.Date}</p> */}
          <p>{quack.quackText}</p>
          <Link to={`/quackdetail/${quack._id}`}>
            <Comments />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default Home;
