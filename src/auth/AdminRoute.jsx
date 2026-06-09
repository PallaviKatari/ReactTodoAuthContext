import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return role?.toLowerCase() === "admin"
    ? children
    : <Navigate
        to="/unauthorized"
        replace
      />;
};

export default AdminRoute;