'use client';

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import {
  ArrowLeft,
  User,
  UserCheck,
  Calendar,
  Clock,
  AlertTriangle,
  FileText,
  ListChecks,
  Pencil,
  Printer,
  Trash2,
  Plus
} from "lucide-react";

function ViewMentoringSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const [sessionRes, studentsRes, mappingsRes, staffRes] = await Promise.all([
          api.get(`/studentmentoring/${id}`),
          api.get("/student"),
          api.get("/studentmentor"),
          api.get("/staff")
        ]);
        const sessionData = sessionRes.data;
        const studentsData = studentsRes.data;
        const mappingsData = mappingsRes.data;
        const staffData = staffRes.data;

        // Build a map of studentId -> StudentName
        const studentsArr = Array.isArray(studentsData) ? studentsData : studentsData.student ? (Array.isArray(studentsData.student) ? studentsData.student : [studentsData.student]) : [];
        const studentMap = {};
        studentsArr.forEach(s => {
          studentMap[s.studentId] = s.StudentName;
        });

        // Build a map of StaffID -> StaffName
        const staffArr = Array.isArray(staffData) ? staffData : staffData.staff ? (Array.isArray(staffData.staff) ? staffData.staff : [staffData.staff]) : [];
        const mentorMap = {};
        staffArr.forEach(s => {
          mentorMap[s.StaffID] = s.StaffName;
        });

        // Build a map of StudentMentorId -> { studentId, staffId }
        const mappingsArr = Array.isArray(mappingsData) ? mappingsData : mappingsData.studentMentor ? (Array.isArray(mappingsData.studentMentor) ? mappingsData.studentMentor : [mappingsData.studentMentor]) : [];
        const mappingMap = {};
        mappingsArr.forEach(m => {
          mappingMap[m.StudentMentorId] = {
             studentId: m.StudentId,
             staffId: m.StaffId
          };
        });

        if (sessionData.studentMentoring) {
          const s = sessionData.studentMentoring;
          const mappingData = mappingMap[s.StudentMentorId];
          setSession({
            id: s._id,
            studentName: mappingData && studentMap[mappingData.studentId] ? studentMap[mappingData.studentId] : `Student #${s.StudentMentorId}`,
            mentorName: mappingData && mentorMap[mappingData.staffId] ? mentorMap[mappingData.staffId] : "Mentor",
            date: s.DateOfMentoring ? new Date(s.DateOfMentoring).toLocaleDateString() : "N/A",
            attendance: s.AttendanceStatus || "N/A",
            stressLevel: s.StressLevel || "Low",
            issues: s.IssuesDiscussed || "",
            agenda: s.MentoringMeetingAgenda || ""
          });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-2">Loading session details...</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="p-4 container">
        <div className="alert alert-warning d-flex align-items-center shadow-sm" role="alert">
          <AlertTriangle className="me-2" size={20} />
          <div>Session with ID {id} not found.</div>
        </div>
        <button className="btn btn-outline-primary" onClick={() => navigate("/mentoring")}>
          <ArrowLeft size={18} className="me-2" />
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
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4 animate-slide-up">
        <button className="btn btn-light rounded-circle p-2 me-3 shadow-sm border" onClick={() => navigate("/mentoring")}>
          <ArrowLeft size={20} className="text-muted" />
        </button>
        <div>
          <h3 className="fw-bold mb-1 text-brand-gradient">Session Details</h3>
          <p className="text-muted mb-0">Review complete discussion record</p>
        </div>
      </div>

      <div className="row g-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {/* Main Info */}
        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">

            <div className="row g-4 mb-4">
              {/* Student Info */}
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 h-100">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold shadow-sm flex-shrink-0"
                    style={{ width: "48px", height: "48px", background: "var(--brand-gradient)" }}
                  >
                    {session.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-muted small text-uppercase fw-bold">Student</div>
                    <div className="fw-bold text-dark">{session.studentName}</div>
                  </div>
                </div>
              </div>

              {/* Mentor Info */}
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 h-100">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold shadow-sm flex-shrink-0"
                    style={{ width: "48px", height: "48px" }}
                  >
                    {session.mentorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-muted small text-uppercase fw-bold">Mentor</div>
                    <div className="fw-bold text-dark">{session.mentorName}</div>
                  </div>
                </div>
              </div>
            </div>

            <h6 className="fw-bold text-muted text-uppercase mb-3 mt-4 border-bottom pb-2">Session Metadata</h6>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="text-muted small">Date</div>
                <div className="fw-semibold d-flex align-items-center gap-2">
                  <Calendar size={16} className="text-primary" /> {session.date}
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Attendance</div>
                <span className={`badge ${session.attendance === "Present" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"} border ms-0 mt-1`}>
                  {session.attendance}
                </span>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Stress Level</div>
                <span className={`badge ${getStressBadge(session.stressLevel)} mt-1`}>
                  {session.stressLevel}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-muted text-uppercase mb-2 d-flex align-items-center gap-2">
                <FileText size={18} className="text-brand" /> Issues Discussed
              </h6>
              <div className="p-3 bg-light rounded-3 border border-light text-dark">
                {session.issues || "No specific issues recorded."}
              </div>
            </div>

            <div className="mb-2">
              <h6 className="fw-bold text-muted text-uppercase mb-2 d-flex align-items-center gap-2">
                <ListChecks size={18} className="text-success" /> Agenda / Action Items
              </h6>
              <div className="p-3 bg-light rounded-3 border border-light text-dark">
                {session.agenda || "No agenda items recorded."}
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h6 className="fw-bold text-dark mb-3">Quick Actions</h6>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary d-flex align-items-center justify-content-center" onClick={() => navigate("/mentoring/add", { state: { editId: session.id, sessionData: session } })}>
                <Pencil size={18} className="me-2" /> Edit Session
              </button>
              <button className="btn btn-outline-success d-flex align-items-center justify-content-center" onClick={() => navigate("/mentoring/add")}>
                <Plus size={18} className="me-2" /> Add Follow-up
              </button>
              <button className="btn btn-outline-dark d-flex align-items-center justify-content-center" onClick={() => window.print()}>
                <Printer size={18} className="me-2" /> Print Report
              </button>
              <hr className="my-2" />
              <button className="btn btn-outline-danger d-flex align-items-center justify-content-center" onClick={async () => {
                if (!window.confirm("Are you sure you want to delete this session? This action cannot be undone.")) return;
                try {
                  const res = await api.delete(`/studentmentoring/${session.id}`);
                  if (res.status === 200) {
                    navigate("/mentoring");
                  } else {
                    const data = res.data;
                    alert(data.message || "Failed to delete session.");
                  }
                } catch (err) {
                  console.error("Delete error:", err);
                  alert("An error occurred while deleting the session.");
                }
              }}>
                <Trash2 size={18} className="me-2" /> Delete Record
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-success-subtle { background-color: #dcfce7 !important; color: #166534 !important; }
        .bg-danger-subtle { background-color: #fee2e2 !important; color: #991b1b !important; }
      `}</style>
    </div>
  );
}

export default ViewMentoringSession;
