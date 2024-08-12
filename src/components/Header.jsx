import { Overlay, Container, Title, Button, Text, Group } from "@mantine/core"
import { Link } from "react-router-dom"
import classes from "../components/Header.module.css"

function  Header(){

        return(
        <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <h1 className={classes.title}>
            Unlock{' '}
            <Text component="span" variant="gradient" gradient={{ from: "#00E59B", to: 'cyan' }} inherit>
                New
            </Text>{' '}
            Opportunities with Skill Exchange
            </h1>
          <Text className={classes.description}  mt="xl" color="white" fz={25}  >
          Find and offer skills, earn tokens, and access a network of experts
          </Text>
  
            <Link to="/signup">
                <Button 
                    className={classes.control}
                        variant="filled" 
                        color="#00E59B" 
                        size="xl" 
                        radius="xl"  
                        style={{ color: 'black' }}>
                        Get Started
                </Button>
            </Link>

          
        </Container>
      </div>
        )
}

export default Header