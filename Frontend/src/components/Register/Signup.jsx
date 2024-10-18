import { useState } from "react";
import { Link } from "react-router-dom";





const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   console.log(formData);
  };

  return (
    <div className="bg-gray-50 font-[sans-serif] min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign Up
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User name
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  className={`w-full text-gray-800 text-sm border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 rounded-md outline-blue-600`}
                  placeholder="Enter user name"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className={`w-full text-gray-800 text-sm border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 rounded-md outline-blue-600`}
                  placeholder="Enter user email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className={`w-full text-gray-800 text-sm border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 rounded-md outline-blue-600`}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  {/* <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label> */}
                </div>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign up
                </button>
              </div>

              <p className="text-gray-800 text-sm !mt-8 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
