import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";

const ReportMissing = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
    whenFound: "",
    whereFound: "",
    additionalInfo: "",
    image: null,
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to login first", {
        position: "bottom-right",
        autoClose: 3000,
      });
      navigate(`/login`);
      return;
    }
    const confirm = window.confirm("Do you accept the terms and conditions?");
    if (!confirm) {
      return;
    }
    const data = {
      ...formData,
      user: user._id,
      image: formData.image ? formData.image.name : "",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reportMissing/add/${user._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      // Check for a successful response
      toast.success(
        "Your reportedCase has been listed successfully! Now, you can search in our database for matches.",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );

  
      // response.data.comingFrom = "ReportMissing";

      setTimeout(() => {
        navigate("/cases/showDetails", { state: { data: response.data } });
      }, 3000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error(
        "An error occurred while submitting your search. Please try again."
      );
    }
  };

  return (
    <div className="mt-8 mb-8 text-black">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 sm:p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Report Missing Person
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label
              htmlFor="name"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Missing Person Name
            </label>
            <input
              name="name"
              id="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="age"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Age
            </label>
            <input
              name="age"
              id="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="gender"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              required
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label
              htmlFor="whenFound"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              When Found?
            </label>
            <input
              name="whenFound"
              id="whenFound"
              type="date"
              onChange={handleChange}
              required
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="height"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Height
            </label>
            <input
              name="height"
              id="height"
              placeholder='Height (e.g., 5&#39;7")'
              onChange={handleChange}
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="weight"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Weight
            </label>
            <input
              name="weight"
              id="weight"
              placeholder="Weight (e.g., 150 lbs)"
              onChange={handleChange}
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="hairColor"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Hair Color
            </label>
            <input
              name="hairColor"
              id="hairColor"
              onChange={handleChange}
              placeholder="Hair Color"
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="eyeColor"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Eye Color
            </label>
            <input
              name="eyeColor"
              id="eyeColor"
              onChange={handleChange}
              placeholder="Eye Color"
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="whereFound"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Where Found?
            </label>
            <input
              name="whereFound"
              id="whereFound"
              onChange={handleChange}
              placeholder="Where the person was found"
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="additionalInfo"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Additional Info
            </label>
            <textarea
              name="additionalInfo"
              id="additionalInfo"
              rows="4"
              onChange={handleChange}
              placeholder="Any additional information"
              className="input block h-11 py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            ></textarea>
          </div>
          <div className="form-group">
            <label
              htmlFor="image"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Upload Photo
            </label>
            <input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportMissing;
