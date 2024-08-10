import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"
import logo from "../assets/Images/Logo.png"
import "../components/Navbar.css"
import { Button } from "@mantine/core"


function Navbar(){
    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
    return(
        <nav className="navbar">
            <img src={logo} alt="logo" className="logo"/>

            {!isLoggedIn && (
                <div className="login-signup-section">
                    <Link to="/login">
                        <Button  
                            variant="outline" 
                            color="#00E59B" 
                            radius="xl" >
                            Log In
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button 
                            variant="filled" 
                            color="#00E59B" 
                            size="sm" 
                            radius="xl"  
                            style={{ color: 'black' }}>
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
            
            {isLoggedIn && (
                <div> 
                    <Link to="/skills"><p>All Skills</p></Link>
                    <p>Profile</p>
                    <button onClick={logOutUser}>Logout</button>
                </div>
               
            )}

        </nav>
    )
}

export default Navbar