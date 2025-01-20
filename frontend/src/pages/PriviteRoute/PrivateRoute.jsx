import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { decodeToken } from "../../utils/decodeToken";

const PrivateRoute = ({ children, requiredPermissions = [] }) => {
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();

  // Nếu không có accessToken, chuyển hướng đến trang login
  if (!accessToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Giải mã token để lấy thông tin
  const decodedToken = decodeToken(accessToken);
  if (!decodedToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const userPermissions = decodedToken.permissions || [];

  // Kiểm tra nếu người dùng có quyền "Full admin privileges"
  if (userPermissions.includes("Full admin privileges")) {
    return children;
  }

  // Cho phép tất cả người dùng truy cập Dashboard
  if (requiredPermissions.includes("Dashboard")) {
    return children;
  }

  // Kiểm tra quyền truy cập
  const hasPermission = requiredPermissions.some((perm) =>
    userPermissions.includes(perm)
  );

  // Nếu có quyền, hiển thị nội dung; nếu không, chuyển hướng đến "No Access"
  return hasPermission ? children : <Navigate to="/no-access" replace />;
};

export default PrivateRoute;
