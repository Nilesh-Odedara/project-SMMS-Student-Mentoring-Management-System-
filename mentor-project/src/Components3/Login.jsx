


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("ADMIN");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // frontend-only role storage
    localStorage.setItem("role", role);

    if (role === "ADMIN") {
      navigate("/");
    } else if (role === "MENTOR") {
      navigate("/mentor/1"); // dummy mentor id
    } else {
      navigate("/student/1"); // dummy student id
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-md-5 col-lg-4">

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">

            <h4 className="text-center mb-4 fw-bold">
              Student Mentoring System
            </h4>

            <form onSubmit={handleLogin}>

              {/* Role Selection */}
              <h6 className="mb-3 text-center">Select Your Role</h6>
              <div className="d-flex justify-content-center gap-3 mb-4">

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="ADMIN"
                    value="ADMIN"
                    checked={role === "ADMIN"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="ADMIN">
                    Admin
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="MENTOR"
                    value="MENTOR"
                    checked={role === "MENTOR"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="MENTOR">
                    Mentor
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="STUDENT"
                    value="STUDENT"
                    checked={role === "STUDENT"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="STUDENT">
                    Student
                  </label>
                </div>

              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label small">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="user@college.edu"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="form-label small">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Show Password */}
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label small" htmlFor="showPassword">
                  Show password
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 fw-bold"
              >
                Sign In →
              </button>

            </form>
          </div>
        </div>

        <div className="text-center mt-3 text-muted small">
          © 2026 Student Mentoring System
        </div>

      </div>
    </div>
  );
}

export default Login;
