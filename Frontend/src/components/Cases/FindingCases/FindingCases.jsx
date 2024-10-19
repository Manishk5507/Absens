import MissingPersonCard from "../MissingPersonCard.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { useAuth } from "../../../context/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";

function FindingCases() {
  const [people, setPeople] = useState([]);
  // const { user } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchPeopleData = async () => {
      // if (!user) {
      //   toast.error("You need to login first", {
      //     position: "bottom-right",
      //     autoClose: 3000,
      //   });
      //   navigate(`/login`);

      //   return;
      // }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/findMissing/getAll`
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
          {people.map((person, index) => (
            <MissingPersonCard
              key={index}
              id={person._id}
              identity={person.identity}
              name={person.name}
              missingSince={person.missingSince}
              image={person.images.urls[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindingCases;
