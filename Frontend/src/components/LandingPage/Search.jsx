import { useEffect, useState } from "react";
import FindImage from "../../assets/find.jpg";

const Search = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-gray-600 to-gray-900 text-white min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${FindImage})` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent transition duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          HELP US REUNITE LOST PEOPLE
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
          Use our AI-powered platform to search for missing people. Upload photos of your lost loved ones. If someone uploads a matching photo, our system will show all matches with over 50% similarity.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
          UPLOAD A PHOTO
        </button>
      </div>
    </section>
  );
};

export default Search;
