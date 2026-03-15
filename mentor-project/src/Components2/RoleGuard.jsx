import React from "react";
import { Navigate } from "react-router-dom";

// Upgraded to support multiple allowed roles
function RoleGuard({ allowedRoles, children }) {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("accessToken");

  // If no role or token is present, redirect to login
  if (!userRole || !token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is in the allowed list
  // If allowedRoles is passed as a single string, convert to array for safety
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!rolesArray.includes(userRole)) {
    // Redirect significantly unauthorized users
    // If they are logged in but unauthorized, maybe send to their dashboard?
    // For now, simple redirect to unauthorized or login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleGuard;
