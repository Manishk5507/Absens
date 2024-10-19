import MissingTextPortion from "./MissingTextPortion";
import MissingPersonCard from "./MissingPersonCard.jsx";
import CallToAction from "./CallToAction.jsx";
import { useState, useEffect } from "react";

// const people = [
//   {
//     name: "Bernadette Cooper",
//     missingSince: "10th January 1993",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/e979a0cd-f6a2-4e13-a689-1ab52da90bdb/bernadette-cooper3.jpg?format=750w", // Update with actual image paths or URLs
//   },
//   {
//     name: "Chad Gibson",
//     missingSince: "19th December 2015",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/6ed0e7e7-fdc0-4209-a134-36b4deb22d24/chad-gibson4.jpg?format=1000w",
//   },
//   {
//     name: "Charles Horvath-Allan",
//     missingSince: "26th May 1989",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/1045b00f-7b7c-4ab3-9fd4-4fb06c419003/charles-horvath-allan-4.jpg?format=750w",
//   },
//   {
//     name: "Damien Nettles",
//     missingSince: "2nd November 1996",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/678aa904-e400-4057-888a-6205002017c9/damien-nettles3.jpg?format=500w",
//   },
//   {
//     name: "Bernadette Cooper",
//     missingSince: "10th January 1993",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/e979a0cd-f6a2-4e13-a689-1ab52da90bdb/bernadette-cooper3.jpg?format=750w",
//   },
//   {
//     name: "Chad Gibson",
//     missingSince: "19th December 2015",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/6ed0e7e7-fdc0-4209-a134-36b4deb22d24/chad-gibson4.jpg?format=1000w",
//   },
//   {
//     name: "Charles Horvath-Allan",
//     missingSince: "26th May 1989",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/1045b00f-7b7c-4ab3-9fd4-4fb06c419003/charles-horvath-allan-4.jpg?format=750w",
//   },
//   {
//     name: "Damien Nettles",
//     missingSince: "2nd November 1996",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/652941e4ded5083ad0eb3e40/678aa904-e400-4057-888a-6205002017c9/damien-nettles3.jpg?format=500w",
//   },
// ];

const Cases = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reportMissing/getAll`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data",data);
        setPeople(data);
      });
  }, []);

  return (
    <div>
      <MissingTextPortion />
      <div className="bg-black py-16 px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map((person, index) => (
            <MissingPersonCard
              key={index}
              name={person.name}
              id={person._id}
              identity={person.identity}
              image={person.images.urls[0]}
            />
          ))}
        </div>
      </div>
      <CallToAction />
    </div>
  );
};

export default Cases;
