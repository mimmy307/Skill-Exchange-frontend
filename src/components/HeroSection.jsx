import { Container, Title, Text, Button, Center } from '@mantine/core';
import classes from "./HeroSection.module.css"

function HeroSection(){

    return (
        <section className={classes.section}>
          <Container size="md">
            <Title className={classes.Headline}>
              Empowering Skill-Sharing, One Connection at a Time
            </Title>
            <Text className={classes.text}>
              At Skillex, we believe in the power of collaboration. Our mission is to make skill-sharing
              accessible to everyone, fostering growth, connection, and opportunity.
            </Text>
            <Center>
              <Button className={classes.button} radius="md" size="lg">
                Explore Opportunities
              </Button>
            </Center>
          </Container>
        </section>
      );

}

export default HeroSection