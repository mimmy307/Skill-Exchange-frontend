import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { SimpleGrid, Card, Image, Text, Group, Button, Paper, Avatar} from "@mantine/core"
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
                         All Skills
                        </Button>
                    </Link>
            </Group>
            
            <SimpleGrid cols={{ base: 2, sm: 2, lg: 4 }} spacing="lg" className={classes.previewSkillsGrid}>
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
                                    height={250}

                                    className={classes.previewCardImage}
                                    />
                            </Card.Section>
                            <Link to={`/skills/${skill._id}`} style={{ textDecoration: 'none' }} className={classes.previewCardName}>
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
                         All Users
                        </Button>
                    </Link>
            </Group>
            
            <SimpleGrid cols={{ base: 2, sm: 2, lg: 4 }} spacing="lg" className={classes.grid} mb={40}>
                {displayedUsers &&
                    displayedUsers.map((user) =>(

                        <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }} key={user._id}>
                            <Paper radius="md" withBorder p="lg"  className={classes.userCard} mt="md">
                            <Avatar
                            src={user.profilePic}
                            size={100}
                            radius={120}
                            mx="auto"
                            className={classes.avatar}
                            />
                        
                            <Text ta="center" fz="lg" fw={600} mt="md" color="black">
                                {user.fullName}
                            </Text>
                            <Text ta="center" c="dimmed" fz="sm">
                                {user.city}, {user.country}
                             </Text>
                             
                        </Paper> 
                        </Link>
                        )) }
            </SimpleGrid>
            </div>
            
            
        </div>
    )

}

export default PreviewContainer