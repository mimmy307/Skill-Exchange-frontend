import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({children}){
    const {isLoggedIn, isLoeading} = useContext(AuthContext)

    if(isLoeading){
        return <p>Loading...</p> // customise later
    }

    if (!isLoggedIn){
        return <Navigate to="/login" />;
    } else {
        return children
    }
}

export default IsPrivate