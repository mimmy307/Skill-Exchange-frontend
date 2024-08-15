import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import service from "../services/file-upload.service";
import { NumberInput, Select, Stack, TextInput, Textarea, Input, Button, Center } from "@mantine/core";

function AddSkills({closeModal}){
    const [image, setImage] = useState("")
    const [skillName, setSkillName] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("remote")
    const [tokenRate, setTokenRate] = useState(0)
    const [isloading, setIsLoading] = useState(false)

    const {user} = useContext(AuthContext)


    const handleFileUpload = async (e) =>{
        setIsLoading(true)

        const uploadData= new FormData();
        uploadData.append("image", e.target.files[0]);

        try{
            const response = await  service.uploadImage(uploadData);
            setImage(response.fileUrl)
            setIsLoading(false)
        }catch(err){console.log("error while uploading file:", err)}
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const newSkill = {
        image,
        skillName,
        description,
        location,
        tokenRate,
        user: user._id 
        }

        try{
            const skillResponse = await service.createSkill(newSkill);
            closeModal();
        }
        catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    return(
        <Stack align="center">
            <h2>Add Skill</h2>
            <form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <TextInput 
                    label="Skill Name"
                    value= {skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    mt="md"
                />
                <Textarea
                    label = "Skill Description"
                    value= {description}
                    onChange={(e) => setDescription(e.target.value)}
                    autosize
                    mt="md"
                />
                <Select
                    mt="md"
                    label="Location"
                    value={location} 
                    onChange={(value)=> setLocation(value)}
                    data={[
                    { value: 'remote', label: 'Remote' },
                    { value: 'in-person', label: 'In-Person' }
                    ]}
                />
                <NumberInput
                    mt="md"
                    label="Token Rate"
                    value= {tokenRate}
                    onChange={(value) => setTokenRate(value)}
                />
                <Input.Wrapper label="Image"  mt="md">
                        <Input
                        type="file"
                        onChange={handleFileUpload}
                        />
                </Input.Wrapper>
               <Center mt="md">
                <Button 
                    disabled={isloading} 
                    type="submit"
                    variant="filled" 
                    color="#00E59B" 
                    size="sm" 
                    radius="xl"  >
                    Add Skill
                </Button>
               </Center>
            
            </form>

        </Stack>
        
    )


}

export default AddSkills