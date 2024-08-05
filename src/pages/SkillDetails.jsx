import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/auth.context"

const API_URL = "http://localhost:5005"

function SkillDetails(){
    const {skillId} = useParams()
    const [skill, setSkill] = useState({})
    const {user} = useContext(AuthContext)
   

    const getSkill = async () =>{
        try{
            const response = await axios.get (`${API_URL}/api/skills/${skillId}`)
            console.log('Skill data:', response.data);
            setSkill(response.data)
        } catch(err){
            console.log("couldn't load skill details", err)
        }
    }

    useEffect(() =>{
        getSkill();
    }, [skillId])

    const requestSkill = async () =>{
        const newRequest = {
            requester: user._id, 
            offerer: skill.user._id, 
            skill: skill._id,
            tokens: skill.tokenRate,
            status: "pending"
        }
    
        const tokenFromStorage = localStorage.getItem("authToken")
        try{
            const response = await axios.post(`${API_URL}/api/skillRequest`, newRequest,
            {headers: { Authorization: `Bearer ${tokenFromStorage}` } })
            console.log("request succesfull", response.data)
        } catch(err){
            console.log("couldn't request skill", err)
        }
    }

    return(
        <div className="skill-details-container">
            <div className="skill-details-info">
                <h2>{skill.skillName}</h2>
                <img src={skill.image} alt={skill.skillName}/>
                <p>{skill.location}</p>
                <h3>Description</h3>
                <p>{skill.description}</p>
            </div>
            
            <div className="skill-user-container">
                <div className="skill-token-request">
                    <button>{skill.tokenRate} {skill.tokenRate > 1 ? 'Tokens' : 'Token'}</button>
                    <button onClick={requestSkill}>Request</button>
                </div>

                <div className="skill-user-info">
                    {/* <img src={skill.user.profilePic} />
                    <h4>{skill.user.fullName}</h4>
                    <p>{skill.user.city}, {skill.user.country}</p>
                    <p>View Profile</p> */}
                </div>

            </div>
        </div>
    )

}

export default SkillDetails