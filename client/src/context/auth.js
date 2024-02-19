import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Creating a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap the application and provide authentication context
const AuthProvider = ({ children }) => {
  // State to store authentication information (user and token)
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Setting the default Authorization header for axios with the token
  axios.defaults.headers.common["Authorization"] = auth?.token;

  // useEffect to check for authentication data in local storage on component mount
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      // Updating the auth state with user and token from local storage
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  // Providing the authentication context to the children components
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context in components
const useAuth = () => useContext(AuthContext);

// Exporting the useAuth hook and AuthProvider component
export { useAuth, AuthProvider };
