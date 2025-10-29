import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import GlobalBackground from "./components/GlobalBackground";
import Why from "./components/Why";
import Pricing from "./components/Pricing";
// import Collaborate from "./components/Collaborate";
// import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <GlobalBackground />
      <Navbar />
      <Hero />
      <Services />
      <Why />
      <Pricing />
      {/* <Collaborate /> */}
      {/* <FAQ /> */}
      <Footer />
    </>
  );
}

export default App;
