import React from "react";
import Header from "./Header";

// Layout component that includes the Header and wraps the main content
const Layout = ({ children }) => {
  return (
    <div>
      {/* Include the Header component */}
      <Header />
      
      {/* Main content with a minimum height of 70vh (70% of the viewport height) */}
      <main className="bg-light" style={{ minHeight: "70vh" }}>
        {children}
      </main>
    </div>
  );
};

// Export the Layout component
export default Layout;
