import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Your backend URL

  // Function to check if the user is authenticated
  const checkAuthentication = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/users/isAuthenticated`, { withCredentials: true });
      // console.log(response.data);
      if (response.data.isAuthenticated) {
        setUser(response.data.user); // Set the user data from the backend
      } else {
        setUser(null); // Clear the user data if not authenticated
      }

      try {
          const response = await axios.get(
            `${import.meta.env.VITE_FACE_RECOGNITION}`
          );
          console.log(response);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }


    } catch (error) {
      console.error("Error checking authentication:", error);
      setUser(null); // Clear the user data on error
    }
  };
  useEffect(() => {
    checkAuthentication();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const login = (username, email, userId) => {
  //   setUser({ username, email, userId });
  // };

  // const signup = (username, email, userId) => {
  //   setUser({ username, email, userId });
  // };

  // const logout = () => {
  //   setUser(null);
  // };

  // const isLoggedIn = () => {
  //   return user !== null;
  // };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
