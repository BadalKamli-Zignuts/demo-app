import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import "../styles/CategoriesStyles.css";

const Categories = () => {
  // Fetch categories using the custom hook
  const categories = useCategory();

  return (
    // Render the layout with a specific title
    <Layout title={"All Categories"}>
      <div className="categories-container">
        {/* Heading for the category section */}
        <h1 className="text-center mb-5">Explore Our Categories</h1>
        <div className="category-buttons-container">
          {/* Map through categories and create buttons for each */}
          {categories.map((c) => (
            <div className="category-button" key={c._id}>
              {/* Link to individual category pages */}
              <Link to={`/category/${c.slug}`} className="btn category-link">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
