import React from "react";
import Navbar from "./Navbar";
import OnlineUsers from "./OnlineUsers";

function AdminDashboard() {

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <OnlineUsers />

        <div className="card shadow p-4">

          <h2>
            Admin Dashboard
          </h2>

          <p>
            Welcome Admin
          </p>

          <div className="alert alert-success">

            Admin Features:

            <ul>
              <li>User Management</li>
              <li>Role Management</li>
              <li>Todo Management</li>
            </ul>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;