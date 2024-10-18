import About from "./About.jsx";
import Hero from "./Hero.jsx";
import Search from "./Search.jsx";
import Vision from "./Vision.jsx";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Vision />
      <Search />
      <About />
    </div>
  );
};

export default LandingPage;
