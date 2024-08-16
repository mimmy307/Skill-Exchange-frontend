import classes from "./Homepage.module.css"
import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import PreviewContainer from "../components/PreviewContainer";
import Footer from "../components/Footer";


function Homepage(){
    const {user} = useContext(AuthContext)

    return(
        <div className={classes.homeContainer}>
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <Title className={classes.title}>
                        Welcome Back, {user.fullName}!
                    </Title>
                    <Container size={640}>
                        <Text size="lg" className={classes.description}>
                            Let’s collaborate and learn together.
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