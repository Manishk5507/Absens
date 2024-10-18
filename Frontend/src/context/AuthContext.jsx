import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
