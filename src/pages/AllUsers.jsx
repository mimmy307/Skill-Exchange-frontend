import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Search from "../components/Search"
import { API_URL } from "../config"
import { SimpleGrid, Card, Image, Text} from "@mantine/core"
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
                
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" className={classes.grid}>
                    {users &&
                        users.map((user) =>(
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
                                        height={250}
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
                
        )

}
export default AllUsers