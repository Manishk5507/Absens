import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const MissingPersonCard = ({ id, image = "", name = "", missingSince = "" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reportMissing/get/${id}`);
      if (!response.ok) {
        toast.error("Error fetching details. Please try again.");
        return;
      }
      const data = await response.json();
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
        <p className="text-gray-600 mb-4">Missing Since: {missingSince}</p>
        <button
          type="button"
          onClick={handleOnClick}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          {loading ? "Loading..." : "Learn More"}
        </button>
      </div>
    </div>
  );
};

export default MissingPersonCard;
