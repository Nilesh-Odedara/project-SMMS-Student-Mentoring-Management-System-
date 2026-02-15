import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Flag,
  Plus,
  Search,
  MoreHorizontal,
  FileText,
  HeartHandshake
} from "lucide-react";

function MentoringSessions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [sessionsList, setSessionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  // Fetch mentoring sessions and students from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsRes, studentsRes] = await Promise.all([
          fetch("http://localhost:3000/studentmentoring"),
          fetch("http://localhost:3000/student")
        ]);
        const sessionsData = await sessionsRes.json();
        const studentsData = await studentsRes.json();

        // Build a map of studentId -> StudentName
        const studentsArr = Array.isArray(studentsData) ? studentsData : studentsData.student ? (Array.isArray(studentsData.student) ? studentsData.student : [studentsData.student]) : [];
        const studentMap = {};
        studentsArr.forEach(s => {
          studentMap[s.studentId] = s.StudentName;
        });

        if (sessionsRes.ok && sessionsData.studentMentoring) {
          const mapped = sessionsData.studentMentoring.map(s => ({
            id: s._id,
            studentName: studentMap[s.StudentMentorId] || `Student #${s.StudentMentorId}`,
            mentorName: s.Description || "N/A",
            date: s.DateOfMentoring ? new Date(s.DateOfMentoring).toLocaleDateString() : "N/A",
            attendance: s.AttendanceStatus || "N/A",
            stressLevel: s.StressLevel || "Low",
            duration: "45m",
            issues: s.IssuesDiscussed || "No issues recorded"
          }));
          setSessionsList(mapped);
        }
      } catch (err) {
        console.error("Error fetching mentoring sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter by search term
  const filteredSessions = sessionsList.filter(s =>
    s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.issues.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.mentorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStressColor = (level) => {
    switch (level) {
      case "High": return "danger";
      case "Medium": return "warning";
      default: return "success";
    }
  };

  return (
    <div className="container-fluid p-4">

      {/* Professional Brand Header */}
      <div className="d-flex justify-content-between align-items-center mb-5 animate-slide-up">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-soft-primary p-3 rounded-3">
            <HeartHandshake size={28} className="text-brand" />
          </div>
          <div>
            <h3 className="fw-bold mb-1 text-brand-gradient">Mentoring Timeline</h3>
            <p className="text-muted mb-0">
              {role === "ADMIN" ? "Track all student progress & session history" :
                role === "MENTOR" ? "Manage your mentoring sessions" : "Your personal mentoring history"}
            </p>
          </div>
        </div>
        {role !== "STUDENT" && ( // Students shouldn't log new sessions usually
          <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={() => navigate("/mentoring/add")}>
            <Plus size={18} className="me-2" />
            Log New Session
          </button>
        )}
      </div>

      <div className="row g-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>

        {/* Timeline Section */}
        <div className="col-lg-8">

          {/* Standard Search Bar */}
          <div className="position-relative mb-4">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
            <input
              type="text"
              className="form-control ps-5 py-3 shadow-sm border-0"
              placeholder="Search timeline..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: "white" }}
            />
          </div>

          <div className="timeline-wrapper">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-2">Loading sessions...</p>
              </div>
            ) : filteredSessions.length > 0 ? (
              filteredSessions.map((session, index) => (
                <div className="timeline-item position-relative ps-5 pb-5" key={session.id}>
                  {/* Timeline Connector - Standard Gray/Brand */}
                  <div className="timeline-line position-absolute start-0 top-0 bottom-0 border-start border-2 border-light ms-3"></div>
                  <div className="timeline-dot position-absolute start-0 top-0 ms-2" style={{ marginTop: "24px" }}>
                    <div className={`bg-${getStressColor(session.stressLevel)} rounded-circle p-1 border border-4 border-white shadow-sm`} style={{ width: "16px", height: "16px" }}></div>
                  </div>

                  {/* Professional Card */}
                  <div className="glass-card p-4 hover-lift">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h5 className="fw-bold mb-0 text-dark">{session.studentName}</h5>
                          <span className="badge bg-light text-muted border fw-normal">{session.duration || "45m"}</span>
                        </div>
                        <div className="text-muted small d-flex align-items-center gap-3">
                          <span><Calendar size={14} className="me-1" /> {session.date}</span>
                          <span><Clock size={14} className="me-1" /> {session.attendance}</span>
                          {/* Show Mentor Name to Admin and Student */}
                          {(role === "ADMIN" || role === "STUDENT") && (
                            <span className="text-primary fw-bold ms-auto" style={{ fontSize: "0.75rem" }}>
                              By: {session.mentorName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="dropdown">
                        <button className="btn btn-sm btn-icon text-muted" data-bs-toggle="dropdown">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-light p-3 rounded-3 mb-3 border border-light">
                      <h6 className="fw-bold small text-uppercase text-muted mb-2">Main Issues</h6>
                      <p className="mb-0 small text-dark">{session.issues}</p>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <div className={`badge bg-${getStressColor(session.stressLevel)}-subtle text-${getStressColor(session.stressLevel)} rounded-pill border border-${getStressColor(session.stressLevel)}-subtle`}>
                          <Flag size={12} className="me-1" /> Stress: {session.stressLevel}
                        </div>
                      </div>
                      <button className="btn btn-link btn-sm text-brand text-decoration-none fw-semibold" onClick={() => navigate(`/mentoring/view/${session.id}`)}>
                        View Report <FileText size={16} className="ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5 text-muted">
                <p>No sessions found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Stats - Clean Professional */}
        <div className="col-lg-4">
          <div className="glass-card p-4 mb-4 sticky-top border border-light" style={{ top: "100px" }}>
            <h5 className="fw-bold mb-4 text-dark">Summary Stats</h5>

            <div className="mb-4">
              <div className="d-flex justify-content-between text-muted small mb-1">
                <span>Sessions Completed</span>
                <span className="fw-bold text-dark">{filteredSessions.length} total</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-primary w-75 rounded-pill"></div>
              </div>
            </div>

            {role !== "STUDENT" && <div className="mb-4">
              <div className="d-flex justify-content-between text-muted small mb-1">
                <span>High Stress Cases</span>
                <span className="text-danger fw-bold">
                  {filteredSessions.filter(s => s.stressLevel === 'High').length} Critical
                </span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-danger w-25 rounded-pill"></div>
              </div>
            </div>}

            <h6 className="fw-bold mt-4 mb-3 text-dark">Upcoming Schedules</h6>
            <div className="list-group list-group-flush">
              <div className="list-group-item bg-transparent px-0 border-light">
                <div className="d-flex gap-2">
                  <div className="text-center bg-light rounded p-2" style={{ minWidth: "50px" }}>
                    <div className="small fw-bold text-muted">JAN</div>
                    <div className="fs-5 fw-bold text-dark">20</div>
                  </div>
                  <div>
                    <h6 className="fw-bold small mb-1">{role === "STUDENT" ? "Next Mentoring Session" : "Rahul Sharma"}</h6>
                    <small className="text-muted">{role === "STUDENT" ? "With Prof. Anjali" : "Follow-up on Exam prep"}</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default MentoringSessions;
