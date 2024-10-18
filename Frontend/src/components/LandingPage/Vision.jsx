import { useEffect } from "react";

const Vision = () => {
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
    <div className="bg-white py-24 md:py-40 md:px-24 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* HOW FINDR WORKS */}
        <div className="text-center fade-in opacity-0 translate-y-10 transition-all duration-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">WORKING</h3>
          <hr className="mx-auto w-12 border-b-2 border-gray-400 mb-4" />
          <p className="text-gray-600">
            The system essentially performs face recognition or pattern matching
            to search through existing records and identify potential matches.
          </p>
        </div>

        {/* VOLUNTEERING */}
        <div className="text-center fade-in opacity-0 translate-y-10 transition-all duration-700 delay-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            VOLUNTEERING
          </h3>
          <hr className="mx-auto w-12 border-b-2 border-gray-400 mb-4" />
          <p className="text-gray-600">
            Volunteers contribute by uploading photos and information to grow
            Findr’s database. Their involvement accelerates the process of
            identifying and reuniting missing people.
          </p>
        </div>

        {/* OUR COMMUNITY */}
        <div className="text-center fade-in opacity-0 translate-y-10 transition-all duration-700 delay-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            OUR COMMUNITY
          </h3>
          <hr className="mx-auto w-12 border-b-2 border-gray-400 mb-4" />
          <p className="text-gray-600">
            Findr’s community works together to reunite families by contributing
            to the database and sharing crucial information, creating a powerful
            network of support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
