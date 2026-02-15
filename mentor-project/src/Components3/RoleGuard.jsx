import { Navigate } from "react-router-dom";

function RoleGuard({ allowedRole, children }) {
  const role = localStorage.getItem("role");

  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleGuard;
