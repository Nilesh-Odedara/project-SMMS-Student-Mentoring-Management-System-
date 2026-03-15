//Login page

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Shield, User, GraduationCap } from "lucide-react";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("ADMIN");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear stale data on mount
  React.useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Determine endpoint based on role
      const endpoint = role === "STUDENT" ? "/student/login" : "/staff/login";
      
      const response = await api.post(endpoint, {
        EmailAddress: email,
        Password: password
      });

      if (response.data.token) {
        // Save auth data
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("role", role);
        if (response.data.userId) {
          localStorage.setItem("userId", response.data.userId);
        }
        
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.err || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: "ADMIN", label: "Admin", icon: Shield },
    { id: "MENTOR", label: "Mentor", icon: User },
    { id: "STUDENT", label: "Student", icon: GraduationCap },
  ];

  return (
    <div className="bg-gradient-premium d-flex align-items-center justify-content-center p-4">
      <div className="container" style={{ maxWidth: "450px" }}>
        <div className="glass-card fade-in-up p-4 p-md-5">

          <div className="text-center mb-5">
            <h2 className="mb-2 fw-bold text-primary-emphasis">Welcome Back!</h2>
            <p className="text-muted">Student Mentoring System</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="mb-4">
              <label className="form-label small text-uppercase text-muted fw-bold mb-3 d-block text-center">Select Role</label>
              <div className="row g-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div className="col-4" key={r.id}>
                      <div
                        className={`role-card p-2 text-center h-100 d-flex flex-column align-items-center justify-content-center ${role === r.id ? 'active' : ''}`}
                        onClick={() => setRole(r.id)}
                      >
                        <Icon size={20} className={role === r.id ? 'text-primary' : 'text-muted'} />
                        <span className={`small fw-medium mt-1 ${role === r.id ? 'text-primary' : 'text-muted'}`}>{r.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="emailInput">
                <Mail size={16} className="me-2 text-muted" />
                Email address
              </label>
            </div>

            {/* Password */}
            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="passwordInput">
                <Lock size={16} className="me-2 text-muted" />
                Password
              </label>
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-2 text-muted border-0 bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 5 }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 mb-4 shadow-sm"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center">
              <span className="text-muted small">Don't have an account? <Link to="/register" className="text-primary text-decoration-none">Sign Up</Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
