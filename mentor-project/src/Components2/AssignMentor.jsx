'use client';

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Reusable searchable dropdown (same pattern as AddMentoringSession)
function SearchableDropdown({
  label,
  iconClass,
  placeholder,
  options,
  value,
  onChange,
  required,
  displayKey,
  valueKey,
  renderOption,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedOption = options.find(
    (o) => String(o[valueKey]) === String(value)
  );
  const displayText = selectedOption
    ? renderOption
      ? renderOption(selectedOption)
      : selectedOption[displayKey]
    : "";

  useEffect(() => {
    if (!isOpen) {
      setSearch(displayText);
    }
  }, [displayText, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch(displayText);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [displayText]);

  const filtered = options.filter((o) => {
    const text = renderOption ? renderOption(o) : o[displayKey];
    return text?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <label className="form-label text-muted small fw-bold text-uppercase">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="input-group">
        <span className="input-group-text bg-light border-end-0">
          <i className={`${iconClass} text-muted`} style={{ fontSize: 14 }}></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0 border-end-0 ps-0"
          placeholder={placeholder}
          value={isOpen ? search : displayText}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearch("");
          }}
          required={required}
          autoComplete="off"
        />
        <span
          className="input-group-text bg-light border-start-0"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (value) {
              onChange("");
              setSearch("");
              setIsOpen(true);
            } else {
              setIsOpen(!isOpen);
            }
          }}
        >
          {value ? (
            <i className="bi bi-x text-muted" style={{ fontSize: 14 }}></i>
          ) : (
            <i
              className="bi bi-chevron-down text-muted"
              style={{ fontSize: 14 }}
            ></i>
          )}
        </span>
      </div>

      {isOpen && (
        <div
          className="border rounded-2 shadow-sm bg-white"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1050,
            maxHeight: 200,
            overflowY: "auto",
            marginTop: 2,
          }}
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-muted small">No results found</div>
          ) : (
            filtered.map((o) => (
              <div
                key={o[valueKey]}
                className={`px-3 py-2 ${
                  String(o[valueKey]) === String(value)
                    ? "bg-success text-white"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(String(o[valueKey]));
                  setIsOpen(false);
                  setSearch(renderOption ? renderOption(o) : o[displayKey]);
                }}
                onMouseEnter={(e) => {
                  if (String(o[valueKey]) !== String(value)) {
                    e.currentTarget.style.backgroundColor = "#f0f4ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (String(o[valueKey]) !== String(value)) {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
              >
                <div className="small">
                  {renderOption ? renderOption(o) : o[displayKey]}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function AssignMentor() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [existingAssignments, setExistingAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    StudentId: "",
    StaffId: "",
    FromDate: "",
    ToDate: "",
    Description: "",
  });

  // Fetch students, mentors, and existing assignments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, staffRes, assignmentsRes] = await Promise.all([
          api.get("/student"),
          api.get("/staff"),
          api.get("/studentmentor"),
        ]);

        const studentsData = studentsRes.data;
        const staffData = staffRes.data;
        const assignmentsData = assignmentsRes.data;

        setStudents(studentsData.student || studentsData.students || []);
        setMentors(staffData.staff || []);
        setExistingAssignments(
          assignmentsData.studentMentor || assignmentsData.studentmentor || []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.StudentId || !formData.StaffId) {
      setError("Please select both a student and a mentor.");
      return;
    }
    if (!formData.FromDate) {
      setError("Please select a From Date.");
      return;
    }

    const duplicate = existingAssignments.find(
      (a) =>
        String(a.StudentId ?? a.studentId) === String(formData.StudentId) &&
        String(a.StaffId) === String(formData.StaffId)
    );
    if (duplicate) {
      setError("This student is already assigned to this mentor.");
      return;
    }

    setSubmitting(true);

    try {
      const maxId = existingAssignments.reduce(
        (max, a) => Math.max(max, a.StudentMentorId || 0),
        0
      );

      const payload = {
        StudentMentorId: maxId + 1,
        StudentId: Number(formData.StudentId),
        StaffId: Number(formData.StaffId),
        FromDate: formData.FromDate,
        ToDate: formData.ToDate || null,
        Description: formData.Description || "",
      };

      const res = await api.post("/studentmentor", payload);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data?.message || "Failed to assign mentor");
      }

      const data = res.data;

      setExistingAssignments((prev) => [
        ...prev,
        data.studentMentor || payload,
      ]);

      setSuccess("Mentor assigned to student successfully!");
      setFormData({
        StudentId: "",
        StaffId: "",
        FromDate: "",
        ToDate: "",
        Description: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Build dropdown options
  const studentOptions = students.map((s) => ({
    ...s,
    _value: String(s.StudentId ?? s.studentId ?? s._id),
    _label: `${s.StudentName || s.studentName || "N/A"} - ${s.EnrollmentNo || s.enrollmentNo || `ID: ${s.StudentId ?? s.studentId ?? s._id}`}`,
  }));

  const mentorOptions = mentors.map((m) => ({
    ...m,
    _value: String(m.StaffID),
    _label: `${m.StaffName || "Staff"} ${m.Department ? `- ${m.Department}` : ""}`,
  }));

  // Get selected student and mentor for preview
  const selectedStudent = students.find(
    (s) => String(s.StudentId ?? s.studentId) === String(formData.StudentId)
  );
  const selectedMentor = mentors.find(
    (m) => String(m.StaffID) === String(formData.StaffId)
  );

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-light rounded-circle p-2 me-3 shadow-sm border"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left" style={{ fontSize: 18 }}></i>
        </button>
        <div>
          <h4 className="fw-bold mb-1">Assign Mentor</h4>
          <p className="text-muted mb-0">
            Assign a mentor to a student for guidance and support
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}
      {success && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess("")}
          ></button>
        </div>
      )}

      <div className="row g-4">
        {/* Assignment Form */}
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body p-4 p-md-5">
              <h5 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-clipboard-plus me-2 text-success"></i>
                Assignment Details
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {/* Student - Searchable Dropdown */}
                  <div className="col-md-6">
                    <SearchableDropdown
                      label="Student"
                      iconClass="bi bi-person"
                      placeholder="Search student by name or enrollment..."
                      options={studentOptions}
                      value={formData.StudentId}
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, StudentId: val }));
                        setError("");
                        setSuccess("");
                      }}
                      required={true}
                      displayKey="_label"
                      valueKey="_value"
                      renderOption={(o) => o._label}
                    />
                  </div>

                  {/* Mentor - Searchable Dropdown */}
                  <div className="col-md-6">
                    <SearchableDropdown
                      label="Mentor"
                      iconClass="bi bi-person-check"
                      placeholder="Search mentor by name..."
                      options={mentorOptions}
                      value={formData.StaffId}
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, StaffId: val }));
                        setError("");
                        setSuccess("");
                      }}
                      required={true}
                      displayKey="_label"
                      valueKey="_value"
                      renderOption={(o) => o._label}
                    />
                  </div>

                  {/* From Date */}
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold text-uppercase">
                      From Date <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i
                          className="bi bi-calendar-event text-muted"
                          style={{ fontSize: 14 }}
                        ></i>
                      </span>
                      <input
                        type="date"
                        name="FromDate"
                        className="form-control border-start-0 ps-0"
                        value={formData.FromDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* To Date */}
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold text-uppercase">
                      To Date
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i
                          className="bi bi-calendar-check text-muted"
                          style={{ fontSize: 14 }}
                        ></i>
                      </span>
                      <input
                        type="date"
                        name="ToDate"
                        className="form-control border-start-0 ps-0"
                        value={formData.ToDate}
                        onChange={handleChange}
                        min={formData.FromDate}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label text-muted small fw-bold text-uppercase">
                      <i className="bi bi-chat-left-text me-1"></i> Description
                    </label>
                    <textarea
                      name="Description"
                      className="form-control"
                      rows={3}
                      placeholder="Add a note about this assignment..."
                      value={formData.Description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-end gap-3 mt-5">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() =>
                      setFormData({
                        StudentId: "",
                        StaffId: "",
                        FromDate: "",
                        ToDate: "",
                        Description: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success px-5 d-flex align-items-center shadow-sm"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Assigning...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Assign Mentor
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Preview Sidebar */}
        <div className="col-lg-4">
          {/* Selection Preview */}
          <div
            className="card border-0 shadow-sm mb-4"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-eye me-2 text-success"></i>
                Selection Preview
              </h6>

              {/* Selected Student */}
              <div className="mb-3">
                <small className="text-muted d-block mb-1">Student</small>
                {selectedStudent ? (
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                      style={{
                        width: 36,
                        height: 36,
                        fontSize: "0.85rem",
                        backgroundColor: "#198754",
                      }}
                    >
                      {(
                        selectedStudent.StudentName ||
                        selectedStudent.studentName ||
                        "?"
                      ).charAt(0)}
                    </div>
                    <div>
                      <div
                        className="fw-semibold"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {selectedStudent.StudentName ||
                          selectedStudent.studentName}
                      </div>
                      <small className="text-muted">
                        {selectedStudent.EnrollmentNo ||
                          selectedStudent.enrollmentNo ||
                          `ID: ${selectedStudent.StudentId ?? selectedStudent.studentId}`}
                      </small>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                    No student selected
                  </span>
                )}
              </div>

              <hr />

              {/* Selected Mentor */}
              <div>
                <small className="text-muted d-block mb-1">Mentor</small>
                {selectedMentor ? (
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                      style={{
                        width: 36,
                        height: 36,
                        fontSize: "0.85rem",
                        backgroundColor: "#0d6efd",
                      }}
                    >
                      {(selectedMentor.StaffName || "?").charAt(0)}
                    </div>
                    <div>
                      <div
                        className="fw-semibold"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {selectedMentor.StaffName}
                      </div>
                      <small className="text-muted">
                        {selectedMentor.Department || `ID: ${selectedMentor.StaffID}`}
                      </small>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                    No mentor selected
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-bar-chart me-2 text-success"></i>
                Quick Stats
              </h6>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Total Students</span>
                  <span className="badge bg-success-subtle text-success fw-bold px-3 py-2">
                    {students.length}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Total Mentors</span>
                  <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2">
                    {mentors.length}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Assignments</span>
                  <span className="badge bg-info-subtle text-info fw-bold px-3 py-2">
                    {existingAssignments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Assignments Table */}
      <div
        className="card border-0 shadow-sm mt-4"
        style={{ borderRadius: 16 }}
      >
        <div className="card-body p-0">
          <div className="p-4 pb-0">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-list-check me-2 text-success"></i>
              Recent Assignments
            </h5>
          </div>

          <div className="table-responsive p-4">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Mentor</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {existingAssignments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted py-4"
                    >
                      No assignments found
                    </td>
                  </tr>
                ) : (
                  existingAssignments
                    .slice()
                    .reverse()
                    .slice(0, 10)
                    .map((a, idx) => {
                      const student = students.find(
                        (s) =>
                          String(s.StudentId ?? s.studentId) ===
                          String(a.StudentId)
                      );
                      const mentor = mentors.find(
                        (m) => String(m.StaffID) === String(a.StaffId)
                      );
                      return (
                        <tr key={a._id || idx}>
                          <td>{a.StudentMentorId || idx + 1}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                                style={{
                                  width: 32,
                                  height: 32,
                                  fontSize: "0.75rem",
                                  backgroundColor: "#198754",
                                }}
                              >
                                {(
                                  student?.StudentName ||
                                  student?.studentName ||
                                  "?"
                                ).charAt(0)}
                              </div>
                              <span>
                                {student?.StudentName ||
                                  student?.studentName ||
                                  `ID: ${a.StudentId}`}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                                style={{
                                  width: 32,
                                  height: 32,
                                  fontSize: "0.75rem",
                                  backgroundColor: "#0d6efd",
                                }}
                              >
                                {(mentor?.StaffName || "?").charAt(0)}
                              </div>
                              <span>
                                {mentor?.StaffName || `ID: ${a.StaffId}`}
                              </span>
                            </div>
                          </td>
                          <td>
                            {a.FromDate
                              ? new Date(a.FromDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            {a.ToDate
                              ? new Date(a.ToDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            <span
                              className="text-truncate d-inline-block"
                              style={{ maxWidth: 200 }}
                            >
                              {a.Description || "-"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
        .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1) !important; }
        .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default AssignMentor;
