import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/HomePageStyles.css";
import { useLikes } from "../context/Likes";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  // Hooks for state and navigation
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [likes, setLikes] = useLikes();

  // Fetch products when the category slug changes
  useEffect(() => {
    if (params?.slug) {
      getProductsByCategory();
    }
  }, [params?.slug]);

  // Function to fetch products based on category
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        {/* Category Header */}
        <h1 className="text-center mb-4">Category - {category?.name}</h1>
        {/* Number of results */}
        <h6 className="text-center">{products?.length} result(s) found </h6>
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
                      <p className="col-md-6 card-title my-3">
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

export default CategoryProduct;
