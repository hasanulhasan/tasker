import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
function App() {
  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
      <Navbar/>
      <Hero/>
      <Tasks/>
      <Footer/>
    </div>
  )
}

export default App
