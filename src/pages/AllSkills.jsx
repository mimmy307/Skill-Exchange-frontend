import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import { Link } from "react-router-dom"
import Search from "../components/Search"

const API_URL = "http://localhost:5005"

function AllSkills(){
    const [skills, setSkills] = useState([])
    const [query, setQuery] = useState("")

    const getAllSkills = async ()=>{
        try{
            const response = await axios.get(`${API_URL}/api/skills`)
            console.log("skills data", response.data)
            setSkills(response.data)
        } catch(err){
            console.log("couldn't fetch skills", err)
        }
    }

    useEffect(()=>{
        getAllSkills()
    }, [])

    useEffect(()=>{
        const searchSkills = async ()=>{
        try{
            const response= await axios.get(`${API_URL}/api/skills?q=${query}`)
            setSkills(response.data)
        } catch(err){
            console.log("couldn't search skill", err)
        }
    };

    searchSkills()
},[query])
    


    const searchHandler = (string) =>{
        setQuery(string)
    }

    return(
        <div>
            <Search searchHandler={searchHandler} />
            {skills &&
                skills.map((skill) =>(
                    <Link to={`/skills/${skill._id}`} key={skill._id}>
                    <div >
                        <img src={skill.image} />
                        <p>{skill.skillName}</p>
                    </div>
                    </Link>
                )) }
        </div>
    )



}
export default AllSkills