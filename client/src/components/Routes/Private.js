import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

// PrivateRoute component to protect routes accessible only to authenticated users
export default function PrivateRoute() {
  // State to determine if the user is authenticated
  const [ok, setOk] = useState(false);

  // Accessing authentication context
  const [auth, setAuth] = useAuth();

  // useEffect hook to check user authentication status
  useEffect(() => {
    const authCheck = async () => {
      try {
        // Making a request to the server to check user authentication
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
        );

        // If the response indicates user authentication is successful, set 'ok' to true
        if (res.data.ok) {
          setOk(true);
        } else {
          // If not authenticated as a user, set 'ok' to false
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
        // Handle error if there is an issue with the authentication check
        setOk(false);
      }
    };

    // Check user authentication only if a valid token exists
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]); // Trigger the effect when the auth token changes

  // Render the nested routes (Outlet) if authenticated as a user, otherwise show a Spinner
  return ok ? <Outlet /> : <Spinner />;
}
