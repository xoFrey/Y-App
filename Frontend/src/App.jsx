import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import {TokenContext, RefreshProvider, UserProvider } from "./components/context";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthRequired from "./components/AuthRequired";
import Createquack from "./pages/CreateQuack";
import Navbar from "./components/Navbar";
import LoadingPage from "./pages/LoadingPage";
import QuackDetail from "./pages/QuackDetail";


function App() {
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 3000);
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
        <UserProvider>
        <RefreshProvider>
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
        </RefreshProvider>
        </UserProvider>
      </TokenContext.Provider>
  );
}

export default App;
