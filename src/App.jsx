import './App.css'
import {Routes, Route} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsAnon from "./components/IsAnon"
import IsPrivate from "./components/IsPrivate"
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import EditProfile from './components/EditProfile';
import AddSkills from './components/AddSkills';
import SkillDetails from './pages/SkillDetails';
import UserProfile from './pages/UserProfile';
import AllSkills from './pages/AllSkills';



function App() {
  

  return (
    <div className='App'>
    <Navbar />

    <Routes>
      <Route path="/" element={ <LandingPage/> } />
      <Route path="/dashboard" element={ <IsPrivate><UserDashboard/></IsPrivate> }/>
      <Route path="/dashboard/editprofile" element={<IsPrivate> <EditProfile/> </IsPrivate>  }/>
      <Route path="/dashboard/addskill" element={ <IsPrivate> <AddSkills/> </IsPrivate> } />
      <Route path="/skills/:skillId" element={ <IsPrivate> <SkillDetails/> </IsPrivate> } />
      <Route path="/users/:userId" element={<IsPrivate><UserProfile/></IsPrivate>} />
      <Route path="/skills" element={<IsPrivate><AllSkills/></IsPrivate>} />
      <Route path="/signup" element={ <IsAnon> <SignupPage/> </IsAnon> }/>
      <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />

    </Routes>

    </div>
  )
}

export default App
