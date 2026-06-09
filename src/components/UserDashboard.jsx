import React from "react";
import Navbar from "./Navbar";
import OnlineUsers from "./OnlineUsers";

function UserDashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <OnlineUsers />

        <div className="card shadow p-4">
          <h2>User Dashboard</h2>

          <p>Welcome User</p>

          <div className="alert alert-info">
            User Features:
            <ul>
              <li>View Todos</li>
              <li>Create Todos</li>
              <li>Update Todos</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
