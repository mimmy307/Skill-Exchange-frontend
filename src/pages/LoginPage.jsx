

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
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

const API_URL = "http://localhost:5005";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const nav = useNavigate();
    const { authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginUser = { email, password };

        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, loginUser);
            console.log("Successfully logged in", data);
            localStorage.setItem("authToken", data.authToken);
            await authenticateUser();
            nav("/dashboard"); 
        } catch (error) {
            console.error(error);
            setPasswordError("Invalid password");
        }
    };

    return (
        <Container size={420} my={40}>
            <Title align="center" mt={100} fw={900}>
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor style={{ color: '#00E59B' }} size="sm" component="button" onClick={() => nav('/signup')}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleLogin}>
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
                        error={passwordError}
                    />
                    <Button style={{ color: 'black', backgroundColor: '#00E59B' }} fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default LoginPage;
