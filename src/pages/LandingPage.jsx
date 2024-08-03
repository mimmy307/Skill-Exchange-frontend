import { Link } from "react-router-dom"

function LandingPage(){
    return(
        <div className="Header-container">
            <h1>Unlock New Opportunities with Skill Exchange</h1>
            <p>Find and offer skills, earn tokens, and access a network of experts</p>
            <Link to="/signup"><button>Get Started</button></Link>
        </div>

    )
}

export default LandingPage