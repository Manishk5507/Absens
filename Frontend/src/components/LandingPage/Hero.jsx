import HeroPageImage from "../../assets/main.jpg"; // Make sure this path is correct

const Hero = () => {
  return (
    <div
      className="relative h-screen flex items-center justify-center text-center bg-fixed bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${HeroPageImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="z-10">
        <h1 className="text-5xl font-bold text-white mb-4"> THE MISSING</h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          A missing person is anyone whose whereabouts are not known and who is
          being sought by another person or other persons.
        </p>
      </div>
    </div>
  );
};

export default Hero;
