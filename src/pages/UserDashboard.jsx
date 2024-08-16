import { useContext, useEffect, useState } from "react"
import service from "../services/file-upload.service"
import { AuthContext } from "../context/auth.context";
import MySkills from "../components/MySkills";
import OutgoingRequests from "../components/OutgoingRequests";
import IncomingRequests from "../components/IncomingRequests";
import { Avatar, Text, Button, Paper, Group,Badge, Tabs, Modal } from '@mantine/core';
import classes from "./UserDashboard.module.css"
import EditProfile from "../components/EditProfile";
import { useDisclosure } from "@mantine/hooks";
import AddSkills from "../components/AddSkills";




function UserDashboard (){
    const [dashUser, setDashUser] = useState({})
    const [mySkills, setMySkills] = useState([])
    const [editProfileOpened, { open: openEditProfile, close: closeEditProfile }] = useDisclosure(false);
    const [addSkillOpened, { open: openAddSkill, close: closeAddSkill }] = useDisclosure(false);

    const {user} = useContext(AuthContext)


    useEffect(() =>{
        service.getUser(user._id)
        .then((data)=>{
            setDashUser(data)
            
        })
        .catch((err) => console.log(err))

    }, [user._id]);

    useEffect(()=>{
        service.getUserSkills(user._id)
        .then((data) =>{
            setMySkills(data)
        })
        .catch((err) => console.log(err)) 

    }, [user._id])

    return(
        <div className={classes.container}>
            <div>
            <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" className={classes.userInfo}>
                    <Avatar
                        src={dashUser.profilePic}
                        size={180}
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
                    <Group  justify="center" mt="md">
                        <Text c="dimmed" fz="sm">
                            Token Balance:
                        </Text>
                        <Badge variant="light" color="teal" size="lg" circle>
                        {dashUser.tokenBalance} 
                        </Badge>
                    </Group>
                   
                        <Button 
                        variant="filled" 
                        color="#00E59B"
                        style={{ color: 'black' }} 
                        fullWidth 
                        mt="md"
                        radius="md" 
                        onClick={openEditProfile}
                        >
                            Edit Profile
                        </Button>  
                </Paper> 
            </div>

               
                
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
            
                <div className={classes.mySkills}>
                    <Group justify="space-between">
                        <h2>My Skills</h2>
                        <Button 
                            variant="filled" 
                            color="#00E59B" 
                            size="sm" 
                            radius="md"  
                            style={{ color: 'black' }}
                            onClick={openAddSkill}>
                            Add Skill
                        </Button>
                    </Group>
                    

                    <hr style={{ border: '1.5px solid #00E59B'}}/> 
                    <MySkills skills={mySkills} setSkills={setMySkills} isDashboard={true}/>
                
                </div> 
            </div>

            <Modal
                opened={editProfileOpened} 
                onClose={closeEditProfile} 
                withCloseButton={false}
                centered
                size="lg">
                    <EditProfile  closeModal={closeEditProfile} setDashUser= {setDashUser}/>
            </Modal>

            <Modal
                opened={addSkillOpened} 
                onClose={closeAddSkill} 
                withCloseButton={false}
                centered
                size="lg">
                    <AddSkills  closeModal={closeAddSkill} setSkills={setMySkills}/>
            </Modal>
            
        </div>
    )

}

export default UserDashboard