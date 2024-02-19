import React from "react";
import Layout from "../components/Layout/Layout";
import { useLikes } from "../context/Likes";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LikesPage = () => {
  // Hooks for state, authentication, and navigation
  const [likes, setLikes] = useLikes();
  const [auth] = useAuth();
  const navigate = useNavigate();

  // Remove liked product function
  const removeLikedProduct = (pid) => {
    try {
      let myLikes = [...likes];
      let index = myLikes.findIndex((item) => item._id === pid);
      myLikes.splice(index, 1);
      setLikes(myLikes);
      localStorage.setItem("likes", JSON.stringify(myLikes));
      toast.success("Product removed from liked products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            {/* Liked Products Information */}
            <h4 className="text-center">
              {likes?.length > 1
                ? `You have liked ${likes.length} products. ${
                    auth?.token ? "" : "Please Login to view liked products"
                  }`
                : "No Liked Products"}
            </h4>
          </div>
        </div>

        {/* Display Liked Products */}
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {likes?.map((p) => (
              <div className="row card flex-row my-3" key={p._id}>
                {/* Product Image */}
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top product-image bg-light p-2"
                    alt={p.name}
                  />
                </div>

                {/* Product Details */}
                <div className="col-md-8">
                  <div className="row">
                    <h5 className="col-md-6 card-title my-3">{p.name}</h5>
                    <p className="col-md-6 card-title my-3">Rs. {p.price}</p>
                  </div>
                  <p className="card-text">Product Details: {p.description}</p>

                  {/* Card Footer with Buttons */}
                  <div className="card-footer text-center">
                    {/* View Details Button */}
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View Details
                    </button>

                    {/* Remove Like Button */}
                    <button
                      className="btn btn-danger"
                      onClick={() => removeLikedProduct(p._id)}
                    >
                      Remove Like
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LikesPage;
