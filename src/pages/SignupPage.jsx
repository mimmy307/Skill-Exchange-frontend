import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props){
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const handleFullName  = (e) => setFullName (e.target.value);
    const handleEmail = (e) => setEmail (e.target.value);
    const handlePassword = (e) => setPassword (e.target.value);

    const handleSignup = async (e) =>{
        e.preventDefault();
        const newUser =  {fullName, email, password};

        try{
            const {data} = await axios.post(
                `${API_URL}/auth/signup`, newUser
            );
            console.log ("successfully signed up", data);
            nav("/login");
        } catch(error){
            console.log(error)
        }
    };

    return(
        <div className="signup-page">
            <h1>Sign Up</h1>

            <form onSubmit={handleSignup}>
                <label>Full Name:</label>
                <input 
                    type="text"
                    name = "fullName"
                    value={fullName}
                    onChange={handleFullName}
                />

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

                <button type="submit">Sign Up</button>

            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    )

}

export default SignupPage