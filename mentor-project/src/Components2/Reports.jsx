import React, { useState, useEffect } from "react";
import api from "../api";
import {
  BarChart2,
  Download,
  Users,
  UserCheck,
  TrendingUp,
  Activity,
  PieChart,
  Calendar,
  Filter,
  Printer
} from "lucide-react";

function Reports() {
  const [filterDept, setFilterDept] = useState("All");
  
  const [mentoringSessions, setMentoringSessions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsRes, mentorsRes, studentsRes] = await Promise.all([
          api.get("/studentmentoring"),
          api.get("/staff"),
          api.get("/student")
        ]);
        
        const sessionsData = sessionsRes.data.studentMentoring || [];
        const mentorsData = mentorsRes.data.staff || [];
        let studentsData = [];
        if (Array.isArray(studentsRes.data)) {
          studentsData = studentsRes.data;
        } else if (Array.isArray(studentsRes.data.student)) {
          studentsData = studentsRes.data.student;
        } else if (studentsRes.data.student) {
          studentsData = [studentsRes.data.student];
        }

        setMentoringSessions(sessionsData);
        setMentors(mentorsData);
        setStudents(studentsData);
      } catch (error) {
        console.error("Failed to fetch reports data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSessions = mentoringSessions.length;
  const presentCount = mentoringSessions.filter(s => s.AttendanceStatus === "Present" || s.AttendanceStatus === "Present").length;
  const attendanceRate = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;

  // Derived Data
  const stressCount = {
    Low: mentoringSessions.filter((s) => s.StressLevel === "Low").length,
    Medium: mentoringSessions.filter((s) => s.StressLevel === "Medium").length,
    High: mentoringSessions.filter((s) => s.StressLevel === "High").length
  };

  const monthlyData = [
    { month: "Jan", count: 12, growth: "+10%" },
    { month: "Feb", count: 18, growth: "+15%" },
    { month: "Mar", count: 25, growth: "+8%" },
    { month: "Apr", count: 20, growth: "-5%" }
  ];
  const maxMonth = Math.max(...monthlyData.map(m => m.count));

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container-fluid p-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">

      {/* Header & Controls */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 animate-slide-up no-print">
        <div className="mb-3 mb-md-0">
          <h3 className="fw-bold mb-1 text-brand-gradient">Analytics Dashboard</h3>
          <p className="text-muted mb-0">Real-time insights into mentoring effectiveness</p>
        </div>
        <div className="d-flex gap-3">
          <div className="d-flex align-items-center bg-white rounded-3 shadow-sm border p-1">
            <Filter size={16} className="text-muted ms-2" />
            <select
              className="form-select border-0 bg-transparent py-1"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Info Tech</option>
            </select>
          </div>
          <button className="btn btn-outline-dark d-flex align-items-center bg-white shadow-sm" onClick={handlePrint}>
            <Printer size={18} className="me-2" /> Print Report
          </button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="row g-4 mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {/* Total Students */}
        <div className="col-md-3">
          <div className="glass-card p-4 h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <p className="text-muted small fw-bold text-uppercase mb-1">Total Students</p>
                <h2 className="fw-bold text-dark mb-0">{students.length}</h2>
              </div>
              <div className="bg-soft-primary p-2 rounded-circle">
                <Users size={24} className="text-primary" />
              </div>
            </div>
            <div className="d-flex align-items-center text-success small fw-bold">
              <TrendingUp size={14} className="me-1" /> Active <span className="text-muted fw-normal ms-1">students</span>
            </div>
          </div>
        </div>

        {/* Active Mentors */}
        <div className="col-md-3">
          <div className="glass-card p-4 h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <p className="text-muted small fw-bold text-uppercase mb-1">Active Mentors</p>
                <h2 className="fw-bold text-dark mb-0">{mentors.length}</h2>
              </div>
              <div className="bg-soft-success p-2 rounded-circle">
                <UserCheck size={24} className="text-success" />
              </div>
            </div>
            <div className="text-muted small">
              <span className="text-dark fw-bold">100%</span> active
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="col-md-3">
          <div className="glass-card p-4 h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <p className="text-muted small fw-bold text-uppercase mb-1">Total Sessions</p>
                <h2 className="fw-bold text-dark mb-0">{totalSessions}</h2>
              </div>
              <div className="bg-soft-info p-2 rounded-circle">
                <Calendar size={24} className="text-info" />
              </div>
            </div>
            <div className="d-flex align-items-center text-success small fw-bold">
              <TrendingUp size={14} className="me-1" /> Logged <span className="text-muted fw-normal ms-1">sessions</span>
            </div>
          </div>
        </div>

        {/* KPI: Attendance */}
        <div className="col-md-3">
          <div className="glass-card p-4 h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <p className="text-muted small fw-bold text-uppercase mb-1">Attendance Rate</p>
                <h2 className="fw-bold text-dark mb-0">{attendanceRate}%</h2>
              </div>
              <div className="bg-soft-warning p-2 rounded-circle">
                <Activity size={24} className="text-warning" />
              </div>
            </div>
            <div className="progress" style={{ height: "6px" }}>
              <div className="progress-bar bg-warning" style={{ width: `${attendanceRate}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>

        {/* Main Chart: Monthly Trends */}
        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">
            <h6 className="fw-bold text-dark mb-4 d-flex align-items-center">
              <BarChart2 size={20} className="me-2 text-brand" /> Session Volume Trends
            </h6>

            <div className="d-flex align-items-end justify-content-between h-75 px-3">
              {monthlyData.map((m, i) => (
                <div key={i} className="text-center w-100">
                  <div className="d-flex justify-content-center align-items-end mb-2" style={{ height: "200px" }}>
                    <div
                      className="bg-primary rounded-top shadow-sm position-relative group-hover"
                      style={{
                        width: "40%",
                        height: `${(m.count / maxMonth) * 100}%`,
                        opacity: 0.8,
                        transition: "height 1s ease"
                      }}
                    >
                      <div className="position-absolute bottom-100 start-50 translate-middle-x mb-2 small fw-bold text-dark">
                        {m.count}
                      </div>
                    </div>
                  </div>
                  <div className="text-muted small fw-bold">{m.month}</div>
                  <div className={`tiny-text ${m.growth.startsWith('+') ? 'text-success' : 'text-danger'}`}>{m.growth}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stress Distribution Donut Logic (CSS Conic Gradient) */}
        <div className="col-lg-4">
          <div className="glass-card p-4 h-100">
            <h6 className="fw-bold text-dark mb-4 d-flex align-items-center">
              <PieChart size={20} className="me-2 text-danger" /> Stress Analysis
            </h6>

            <div className="d-flex flex-column justify-content-center h-75">
              {["Low", "Medium", "High"].map(level => {
                const count = stressCount[level];
                const pct = totalSessions > 0 ? Math.round((count / totalSessions) * 100) : 0;
                const color = level === "High" ? "danger" : level === "Medium" ? "warning" : "success";

                return (
                  <div key={level} className="mb-4">
                    <div className="d-flex justify-content-between text-muted small fw-bold mb-1">
                      <span>{level}</span>
                      <span className={`text-${color}`}>{count} Students ({pct}%)</span>
                    </div>
                    <div className="progress" style={{ height: "10px", backgroundColor: "rgba(0,0,0,0.05)" }}>
                      <div className={`progress-bar bg-${color}`} style={{ width: `${pct}%`, transition: "width 1.5s ease" }}></div>
                    </div>
                  </div>
                );
              })}

              <div className="alert alert-light border small text-muted mt-2">
                <i className="bi bi-info-circle me-1"></i>
                <strong> Insight:</strong> Stress levels tracked based on mentoring session reports.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mentor Performance Table */}
      <div className="glass-card p-0 overflow-hidden animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="p-4 border-bottom border-light">
          <h6 className="fw-bold text-dark mb-0">Mentor Performance & Availability</h6>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3 text-muted small text-uppercase fw-bold">Mentor Name</th>
                <th className="py-3 text-muted small text-uppercase fw-bold">Designation</th>
                <th className="py-3 text-muted small text-uppercase fw-bold">Student Load</th>
                <th className="py-3 text-muted small text-uppercase fw-bold">Status</th>
                <th className="pe-4 py-3 text-end text-muted small text-uppercase fw-bold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map(m => (
                <tr key={m._id || m.StaffID}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle bg-soft-primary text-primary fw-bold" style={{ width: "36px", height: "36px" }}>
                        {(m.StaffName || m.name || "?").charAt(0)}
                      </div>
                      <span className="fw-semibold text-dark">{m.StaffName || m.name}</span>
                    </div>
                  </td>
                  <td className="text-muted">{m.Department || m.department || "General"} Lead</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: "6px", width: "80px" }}>
                        <div className="progress-bar bg-info" style={{ width: `${((m.AssignStudents ? m.AssignStudents.length : 0) / 40) * 100}%` }}></div>
                      </div>
                      <span className="small text-muted">{m.AssignStudents ? m.AssignStudents.length : 0}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge bg-${(m.Status || "Active") === "Active" ? "success" : "secondary"}-subtle text-${(m.Status || "Active") === "Active" ? "success" : "secondary"} border border-${(m.Status || "Active") === "Active" ? "success" : "secondary"}-subtle`}>
                      {m.Status || m.status || "Active"}
                    </span>
                  </td>
                  <td className="pe-4 text-end text-warning fw-bold">
                    4.8 <span className="text-muted fw-normal">/ 5.0</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {mentors.length === 0 && (
            <div className="text-center py-4 text-muted">
              No mentors found
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media print {
            .no-print { display: none !important; }
            .glass-card { box-shadow: none !important; border: 1px solid #ddd !important; }
            body { background: white !important; }
        }
        .tiny-text { font-size: 0.7rem; font-weight: 700; margin-top: 4px; }
      `}</style>
    </div>
  );
}

export default Reports;
