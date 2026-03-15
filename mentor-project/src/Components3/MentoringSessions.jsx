import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { mentoringSessions } from "../data/dummyData";

function MentoringSessions() {
  const navigate = useNavigate();
  const [filterAttendance, setFilterAttendance] = useState("");
  const [filterStress, setFilterStress] = useState("");

  const filteredSessions = mentoringSessions.filter((s) => {
    const matchAttendance = filterAttendance === "" || s.attendance === filterAttendance;
    const matchStress = filterStress === "" || s.stressLevel === filterStress;
    return matchAttendance && matchStress;
  });

  const getStressBadge = (level) => {
    const badges = {
      Low: "bg-success",
      Medium: "bg-warning text-dark",
      High: "bg-danger"
    };
    return badges[level] || "bg-secondary";
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold mb-1">
            <i className="bi bi-calendar-check-fill me-2 text-info"></i>
            Mentoring Sessions
          </h4>
          <p className="text-muted mb-0">View and manage all mentoring activities</p>
        </div>
        <button className="btn btn-info text-white" onClick={() => navigate("/mentoring/add")}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Session
        </button>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="card-body py-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-info-subtle p-2">
                  <i className="bi bi-calendar-check text-info fs-5"></i>
                </div>
                <div>
                  <div className="text-muted small">Total Sessions</div>
                  <div className="fw-bold fs-5">{mentoringSessions.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="card-body py-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-success-subtle p-2">
                  <i className="bi bi-check-circle text-success fs-5"></i>
                </div>
                <div>
                  <div className="text-muted small">Present</div>
                  <div className="fw-bold fs-5">
                    {mentoringSessions.filter((s) => s.attendance === "Present").length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="card-body py-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-danger-subtle p-2">
                  <i className="bi bi-x-circle text-danger fs-5"></i>
                </div>
                <div>
                  <div className="text-muted small">Absent</div>
                  <div className="fw-bold fs-5">
                    {mentoringSessions.filter((s) => s.attendance === "Absent").length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="card-body py-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-warning-subtle p-2">
                  <i className="bi bi-exclamation-triangle text-warning fs-5"></i>
                </div>
                <div>
                  <div className="text-muted small">High Stress</div>
                  <div className="fw-bold fs-5">
                    {mentoringSessions.filter((s) => s.stressLevel === "High").length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterAttendance}
                onChange={(e) => setFilterAttendance(e.target.value)}
              >
                <option value="">All Attendance</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterStress}
                onChange={(e) => setFilterStress(e.target.value)}
              >
                <option value="">All Stress Levels</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setFilterAttendance("");
                  setFilterStress("");
                }}
              >
                <i className="bi bi-x-lg me-1"></i>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr className="bg-light">
                  <th className="ps-4 py-3">Student</th>
                  <th className="py-3">Mentor</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Attendance</th>
                  <th className="py-3">Stress Level</th>
                  <th className="py-3 pe-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((s) => (
                  <tr key={s.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle bg-info-subtle text-info fw-bold"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {s.studentName.charAt(0)}
                        </div>
                        <span className="fw-semibold">{s.studentName}</span>
                      </div>
                    </td>
                    <td>{s.mentorName}</td>
                    <td>
                      <i className="bi bi-calendar3 text-muted me-1"></i>
                      {s.date}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          s.attendance === "Present" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        <i
                          className={`bi ${
                            s.attendance === "Present" ? "bi-check-lg" : "bi-x-lg"
                          } me-1`}
                        ></i>
                        {s.attendance}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStressBadge(s.stressLevel)}`}>
                        {s.stressLevel}
                      </span>
                    </td>
                    <td className="pe-4 text-end">
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => navigate(`/mentoring/view/${s.id}`)}
                      >
                        <i className="bi bi-eye me-1"></i>
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSessions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-5">
                      <i className="bi bi-calendar-x fs-1 d-block mb-2"></i>
                      No sessions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1) !important; }
        .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
        .bg-danger-subtle { background-color: rgba(220, 53, 69, 0.1) !important; }
        .bg-warning-subtle { background-color: rgba(255, 193, 7, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default MentoringSessions;
