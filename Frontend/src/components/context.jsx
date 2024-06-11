import { createContext, useContext, useState } from "react";
import { backendUrl } from "../api/api";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState({});

    return (<UserContext.Provider value={{user, setUser }}>{children}</UserContext.Provider>)
}

export const RefreshProvider = ({children})=>{
    const [quacks, setQuacks] = useState();
    const {token} = useContext(TokenContext)
    const {user} = useContext(UserContext)

    const fetchAllQuacks = async () => {
        const res = await fetch(`${backendUrl}/api/v1/quacks/dashboard/${user._id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // if (!data.result)
        //   return setErrorMessage(data.message || "Failed to fetch Quacks");
        setQuacks(data.result);
      };
    
    return (<RefreshContext.Provider value={{fetchAllQuacks, quacks}}>{children}</RefreshContext.Provider>)
}


export const TokenContext = createContext();

export const RefreshContext = createContext();
