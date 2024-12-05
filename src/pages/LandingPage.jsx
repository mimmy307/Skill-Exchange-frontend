import Footer from "../components/Footer"
import Header from "../components/Header"
import HowItWorks from "../components/HowItWorks"
import './LandingPage.css'



function LandingPage(){
    return(
        <div className="landing-page-container">
            <Header />
            <HowItWorks/>
            <Footer/>
       </div>
       
    )
}

export default LandingPage