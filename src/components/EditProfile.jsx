import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/file-upload.service";
import axios from "axios";

function EditProfile(){
    const {user} = useContext(AuthContext)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [isloading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        const tokenFromStorage = localStorage.getItem("authToken")
        axios.get(`http://localhost:5005/api/users/${user._id}`,{headers: {Authorization: `Bearer ${tokenFromStorage}`}} )
        .then((response)=>{
        setFullName(response.data.fullName || "");
        setEmail(response.data.email || "");
        setCity(response.data.city || "");
        setCountry(response.data.country || "");
        setAboutMe(response.data.aboutMe || "");
        setProfilePic(response.data.profilePic || "")   
        }) 
        
    }, [user]);

    const handleFileUpload = async (e) =>{
        setIsLoading(true)

        const uploadData= new FormData();
        uploadData.append("image", e.target.files[0]);
        for(const value of uploadData.values()){
            console.log(value)
        }


        try{
            const response = await service.uploadImage(uploadData);
            setProfilePic(response.fileUrl)
            setIsLoading(false)
        }catch(err){console.log("error while uploading file:", err)}
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const updatedUser ={fullName, email, city, country, aboutMe, profilePic}

        const tokenFromStorage = localStorage.getItem("authToken")

        try{
            await axios.put(`http://localhost:5005/api/users/${user._id}`, updatedUser,{
                headers: { Authorization: `Bearer ${tokenFromStorage}` } 
            })
            navigate('/dashboard')
        }catch(err){console.log("error while updating profile", err)}
    }

    return(
        <div className="edit-profile-form">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={(e)=> setFullName(e.target.value)}
                     />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                     />
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e)=> setCity(e.target.value)}
                     />
                </div>
                <div>
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={(e)=> setCountry(e.target.value)}
                     />
                </div>
                <div>
                    <label>About Me</label>
                    <input
                        type="text"
                        name="aboutMe"
                        value={aboutMe}
                        onChange={(e)=> setAboutMe(e.target.value)}
                     />
                </div>
                <div>
                    <label>Profile Picture</label>
                    <input
                        accept="image/jpg, image/png"
                        type="file"
                        name="profilePic"
                        onChange={handleFileUpload}
                     />
                </div>
                <button disabled={isloading} type="submit">Save Changes</button>

            </form>

        </div>
    )


}

export default EditProfile