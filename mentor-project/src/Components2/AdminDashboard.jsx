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
import api from "../api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = React.useState({
    totalStudents: 0,
    totalMentors: 0,
    pendingSessions: 0,
    highStressAlerts: 0
  });
  const [activities, setActivities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [studentsRes, staffRes, sessionsRes] = await Promise.all([
          api.get("/student"),
          api.get("/staff"),
          api.get("/studentmentoring")
        ]);

        const studentsData = studentsRes.data?.student || [];
        const staffData = staffRes.data?.staff || [];
        const sessionsData = sessionsRes.data?.studentMentoring || [];

        const studentsArr = Array.isArray(studentsData) ? studentsData : [studentsData];
        const staffArr = Array.isArray(staffData) ? staffData : [staffData];
        const sessionsArr = Array.isArray(sessionsData) ? sessionsData : [sessionsData];

        // Pending sessions (either not attended yet, or date is future)
        const pendingCount = sessionsArr.filter(s => {
           if (!s.AttendanceStatus) return true;
           // If scheduled meeting date is in the future
           if (s.ScheduledMeetingDate && new Date(s.ScheduledMeetingDate) > new Date()) return true;
           return false;
        }).length;

        // High stress alerts
        const highStressCount = sessionsArr.filter(s => 
          s.StressLevel && s.StressLevel.toLowerCase() === 'high'
        ).length;

        setStats({
          totalStudents: studentsArr.length,
          totalMentors: staffArr.length,
          pendingSessions: pendingCount,
          highStressAlerts: highStressCount
        });

        // Parse activities (last 3 sessions)
        const sortedSessions = [...sessionsArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
        
        // Enhance with student names if possible
        const studentMap = {};
        studentsArr.forEach(s => { studentMap[s.studentId] = s.StudentName; });

        // Retrieve mentor assignments to find the student ID for a given studentMentorId
        // For a true live activity feed we would need student mentor mappings. We will do our best or show generic text.
        // Actually since we don't have the assignments here, we will show "Mentoring session added" and date.
        
        const recentActivities = sortedSessions.map(session => {
           const timeAgo = Math.floor((new Date() - new Date(session.createdAt)) / (1000 * 60 * 60));
           const timeText = timeAgo < 24 ? `${timeAgo} hours ago` : `${Math.floor(timeAgo / 24)} days ago`;
           return {
             text: `Mentoring session recorded${session.StressLevel === 'High' ? ' (High Stress Alert)' : ''}`,
             time: timeText
           };
        });

        setActivities(recentActivities.length > 0 ? recentActivities : [
          { text: "System running smoothly. No recent sessions.", time: "Just now" }
        ]);

      } catch (err) {
        console.error("Failed to load admin dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const kpiCards = [
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "primary", trend: "" },
    { label: "Total Mentors", value: stats.totalMentors, icon: UserCheck, color: "success", trend: "" },
    { label: "Pending Sessions", value: stats.pendingSessions, icon: Clock, color: "warning", trend: "" },
    { label: "High Stress Alerts", value: stats.highStressAlerts, icon: AlertCircle, color: "danger", trend: "" }
  ];

  const quickActions = [
    { label: "Add Student", desc: "Register a new student", icon: Plus, path: "/students", color: "primary" },
    { label: "Mentors", desc: "View mentor status", icon: UserCheck, path: "/mentors", color: "success" },
    { label: "Sessions", desc: "Review activities", icon: Calendar, path: "/mentoring", color: "info" },
    { label: "Reports", desc: "Analytics & Insights", icon: TrendingUp, path: "/reports", color: "warning" }
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
                      {card.trend && <span>{card.trend} <span className="text-muted fw-normal">vs last month</span></span>}
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
