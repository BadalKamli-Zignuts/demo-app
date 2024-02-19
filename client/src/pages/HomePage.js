import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/HomePageStyles.css";
import { useLikes } from "../context/Likes";
import toast from "react-hot-toast";

const HomePage = () => {
  // Hooks for state and navigation
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useLikes();

  // Fetch all products on component mount
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products - Best offers "}>
      <div className="container pt-4">
        {/* Page Title */}
        <h1 className="text-center mb-4">All Products</h1>

        {/* Product Cards */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products?.map((p) => (
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

export default HomePage;
