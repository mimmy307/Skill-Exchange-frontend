import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { API_URL } from "../config"
import { SimpleGrid, Text, Paper, Avatar, Button} from "@mantine/core"
import classes from "./AllSkills.module.css"



function AllUsers(){
    const [users, setUsers] = useState([])

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


    return(
            <div className={classes.container}>
                
                <SimpleGrid cols={{ base: 2, sm: 2, lg: 4 }} spacing="lg" className={classes.grid}>
                    {users &&
                        users.map((user) =>(
                                <Paper radius="lg" withBorder p="lg" key={user._id} className={classes.userCard}>
                                    <Avatar
                                    src={user.profilePic}
                                    size={140}
                                    radius={120}
                                    mx="auto"
                                    />
                                
                                    <Text ta="center" fz="lg" fw={600} mt="md" color="black">
                                        {user.fullName}
                                    </Text>
                                    <Text ta="center" c="dimmed" fz="sm">
                                        {user.city}, {user.country}
                                    </Text>
                                    <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}> 
                                        <Button 
                                            variant="outline" 
                                            color="#00E59B"
                                            style={{ color: 'black' }} 
                                            fullWidth 
                                            mt="md"
                                            radius="md" 
                                            >
                                                View Profile
                                        </Button> 
                                    </Link> 
                                </Paper>
                
                            
                        )) 
                    }
                </SimpleGrid>
                </div>
                
        )

}
export default AllUsers