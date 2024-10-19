import { useLocation } from "react-router-dom";
import { useState } from "react";

function Showdetails() {
  const [report, setReport] = useState({});
  const location = useLocation();
  const { data } = location.state || {};
  setReport(data);
  return (
    <div className="container mx-auto px-4 text-black">
      <h1 className="text-2xl font-bold my-4">Missing Reports</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div key={report._id} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">{report ? report.name : ""}</h2>
          <p>
            <strong>Age:</strong> {report ? report.age : ""}
          </p>
          <p>
            <strong>Gender:</strong> {report ? report.gender : ""}
          </p>
          <p>
            <strong>Height:</strong> {report ? report.height : "0"} cm
          </p>
          <p>
            <strong>Weight:</strong> {report ? report.weight : "0"} kg
          </p>
          <p>
            <strong>Hair Color:</strong> {report? report.hairColor: "Black"}
          </p>
          <p>
            <strong>Eye Color:</strong> {report?report.eyeColor: "Black"}
          </p>
          <p>
            <strong>When Found:</strong>{" "}
            {new Date(report?report.whenFound: "" ).toLocaleDateString()}
          </p>
          <p>
            <strong>Where Found:</strong> {report?report.whereFound: ""}
          </p>
          <p>
            <strong>Additional Info:</strong> {report?report.additionalInfo: ""}
          </p>
          {report && report.image && (
            <img
              src={report.image}
              alt={report.name}
              className="mt-2 w-full h-48 object-cover rounded-lg"
            />
          )}
          <p
            className={`mt-2 font-semibold text-${
              report.status === "Verified"
                ? "green"
                : report.status === "Resolved"
                ? "blue"
                : "red"
            }-600`}
          >
            Status: {report?report.status: "pending"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Showdetails;
