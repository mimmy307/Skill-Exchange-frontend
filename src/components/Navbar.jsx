import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"
import logo from "../assets/Images/Logo.png"
import classes from "../components/Navbar.module.css"
import { Button, Menu, Avatar, Group, Text, UnstyledButton, Burger, rem, useMantineTheme } from "@mantine/core"
import {IconLogout, IconUserCircle, IconLayoutDashboard, IconChevronDown } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import cx from "clsx"




function Navbar(){
    const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
    const theme = useMantineTheme()
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false)

    return(
        <nav className={classes.navbar}>
            <img src={logo} alt="logo" className={classes.logo}/>

            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

            {!isLoggedIn && (
                <div className={classes.loginSignupSection}>
                    <Link to="/login">
                        <Button  
                            variant="outline" 
                            color="#00E59B" 
                            radius="xl" >
                            Log In
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button 
                            variant="filled" 
                            color="#00E59B" 
                            size="sm" 
                            radius="xl"  
                            style={{ color: 'black' }}>
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
            
            {isLoggedIn && (
                <div className={classes.skillsProfileContainer}> 
                    <Link to="/skills"><p>All Skills</p></Link>
                    <Menu 
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                                <Group gap={7}>
                                    <Avatar src={user.profilePic} radius="xl" size={40} />
                                    <Text fw={500} size="sm" lh={1} mr={3} color="white" >
                                        {user.fullName}
                                    </Text>
                                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5}/>
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Link to={`/users/${user._id}`}>
                            <Menu.Item
                                leftSection={
                                    <IconUserCircle 
                                        style={{ width: rem(16), height: rem(16) }}
                                        color={theme.colors.myColor[8]}
                                        stroke={1.5}
                                    />
                                }
                            >
                            My Profile
                            </Menu.Item>
                            </Link>
                            <Link to={`/dashboard`}>
                              <Menu.Item
                                leftSection={
                                    <IconLayoutDashboard 
                                        style={{ width: rem(16), height: rem(16) }}
                                        color={theme.colors.myColor[8]}
                                        stroke={1.5}
                                    />
                                }
                            >
                            Personal Dashboard
                            </Menu.Item>  
                            </Link>
                            
                            <Menu.Divider />
                            <Menu.Item
                                leftSection={
                                    <IconLogout 
                                        style={{ width: rem(16), height: rem(16) }}
                                        color= "red"
                                        stroke={1.5}
                                    />
                                }
                                onClick={logOutUser}
                            >
                                Logout
                            </Menu.Item>

                                
                            

                           
                        </Menu.Dropdown>

                    </Menu>
                    
                </div>
               
            )}

        </nav>
    )
}

export default Navbar