import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";

import "./css/Login.css";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/api/v1/user/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    setToken(data.result.tokens.accessToken);
    setUser(data.result.user);
    navigate("/home");
  };

  return (
    <section className='login'>
      <Header />
      <form>
        <div>
          <input
            type='email'
            value={email}
            id='email'
            placeholder='E-Mail'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            value={password}
            id='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </form>
      <p>
        Don't have an account yet? <Link to='/register'>Create Account</Link>
      </p>
    </section>
  );
};

export default Login;
