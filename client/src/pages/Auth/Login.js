import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

// Login component
const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Accessing authentication context
  const [auth, setAuth] = useAuth();

  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to the server
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      
      // Handling successful login
      if (res && res.data.success) {
        // Display success message
        toast.success(res.data && res.data.message);

        // Updating authentication context with user information and token
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        // Storing authentication data in local storage
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Navigating to the previous or home page
        navigate(location.state || "/");
      } else {
        // Displaying error message if login fails
        toast.error(res.data.message);
      }
    } catch (error) {
      // Handling login failure due to incorrect email or password
      toast.error("Incorrect Email or Password");
    }

    // Clearing email and password fields after form submission
    setEmail('');
    setPassword('');
  };

  // JSX structure for the Login component
  return (
    <Layout title="Login - Ecommerce App">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <form
              onSubmit={handleSubmit}
              className="auth-form p-4 bg-white rounded"
            >
              <h2 className="text-center mb-5">Login</h2>
              <div className="mb-3">
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
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary text-white w-100"
              >
                Login
              </button>
              <div className="text-center mt-3">
                <p>
                  New to Apna Bazaar?{" "}
                  {/* Link to the registration page */}
                  <NavLink to={"/register"}>Register here.</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Exporting the Login component
export default Login;
