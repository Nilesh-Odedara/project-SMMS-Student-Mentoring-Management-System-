import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { students, mentoringSessions } from "../data/dummyData";

function MyStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const student = students.find((s) => s.id === Number(id)) || students[0];
  const studentSessions = mentoringSessions.filter((s) => s.studentName === student.name);

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
      <div className="mb-4">
        <button className="btn btn-link text-muted p-0 mb-2" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-1"></i>
          Back
        </button>
        <h4 className="fw-bold mb-1">
          <i className="bi bi-person-circle me-2 text-primary"></i>
          Student Profile
        </h4>
        <p className="text-muted mb-0">Complete mentoring overview of the student</p>
      </div>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-4 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
                  style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                >
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="fw-bold mb-1">{student.name}</h4>
                  <span className="badge bg-light text-dark me-2">{student.enrollment}</span>
                  <span className="badge bg-info-subtle text-info">{student.year}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="text-muted small">Department</div>
                  <div className="fw-semibold">{student.department}</div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="text-muted small">Mentor</div>
                  <div className="fw-semibold">{student.mentor}</div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="text-muted small">Email</div>
                  <div>
                    <i className="bi bi-envelope text-muted me-1"></i>
                    {student.email}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="text-muted small">Mobile</div>
                  <div>
                    <i className="bi bi-telephone text-muted me-1"></i>
                    {student.mobile}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="row g-3">
                <div className="col-6">
                  <div className="bg-primary-subtle rounded-3 p-3 text-center">
                    <div className="display-6 fw-bold text-primary">{studentSessions.length}</div>
                    <div className="text-muted small">Total Sessions</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-warning-subtle rounded-3 p-3 text-center">
                    <span className={`badge ${getStressBadge(studentSessions[0]?.stressLevel || "N/A")} fs-6`}>
                      {studentSessions[0]?.stressLevel || "N/A"}
                    </span>
                    <div className="text-muted small mt-1">Last Stress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0">
            <i className="bi bi-clock-history me-2 text-info"></i>
            Mentoring History
          </h6>
          <button className="btn btn-sm btn-info text-white" onClick={() => navigate("/mentoring/add")}>
            <i className="bi bi-plus-lg me-1"></i>
            Add Session
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr className="bg-light">
                  <th className="ps-4 py-3">Date</th>
                  <th className="py-3">Mentor</th>
                  <th className="py-3">Attendance</th>
                  <th className="py-3">Stress Level</th>
                  <th className="py-3 pe-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentSessions.map((s) => (
                  <tr key={s.id}>
                    <td className="ps-4">
                      <i className="bi bi-calendar3 text-muted me-1"></i>
                      {s.date}
                    </td>
                    <td>{s.mentorName}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.attendance === "Present" ? "bg-success" : "bg-danger"
                        }`}
                      >
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

                {studentSessions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-5">
                      <i className="bi bi-calendar-x fs-1 d-block mb-2"></i>
                      No mentoring sessions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1) !important; }
        .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1) !important; }
        .bg-warning-subtle { background-color: rgba(255, 193, 7, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default MyStudent;
