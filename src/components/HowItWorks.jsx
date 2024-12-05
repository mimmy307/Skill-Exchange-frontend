import { Container, Flex, Group, Image, Text, Title } from "@mantine/core"
import addSkillIcon from "../assets/Images/addSkill.svg"
import createUserIcon from "../assets/Images/createUser.svg"
import exchangeSkillsIcon from "../assets/Images/exchangeSkills.svg"
import searchSkillsIcon from "../assets/Images/searchSkills.svg"
import classes from "../components/HowItWorks.module.css"

function HowItWorks(){

    return(
        <div>
            <Container mt={40} mb={60}>
                <Title order={1} align="center" mb={30}>
                    How It Works
                </Title>

                <Flex justify="center" align="center" gap="xl" direction={{ base: 'column', sm: 'row' }} mt={50}>
                    <div style={{ textAlign: "center" }}>
                        <Group justify="center">
                            <Image src={createUserIcon} alt="Sign Up Icon" width={60} height={60} />
                        </Group>
                        <Text className={classes.subTitle} size="xl" mt="md">
                            Sign Up
                        </Text>
                        <Text size="m" mt="sm">
                            Create your profile and join the SkillEx community.
                        </Text>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Group justify="center">
                        <Image src={addSkillIcon} alt="Sign Up Icon" width={60} height={60} />
                        </Group>
                        <Text className={classes.subTitle}  size="xl" mt="md">
                        Add Your Skills
                        </Text>
                        <Text size="m" mt="sm">
                        List the skills you can share with others.
                        </Text>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Group justify="center">
                        <Image src={searchSkillsIcon} alt="Sign Up Icon" width={60} height={60} />
                        </Group>
                        <Text  className={classes.subTitle}  size="xl" mt="md">
                        Explore Skills
                        </Text>
                        <Text  size="m" mt="sm">
                        Browse services offered by the community.
                        </Text>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Group justify="center">
                        <Image src={exchangeSkillsIcon} alt="Sign Up Icon" width={60} height={60} />
                        </Group>
                        <Text className={classes.subTitle}  size="xl" mt="md">
                        Request & Exchange
                        </Text>
                        <Text size="m" mt="sm">
                        Use tokens to request services or propose exchanges.
                        </Text>
                    </div>

                </Flex>

            </Container>
        </div>
    )
}

export default HowItWorks