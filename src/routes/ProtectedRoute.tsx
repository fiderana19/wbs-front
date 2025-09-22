import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { token, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isAuthenticated && token !== null) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default ProtectedRoute;
