import { useContext, useEffect, useState } from "react"
import service from "../services/file-upload.service"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { SimpleGrid, Card, Image, Text, Modal, Group, Button } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import axios from "axios"

const API_URL = "http://localhost:5005"

function MySkills(){
    const [mySkills, setMySkills] = useState([])
    const {user} = useContext(AuthContext)
    const [opened, {open,close}] = useDisclosure(false)
    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(()=>{
        service.getUserSkills(user._id)
        .then((data) =>{
            setMySkills(data)
        })
        .catch((err) => console.log(err)) 

    }, [])

    const handleDelete = async ()=>{
        const tokenFromStorage = localStorage.getItem("authToken")

        if (!selectedSkill) return;
        try{
            await axios.delete(`${API_URL}/api/skills/${selectedSkill}`, 
            {headers: { Authorization: `Bearer ${tokenFromStorage}` } })
            const updatedSkills = await service.getUserSkills(user._id);
            setMySkills(updatedSkills);
            close();
        }catch(error){
           console.log("couldn't delete skill", error) 
        }
    }


    return(
        <>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" > 
                {mySkills &&
                    mySkills.map((skill)=>{
                    return(
                            <Card key={skill._id} shadow="md" padding="md" radius="lg" withBorder>
                            <Card.Section style={{ position: 'relative' }}>
                                <Image 
                                    src={skill.image}
                                    height={250}
                                    /> 
                                <Group 
                                    position="right" 
                                    style={{
                                        position: 'absolute', 
                                        top: 10, 
                                        right: 10
                                    }}>
                                    <Button 
                                    onClick={() => { setSelectedSkill(skill._id); open(); }}
                                    variant="filled" 
                                    color="red" 
                                    size="xs" 
                                    radius="md">
                                        Delete
                                    </Button>
                                </Group>
                            </Card.Section>
                            <Link to={`/skills/${skill._id}`} style={{ textDecoration: 'none' }}>
                                <Text fw={600} ta="center"  mt="sm" color="black" >
                                    {skill.skillName}
                                </Text>
                            </Link>
                            
                        </Card>
                        

                    )
                })}

            </SimpleGrid>

            <Modal opened={opened} onClose={close} title="Delete Confirmation" centered>
                <Text fw={500}>Are you sure you want to delete this skill?</Text>
                <Group mt="lg">
                    <Button 
                    onClick={close}
                    variant="outline" 
                    color="red" 
                    size="sm" 
                    radius="md">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDelete}
                        variant="filled" 
                        color="red" 
                        size="sm" 
                        adius="md">
                        Delete
                    </Button>
                </Group>

            </Modal>
        </>

    )

}

export default MySkills