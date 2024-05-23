import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Login/Register</h1>
      <button onClick={navigate("/login")}>Login</button>
      <button onClick={navigate("/register")}>Register</button>
    </main>
  );
}; //halolooo

export default LoginPage;
