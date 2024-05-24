import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/user/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ firstname, lastname, username, email, password }),
    });

    const data = await res.json();
    if (!data.result)
      return setErrorMessage(data.message || "Failed to register User");
    console.log(data);
    navigate("/login");
  };

  return (
    <>
      <header>
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <img src="../assets/goose.jpg" alt="" />
      </header>
      <main>
        <h1>Create your Account</h1>
        <form>
          <input
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={registerUser}>Sign up</button>
        </form>
        <p>
          Already have a Account? <Link to="/login">Login to your Account</Link>
        </p>
      </main>
    </>
  );
};

export default Register;
