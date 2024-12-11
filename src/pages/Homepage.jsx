import classes from "./Homepage.module.css"
import { Title, Text, Container} from '@mantine/core';
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import PreviewContainer from "../components/PreviewContainer";
import Footer from "../components/Footer";



function Homepage(){
    const {user} = useContext(AuthContext);
  
    return(
        <div className={classes.homeContainer}>
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <Title className={classes.title} fz={30}>
                        Welcome Back, <span className={classes.userName}> {user.fullName}</span> ! 
                    </Title>
                    <Title className={classes.title} fz={23} pt={20}>
                        Ready to exchange your skills and services?
                    </Title>
                    <Container size={640}>
                        <Text size="lg" className={classes.description} pt={20} color="white">
                        Explore new skills, connect with others, and start collaborating.
                        </Text>
                    </Container>
                </div>
            </div>
            <PreviewContainer/>
            <Footer/>

        </div>
        
       
    )

}

export default Homepage