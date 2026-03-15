import React from "react";
import { useNavigate } from "react-router-dom";
// import { students, mentors } from "../data/dummyData";

function MyMentor() {
  const navigate = useNavigate();
  const mentor = mentors[0];
  const assignedStudents = students.filter((s) => s.mentor === mentor.name);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">
          <i className="bi bi-person-circle me-2 text-success"></i>
          Mentor Profile
        </h4>
        <p className="text-muted mb-0">Overview of mentor and assigned students</p>
      </div>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold"
                  style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                >
                  {mentor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="fw-bold mb-1">{mentor.name}</h4>
                  <p className="text-muted mb-2">{mentor.department}</p>
                  <span
                    className={`badge ${
                      mentor.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {mentor.status}
                  </span>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6 mb-2">
                  <i className="bi bi-envelope text-muted me-2"></i>
                  <span>{mentor.email}</span>
                </div>
                <div className="col-md-6 mb-2">
                  <i className="bi bi-telephone text-muted me-2"></i>
                  <span>{mentor.mobile}</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-success-subtle rounded-3 p-4 text-center">
                <i className="bi bi-people fs-1 text-success d-block mb-2"></i>
                <div className="display-5 fw-bold text-success">{assignedStudents.length}</div>
                <div className="text-muted">Assigned Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Students */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
          <h6 className="fw-bold mb-0">
            <i className="bi bi-people me-2 text-primary"></i>
            Assigned Students
          </h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr className="bg-light">
                  <th className="ps-4 py-3">Student</th>
                  <th className="py-3">Enrollment</th>
                  <th className="py-3">Department</th>
                  <th className="py-3">Year</th>
                  <th className="py-3 pe-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignedStudents.map((s) => (
                  <tr key={s.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary fw-bold"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {s.name.charAt(0)}
                        </div>
                        <span className="fw-semibold">{s.name}</span>
                      </div>
                    </td>
                    <td>{s.enrollment}</td>
                    <td>{s.department}</td>
                    <td>
                      <span className="badge bg-info-subtle text-info">{s.year}</span>
                    </td>
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

                {assignedStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-5">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No students assigned
                    </td>
                  </tr>
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

export default MyMentor;
