import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  UserCheck,
  Clock,
  Calendar,
  Eye,
  Plus
} from "lucide-react";

function MyStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [studentSessions, setStudentSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student details
        const studentRes = await api.get(`/student/${id}`);
        const studentData = studentRes.data;
        if (!studentData.student) {
          setError(studentData.message || "Student not found.");
          setLoading(false);
          return;
        }
        const s = studentData.student;
        // Parse Description: "department - year | Mentor: mentorName"
        let department = "N/A";
        let year = "N/A";
        let mentor = "N/A";
        if (s.Description) {
          const parts = s.Description.split(" | Mentor: ");
          if (parts[1]) mentor = parts[1];
          const deptYear = parts[0].split(" - ");
          if (deptYear[0]) department = deptYear[0];
          if (deptYear[1]) year = deptYear[1];
        }
        setStudent({
          studentId: s.studentId,
          name: s.StudentName || "Unknown",
          enrollment: String(s.EnrollmentNo || ""),
          email: s.EmailAddress || "N/A",
          mobile: String(s.MobileNo || "N/A"),
          department,
          year,
          mentor
        });

        // Fetch mentoring sessions for this student
        const sessionsRes = await api.get(`/studentMentoring`);
        const sessionsData = sessionsRes.data;
        if (sessionsData.studentMentoring) {
          const filtered = sessionsData.studentMentoring.filter(
            (session) => String(session.StudentMentorId) === String(s.studentId)
          );
          const mapped = filtered.map((session) => ({
            id: session._id,
            date: session.DateOfMentoring ? new Date(session.DateOfMentoring).toLocaleDateString() : "N/A",
            mentorName: session.Description || mentor,
            attendance: session.AttendanceStatus || "N/A",
            stressLevel: session.StressLevel || "N/A",
            issues: session.IssuesDiscussed || ""
          }));
          setStudentSessions(mapped);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Server error. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getStressBadge = (level) => {
    const badges = {
      Low: "bg-success",
      Medium: "bg-warning text-dark",
      High: "bg-danger"
    };
    return badges[level] || "bg-secondary";
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-light rounded-circle p-2 me-3 shadow-sm border" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} className="text-muted" />
          </button>
          <div>
            <h3 className="fw-bold mb-1 text-brand-gradient">Student Profile</h3>
            <p className="text-muted mb-0">Loading student data...</p>
          </div>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-light rounded-circle p-2 me-3 shadow-sm border" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} className="text-muted" />
          </button>
          <div>
            <h3 className="fw-bold mb-1 text-brand-gradient">Student Profile</h3>
            <p className="text-muted mb-0">Detailed academic and mentoring overview</p>
          </div>
        </div>
        <div className="text-center py-5 text-danger">
          <p>{error || "Student not found."}</p>
          <button className="btn btn-outline-primary mt-2" onClick={() => navigate("/students")}>
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4 animate-slide-up">
        <button className="btn btn-light rounded-circle p-2 me-3 shadow-sm border" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="text-muted" />
        </button>
        <div>
          <h3 className="fw-bold mb-1 text-brand-gradient">Student Profile</h3>
          <p className="text-muted mb-0">Detailed academic and mentoring overview</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="glass-card mb-4 p-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="row">
          <div className="col-lg-8 border-end border-light">
            <div className="d-flex align-items-center gap-4 mb-4">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold shadow-lg"
                style={{ width: "80px", height: "80px", fontSize: "2rem", background: "var(--brand-gradient)" }}
              >
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 className="fw-bold mb-1 text-dark">{student.name}</h3>
                <div className="d-flex gap-2">
                  <span className="badge bg-light text-dark border">{student.enrollment}</span>
                  <span className="badge bg-info-subtle text-info border border-info-subtle">{student.year}</span>
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 h-100">
                  <BookOpen className="text-brand flex-shrink-0" size={24} />
                  <div>
                    <div className="text-muted small text-uppercase fw-bold">Department</div>
                    <div className="fw-bold text-dark">{student.department}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 h-100">
                  <UserCheck className="text-success flex-shrink-0" size={24} />
                  <div>
                    <div className="text-muted small text-uppercase fw-bold">Mentor</div>
                    <div className="fw-bold text-dark">{student.mentor}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 h-100">
                  <Mail className="text-muted flex-shrink-0" size={24} />
                  <div>
                    <div className="text-muted small text-uppercase fw-bold">Email</div>
                    <div className="fw-bold text-dark">{student.email}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 h-100">
                  <Phone className="text-muted flex-shrink-0" size={24} />
                  <div>
                    <div className="text-muted small text-uppercase fw-bold">Mobile</div>
                    <div className="fw-bold text-dark">{student.mobile}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 ps-lg-4 mt-4 mt-lg-0">
            <h6 className="fw-bold text-muted text-uppercase mb-3">Quick Stats</h6>
            <div className="row g-3">
              <div className="col-6">
                <div className="bg-soft-primary rounded-3 p-3 text-center h-100 border border-light">
                  <div className="display-6 fw-bold text-primary">{studentSessions.length}</div>
                  <div className="text-muted small fw-bold">Total Sessions</div>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-soft-warning rounded-3 p-3 text-center h-100 border border-light">
                  <span className={`badge ${getStressBadge(studentSessions[0]?.stressLevel || "N/A")} fs-6 mb-2`}>
                    {studentSessions[0]?.stressLevel || "N/A"}
                  </span>
                  <div className="text-muted small fw-bold">Last Stress Lvl</div>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-100 mt-4 shadow-sm" onClick={() => navigate(`/mentoring/add?studentId=${student.studentId}&studentName=${encodeURIComponent(student.name)}`)}>
              <Plus size={18} className="me-2" /> Log Session
            </button>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="glass-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="card-header bg-transparent border-0 pt-4 px-4 pb-0">
          <h5 className="fw-bold mb-0">Mentoring History</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4 py-3 text-muted small text-uppercase fw-bold">Date</th>
                  <th className="py-3 text-muted small text-uppercase fw-bold">Mentor</th>
                  <th className="py-3 text-muted small text-uppercase fw-bold">Attendance</th>
                  <th className="py-3 text-muted small text-uppercase fw-bold">Stress Level</th>
                  <th className="py-3 pe-4 text-end text-muted small text-uppercase fw-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentSessions.length > 0 ? studentSessions.map((s) => (
                  <tr key={s.id}>
                    <td className="ps-4 text-dark fw-medium">
                      <div className="d-flex align-items-center gap-2">
                        <Calendar size={16} className="text-muted" />
                        {s.date}
                      </div>
                    </td>
                    <td>{s.mentorName}</td>
                    <td>
                      <span className={`badge ${s.attendance === "Present" ? "bg-success-subtle text-success border border-success-subtle" : "bg-danger-subtle text-danger border border-danger-subtle"} rounded-pill`}>
                        {s.attendance}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStressBadge(s.stressLevel)} rounded-pill`}>
                        {s.stressLevel}
                      </span>
                    </td>
                    <td className="pe-4 text-end">
                      <button
                        className="btn btn-sm btn-light border shadow-sm text-primary"
                        onClick={() => navigate(`/mentoring/view/${s.id}`)}
                      >
                        <Eye size={16} className="me-1" /> View
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No mentoring sessions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .bg-success-subtle { background-color: #dcfce7 !important; color: #166534 !important; border-color: #bbf7d0 !important; }
        .bg-danger-subtle { background-color: #fee2e2 !important; color: #991b1b !important; border-color: #fecaca !important; }
        .bg-info-subtle { background-color: #e0f2fe !important; color: #0369a1 !important; border-color: #bae6fd !important; }
      `}</style>
    </div>
  );
}

export default MyStudent;
