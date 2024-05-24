import { useContext, useState } from "react";
import { TokenContext, UserContext } from "../components/context";
import { backendUrl } from "../api/api";

const CreateQuack = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const [textInput, setTextInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
  };

  return (
    <main>
      <h1>CreateQuack</h1>
      <form>
        <textarea
          value={textInput}
          id=""
          placeholder="What do you wanna Quack?"
          onChange={(e) => setTextInput(e.target.value)}
        ></textarea>
        <button onClick={createQuack}>Quack!!!</button>
      </form>
    </main>
  );
};

export default CreateQuack;
