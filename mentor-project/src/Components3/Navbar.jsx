import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Using bootstrap-icons classes instead of react-icons to stick to bootstrap ecosystem

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Professional color scheme (corporate blue theme)
  const colors = {
    primary: "#2C3E50", // Dark blue
    secondary: "#3498DB", // Bright blue
    accent: "#1ABC9C",   // Teal
    light: "#ECF0F1",    // Light gray
    dark: "#2C3E50",     // Dark
    white: "#FFFFFF",
    danger: "#E74C3C",   // Red for alerts
    success: "#27AE60"   // Green
  };

  // Navigation items with icons
  const navItems = [
    { path: "/", label: "Dashboard", icon: "bi-grid" },
    { path: "/mentoring", label: "Mentoring", icon: "bi-people" },
    { path: "/mentors", label: "Mentors", icon: "bi-person-check" },
    { path: "/students", label: "Students", icon: "bi-book" },
    { path: "/reports", label: "Reports", icon: "bi-file-text" }
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark shadow" 
      style={{ 
        backgroundColor: colors.primary,
        padding: "0.75rem 1.5rem",
        borderBottom: `3px solid ${colors.accent}`,
        position: "sticky",
        top: 0,
        zIndex: 1030
      }}
    >
      <div className="container-fluid">
        
        {/* Brand Logo with Icon */}
        <div className="d-flex align-items-center">
          <a 
            className="navbar-brand d-flex align-items-center fw-bold me-4" 
            href="/"
            style={{ 
              color: colors.white, 
              fontSize: "1.5rem",
              textDecoration: "none"
            }}
          >
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{ 
                backgroundColor: colors.accent,
                width: "42px",
                height: "42px"
              }}
            >
              <i className="bi bi-house-door-fill text-white" style={{ fontSize: "22px" }}></i>
            </div>
            <div>
              <div style={{ letterSpacing: "1px" }}>SMMS</div>
              <div 
                className="fw-normal d-none d-md-block"
                style={{ 
                  fontSize: "0.75rem", 
                  opacity: 0.8,
                  letterSpacing: "0.5px"
                }}
              >
                Mentor Management System
              </div>
            </div>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          style={{ 
            padding: "8px 12px",
            border: `1px solid ${colors.accent}`,
            borderRadius: "4px"
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          
          {/* Center Navigation Items */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <li className="nav-item mx-1" key={item.path}>
                  <a
                    className={`nav-link d-flex align-items-center px-3 py-2 rounded ${
                      isActive ? "active" : ""
                    }`}
                    href={item.path}
                    style={{
                      backgroundColor: isActive ? colors.accent : "transparent",
                      color: isActive ? colors.white : colors.light,
                      transition: "all 0.3s ease",
                      fontWeight: isActive ? "600" : "400",
                      minWidth: "120px",
                      justifyContent: "center"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${colors.secondary}20`;
                        e.currentTarget.style.color = colors.white;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = colors.light;
                      }
                    }}
                  >
                    <i className={`bi ${item.icon} me-2`} style={{ opacity: 0.9 }}></i>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Side - User Info & Actions */}
          <div className="d-flex align-items-center">
            
            {/* Notification Bell */}
            <div className="position-relative me-3">
              <button 
                className="btn btn-link p-0 border-0 position-relative"
                style={{ color: colors.light }}
                aria-label="Notifications"
              >
                <i className="bi bi-bell" style={{ fontSize: "20px" }}></i>
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-circle"
                  style={{
                    backgroundColor: colors.danger,
                    fontSize: "0.6rem",
                    padding: "4px",
                    minWidth: "18px",
                    minHeight: "18px"
                  }}
                >
                  5
                </span>
              </button>
            </div>

            {/* User Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-link d-flex align-items-center text-decoration-none p-0 border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: colors.light }}
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    backgroundColor: colors.accent,
                    width: "40px",
                    height: "40px",
                    border: `2px solid ${colors.white}`
                  }}
                >
                  <i className="bi bi-person-fill text-white"></i>
                </div>
                <div className="d-none d-lg-block text-start me-2">
                  <div 
                    className="fw-semibold"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Admin User
                  </div>
                  <div 
                    className="text-muted"
                    style={{ fontSize: "0.75rem", opacity: 0.7 }}
                  >
                    Administrator
                  </div>
                </div>
                <i className="bi bi-chevron-down d-none d-lg-block"></i>
              </button>
              
              {/* Dropdown Menu */}
              <ul 
                className="dropdown-menu dropdown-menu-end border-0 shadow-lg"
                style={{
                  backgroundColor: colors.white,
                  minWidth: "220px",
                  padding: "0.5rem",
                  border: `1px solid ${colors.light}`,
                  marginTop: "10px"
                }}
              >
                <li className="dropdown-header px-3 py-2" 
                    style={{ 
                      backgroundColor: colors.light,
                      color: colors.dark,
                      fontWeight: "600"
                    }}>
                  User Account
                </li>
                <li>
                  <a 
                    className="dropdown-item d-flex align-items-center py-2 px-3"
                    href="/profile"
                  >
                    <i className="bi bi-person me-2 text-primary"></i>
                    Profile
                  </a>
                </li>
                 <li>
                  <a 
                    className="dropdown-item d-flex align-items-center py-2 px-3"
                    href="/settings"
                  >
                    <i className="bi bi-gear me-2 text-secondary"></i>
                    Settings
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item d-flex align-items-center py-2 px-3 text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
