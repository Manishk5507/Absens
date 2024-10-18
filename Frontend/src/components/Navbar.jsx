import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import ABSENSLOGO from "../assets/absens.png";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user,setUser } = useAuth();

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      // Send a request to the logout endpoint
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {
          withCredentials: true,
        }
      );

      // Check if logout was successful
      if (response.status === 200) {
        localStorage.removeItem("token");
        // console.log("Logout successful");
        setDropdownOpen(false);
        setSidebarOpen(false);
        setUser(null);

        toast.success("User logged out successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });

        navigate("/");
      } else {
        console.log("Some error occured during logout");
        toast.error("An error occurred while logging out.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Handle error during logout
      console.error("Logout error:", error);
      toast.error(error.message || "An error occurred while logging out.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <nav className="bg-white shadow-md transition-all duration-300 ease-in-out mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out">
              {/* Logo Section */}
              <NavLink
                to="/"
                className="flex items-center transition-all duration-300 ease-in-out"
              >
                <img
                  src={ABSENSLOGO}
                  alt="Logo"
                  className="h-32 mb-4 w-auto transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <span className="text-xl font-semibold text-gray-800 ml-2 transition-all duration-300 ease-in-out"></span>
              </NavLink>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleSidebar}
                type="button"
                className="text-gray-800 hover:text-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
              >
                <svg
                  className="h-8 w-8 transition-all duration-300 ease-in-out"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>

            {/* Full Menu for Larger Screens */}
            <div className="hidden md:flex space-x-8 transition-all duration-300 ease-in-out">
              <NavLink
                to="/aboutUs"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                ABOUT US
              </NavLink>
              <NavLink
                to="/cases"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                CASES
              </NavLink>
              <NavLink
                to="/report-the-missing"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                REPORT THE MISSING
              </NavLink>
              <NavLink
                to="/find-the-missing"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                FIND THE MISSING
              </NavLink>
              <NavLink
                to="/rules"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                RULES & REGULATIONS
              </NavLink>
            </div>

            {/* Login Section */}
            <div className="hidden md:flex items-center relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-800 hover:text-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
              >
                <span className="sr-only">Log in</span>
                <svg
                  className="h-6 w-6 transition-all duration-300 ease-in-out hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A12.042 12.042 0 0112 14c2.076 0 4.044.519 5.879 1.449m1.998 2.347A11.961 11.961 0 0012 22a11.961 11.961 0 01-7.879-2.8M15 11a3 3 0 10-6 0 3 3 0 006 0z"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-40 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-2">
                    {user !== null ? (
                      <>
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)} // Close dropdown on click
                        >
                          My Profile
                        </NavLink>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <NavLink
                        to="/register"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)} // Close dropdown on click
                      >
                        LOGIN/SIGNUP
                      </NavLink>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="bg-white w-64 h-full shadow-lg transition-all duration-300 ease-in-out">
            <div className="flex justify-between p-4">
              <h2 className="text-xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
                Menu
              </h2>
              <button
                onClick={toggleSidebar}
                type="button"
                className="text-gray-800 hover:text-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
              >
                <svg
                  className="h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <NavLink
                to="/aboutUs"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                ABOUT US
              </NavLink>
              <NavLink
                to="/report-the-missing"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                REPORT THE MISSING
              </NavLink>
              <NavLink
                to="/find-the-missing"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                FIND THE MISSING
              </NavLink>
              <NavLink
                to="/rules"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold transition-transform transform scale-105"
                    : "text-gray-800"
                }
              >
                RULES & REGULATIONS
              </NavLink>
              {user !== null ? (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold transition-transform transform scale-105"
                      : "text-gray-800"
                  }
                >
                  PROFILE
                </NavLink>
              ) : (
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold transition-transform transform scale-105"
                      : "text-gray-800"
                  }
                >
                  REGISTER
                </NavLink>
              )}
              {user !== null ? (
                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold transition-transform transform scale-105"
                      : "text-gray-800"
                  }
                >
                  LOGOUT
                </NavLink>
              ) : (
                ""
              )}
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
