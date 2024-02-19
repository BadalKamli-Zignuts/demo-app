// Importing necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/Search";
import { LikesProvider } from "./context/Likes";
import "antd/dist/reset.css";

// Creating a React root for concurrent mode (React 18+)
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the main application wrapped with providers
root.render(
  <AuthProvider>
    <SearchProvider>
      <LikesProvider>
        <BrowserRouter>
          {/* Wrapping the entire application with React StrictMode for development checks */}
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </LikesProvider>
    </SearchProvider>
  </AuthProvider>
);

// Reporting web vitals for performance monitoring
reportWebVitals();
