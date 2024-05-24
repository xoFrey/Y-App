import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import "./css/Home.css";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [quacks, setQuacks] = useState();

  useEffect(() => {
    const fetchAllQuacks = async () => {
      const res = await fetch(`${backendUrl}/api/v1/quacks`, {
        headers: { authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch Quacks");

      const followedQuacks = data.result.filter((item) => user.following.includes(item.userId._id));
      const ownQuacks = data.result.filter((item) => user.quacks.includes(item._id));
      const feedQuacks = followedQuacks.concat(ownQuacks);
      console.log(followedQuacks);
      setQuacks(feedQuacks);
    };
    fetchAllQuacks();
  }, []);

  console.log(quacks);

  return <section className="home">
    <h1>All Quacks</h1>
    {quacks?.map((quack) => (
      <div key={quack._id}>
        <p>{quack.userId.username}</p>
        <p>{quack.Date}</p>
        <p>{quack.quackText}</p>
      </div>

    ))}

  </section>;
};

export default Home;
