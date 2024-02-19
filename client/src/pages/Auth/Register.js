// Import necessary dependencies
import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Register component
const Register = () => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // Navigation hook
  const navigate = useNavigate();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending registration request to the server
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      // Handling successful registration
      if (res && res.data.success) {
        // Display success message
        toast.success(res.data && res.data.message);
        // Navigate to the login page after successful registration
        navigate("/login");
      } else {
        // Displaying error message if registration fails
        toast.error(res.data.message);
      }
    } catch (error) {
      // Handling registration failure
      toast.error("Failed to Register");
    }
  };

  // JSX structure for the Register component
  return (
    <Layout title="Register - Ecommerce App">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <form onSubmit={handleSubmit} className="auth-form p-4 bg-white rounded">
              <h2 className="text-center mb-5">Register</h2>
              <div className="mb-3">
                {/* Input for Name */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Name"
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                {/* Input for Email */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="mb-3">
                {/* Input for Password */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="mb-3">
                {/* Input for Phone */}
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className="mb-3">
                {/* Input for Address */}
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Address"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary text-white w-100">
                REGISTER
              </button>
              <div className="text-center mt-3">
                <p>
                  {/* Link to the login page */}
                  Already a user? <NavLink to={"/login"}>Login here.</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Exporting the Register component
export default Register;
