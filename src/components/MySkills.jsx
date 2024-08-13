import { useContext, useEffect, useState } from "react"
import service from "../services/file-upload.service"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import classes from "./MySkills.module.css"
import { SimpleGrid, Card, Image, Text } from "@mantine/core"



function MySkills(){
    const [mySkills, setMySkills] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        service.getUserSkills(user._id)
        .then((data) =>{
            setMySkills(data)
        })
        .catch((err) => console.log(err)) 

    }, [])


    return(
        // <div>
        //     {mySkills &&
        //         mySkills.map((skill) =>(
        //             <Link to={`/skills/${skill._id}`} key={skill._id}>
        //                 <div  className={classes.skillCard}>
        //                     <p>{skill.skillName}</p>
        //                     <img src={skill.image} alt= {skill.skillName}/>
        //                 </div>
        //             </Link>

        //         ))
        //     }

        // </div>

         <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" > 
            {mySkills &&
                mySkills.map((skill)=>{
                return(
                    <Link to={`/skills/${skill._id}`} key={skill._id}>
                        <Card key={skill._id} shadow="md" padding="md" radius="lg" withBorder>
                        <Card.Section>
                            <Image 
                                src={skill.image}
                                height={250}
                                />
                        </Card.Section>
                        <Text className={classes.cardTitle}>
                            {skill.skillName}
                        </Text>
                    </Card>
                    </Link>
                )
            })}

        </SimpleGrid>

    )

}

export default MySkills