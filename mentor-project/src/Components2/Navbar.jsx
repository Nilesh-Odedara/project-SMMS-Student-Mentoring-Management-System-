import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  UserCircle,
  Menu,
  ChevronDown,
  Settings,
  LogOut,
  Search,
  Shield,
  User
} from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("STUDENT");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getUserLabel = () => {
    if (!role) return "Guest";
    return role.charAt(0) + role.slice(1).toLowerCase() + " User";
  };

  const getUserEmail = () => {
    return role ? `${role.toLowerCase()}@smms.edu` : "guest@smms.edu";
  };

  const getProfileLink = () => {
    if (role === "STUDENT") return "/student/1";
    if (role === "MENTOR") return "/mentor/1";
    return "#";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-glass sticky-top py-2 px-3 border-bottom border-light">
      <div className="container-fluid">

        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-link text-muted p-0 me-3 d-md-none"
          type="button"
          onClick={onToggleSidebar}
        >
          <Menu size={24} />
        </button>

        {/* Brand (Mobile) */}
        <div className="d-flex align-items-center d-md-none">
          <Shield className="text-primary me-2" size={20} />
          <span className="fw-bold text-dark">MentorPro</span>
        </div>

        {/* Center / Search Bar */}
        <div className="d-none d-md-block flex-grow-1 mw-100" style={{ maxWidth: "400px" }}>
          <div className="input-group">
            <span className="input-group-text bg-light border-0"><Search size={16} className="text-muted" /></span>
            <input type="text" className="form-control bg-light border-0" placeholder="Global search..." />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="d-flex align-items-center gap-3 ms-auto">

          {/* Notification Bell */}
          <div className="position-relative cursor-pointer hover-scale p-2 rounded-circle hover-bg-light transition-all">
            <Bell size={20} className="text-muted" />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white"
              style={{ width: '10px', height: '10px', padding: 0, marginTop: "8px", marginLeft: "-8px" }}
            >
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <div
              className="d-flex align-items-center cursor-pointer p-1 pe-3 rounded-pill hover-bg-light transition-all"
              data-bs-toggle="dropdown"
            >
              <div
                className="rounded-circle bg-soft-primary d-flex align-items-center justify-content-center me-2"
                style={{ width: '32px', height: '32px' }}
              >
                <UserCircle size={20} className="text-primary" />
              </div>
              <div className="d-none d-lg-block me-2 text-start">
                <div className="fw-bold small lh-1 text-dark">{getUserLabel()}</div>
              </div>
              <ChevronDown size={14} className="text-muted" />
            </div>

            <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg p-2 mt-2 rounded-4" style={{ minWidth: '200px' }}>
              <li>
                <div className="px-3 py-2">
                  <p className="mb-0 fw-bold text-dark">{getUserLabel()}</p>
                  <p className="mb-0 text-muted small">{getUserEmail()}</p>
                </div>
              </li>
              <li><hr className="dropdown-divider my-1 opacity-10" /></li>

              {role !== "ADMIN" && (
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center p-2 rounded-3"
                    onClick={() => navigate(getProfileLink())}
                  >
                    <User size={16} className="me-2 text-muted" /> My Profile
                  </button>
                </li>
              )}

              <li>
                <a className="dropdown-item d-flex align-items-center p-2 rounded-3" href="#">
                  <Settings size={16} className="me-2 text-muted" /> Settings
                </a>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center p-2 rounded-3 text-danger"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="me-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <style>{`
        .hover-bg-light:hover { background-color: rgba(0,0,0,0.04); }
        .transition-all { transition: all 0.2s ease; }
      `}</style>
    </nav>
  );
};

export default Navbar;