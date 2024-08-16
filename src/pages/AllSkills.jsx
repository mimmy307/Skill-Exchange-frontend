import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Search from "../components/Search"
import { API_URL } from "../config"
import { SimpleGrid, Card, Image, Text} from "@mantine/core"
import classes from "./AllSkills.module.css"


function AllSkills(){
    const [skills, setSkills] = useState([])
    const [query, setQuery] = useState("")

    const getAllSkills = async ()=>{
        try{
            const response = await axios.get(`${API_URL}/api/skills`)
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
        <div className={classes.container}>
            <Search searchHandler={searchHandler} />

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" >
                {skills &&
                    skills.map((skill) =>(
                        <Card key={skill._id} shadow="md" padding="md" radius="lg" withBorder className={classes.skillCard}>
                            <Card.Section>
                                <Image 
                                    src={skill.image}
                                    height={250}/>
                            </Card.Section>
                            <Link to={`/skills/${skill._id}`} style={{ textDecoration: 'none' }}>
                                <Text fw={600} ta="center"  mt="sm" color="black">{skill.skillName}</Text> 
                            </Link>
                        </Card>
                        
                    )) }
            </SimpleGrid>
            
        </div>
    )



}
export default AllSkills