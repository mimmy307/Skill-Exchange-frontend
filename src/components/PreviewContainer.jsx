import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { SimpleGrid, Card, Image, Text, Group, Button} from "@mantine/core"
import classes from './PreviewContainer.module.css'

function PreviewContainer(){
    const [skills, setSkills] = useState([])
    const [users, setUsers] = useState([])

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

    const displayedSkills = skills.slice(0, 4);


    const getAllUsers = async ()=>{
        const tokenFromStorage = localStorage.getItem("authToken")
        try{
            const response = await axios.get(`${API_URL}/api/users`,
            {headers: {Authorization: `Bearer ${tokenFromStorage}`}})
            setUsers(response.data)
        } catch(err){
            console.log("couldn't fetch users", err)
        }
    }

    useEffect(()=>{
        getAllUsers()
    }, [])

    const displayedUsers = users.slice(0, 4);

    return(
        <div className={classes.container}>
            <div>
                <Group justify="space-between" mb="xs">
                <Text fz={30}>Discover our Skills</Text>
                <Link to="/skills">
                        <Button 
                            variant="filled" 
                            color="#00E59B"
                            style={{color:"black"}}
                         >
                         View all skills
                        </Button>
                    </Link>
            </Group>
            
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" className={classes.grid}>
                {displayedSkills &&
                    displayedSkills.map((skill) =>(
                        <Card 
                        mt="md"
                        key={skill._id} 
                        shadow="md" 
                        padding="md" 
                        radius="md" 
                        
                        className={classes.skillCard}>
                            <Card.Section >
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
            
            <div>
                <Group justify="space-between" mb="xs">
                <Text fz={30}>Discover our Users</Text>
                <Link to="/users">
                        <Button 
                            variant="filled" 
                            color="#00E59B"
                            style={{color:"black"}}
                         >
                         View all Users
                        </Button>
                    </Link>
            </Group>
            
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" className={classes.grid}>
                {displayedUsers &&
                    displayedUsers.map((user) =>(
                        <Card 
                        mt="md"
                        key={user._id} 
                        shadow="md" 
                        padding="md" 
                        radius="md" 
                        className={classes.userCard}>
                            <Card.Section >
                                <Image 
                                    src={user.profilePic}
                                    fit="contain"
                                    />
                            </Card.Section>
                            <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}>
                                <Text fw={600} ta="center"  mt="sm" color="black">{user.fullName}</Text> 
                            </Link>
                        </Card>
                        
                    )) }
            </SimpleGrid>
            </div>
            
            
        </div>
    )

}

export default PreviewContainer