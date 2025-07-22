
import Contact from "../components/contact/Contact"
import Footer from "../components/footer/Footer"
import Hero from "../components/home/Hero"
import Navbar from "../components/nav/Navbar"


const LandingPage = () => {
  return (
    <div>
       <Navbar/>
       <Hero />
       <Contact/>
       <Footer/>
       
    </div>
  )
}

export default LandingPage