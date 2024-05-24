import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import quackDetail from "./pages/QuackDetail";
import { UserContext, TokenContext } from "./components/context";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthRequired from "./components/AuthRequired";
import Createquack from "./pages/CreateQuack";
import Navbar from "./components/Navbar";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 3);
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        {timer ? (
          <LoadingPage />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/home"
                element={
                  <AuthRequired>
                    <Home />
                  </AuthRequired>
                }
              ></Route>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/messages" element={<Messages />}></Route>
              <Route
                path="/profile"
                element={
                  <AuthRequired>
                    <Profile />
                  </AuthRequired>
                }
              ></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="/quackDetail" element={<quackDetail />}></Route>
              <Route
                path="/createquack"
                element={
                  <AuthRequired>
                    <Createquack />
                  </AuthRequired>
                }
              ></Route>
            </Routes>
            <Navbar />
          </BrowserRouter>
        )}
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
