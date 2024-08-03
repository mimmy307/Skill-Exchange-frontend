import { useContext, useEffect, useState } from "react"
import service from "../services/file-upload.service"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import axios from "axios"



function MySkills(){
    const [mySkills, setMySkills] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        service.getUserSkills(user._id)
        .then((data) =>{
            setMySkills(data)
        })
        .catch((err) => console.log(err)) 

        // const token = localStorage.getItem("authToken")
        // axios.get("http://localhost:5005/api/skills/user/" + user._id, {headers: {Authorization: `Bearer ${token}`}})
        // .then(response => console.log(response.data)).catch(err=>console.log(err))
    }, [])


    return(
        <div className="my-skills-container">
        <h2>My Skills</h2>
            {mySkills &&
                mySkills.map((skills) =>(
                    <div key={skills._id} className="my-skill-card">
                        <p>{skills.skillName}</p>
                        <img src={skills.image} alt= {skills.skillName}/>
                    </div>

                ))
            }
        <Link to="/dashboard/addskill"><button>Add Skill</button></Link>

        </div>
    )

}

export default MySkills