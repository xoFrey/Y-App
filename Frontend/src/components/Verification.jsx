import { useContext, useState } from "react";
import "./css/Verification.css";
import { TokenContext, UserContext } from "./context";
import { backendUrl } from "../api/api";


const Verification = () => {
    const { user } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [isVerified, setIsVerified] = useState(user.isVerified);
    const [showBox, setShowBox] = useState(false);
    const [sixDigitCode, setSixDigitCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const sendEmailVerification = async () => {
        const res = await fetch(`${backendUrl}/api/v1/user/sendEmailVerification`, {
            method: "POST",
            headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id }),
            credentials: "include"
        });
        const data = await res.json();
        if (!data.result)
            return setErrorMessage(data.message || "Failed to Send Email");
        setShowBox(true);
    };

    const verifyUser = async () => {
        const res = await fetch(`${backendUrl}/api/v1/user/verifyUser`,
            {
                method: "POST",
                headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id, sixDigitCode: sixDigitCode }),
                credentials: "include"
            }
        );
        const data = await res.json();
        if (!data.result)
            return setErrorMessage(data.message || "Failed to Send Email");

    };



    return <section className={`verification ${isVerified ? "hide-alert" : ""}`}>
        <div className="alertbox">
            <p>You are not verified! Please verify for more permission.</p>
            <button onClick={() => { sendEmailVerification(); setShowBox(true); }}>Verifiy here!</button>
        </div>
        <div className={` ${showBox ? "box" : "hide-alert"}`}>
            <h3>Please enter the Code:</h3>
            <input type="number" value={sixDigitCode} onChange={(e) => setSixDigitCode(e.target.value)} />
            <button onClick={() => { setShowBox(false); verifyUser(); }}>Submit</button>
        </div>
    </section>;
};

export default Verification;