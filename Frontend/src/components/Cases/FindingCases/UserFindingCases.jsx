import { useState, useEffect } from "react";
import MissingPersonCard from "../MissingPersonCard.jsx";
// import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function UserFindingCases() {
  const [people, setPeople] = useState([]);
  const location = useLocation();

  const { data } = location.state || [];

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log("data", data);
      
      setPeople(data);
    }
  }, [data]);

  return (
    <div>
      <div className="bg-black py-16 px-16 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.length > 0 ? (
            people.map((person, index) => (
              <MissingPersonCard
                key={index}
                id={person._id}
                identity={person.identity}
                name={person.name}
                missingSince={person.lastSeenDate}
                image={person.images.urls[0]}
              />
            ))
          ) : (
            <p className="text-white text-center">
              You haven&apos;t find anyone yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFindingCases;
