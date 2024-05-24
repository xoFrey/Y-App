import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("xizelacar@gmail.com");
  const [password, setPassword] = useState("hallo");
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/api/v1/user/login`, {
      headers: { "Content-Type": "application/json" },
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
    <main>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </form>

      <p>
        Don't have an account yet? <Link to="/register">Create Account</Link>
      </p>
    </main>
  );
};

export default Login;
