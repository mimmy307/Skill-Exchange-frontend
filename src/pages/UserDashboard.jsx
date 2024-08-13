import { useContext, useEffect, useState } from "react"
import service from "../services/file-upload.service"
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import MySkills from "../components/MySkills";
import OutgoingRequests from "../components/OutgoingRequests";
import IncomingRequests from "../components/IncomingRequests";
import { Avatar, Text, Button, Paper, Group,Badge, Tabs } from '@mantine/core';
import classes from "./UserDashboard.module.css"




function UserDashboard (){
    const [dashUser, setDashUser] = useState({})

    const {user} = useContext(AuthContext)


    useEffect(() =>{
        service.getUser(user._id)
        .then((data)=>{
            setDashUser(data)
            
        })
        .catch((err) => console.log(err))

    }, []);

    return(
        <div className={classes.container}>

                <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" className={classes.userInfo}>
                    <Avatar
                        src={dashUser.profilePic}
                        size={120}
                        radius={120}
                        mx="auto"
                    />
                    <Text ta="center" fz="lg" fw={500} mt="md">
                        {dashUser.fullName}
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                        {dashUser.email}
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                        {dashUser.city}, {dashUser.country}
                    </Text>
                    <Group>
                        <Text ta="center" c="dimmed" fz="sm">
                            Token Balance:
                        </Text>
                        <Badge variant="light" color="blue" size="lg" circle>
                        {dashUser.tokenBalance} 
                        </Badge>
                    </Group>
                   
                    <Link to="/dashboard/editprofile">
                        <Button variant="default" fullWidth mt="md">
                            Edit Profile
                        </Button>
                    </Link>   
                </Paper>
                
                <div className={classes.dashboardInfo}>
                   <Tabs 
                        defaultValue ="Skill Request Sent" 
                        className={classes.request}
                        color='#00E59B'
                    >
                        <Tabs.List grow>
                            <Tabs.Tab value="Skill Request Sent">
                                Skill Request Sent
                            </Tabs.Tab>
                            <Tabs.Tab value="Skill Request Received">
                                Skill Request Received
                            </Tabs.Tab>  
                        </Tabs.List>

                        <Tabs.Panel value="Skill Request Sent">
                            <OutgoingRequests/>
                        </Tabs.Panel>

                        <Tabs.Panel value="Skill Request Received">
                            <IncomingRequests/>
                        </Tabs.Panel>
                    </Tabs>
                
                    <div className="my-skills">
                        <h2>My Skills</h2>
                        <MySkills/>
                        <Link to="/dashboard/addskill"><button>Add Skill</button></Link>

                    </div> 
                </div>
            
        </div>
    )

}

export default UserDashboard