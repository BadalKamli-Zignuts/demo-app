import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Spinner component with countdown and automatic redirection
const Spinner = ({ path = "login" }) => {
  // State to store the countdown value
  const [count, setCount] = useState(5);

  // Navigation hook for redirection
  const navigate = useNavigate();

  // Location hook to get the current pathname
  const location = useLocation();

  // useEffect hook to handle countdown and redirection
  useEffect(() => {
    // Set up an interval to decrement the countdown every second
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    // Redirect to the specified path when the countdown reaches 0
    count === 0 &&
      navigate(`${path}`, {
        state: location.pathname,
      });

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  // JSX structure for the Spinner component
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">Redirecting to you in {count} second(s)</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

// Exporting the Spinner component
export default Spinner;
