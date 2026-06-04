import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const auth = useContext(AuthContext);
  return auth.user ? children : <Navigate to="/" replace />;
}