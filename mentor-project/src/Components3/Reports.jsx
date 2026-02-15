import React from "react";
import { mentoringSessions, mentors, students } from "../data/dummyData";

function Reports() {
  const totalSessions = mentoringSessions.length;

  const stressCount = {
    Low: mentoringSessions.filter((s) => s.stressLevel === "Low").length,
    Medium: mentoringSessions.filter((s) => s.stressLevel === "Medium").length,
    High: mentoringSessions.filter((s) => s.stressLevel === "High").length
  };

  const attendanceCount = {
    Present: mentoringSessions.filter((s) => s.attendance === "Present").length,
    Absent: mentoringSessions.filter((s) => s.attendance === "Absent").length
  };

  const monthlySessions = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 25 },
    { month: "Apr", count: 20 }
  ];

  const maxCount = Math.max(...monthlySessions.map((m) => m.count));

  const attendanceRate = Math.round((attendanceCount.Present / totalSessions) * 100);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold mb-1">
            <i className="bi bi-bar-chart-line-fill me-2 text-warning"></i>
            Reports & Analytics
          </h4>
          <p className="text-muted mb-0">High-level insights for mentoring performance</p>
        </div>
        <button className="btn btn-warning">
          <i className="bi bi-download me-2"></i>
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        {[
          { label: "Total Students", value: students.length, icon: "bi-people-fill", color: "primary" },
          { label: "Total Mentors", value: mentors.length, icon: "bi-person-badge-fill", color: "success" },
          { label: "Total Sessions", value: totalSessions, icon: "bi-calendar-check-fill", color: "info" },
          { label: "Attendance Rate", value: `${attendanceRate}%`, icon: "bi-graph-up-arrow", color: "warning" }
        ].map((card, idx) => (
          <div className="col-lg-3 col-md-6" key={idx}>
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1 small text-uppercase">{card.label}</p>
                    <h3 className="fw-bold mb-0">{card.value}</h3>
                  </div>
                  <div
                    className={`d-flex align-items-center justify-content-center rounded-3 bg-${card.color}-subtle`}
                    style={{ width: "56px", height: "56px" }}
                  >
                    <i className={`bi ${card.icon} fs-4 text-${card.color}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        {/* Monthly Trend */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
            <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
              <h6 className="fw-bold mb-0">
                <i className="bi bi-graph-up me-2 text-primary"></i>
                Mentoring Sessions Trend
              </h6>
            </div>
            <div className="card-body">
              {monthlySessions.map((m) => (
                <div key={m.month} className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-semibold">{m.month}</span>
                    <span className="text-muted">{m.count} sessions</span>
                  </div>
                  <div className="progress" style={{ height: "12px", borderRadius: "6px" }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{
                        width: `${(m.count / maxCount) * 100}%`,
                        borderRadius: "6px"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Breakdown */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
            <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
              <h6 className="fw-bold mb-0">
                <i className="bi bi-pie-chart me-2 text-success"></i>
                Attendance
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center gap-4 mb-4">
                <div className="text-center">
                  <div className="display-5 fw-bold text-success">{attendanceCount.Present}</div>
                  <div className="text-muted small">Present</div>
                </div>
                <div className="text-center">
                  <div className="display-5 fw-bold text-secondary">{attendanceCount.Absent}</div>
                  <div className="text-muted small">Absent</div>
                </div>
              </div>
              <div className="progress" style={{ height: "16px", borderRadius: "8px" }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${attendanceRate}%` }}
                ></div>
                <div 
                  className="progress-bar bg-secondary" 
                  style={{ width: `${100 - attendanceRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stress Distribution */}
      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
            <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
              <h6 className="fw-bold mb-0">
                <i className="bi bi-heart-pulse me-2 text-danger"></i>
                Student Stress Distribution
              </h6>
            </div>
            <div className="card-body">
              <div className="row text-center mb-3">
                <div className="col-4">
                   <div className="mb-1 text-success fw-bold">Low</div>
                   <h3>{stressCount.Low}</h3>
                </div>
                <div className="col-4">
                   <div className="mb-1 text-warning fw-bold">Medium</div>
                   <h3>{stressCount.Medium}</h3>
                </div>
                <div className="col-4">
                   <div className="mb-1 text-danger fw-bold">High</div>
                   <h3>{stressCount.High}</h3>
                </div>
              </div>
              
              <div className="progress" style={{ height: "20px", borderRadius: "10px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${(stressCount.Low / totalSessions) * 100}%` }}
                ></div>
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${(stressCount.Medium / totalSessions) * 100}%` }}
                ></div>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: `${(stressCount.High / totalSessions) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1) !important; }
        .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
        .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1) !important; }
        .bg-warning-subtle { background-color: rgba(255, 193, 7, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default Reports;
