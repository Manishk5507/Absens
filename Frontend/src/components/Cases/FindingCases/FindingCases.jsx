import MissingPersonCard from "../MissingPersonCard.jsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function FindingCases() {
  const [people, setPeople] = useState([]);

  const location = useLocation();
  const { data } = location.state || {};
  setPeople(data);

  return (
    <div>
      <div className="bg-black py-16 px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map((person, index) => (
            <MissingPersonCard
              key={index}
              name={person.name}
              missingSince={person.missingSince}
              image={person.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindingCases;
