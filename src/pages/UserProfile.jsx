import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context"
import service from "../services/file-upload.service"
import MySkills from "../components/MySkills";
import Reviews from "../components/Reviews";
import { useParams } from "react-router-dom";
import classes from "./UserProfile.module.css"
import { Avatar, Text, Button, Paper, Group,Badge, Divider } from '@mantine/core';


function UserProfile(){
    const [userProfile, setUserProfile] = useState({})
    const {user} = useContext(AuthContext)
    const {userId} = useParams()
    const [mySkills, setMySkills] = useState([])
   
    const fetchUserId = userId || user._id

    useEffect(() =>{
        service.getUser(fetchUserId)
        .then((data)=>{
            setUserProfile(data)
            
        })
        .catch((err) => console.log(err))

    }, [fetchUserId]);

    useEffect(()=>{
        service.getUserSkills(fetchUserId)
        .then((data) =>{
            setMySkills(data)
        })
        .catch((err) => console.log(err)) 

    }, [fetchUserId])


    return(
           <div className={classes.container}>
            <div key={userProfile._id}>
                <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" className={classes.userInfo}>
                    <Avatar
                        src={userProfile.profilePic}
                        size={180}
                        radius={120}
                        mx="auto"
                    />
                    <Text ta="center" fz="lg" fw={500} mt="md">
                        {userProfile.fullName}
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                        {userProfile.email}
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                        {userProfile.city}, {userProfile.country}
                    </Text> 
                </Paper> 
            </div>
    

            <div className={classes.generalInfoContainer}>
                <div className="about-me-section"> 
                    <h3>Hey there! I'm {userProfile.fullName}</h3>
                    <Divider size="sm"  />
                    <Text mt="md">{userProfile.aboutMe}</Text>
                </div>


                <div className="my-skills-section">
                    <h3>{userProfile.fullName}'s Skills</h3>
                    <Divider size="sm"  />
                    <br/>
                    <MySkills skills={mySkills} setSkills={setMySkills} isDashboard={false} />
                </div>

                {/* <div className="user-reviews-container">
                    <h3>Reviews</h3>   
                    <Reviews revieweeId={userProfile._id}/>
                </div> */}

            </div>
              
            
        </div> 
        
    )


}



export default UserProfile