import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext, RefreshContext } from "../components/context";
import { backendUrl } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./css/CreateQuack.css";
import Verification from "../components/Verification";
import Header from "../components/Header";

const CreateQuack = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [textInput, setTextInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const createQuack = async (e) => {
    e.preventDefault();

    const quackInfo = {
      userId: user._id,
      quackText: textInput,
      Date: Date.now(),
    };

    const res = await fetch(`${backendUrl}/api/v1/quacks`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(quackInfo),
      credentials: "include",
    });

    const data = await res.json();
    if (!data.result) return setErrorMessage(data.message);
    setTextInput("");
    setRefresh(!refresh);
    navigate("/home");
  };




  return (<>
    {user.isVerified ? <main className="quackpage">

      <div className="quack-head">
        <button className="cancel" onClick={() => navigate("/home")}>Cancel</button>
        <button className="quack-btn" onClick={createQuack}>Quack!</button>
      </div>
      <form className="quack-form">
        <div>
          <div className="container img-container">
            <img className="prof-pic" src={`${backendUrl}/${user.imgUrl}`} alt="" />
          </div>
          <textarea
            value={textInput}
            placeholder="What do you wanna Quack?"
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
        </div>
      </form>
    </main> : <div>
      <Header />
      <div className="verification-box">
        <Verification />
      </div>
    </div>}

  </>
  );
};

export default CreateQuack;
