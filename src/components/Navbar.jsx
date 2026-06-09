import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link
          className="navbar-brand"
          to={role?.toLowerCase() === "admin"
            ? "/admin"
            : "/dashboard"}
        >
          Todo App
        </Link>

        <div className="navbar-nav ms-auto">

          {role?.toLowerCase() === "admin" && (
            <Link
              className="nav-link"
              to="/admin"
            >
              Admin Dashboard
            </Link>
          )}

          {role?.toLowerCase() === "user" && (
            <Link
              className="nav-link"
              to="/dashboard"
            >
              User Dashboard
            </Link>
          )}

          <Link
            className="nav-link"
            to="/todo"
          >
            Todos
          </Link>

          <button
            className="btn btn-outline-light ms-3"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;