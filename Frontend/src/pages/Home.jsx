import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";
import Login from "./Login";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [quacks, setQuacks] = useState();

  console.log(user);
  useEffect(() => {
    console.log("hallo1");
    const fetchUserQuacks = async () => {
      const res = await fetch(`${backendUrl}/api/v1/quacks/${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch Quacks");
      console.log(data.result);
    };
    console.log("hallo2");
    fetchUserQuacks();
  }, []);

  return <h1>Home</h1>;
};

export default Home;
