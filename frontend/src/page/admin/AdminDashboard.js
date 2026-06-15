

import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <ul>
          <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/add-product")}>Add Product</li>
          <li onClick={() => navigate("/admin/products")}>Manage Products</li>
          <li onClick={() => navigate("/admin/orders")}>Orders</li>
          <li onClick={() => navigate("/admin/users")}>Users</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <h1>Welcome Admin 👋</h1>

        <div className="cards">

          <div className="card">
            <h3>Add Product</h3>
            <p>Create new product items</p>
            <button onClick={() => navigate("/add-product")}>
              Go
            </button>
          </div>

          <div className="card">
            <h3>Products</h3>
            <p>View product list</p>
            <button onClick={() => navigate("/admin/products")}>
              View
            </button>
          </div>

          <div className="card">
            <h3>Users</h3>
            <p>Manage users</p>
            <button onClick={() => navigate("/admin/users")}>
              View
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;