import { useContext, useState } from "react";
import { TokenContext } from "../components/context";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const { token, setToken } = useContext(TokenContext);

  // const [errorMessage, setErrorMessage] = useState("");

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch("${backendUrl}/api/v1/user/login", {
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //     credentials: "include",
  //   });

  //   const data = await res.json();
  //   if (!data.result) setErrorMessage(data.message);
  //   console.log(data);
  // };

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
    </main>

    // <p>
    //   Don't have an account yet? <Link to="/register">Create Account</Link>
    // </p>
  );
};

export default Login;
