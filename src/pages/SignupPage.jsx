import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
  } from '@mantine/core';
  import { API_URL } from "../config";


function SignupPage(props){
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const handleFullName  = (e) => setFullName (e.target.value);
    const handleEmail = (e) => setEmail (e.target.value);
    const handlePassword = (e) => setPassword (e.target.value);

    const handleSignup = async (e) =>{
        e.preventDefault();
        const newUser =  {fullName, email, password};

        try{
            const {data} = await axios.post(
                `${API_URL}/auth/signup`, newUser
            );
            console.log ("successfully signed up", data);
            nav("/login");
        } catch(error){
            console.log(error)
        }
    };

    return(

        <Container size={420} my={40}>
            <Title align="center" mt={100} fw={900}>
                Join SkillEx
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Already have an account?{' '}
                <Anchor style={{ color: '#00E59B' }} size="sm" component="button" onClick={() => nav('/login')}>
                    Login
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleSignup}>
                    <TextInput
                        label="Full Name"
                        required
                        value={fullName}
                        onChange={handleFullName}
                        mt="md"
                    />
                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={handleEmail}
                        mt="md"
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        value={password}
                        onChange={handlePassword}
                        mt="md"
                    />
                    <Button style={{ color: 'black', backgroundColor: '#00E59B' }} fullWidth mt="xl" type="submit">
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Container>
    )

}

export default SignupPage