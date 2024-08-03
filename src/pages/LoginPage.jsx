import { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const {authenticateUser} = useContext(AuthContext)

    const handleEmail = (e) => setEmail (e.target.value);
    const handlePassword = (e) => setPassword (e.target.value);

    const handleLogin = async (e) =>{
        e.preventDefault();
        const loginUser =  {email, password};

        try{
            const {data} = await axios.post(
                `${API_URL}/auth/login`, loginUser
            );
            console.log ("successfully logged in", data);
            localStorage.setItem("authToken", data.authToken)
            await authenticateUser();
            nav("/dashboard"); //not sure if homepage  or profile
        } catch(error){
            console.log(error)
        }
    };

    return(
        <div className="login-page">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    name = "email"
                    value={email}
                    onChange={handleEmail}
                />

                <label>Password</label>
                <input 
                    type="password"
                    name = "password"
                    value={password}
                    onChange={handlePassword}
                />

                <button type="submit">Login</button>

            </form>
            <p>Don't have an account yet? <Link to={"/signup"}>Sign Up</Link></p>
        </div>
    )

}

export default LoginPage