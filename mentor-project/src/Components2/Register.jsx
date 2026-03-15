import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, GraduationCap, Shield, Phone, FileText, Hash, Building } from "lucide-react";
import api from "../api";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    id: "", // StudentId or StaffID
    name: "", // StudentName or StaffName
    enrollmentNo: "", // only for student
    email: "",
    mobile: "",
    password: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = role === "STUDENT" ? "/student/register" : "/staff/register";
      
      let payload = {};
      const parsedId = Number(formData.id);
      
      if (role === "STUDENT") {
        payload = {
          StudentId: parsedId,
          StudentName: formData.name,
          EnrollmentNo: formData.enrollmentNo,
          EmailAddress: formData.email,
          MobileNo: formData.mobile,
          Password: formData.password,
          Description: formData.description,
        };
      } else {
        payload = {
          StaffID: parsedId,
          StaffName: formData.name,
          EmailAddress: formData.email,
          MobileNo: formData.mobile,
          Password: formData.password,
          Description: formData.description,
        };
      }

      const response = await api.post(endpoint, payload);
      
      if (response.status === 200) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.err || "Registration failed");
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
      <div className="container" style={{ maxWidth: "500px" }}>
        <div className="glass-card fade-in-up p-4 p-md-5 my-4">

          <div className="text-center mb-4">
            <h2 className="mb-2 fw-bold text-primary-emphasis">Create Account</h2>
            <p className="text-muted">Student Mentoring System</p>
          </div>

          <form onSubmit={handleRegister}>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

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
                        style={{ cursor: "pointer" }}
                      >
                        <Icon size={20} className={role === r.id ? 'text-primary' : 'text-muted'} />
                        <span className={`small fw-medium mt-1 ${role === r.id ? 'text-primary' : 'text-muted'}`}>{r.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input type="text" className="form-control" id="idInput" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
                <label htmlFor="idInput" className="ms-2"><Hash size={16} className="me-1 text-muted"/> {role === 'STUDENT' ? 'Student ID' : 'Staff ID'}</label>
              </div>
              <div className="col-md-6 form-floating">
                <input type="text" className="form-control" id="nameInput" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <label htmlFor="nameInput" className="ms-2"><User size={16} className="me-1 text-muted"/> Full Name</label>
              </div>
              
              {role === "STUDENT" && (
                <div className="col-12 form-floating">
                  <input type="text" className="form-control" id="enrollInput" name="enrollmentNo" placeholder="Enrollment" value={formData.enrollmentNo} onChange={handleChange} required />
                  <label htmlFor="enrollInput" className="ms-2"><Building size={16} className="me-1 text-muted"/> Enrollment No</label>
                </div>
              )}

              <div className="col-12 form-floating">
                <input type="email" className="form-control" id="emailInput" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <label htmlFor="emailInput" className="ms-2"><Mail size={16} className="me-1 text-muted"/> Email Address</label>
              </div>

              <div className="col-12 form-floating">
                <input type="tel" className="form-control" id="mobileInput" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
                <label htmlFor="mobileInput" className="ms-2"><Phone size={16} className="me-1 text-muted"/> Mobile No</label>
              </div>

              <div className="col-12 form-floating">
                <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <label htmlFor="passwordInput" className="ms-2"><Lock size={16} className="me-1 text-muted"/> Password</label>
              </div>

              <div className="col-12 form-floating">
                <textarea className="form-control" id="descInput" name="description" placeholder="Description" style={{height: "80px"}} value={formData.description} onChange={handleChange}></textarea>
                <label htmlFor="descInput" className="ms-2"><FileText size={16} className="me-1 text-muted"/> Description (Optional)</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 my-4 shadow-sm" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-center">
              <span className="text-muted small">Already have an account? <Link to="/login" className="text-primary text-decoration-none">Sign In</Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
