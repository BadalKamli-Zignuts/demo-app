import { useState, useContext, createContext } from "react";

// Creating a context for search functionality
const SearchContext = createContext();

// SearchProvider component to wrap the application and provide search context
const SearchProvider = ({ children }) => {
  // State to store search-related data (keyword and results)
  const [searchData, setSearchData] = useState({
    keyword: "",
    results: []
  });

  // Providing the search context to the children components
  return (
    <SearchContext.Provider value={[searchData, setSearchData]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context in components
const useSearch = () => useContext(SearchContext);

// Exporting the useSearch hook and SearchProvider component
export { useSearch, SearchProvider };
