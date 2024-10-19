import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const MissingPersonCard = ({ id, image = "", name = "", identity = "" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    console.log(id);
    let url = "";
    if (identity === "Report") {
      url = "reportMissing";
    } else {
      url = "findMissing";
    }

    setLoading(true);
    // console.log(`${import.meta.env.VITE_BACKEND_URL}/api/${url}/get/${id}`)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/${url}/get/${id}`
      );
      if (!response.ok) {
        toast.error("Error fetching details. Please try again.");
        return;
      }
      const data = await response.json();
      // console.log("=====================",data);
      // Navigate to the show details page with the fetched data
      navigate("/cases/showDetails", { state: { data: data } });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md overflow-hidden text-center p-8">
      <img src={image} alt={name} className="w-full h-60 object-cover" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2 text-black">{name}</h2>
        <p className="text-gray-600 mb-4"> Identity: {identity}</p>
        <button
          type="button"
          onClick={handleOnClick}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          {loading ? "Loading..." : "Learn More"}
        </button>
      </div>
    </div>
  );
};

export default MissingPersonCard;
