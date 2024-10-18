import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const FindMissing = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
    relationshipWithMissing: "",
    lastSeenDate: "",
    lastSeenLocation: "",
    additionalInfo: "",
    image: null,
  });

  const { user } = useAuth();
  const navigate = useNavigate();

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
      image: formData.image ? formData.image.name : "", // send only the image name or an empty string
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/findMissing/add/${user._id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Check for a successful response
        toast.success(
          "Your searching has been listed successfully! Now, you can search in our database for matches.",
          {
            position: "bottom-right",
            autoClose: 3000,
          }
        );

        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      } else {
        // Handle unexpected response status
        toast.error("Failed to submit your search. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error(
        "An error occurred while submitting your search. Please try again."
      );
    }
  };

  return (
    <div className="mt-8 mb-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 sm:p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Find Missing Person
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label
              htmlFor="name"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Full Name of the Missing Person
            </label>
            <input
              name="name"
              id="name"
              placeholder="Full Name of the Missing Person"
              onChange={handleChange}
              required
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="relationshipWithMissing"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Relationship to Missing Person
            </label>
            <input
              name="relationshipWithMissing"
              id="relationshipWithMissing"
              placeholder="Relationship to Missing Person"
              onChange={handleChange}
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
              placeholder="Weight (e.g., 70 kg)"
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
              placeholder="Hair Color"
              onChange={handleChange}
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
              placeholder="Eye Color"
              onChange={handleChange}
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="lastSeenDate"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Last Seen Date
            </label>
            <input
              name="lastSeenDate"
              id="lastSeenDate"
              type="date"
              onChange={handleChange}
              required
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="lastSeenLocation"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Last Seen Location
            </label>
            <input
              name="lastSeenLocation"
              id="lastSeenLocation"
              placeholder="Last Known Location"
              onChange={handleChange}
              required
              className="input block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            />
          </div>
          <div className="form-group sm:col-span-2">
            <label
              htmlFor="additionalInfo"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Additional Details
            </label>
            <textarea
              name="additionalInfo"
              id="additionalInfo"
              placeholder="Additional Details"
              onChange={handleChange}
              className="input h-8 w-full px-2 py-1 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none"
            ></textarea>
          </div>
          <div className="form-group sm:col-span-2">
            <label
              htmlFor="photos"
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
        <div className=" text-center ">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-70  "
          >
            Submit
          </button>
        </div>{" "}
      </form>
    </div>
  );
};

export default FindMissing;
