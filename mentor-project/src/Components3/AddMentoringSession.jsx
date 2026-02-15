import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { students, mentors } from "../data/dummyData";

function AddMentoringSession() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: "",
    mentorId: "",
    date: "",
    attendance: "Present",
    stressLevel: "Low",
    nextSessionDate: "",
    issues: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Session saved (demo only)");
    navigate("/mentoring");
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4">
        <button className="btn btn-link text-muted p-0 mb-2" onClick={() => navigate("/mentoring")}>
          <i className="bi bi-arrow-left me-1"></i>
          Back to Sessions
        </button>
        <h4 className="fw-bold mb-1">
          <i className="bi bi-plus-circle-fill me-2 text-info"></i>
          Add Mentoring Session
        </h4>
        <p className="text-muted mb-0">Record a new mentoring session</p>
      </div>

      {/* Form Card */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Student Selection */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person me-1 text-primary"></i>
                  Student
                </label>
                <select
                  className="form-select"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} - {s.enrollment}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mentor Selection */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person-badge me-1 text-success"></i>
                  Mentor
                </label>
                <select
                  className="form-select"
                  name="mentorId"
                  value={formData.mentorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Mentor</option>
                  {mentors.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.department}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-calendar me-1 text-info"></i>
                  Session Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Next Session Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-calendar-plus me-1 text-secondary"></i>
                  Next Session Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="nextSessionDate"
                  value={formData.nextSessionDate}
                  onChange={handleChange}
                />
              </div>

              {/* Attendance */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-check-circle me-1 text-success"></i>
                  Attendance
                </label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="attendance"
                      id="present"
                      value="Present"
                      checked={formData.attendance === "Present"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="present">
                      <span className="badge bg-success">Present</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="attendance"
                      id="absent"
                      value="Absent"
                      checked={formData.attendance === "Absent"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="absent">
                      <span className="badge bg-danger">Absent</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Stress Level */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-heart-pulse me-1 text-warning"></i>
                  Stress Level
                </label>
                <div className="d-flex gap-3">
                  {["Low", "Medium", "High"].map((level) => (
                    <div className="form-check" key={level}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="stressLevel"
                        id={level}
                        value={level}
                        checked={formData.stressLevel === level}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={level}>
                        <span
                          className={`badge ${
                            level === "Low"
                              ? "bg-success"
                              : level === "Medium"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {level}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues Discussed */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  <i className="bi bi-chat-text me-1 text-primary"></i>
                  Issues Discussed
                </label>
                <textarea
                  className="form-control"
                  name="issues"
                  rows="4"
                  placeholder="Describe the issues discussed during the session..."
                  value={formData.issues}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/mentoring")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-info text-white">
                <i className="bi bi-check-lg me-1"></i>
                Save Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMentoringSession;
