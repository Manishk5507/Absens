import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MissingPersonCard from "./MissingPersonCard";

function Showdetails() {
  const [report, setReport] = useState({});
  const location = useLocation();
  const { data } = location.state || {};
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const info = data.report || data;
      setReport(info);
    }
  }, [data]);

  const handleSearch = async (id, lastSeenDate) => {
    let searchopt = lastSeenDate === undefined ? "report" : "find";
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_FACE_RECOGNITION}/${searchopt}/search`,
        {
          unique_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSearchedData(response.data.best_match);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 text-black">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Missing Reports
      </h1>
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg p-8">
        {/* Details Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {report?.name || "Unknown"}
          </h2>
          <div className="space-y-4">
            <p>
              <strong>Age:</strong> {report?.age || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {report?.gender || "N/A"}
            </p>
            <p>
              <strong>Height:</strong> {report?.height || "0"} cm
            </p>
            <p>
              <strong>Weight:</strong> {report?.weight || "0"} kg
            </p>
            <p>
              <strong>Hair Color:</strong> {report?.hairColor || "Black"}
            </p>
            <p>
              <strong>Eye Color:</strong> {report?.eyeColor || "Black"}
            </p>
            {report?.relationshipWithMissing && (
              <p>
                <strong>Relationship:</strong> {report.relationshipWithMissing}
              </p>
            )}
            {report?.lastSeenDate && (
              <p>
                <strong>Last Seen Date:</strong>{" "}
                {new Date(report.lastSeenDate).toLocaleDateString()}
              </p>
            )}
            {report?.lastSeenLocation && (
              <p>
                <strong>Last Seen Location:</strong> {report.lastSeenLocation}
              </p>
            )}
            {report?.whenFound && (
              <p>
                <strong>When Found:</strong>{" "}
                {new Date(report.whenFound).toLocaleDateString()}
              </p>
            )}
            {report?.whereFound && (
              <p>
                <strong>Where Found:</strong> {report.whereFound}
              </p>
            )}
            <p>
              <strong>Additional Info:</strong>{" "}
              {report?.additionalInfo || "N/A"}
            </p>
          </div>
          <p
            className={`mt-4 font-semibold text-${
              report.status === "Verified"
                ? "green"
                : report.status === "Resolved"
                ? "blue"
                : "red"
            }-600`}
          >
            Status: {report?.status || "Pending"}
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center">
          {report?.images ? (
            <img
              src={report.images.urls[0]}
              alt={report.name}
              className="w-[50%] h-[100%] max-h-80 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all duration-200"
          onClick={() => handleSearch(report.unique_id, report?.lastSeenDate)}
        >
          Search Person
        </button>
      </div>

      {searchedData.length > 0 && (
        <div className="mt-12 bg-gray-800 text-white py-12 px-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-12 text-indigo-300">
            Best Matches
          </h1>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchedData.map((person, index) => (
              <MissingPersonCard
                key={index}
                identity={person.identity}
                id={person._id}
                name={person.name}
                missingSince={person?.lastSeenDate || person?.whenFound}
                image={person.images.urls[0]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Showdetails;
