import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

// AdminRoute component to protect routes accessible only to admin users
export default function AdminRoute() {
  // State to determine if the user is authenticated as an admin
  const [ok, setOk] = useState(false);

  // Accessing authentication context
  const [auth] = useAuth();

  // useEffect hook to check admin authentication status
  useEffect(() => {
    const authCheck = async () => {
      try {
        // Making a request to the server to check admin authentication
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
        );

        // If the response indicates admin authentication is successful, set 'ok' to true
        if (res.data.ok) {
          setOk(true);
        } else {
          // If not authenticated as admin, set 'ok' to false
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking admin authentication:", error);
        // Handle error if there is an issue with the authentication check
        setOk(false);
      }
    };

    // Check admin authentication only if a valid token exists
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]); // Trigger the effect when the auth token changes

  // Render the nested routes (Outlet) if authenticated as admin, otherwise show a Spinner
  return ok ? <Outlet /> : <Spinner path="" />;
}
