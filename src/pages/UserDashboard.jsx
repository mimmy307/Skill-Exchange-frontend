import { useContext, useEffect, useState } from "react"
import service from "../services/file-upload.service"
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import MySkills from "../components/MySkills";


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
        <div className="dashboard-container">
        
                <div key={dashUser._id} className="personal-info-container">
                    <img src= {dashUser.profilePic} alt= "profile pic" />
                    <h3>{dashUser.fullName}</h3>
                    <p> {dashUser.city},{dashUser.country} </p>
                    <p>{dashUser.email}</p>
                    <p>Token Balance: {dashUser.tokenBalance}</p>
                </div>
                <Link to="/dashboard/editprofile"><button>Edit Profile</button></Link>
                <div className="my-skills">
                    <MySkills/>

                </div>
  
            
        </div>
    )

}

export default UserDashboard