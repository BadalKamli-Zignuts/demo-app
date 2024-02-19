import React from "react";
import { NavLink } from "react-router-dom";

// AdminMenu component for displaying links to admin panel options
const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <div className="text-center">
        <div className="list-group">
          <h4 className="mb-4">Admin Panel</h4>
          {/* Navigation link to create a new category */}
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          {/* Navigation link to create a new product */}
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          {/* Navigation link to view all products */}
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
        </div>
      </div>
    </div>
  );
};

// Exporting the AdminMenu component
export default AdminMenu;
