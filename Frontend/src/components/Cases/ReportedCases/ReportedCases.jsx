import { useState, useEffect } from "react";
import MissingPersonCard from "../MissingPersonCard.jsx";
import { toast } from "react-toastify";

function ReportedCases() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/reportMissing/getAll`
        );
        if (!response.ok) {
          toast.error("Error fetching data", {
            position: "bottom-right",
            autoClose: 3000,
          });
          return;
        }
        const result = await response.json();
        setPeople(result); // Assuming your API returns an array of people
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data from API when the component mounts
    fetchPeopleData();
  }, []);

  return (
    <div>
      <div className="bg-black py-16 px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.length > 0 ? (
            people.map((person, index) => (
              <MissingPersonCard
                key={index}
                name={person.name}
                missingSince={person.missingSince}
                image={person.images.urls[0]}
              />
            ))
          ) : (
            <p className="text-white text-center">No missing persons found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportedCases;
