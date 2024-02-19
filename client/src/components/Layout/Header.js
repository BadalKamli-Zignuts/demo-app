import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useLikes } from "../../context/Likes";

// Header component for the navigation bar
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [likes] = useLikes();

  // Logout function
  const handleLogout = () => {
    // Clearing user information and token from authentication context
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    // Removing authentication data from local storage
    localStorage.removeItem("auth");

    // Displaying success message
    toast.success("Logout Successfully");
  };

  // JSX structure for the Header component
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Logo Link */}
        <Link to="/" className="navbar-brand">
        <img src="../images/Logo.png" style={{ width: "40px" }} alt="" />
          Apna Bazaar
        </Link>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Search Input */}
            <li className="nav-item">
              <SearchInput />
            </li>

            {/* Home Link */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/categories`}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Authentication Links */}
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <div className="nav-item dropdown">
                {/* User Dropdown */}
                <NavLink
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>

                {/* Admin and User Dropdown Menus */}
                {auth?.user?.role === 1 ? (
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* Likes Link */}
            <li className="nav-item">
              <NavLink to="/likes" className="nav-link">
                Liked ({likes?.length})
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Exporting the Header component
export default Header;
