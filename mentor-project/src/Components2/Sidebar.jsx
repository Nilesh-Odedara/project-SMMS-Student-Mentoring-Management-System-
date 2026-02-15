'use client';

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserPlus,
  Calendar,
  BarChart2,
  MessageSquare,
  LogOut,
  Hexagon,
  User
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("STUDENT"); // Default safe

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setUserRole(role);
  }, []);

  // Menu Configuration with Role Access
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      allowedRoles: ["ADMIN", "MENTOR", "STUDENT"]
    },
    {
      label: "Students",
      icon: Users,
      path: "/students",
      allowedRoles: ["ADMIN", "MENTOR"] // Students don't manage other students
    },
    {
      label: "Mentors",
      icon: UserCheck,
      path: "/mentors",
      allowedRoles: ["ADMIN"] // Only Admin manages mentors
    },
    {
      label: "Mentoring",
      icon: Calendar,
      path: "/mentoring",
      allowedRoles: ["ADMIN"] // Restricted to Admin. Mentors see "My Profile" or Dashboard instead
    },
    {
      label: "My Profile",
      icon: User,
      path: "/mentor/1", // Hardcoded ID for now (simulating logged in user)
      allowedRoles: ["MENTOR"]
    },
    {
      label: "My Profile",
      icon: User,
      path: "/student/1",
      allowedRoles: ["STUDENT"]
    },
    {
      label: "Reports",
      icon: BarChart2,
      path: "/reports",
      allowedRoles: ["ADMIN"]
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("role"); // Clear role on logout
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column h-100 glass-card rounded-0 border-end border-light sticky-top" style={{ width: "260px" }}>

      {/* Brand Logo */}
      <div className="p-4 mb-2">
        <div className="d-flex align-items-center gap-2 text-brand-gradient">
          <Hexagon size={32} strokeWidth={2.5} />
          <h4 className="fw-bold mb-0 tracking-tight">Mentor<span className="text-dark">Pro</span></h4>
        </div>
        <p className="text-muted small ms-1 mb-0 opacity-75">
          {userRole === "ADMIN" ? "Admin Console v2.0" : userRole === "MENTOR" ? "Mentor Portal" : "Student Portal"}
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex-grow-1 px-3 overflow-auto">
        <p className="text-muted small fw-bold text-uppercase px-3 mb-2">Main Menu</p>
        <div className="d-flex flex-column gap-2">
          {menuItems
            .filter(item => item.allowedRoles.includes(userRole))
            .map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none transition-all ${isActive
                    ? "bg-primary text-white shadow-sm fw-medium"
                    : "text-muted hover-bg-light"
                    }`}
                >
                  <Icon size={20} className={isActive ? "text-white" : "text-muted"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

          {/* Feedback Separate Section - Role Protected */}
          {(userRole === "ADMIN" || userRole === "MENTOR") && (
            <>
              <p className="text-muted small fw-bold text-uppercase px-3 mt-4 mb-2">Management</p>
              {userRole === "ADMIN" && (
                <Link
                  to="/assignmentor"
                  className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none transition-all ${location.pathname === "/assign-mentor"
                    ? "bg-primary text-white shadow-sm fw-medium"
                    : "text-muted hover-bg-light"
                    }`}
                >
                  <UserPlus size={20} />
                  <span>Assign Mentor</span>
                </Link>
              )}
              <Link
                to="/feedback"
                className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none transition-all ${location.pathname === "/feedback"
                  ? "bg-primary text-white shadow-sm fw-medium"
                  : "text-muted hover-bg-light"
                  }`}
              >
                <MessageSquare size={20} />
                <span>Feedback</span>
              </Link>
            </>
          )}

        </div>
      </div>

      {/* Footer / User Profile */}
      <div className="p-3 border-top border-light bg-light bg-opacity-50">
        <div className="d-flex align-items-center justify-content-between p-2">
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: "36px", height: "36px" }}>
              {userRole.charAt(0)}
            </div>
            <div style={{ lineHeight: "1.2" }}>
              <div className="fw-bold text-dark small">{userRole} User</div>
              <div className="text-muted text-xs" style={{ fontSize: "0.7rem" }}>user@smms.edu</div>
            </div>
          </div>
          <button className="btn btn-icon btn-sm text-danger" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .transition-all { transition: all 0.2s ease; }
        .hover-bg-light:hover { background-color: rgba(0,0,0,0.03); color: var(--primary); }
        .text-xs { font-size: 0.75rem; }
      `}</style>
    </div>
  );
}

export default Sidebar;
