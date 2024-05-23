import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import Login from "./Login";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [tweets, setTweets] = useState();

  console.log(user);
  useEffect(() => {
    console.log("hallo1");
    const fetchUserTweets = async () => {
      const res = await fetch(`${backendUrl}/api/v1/tweets/${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch Tweets");
      console.log(data.result);
    };
    console.log("hallo2");
    fetchUserTweets();
  }, []);

  return <h1>Home</h1>;
};

export default Home;
