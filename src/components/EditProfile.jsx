import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/file-upload.service";
import axios from "axios";
import { Center, Group, Input, Stack, Textarea, Button} from "@mantine/core";
import { API_URL } from "../config";

function EditProfile({closeModal}){
    const {user} = useContext(AuthContext)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [isloading, setIsLoading] = useState(false)

    useEffect(()=>{
        const tokenFromStorage = localStorage.getItem("authToken")
        axios.get(`${API_URL}/api/users/${user._id}`,{headers: {Authorization: `Bearer ${tokenFromStorage}`}} )
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
            const response = await axios.put(`${API_URL}/api/users/${user._id}`, updatedUser,{
                headers: { Authorization: `Bearer ${tokenFromStorage}` } 
            })
            closeModal();
        }catch(err){console.log("error while updating profile", err)}
    }

    return(
        <Stack align="center">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <Group spacing="md" grow>
                    <Input.Wrapper label="Full Name">
                        <Input 
                            type="text"
                            value={fullName}
                            onChange={(e)=> setFullName(e.target.value)}
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label="Email" >
                        <Input
                            type="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </Input.Wrapper>
                </Group>
                <Group grow spacing="md" mt="md">
                    <Input.Wrapper label="City">
                        <Input
                            type="text"
                            value={city}
                            onChange={(e)=> setCity(e.target.value)}
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label="Country">
                        <Input
                            type="text"
                            value={country}
                            onChange={(e)=> setCountry(e.target.value)}
                        />
                    </Input.Wrapper>
                </Group>
                <Input.Wrapper label="About Me" mt="md">
                    <Textarea 
                        value={aboutMe}
                        onChange={(e)=> setAboutMe(e.target.value)}
                        placeholder="Tell us about yourself"
                        autosize
                    />
                </Input.Wrapper>
                <Center mt="md">
                    <Input.Wrapper label="Profile Picture">
                        <Input
                        type="file"
                        accept="image/jpg, image/png"
                        onChange={handleFileUpload}
                        />
                    </Input.Wrapper>
                </Center>
                <Center mt="md">
                    <Button 
                        disabled={isloading} 
                        type="submit"
                        variant="filled" 
                        color="#00E59B" 
                        size="sm" 
                        radius="xl"  
                        >
                        Save Changes
                    </Button>
                </Center>
            </form>
        </Stack>

    )


}

export default EditProfile