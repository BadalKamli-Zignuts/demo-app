import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// SearchInput component for handling search functionality
const SearchInput = () => {
  // Accessing search context values and functions
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  // Form submission function for search
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a search request to the server
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );

      // Updating search context with search results
      setValues({ ...values, results: data });

      // Navigating to the search results page
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  // JSX structure for the SearchInput component
  return (
    <div>
      {/* Search form */}
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        {/* Input field for entering search keyword */}
        <input
          type="search"
          className="form-control me-2"
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        {/* Submit button for the search form */}
        <button className="btn btn-dark " type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

// Exporting the SearchInput component
export default SearchInput;
