import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../styles/AdminDashboardStyles.css"; 

const AdminDashboard = () => {
  // Retrieve authentication information from the context
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          {/* Admin menu column */}
          <div className="col-md-3 p-4">
            <AdminMenu />
          </div>

          {/* Admin details column */}
          <div className="col-md-9 content">
            <div className="card w-75 p-4 m-3 admin-dashboard-card">
              <h3 className="mb-4">Admin Details</h3>
              <h5>Admin Name: {auth?.user?.name}</h5>
              <h5>Admin Email: {auth?.user?.email}</h5>
              <h5>Admin Contact: {auth?.user?.phone}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
