import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { UserContext, TokenContext, RefreshContext } from "./components/context";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthRequired from "./components/AuthRequired";
import Createquack from "./pages/CreateQuack";
import Navbar from "./components/Navbar";
import LoadingPage from "./pages/LoadingPage";
import QuackDetail from "./pages/QuackDetail";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 3000);
  }, []);

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
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
                <Route path="/messages" element={<AuthRequired><Messages /></AuthRequired>}></Route>
                <Route
                  path="/profile/:profileId"
                  element={
                    <AuthRequired>
                      <Profile />
                    </AuthRequired>
                  }
                ></Route>
                <Route path="/search" element={<AuthRequired><Search /></AuthRequired>}></Route>
                <Route path="/quackdetail/:quackId" element={
                  <AuthRequired>
                    <QuackDetail />
                  </AuthRequired>
                }></Route>
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
    </RefreshContext.Provider>
  );
}

export default App;
