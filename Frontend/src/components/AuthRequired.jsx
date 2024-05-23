import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "./context";

const AuthRequired = ({ children }) => {
    const { token, setToken } = useContext(TokenContext);
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(token ? false : true);
    const timeoutRef = useRef(null);

    console.log({ token, loading });

    const navigate = useNavigate();

    useEffect(() => {
        if (token) return doSilentRefresh(token);

        async function checkLoggedIn() {
            console.log("check if logged in previously");
            const response = await fetch(`${backendUrl}/api/v1/user/refresh-token`, {
                method: "POST",
                credentials: "include",
            });

            const data = await response.json();
            if (data.result) {
                console.log("was logged in, got new access token");
                setToken(data.result.newAccessToken);
                setUser(data.result.user);
                doSilentRefresh(data.result.newAccessToken);
            } else {
                console.log("was not logged in (anymore)");
                navigate("/login");
            }

            setLoading(false);
        }

        checkLoggedIn();

        function doSilentRefresh(currentAccessToken) {
            const tokenExpiration = calcTokenExpDuration(currentAccessToken);
            console.log("doing silent refresh in", tokenExpiration);
            timeoutRef.current = setTimeout(async () => {
                try {
                    console.log("fetching backend for silent refresh");
                    const response = await fetch(
                        `${backendUrl}/api/v1/user/refresh-token`,
                        {
                            method: "POST",
                            credentials: "include",
                        }
                    );

                    if (!data.result) navigate("/login");

                    const data = await response.json();
                    console.log({ data });
                    setToken(data.result.newAccessToken);
                    setUser(data.result.user);
                    doSilentRefresh(data.result.newAccessToken);
                } catch (err) {
                    console.log(err);
                    navigate("/login");
                }
            }, tokenExpiration);
        }

        function calcTokenExpDuration(accessToken) {
            const tokenPayloadBase64 = accessToken.split(".")[1];
            const tokenPayloadJson = atob(tokenPayloadBase64);
            const tokenPayload = JSON.parse(tokenPayloadJson);
            const duration = tokenPayload.exp - tokenPayload.iat;
            const nextFetchAfter = duration - 30;
            return nextFetchAfter * 1000;
        }
        return () => clearTimeout(timeoutRef.current);
    }, []);

    if (loading) return "Loading...";
    else return <>{children}</>;
};

export default AuthRequired;

