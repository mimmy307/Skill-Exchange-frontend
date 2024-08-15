import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../config";

const AuthContext = React.createContext();

function AuthProviderWrapper({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const authenticateUser = async () =>{
        try{
            const tokenFromStorage = localStorage.getItem("authToken");
            const {data} = await axios.get(`${API_URL}/auth/verify`, {
                headers: {Authorization: `Bearer ${tokenFromStorage}`}
            });
            console.log("verify route succesfull", data);
            setUser(data);
            setIsLoading(false);
            setIsLoggedIn(true);
        } catch (error){
            console.log("error verifying user", error);
            setUser(null);
            setIsLoading(false);
            setIsLoggedIn(false);
        }
    };


    const logOutUser = () =>{
      localStorage.removeItem("authToken")  
      authenticateUser()
      navigator("/login")
    }

    useEffect(()=>{
      authenticateUser()  
    }, [])

    return(
        <AuthContext.Provider value={{isLoggedIn,isLoading, user, authenticateUser, logOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProviderWrapper, AuthContext}