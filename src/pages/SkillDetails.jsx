import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import classes from './SkillDetails.module.css'
import { Paper, Avatar, Image, Text, Button, Badge, Title, Stack, Divider } from "@mantine/core"

function SkillDetails(){
    const {skillId} = useParams()
    const [skill, setSkill] = useState({})
    const {user} = useContext(AuthContext)
    const [isRequested, setIsRequested] = useState(false);
   

    const getSkill = async () =>{
        try{
            const response = await axios.get (`${API_URL}/api/skills/${skillId}`)
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
            setIsRequested(true)
            console.log("request succesfull", response.data)
        } catch(err){
            console.log("couldn't request skill", err)
        }
    }

    return(
        <div className={classes.container}>
            <Paper radius="md" withBorder  className={classes.skillDetails}>
            <Stack mt="md" >
            <Title >{skill.skillName}</Title>
            <Divider  />
                <Image 
                    src={skill.image} 
                    alt={skill.skillName}
                    radius="md"
                    h={300}
                    w="auto"
                    fit="contain"
                    /> 
                <Badge color="#00E59B" variant="light">{skill.location}</Badge>
                <Divider  />
                <h3>Description</h3>
                <Text fw={500} color="dimmed">{skill.description}</Text>
            </Stack>
                
            </Paper>
            
            <div  size="sm" className={classes.userContainer}>
                <div>
                    <Paper radius="md" withBorder p="lg"  className={classes.userDetails}>
                        <Text fw={600}> Offered by:</Text>
                        <Avatar
                            src={skill.user && skill.user.profilePic}
                            size={150}
                            radius={120}
                            mx="auto"
                            mt="md"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="md">
                            {skill.user && skill.user.fullName}
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            {skill.user && skill.user.email}
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            {skill.user && skill.user.city}, {skill.user && skill.user.country}
                        </Text>
                        {skill.user && 
                            <Link to={`/users/${skill.user._id}`} style={{ textDecoration: 'none' }}> 
                                <Button 
                                variant="filled" 
                                color="#00E59B"
                                style={{ color: 'black' }} 
                                fullWidth 
                                mt="md"
                                radius="md" 
                                >
                                    View Profile
                                </Button> 
                            </Link> 
                        }
                         
                    </Paper> 
                </div>

                <Paper withBorder p="lg" bg='white' className={classes.tokenRequest}  styles={{
                root: {
                    borderColor: '#00E59B', 
                    borderWidth: 2,
                },
            }}>
                    <Stack>
                        <Text fw={500} ta="center"> {skill.tokenRate} {skill.tokenRate > 1 ? 'Tokens' : 'Token'}</Text>
                        <Button 
                            onClick={requestSkill}
                            variant="filled" 
                            color="#00E59B"
                            style={{ color: 'black' }} 
                            radius="md" 
                            disabled={isRequested}
                            >
                            {isRequested ? "Requested" : "Request"}
                        </Button>
                    </Stack>
                    
                </Paper>

            </div>
        </div>
    )

}

export default SkillDetails

