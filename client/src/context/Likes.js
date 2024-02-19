import { useState, useContext, createContext, useEffect } from "react";

// Creating a context for liked products
const LikesContext = createContext();

// LikesProvider component to wrap the application and provide liked products context
const LikesProvider = ({ children }) => {
  // State to store liked products
  const [likes, setLikes] = useState([]);

  // useEffect to check for existing liked products in local storage on component mount
  useEffect(() => {
    let existingLikes = localStorage.getItem('likes');
    // If existing liked products are found, update the state with them
    if (existingLikes) setLikes(JSON.parse(existingLikes));
  }, []);

  // Providing the liked products context to the children components
  return (
    <LikesContext.Provider value={[likes, setLikes]}>
      {children}
    </LikesContext.Provider>
  );
};

// Custom hook to use the liked products context in components
const useLikes = () => useContext(LikesContext);

// Exporting the useLikes hook and LikesProvider component
export { useLikes, LikesProvider };
