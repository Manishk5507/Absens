import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 fade-in opacity-0 translate-y-10 transition-all duration-700">
          ABOUT ABSENS
        </h2>
        <p className="text-xl md:text-2xl italic text-gray-600 mb-10 fade-in opacity-0 translate-y-10 transition-all duration-700 delay-100">
          An AI-powered platform to help reunite lost people with their loved
          ones.
        </p>

        {/* How We Work Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 fade-in opacity-0 translate-y-10 transition-all duration-700 delay-200">
            How We Work
          </h3>
          <p className="text-md md:text-lg text-gray-700 mb-6 fade-in opacity-0 translate-y-10 transition-all duration-700 delay-300">
            Our platform allows users to upload images of missing individuals
            and compare them with our extensive database. Using advanced AI, any
            photo uploaded to the platform is analyzed for facial matches. If a
            photo already exists in the database and matches more than 50%, we
            show all matching images to increase the chances of reuniting loved
            ones.
          </p>
          <p className="text-md md:text-lg text-gray-700 mb-6 fade-in opacity-0 translate-y-10 transition-all duration-700 delay-400">
            By leveraging cutting-edge technology and user participation, we aim
            to create a safe, reliable, and fast way to help bring missing
            individuals back to their families.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
