import './App.css'
import {Routes, Route} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsAnon from "./components/IsAnon"
import IsPrivate from "./components/IsPrivate"
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import AddSkills from './components/AddSkills';
import SkillDetails from './pages/SkillDetails';
import UserProfile from './pages/UserProfile';
import AllSkills from './pages/AllSkills';
import { MantineProvider, createTheme} from '@mantine/core';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import AllUsers from './pages/AllUsers';

const myColor= [
  '#e2fff7',
  '#cdfff0',
  '#9cffdf',
  '#67ffcd',
  '#40febf',
  '#29ffb5',
  '#00e39a',
  '#00c987',
  '#00ae72'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});


function App() {
  

  return (
    <MantineProvider theme={theme}>
    <div className='App'>
    <Navbar />

    <Routes>
      <Route path="/" element={ <LandingPage/> } />
      <Route path="/dashboard" element={ <IsPrivate><UserDashboard/></IsPrivate> }/>
      <Route path="/dashboard/addskill" element={ <IsPrivate> <AddSkills/> </IsPrivate> } />
      <Route path="/skills/:skillId" element={ <IsPrivate> <SkillDetails/> </IsPrivate> } />
      <Route path="/users/:userId" element={<IsPrivate><UserProfile/></IsPrivate>} />
      <Route path="/skills" element={<IsPrivate><AllSkills/></IsPrivate>} />
      <Route path="/signup" element={ <IsAnon> <SignupPage/> </IsAnon> }/>
      <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />
      <Route path="/home" element={<IsPrivate><Homepage/></IsPrivate>} />
      <Route path="/users" element={<IsPrivate><AllUsers/></IsPrivate>}/>
   </Routes>

    </div>
    </MantineProvider>
    
  )
}

export default App
