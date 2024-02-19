import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useLikes } from "../context/Likes";
import toast from "react-hot-toast";
import "../styles/HomePageStyles.css"
import { useNavigate } from "react-router-dom";

const Search = () => {
  // Get search values from context and navigation hook
  const [values] = useSearch();
  const navigate = useNavigate();
  const [likes, setLikes] = useLikes();

  return (
    <Layout title={"Search results"}>
      <div className="container pt-4">
        
        {/* Page Title */}
          <h1 text-center mb-4>Search Results</h1>
          <h6>
            {/* Display number of search results */}
            {values?.results.length < 1
              ? "No Products Found"
              : `${values?.results.length} result(s) found`}
          </h6>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* Display each search result as a card */}
            {values?.results.map((p) => (
              <div key={p._id} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    {/* Product Image */}
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top product-image bg-light p-2"
                      alt={p.name}
                    />

                    {/* Product Details */}
                    <div className="row">
                      <div className="mx-4">
                        <h5 className="col-md-6 card-title my-3">{p.name}</h5>
                        <p className="col-md-6 card-title my-3 ">
                          {" "}
                          <b>Rs. {p.price}</b>{" "}
                        </p>
                      </div>
                    </div>
                    <p className="card-text mx-4 text-secondary">
                      Product Details: {p.description.substring(0, 20)}...
                    </p>
                    {/* Card Footer with Buttons */}
                    <div className="card-footer text-center bg-white">
                      {/* View Details Button */}
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        View Details
                      </button>

                      {/* Like Button */}
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setLikes([...likes, p]);
                          localStorage.setItem(
                            "likes",
                            JSON.stringify([...likes, p])
                          );
                          toast.success("Added to liked");
                        }}
                      >
                        Like👍
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      
      </div>
    </Layout>
  );
};

export default Search;
