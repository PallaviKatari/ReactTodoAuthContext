import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/LoginPage";
import TodoCrud from "./components/todoCrud";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Unauthorized() {
  return (
    <div className="container mt-5 text-center">
      <div className="card shadow p-4">
        <h2>403 - Unauthorized Access</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <div className="card shadow p-4">
        <h2>404 - Page Not Found</h2>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Shared Todo Page */}
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <TodoCrud />
            </PrivateRoute>
          }
        />

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;