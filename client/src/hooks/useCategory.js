import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook for fetching categories
export default function useCategory() {
  // State to store the fetched categories
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from the API
  const getCategories = async () => {
    try {
      // Making a GET request to retrieve categories
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);

      // Setting the fetched categories in the state
      setCategories(data?.category);
    } catch (error) {
      // Logging any errors that occur during the API request
      console.log(error);
    }
  };

  // useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    getCategories();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  // Returning the fetched categories
  return categories;
}
