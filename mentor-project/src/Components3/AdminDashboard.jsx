import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const kpiCards = [
    { label: "Total Students", value: 320, icon: "bi-people-fill", color: "primary", trend: "+12%" },
    { label: "Total Mentors", value: 24, icon: "bi-person-badge-fill", color: "success", trend: "+3%" },
    { label: "Pending Sessions", value: 12, icon: "bi-calendar-x", color: "warning", trend: "-5%" },
    { label: "High Stress Alerts", value: 5, icon: "bi-exclamation-triangle-fill", color: "danger", trend: "+2" }
  ];

  const quickActions = [
    { label: "Students", desc: "View and manage all students", icon: "bi-people", path: "/students", color: "primary" },
    { label: "Mentors", desc: "View mentor workload and details", icon: "bi-person-badge", path: "/mentors", color: "success" },
    { label: "Sessions", desc: "Review all mentoring activities", icon: "bi-calendar-check", path: "/mentoring", color: "info" },
    { label: "Reports", desc: "Analytics and insights", icon: "bi-bar-chart-line", path: "/reports", color: "warning" }
  ];

  const alerts = [
    { text: "Rahul Sharma – High stress reported", type: "danger" },
    { text: "3 mentoring sessions overdue", type: "warning" },
    { text: "1 mentor with no sessions this month", type: "info" }
  ];

  const activities = [
    { text: "Mentoring session added for Anjali Patel", time: "2 hours ago" },
    { text: "New student registered", time: "5 hours ago" },
    { text: "Mentor profile updated", time: "1 day ago" }
  ];

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            <i className="bi bi-speedometer2 me-2 text-primary"></i>
            Admin Dashboard
          </h4>
          <p className="text-muted mb-0">System overview and quick actions</p>
        </div>
        <div>
          <button className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>
            Quick Add
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        {kpiCards.map((card, idx) => (
          <div className="col-lg-3 col-md-6" key={idx}>
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1 small text-uppercase">{card.label}</p>
                    <h3 className="fw-bold mb-0">{card.value}</h3>
                    <span className={`badge bg-${card.color}-subtle text-${card.color} mt-2`}>
                      {card.trend}
                    </span>
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

      {/* Quick Actions */}
      <div className="row g-4 mb-4">
        {quickActions.map((action, idx) => (
          <div className="col-lg-3 col-md-6" key={idx}>
            <div
              className="card border-0 shadow-sm h-100 text-center"
              role="button"
              onClick={() => navigate(action.path)}
              style={{ borderRadius: "16px", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div className="card-body">
                <div
                  className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-${action.color}-subtle text-${action.color} mb-3`}
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className={`bi ${action.icon} fs-3`}></i>
                </div>
                <h6 className="fw-bold">{action.label}</h6>
                <p className="text-muted small mb-0">{action.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Alerts & Notifications */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
            <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
              <h6 className="fw-bold mb-0">
                <i className="bi bi-bell me-2 text-danger"></i>
                Attention Required
              </h6>
            </div>
            <div className="card-body px-4">
              <div className="list-group list-group-flush">
                {alerts.map((alert, idx) => (
                  <div className="list-group-item px-0 py-3 border-bottom-0 d-flex align-items-center gap-3" key={idx}>
                    <div className={`p-1 rounded-circle bg-${alert.type}`}></div>
                    <span className="mb-0">{alert.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
            <div className="card-header bg-transparent border-0 pt-4 pb-0 px-4">
              <h6 className="fw-bold mb-0">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                Recent Activity
              </h6>
            </div>
            <div className="card-body px-4">
              <div className="list-group list-group-flush">
                {activities.map((act, idx) => (
                  <div className="list-group-item px-0 py-3 border-bottom-0" key={idx}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{act.text}</span>
                      <small className="text-muted">{act.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1) !important; }
        .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
        .bg-warning-subtle { background-color: rgba(255, 193, 7, 0.1) !important; }
        .bg-danger-subtle { background-color: rgba(220, 53, 69, 0.1) !important; }
        .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
