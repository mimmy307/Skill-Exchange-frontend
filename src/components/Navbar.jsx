import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"

function Navbar(){
    const {isLoggedIn, user} = useContext(AuthContext)
    return(
        <nav className="navbar">
            <img src="" alt="logo"></img>
            <p>SkillEx</p>

            {!isLoggedIn && (
                <div>
                    <Link to="/login"><button>Log In</button></Link>
                    <Link to="/signup"><button>Sign Up</button></Link>
                </div>
            )}
            
            {isLoggedIn && (
                <div> 
                    <Link to="/skills"><p>All Skills</p></Link>
                    <p>Profile</p>
                </div>
               
            )}

        </nav>
    )
}

export default Navbar