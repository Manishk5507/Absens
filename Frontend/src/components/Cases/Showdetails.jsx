import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Showdetails() {
  const [report, setReport] = useState({});
  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log("data", data);
      const info = data.report || data;
      console.log("info: ",info.images.urls[0]);
      setReport(info);
    }
  }, [data]);

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold text-center mb-6">Missing Reports</h1>
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg p-6">
        {/* Details Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            {report?.name || "Unknown"}
          </h2>
          <div className="space-y-2">
            <p className="my-8 border-b-2 ">
              <strong>Age:</strong> {report?.age || "N/A"}
            </p>
            <p className="my-8 border-b-2 ">
              <strong>Gender:</strong> {report?.gender || "N/A"}
            </p>
            <p className="my-8 border-b-2 ">
              <strong>Height:</strong> {report?.height || "0"} cm
            </p>
            <p className="my-8 border-b-2 ">
              <strong>Weight:</strong> {report?.weight || "0"} kg
            </p>
            <p className="my-8 border-b-2 ">
              <strong>Hair Color:</strong> {report?.hairColor || "Black"}
            </p>
            <p className="my-8 border-b-2 ">
              <strong>Eye Color:</strong> {report?.eyeColor || "Black"}
            </p>
            {report?.relationshipWithMissing && (
              <p className="my-8 border-b-2 ">
                <strong>Relationship:</strong> {report.relationshipWithMissing}
              </p>
            )}
            {report?.lastSeenDate && (
              <p className="my-8 border-b-2 ">
                <strong>Last Seen Date:</strong>{" "}
                {new Date(report.lastSeenDate).toDateString()}
              </p>
            )}
            {report?.lastSeenLocation && (
              <p className="my-8 border-b-2 ">
                <strong>Last Seen Location:</strong> {report.lastSeenLocation}
              </p>
            )}
            {report?.whenFound && (
              <p className="my-8 border-b-2 ">
                <strong>When Found:</strong>{" "}
                {new Date(report.whenFound).toDateString()}
              </p>
            )}
            {report?.whereFound && (
              <p className="my-8 border-b-2 ">
                <strong>Where Found:</strong> {report.whereFound}
              </p>
            )}
            <p className="my-8 border-b-2 ">
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
        <div className="flex-1">
          {report?.images ? (
            <img
              src={report.images.urls[0]}
              alt={report.name}
              className="w-[70%] h-[70%] object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-auto max-h-80 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search Person
          </button>
        </div>

    </div>
  );
}

export default Showdetails;
