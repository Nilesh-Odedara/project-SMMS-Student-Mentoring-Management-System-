import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { students } from "../data/dummyData";

function Students() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");

  const departments = [...new Set(students.map((s) => s.department))];

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.enrollment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDept === "" || s.department === filterDept;
    return matchSearch && matchDept;
  });

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold mb-1">
            <i className="bi bi-people-fill me-2 text-primary"></i>
            Students
          </h4>
          <p className="text-muted mb-0">Manage and view student information</p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by name or enrollment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setFilterDept("");
                }}
              >
                <i className="bi bi-x-lg me-1"></i>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr className="bg-light">
                  <th className="ps-4 py-3">Student</th>
                  <th className="py-3">Enrollment</th>
                  <th className="py-3">Department</th>
                  <th className="py-3">Year</th>
                  <th className="py-3">Mentor</th>
                  <th className="py-3 pe-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary fw-bold"
                          style={{ width: "45px", height: "45px" }}
                        >
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-semibold">{s.name}</div>
                          <div className="text-muted small">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{s.enrollment}</span>
                    </td>
                    <td>{s.department}</td>
                    <td>
                      <span className="badge bg-info-subtle text-info">{s.year}</span>
                    </td>
                    <td>{s.mentor}</td>
                    <td className="pe-4 text-end">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/student/${s.id}`)}
                      >
                        <i className="bi bi-eye me-1"></i>
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-5">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="card-footer bg-transparent border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted small">
              Showing {filteredStudents.length} of {students.length} students
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <span className="page-link">Next</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <style>{`
        .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1) !important; }
        .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default Students;
