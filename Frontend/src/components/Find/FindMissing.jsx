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
    images: [],
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: [...files], // Store all selected files
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You need to login first", {
        position: "bottom-right",
        autoClose: 3000,
      });
      navigate(`/login`, { state: { from: "/findMissing" } });
      return;
    }

    const confirm = window.confirm("Do you accept the terms and conditions?");
    if (!confirm) {
      return;
    }

    // Check if at least two images are uploaded
    if (formData.images.length < 2) {
      toast.error("Please upload at least two images.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const formDataToSend = new FormData();
    // Append other form fields
    for (const key in formData) {
      if (key === "images") {
        // Append all images to FormData
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append("images", formData.images[i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    const uploadToastId = toast.info(
      "Please wait while we are uploading your data...",
      {
        position: "bottom-right",
        autoClose: false, // Prevent auto close
      }
    );

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/findMissing/add/${user._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          },
        }
      );

      setTimeout(async () => {
        // console.log(response.data)
        // console.log(response.data.report);
        const id = response.data.report.unique_id;
        try {
          const saveEmbeddingsResponse = await axios.post(
            `${import.meta.env.VITE_FACE_RECOGNITION}/find/saveembeddings`,
            {
              unique_id: id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(saveEmbeddingsResponse);
        } catch (error) {
          console.log(error);
        }
      }, 5000);

      toast.update(uploadToastId, {
        render:
          "Your Searching case has been listed successfully! Now, you can search in our database for matches.",
        type: "success",
        autoClose: 3000,
      });

      // response.data.comingFrom = "FindMissing";

      setTimeout(() => {
        navigate(`/cases/showDetails`, { state: { data: response.data } });
      }, 3000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.update(uploadToastId, {
        render:
          "An error occurred while submitting your search. Please try again.",
        type: "error",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mt-8 mb-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 sm:p-8"
        encType="multipart/form-data"
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
              required
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
              htmlFor="images"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
            >
              Upload Photo
            </label>
            <input
              name="images"
              id="images"
              type="file"
              accept="image/*"
              onChange={handleChange}
              multiple
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
