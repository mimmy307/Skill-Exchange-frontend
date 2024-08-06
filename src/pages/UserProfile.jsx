import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context"
import service from "../services/file-upload.service"
import MySkills from "../components/MySkills";
import Reviews from "../components/Reviews";


function UserProfile(){
    const [userProfile, setUserProfile] = useState({})
    const {user} = useContext(AuthContext)
   


    useEffect(() =>{
        service.getUser(user._id)
        .then((data)=>{
            setUserProfile(data)
            
        })
        .catch((err) => console.log(err))

    }, []);


    return(
        <div className="profile-container">
        
                <div key={userProfile._id} className="user-personal-info-container">
                    <img src= {userProfile.profilePic} alt= "profile pic" />
                    <h3>{userProfile.fullName}</h3>
                    <p> {userProfile.city},{userProfile.country} </p>
                    <p>{userProfile.email}</p>
                </div>

                <div className="user-other-info-container">
                    <div className="about-me-section"> 
                        <h3>Hey there! I'm {userProfile.fullName}</h3>
                        <p>{userProfile.aboutMe}</p>
                    </div>

                    <div className="my-skills-section">
                        <h2>{userProfile.fullName}'s Skills</h2>
                        <MySkills />
                    </div>

                    <div className="user-reviews-container">
                        <h2>Reviews</h2>   
                        <Reviews/>
                    </div>

                </div>
              
            
        </div>
    )


}



export default UserProfile