import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token"); // Kiểm tra token
  return accessToken ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
