import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  Plus,
  Activity,
  AlertCircle,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const kpiCards = [
    { label: "Total Students", value: 320, icon: Users, color: "primary", trend: "+12%" },
    { label: "Total Mentors", value: 24, icon: UserCheck, color: "success", trend: "+3%" },
    { label: "Pending Sessions", value: 12, icon: Clock, color: "warning", trend: "-5%" },
    { label: "High Stress Alerts", value: 5, icon: AlertCircle, color: "danger", trend: "+2" }
  ];

  const quickActions = [
    { label: "Add Student", desc: "Register a new student", icon: Plus, path: "/students", color: "primary" },
    { label: "Mentors", desc: "View mentor status", icon: UserCheck, path: "/mentors", color: "success" },
    { label: "Sessions", desc: "Review activities", icon: Calendar, path: "/mentoring", color: "info" },
    { label: "Reports", desc: "Analytics & Insights", icon: TrendingUp, path: "/reports", color: "warning" }
  ];

  const activities = [
    { text: "Mentoring session added for Anjali Patel", time: "2 hours ago" },
    { text: "New student registered: Vikram Singh", time: "5 hours ago" },
    { text: "Dr. Gupta updated profile details", time: "1 day ago" }
  ];

  return (
    <div className="container-fluid p-4">

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 animate-slide-up">
        <div>
          <h2 className="mb-1">Admin Dashboard</h2>
          <p className="text-muted">Welcome back, here's what's happening today.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center shadow-lg hover-scale" onClick={() => navigate("/mentoring/add")}>
          <Plus size={18} className="me-2" />
          Create New Session
        </button>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div className="col-xl-3 col-md-6" key={idx}>
              <div className="glass-card p-4 h-100 position-relative overflow-hidden">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="text-muted small fw-bold text-uppercase mb-2">{card.label}</div>
                    <h2 className="display-6 fw-bold mb-0">{card.value}</h2>
                    <div className={`mt-2 small fw-medium text-${card.color}`}>
                      {card.trend} <span className="text-muted fw-normal">vs last month</span>
                    </div>
                  </div>
                  <div className={`stat-icon-wrapper bg-soft-${card.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-4 mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>

        {/* Quick Actions */}
        <div className="col-lg-8">
          <h5 className="fw-bold mb-4">Quick Actions</h5>
          <div className="row g-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <div className="col-md-6" key={idx}>
                  <div
                    className="glass-card p-3 d-flex align-items-center cursor-pointer card-hover"
                    onClick={() => navigate(action.path)}
                  >
                    <div className={`stat-icon-wrapper bg-soft-${action.color} me-3`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-0">{action.label}</h6>
                      <small className="text-muted">{action.desc}</small>
                    </div>
                    <div className="bg-white rounded-circle p-2 shadow-sm">
                      <ChevronRight size={16} className="text-muted" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4">
          <h5 className="fw-bold mb-4">Live Activity</h5>
          <div className="glass-card p-0">
            <div className="p-4 border-bottom border-light">
              <div className="d-flex justify-content-between align-items- center">
                <span className="fw-bold">Latest Updates</span>
                <button className="btn btn-link btn-sm p-0 text-decoration-none">View All</button>
              </div>
            </div>
            <div className="list-group list-group-flush bg-transparent">
              {activities.map((activity, idx) => (
                <div className="list-group-item bg-transparent border-light p-3 d-flex align-items-start gap-3" key={idx}>
                  <div className="mt-1">
                    <div className="p-1 rounded-circle bg-primary"></div>
                  </div>
                  <div>
                    <p className="mb-1 text-dark small fw-medium">{activity.text}</p>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      <Clock size={12} className="me-1 inline" />
                      {activity.time}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
