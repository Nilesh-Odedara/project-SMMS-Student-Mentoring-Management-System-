import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mentoringSessions } from "../data/dummyData";

function ViewMentoringSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = mentoringSessions.find((s) => s.id === Number(id));

  if (!session) {
    return (
      <div className="p-4">
        <div className="alert alert-warning" style={{ borderRadius: "12px" }}>
          <i className="bi bi-exclamation-triangle me-2"></i>
          Session not found
        </div>
        <button className="btn btn-outline-primary" onClick={() => navigate("/mentoring")}>
          <i className="bi bi-arrow-left me-1"></i>
          Back to Sessions
        </button>
      </div>
    );
  }

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
        <button className="btn btn-link text-muted p-0 mb-2" onClick={() => navigate("/mentoring")}>
          <i className="bi bi-arrow-left me-1"></i>
          Back to Sessions
        </button>
        <h4 className="fw-bold mb-1">
          <i className="bi bi-calendar-check-fill me-2 text-info"></i>
          Session Details
        </h4>
        <p className="text-muted mb-0">View complete session information</p>
      </div>

      <div className="row g-4">
        {/* Main Info */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <div className="row g-4">
                {/* Student Info */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
                      style={{ width: "50px", height: "50px" }}
                    >
                      {session.studentName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-muted small">Student</div>
                      <div className="fw-bold">{session.studentName}</div>
                    </div>
                  </div>
                </div>

                {/* Mentor Info */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold"
                      style={{ width: "50px", height: "50px" }}
                    >
                      {session.mentorName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-muted small">Mentor</div>
                      <div className="fw-bold">{session.mentorName}</div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="col-12">
                  <h6 className="fw-bold mb-3 border-bottom pb-2">Session Information</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="text-muted small">Date</div>
                      <div className="fw-semibold">
                        <i className="bi bi-calendar3 text-info me-1"></i>
                        {session.date}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-muted small">Attendance</div>
                      <span
                        className={`badge ${
                          session.attendance === "Present" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {session.attendance}
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="text-muted small">Stress Level</div>
                      <span className={`badge ${getStressBadge(session.stressLevel)}`}>
                        {session.stressLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Issues */}
                <div className="col-12">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-chat-text me-1 text-primary"></i>
                    Issues Discussed
                  </h6>
                  <div className="p-3 bg-light rounded-3">
                    {session.issues || "No issues recorded"}
                  </div>
                </div>

                {/* Agenda */}
                <div className="col-12">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-list-check me-1 text-success"></i>
                    Agenda
                  </h6>
                  <div className="p-3 bg-light rounded-3">
                    {session.agenda || "No agenda recorded"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">Quick Actions</h6>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Session
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-plus-lg me-2"></i>
                  Add Follow-up
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-printer me-2"></i>
                  Print Report
                </button>
                <button className="btn btn-outline-danger">
                  <i className="bi bi-trash me-2"></i>
                  Delete Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMentoringSession;
