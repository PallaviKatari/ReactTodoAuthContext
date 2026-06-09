import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const UserRoute = ({ children }) => {

  const { isAuthenticated, isUser } =
    useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return isUser
    ? children
    : <Navigate to="/unauthorized" replace />;
};

export default UserRoute;