import { useContext, useEffect, useState } from "react"
import service from "../services/file-upload.service"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"



function MySkills(){
    const [mySkills, setMySkills] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        service.getUserSkills(user._id)
        .then((data) =>{
            setMySkills(data)
        })
        .catch((err) => console.log(err)) 

    }, [])


    return(
        <div>
            {mySkills &&
                mySkills.map((skill) =>(
                    <Link to={`/skills/${skill._id}`} key={skill._id}>
                        <div  className="my-skill-card">
                            <p>{skill.skillName}</p>
                            <img src={skill.image} alt= {skill.skillName}/>
                        </div>
                    </Link>

                ))
            }

        </div>
    )

}

export default MySkills