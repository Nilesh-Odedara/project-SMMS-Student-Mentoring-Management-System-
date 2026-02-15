import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Download,
  User,
  GraduationCap,
  UserCheck,
  FileText
} from "lucide-react";

function Feedback() {
  const [activeTab, setActiveTab] = useState("student");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data
  const [feedbackData] = useState([
    {
      id: 1,
      DateOfMentoring: "2025-10-10",
      StudentName: "Riya Patel",
      MentorName: "Prof. Anil Sharma",
      StudentsOpinion: "Very helpful session regarding career paths.",
      StudentRating: 5,
      StaffOpinion: "Student is attentive and curious.",
      StressLevel: "Low",
      ProgressStatus: "Good"
    },
    {
      id: 2,
      DateOfMentoring: "2025-10-12",
      StudentName: "Arjun Mehta",
      MentorName: "Prof. Sunita Verma",
      StudentsOpinion: "Need more guidance on Advanced Math concepts.",
      StudentRating: 3,
      StaffOpinion: "Needs to improve attendance regularity.",
      StressLevel: "High",
      ProgressStatus: "Needs Improvement"
    },
    {
      id: 3,
      DateOfMentoring: "2025-10-15",
      StudentName: "Sneha Gupta",
      MentorName: "Prof. Rahul Roy",
      StudentsOpinion: "The mentor explained the project scope clearly.",
      StudentRating: 4,
      StaffOpinion: "Good progress on the project.",
      StressLevel: "Medium",
      ProgressStatus: "Satisfactory"
    }
  ]);

  // Filter Data based on search
  const filteredData = feedbackData.filter(item =>
    item.StudentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.MentorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Handle Export Logic ---
  const handleExport = () => {
    const headers = ["Date", "Student Name", "Mentor Name", "Student Rating", "Student Opinion", "Stress Level", "Mentor Opinion"];
    const csvRows = [
      headers.join(','),
      ...feedbackData.map(row => [
        row.DateOfMentoring,
        row.StudentName,
        row.MentorName,
        row.StudentRating,
        `"${row.StudentsOpinion}"`,
        row.StressLevel,
        `"${row.StaffOpinion}"`
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mentoring_Feedback_Report_${activeTab}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Helper for Rating Stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-warning fw-bold" : "text-muted opacity-25"}>★</span>
    ));
  };

  const getStressBadge = (level) => {
    return level === 'High' ? 'bg-danger-subtle text-danger border border-danger-subtle' :
      level === 'Medium' ? 'bg-warning-subtle text-warning-emphasis border border-warning-subtle' : 'bg-success-subtle text-success border border-success-subtle';
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 animate-slide-up">
        <div className="mb-3 mb-md-0">
          <h3 className="fw-bold mb-1 text-brand-gradient">Feedback Management</h3>
          <p className="text-muted mb-0">Review feedback from students and mentors</p>
        </div>
        <div className="d-flex gap-3">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0"><Search size={16} className="text-muted" /></span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-success d-flex align-items-center shadow-sm hover-scale" onClick={handleExport}>
            <Download size={18} className="me-2" /> Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-pills mb-4 gap-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center gap-2 px-4 py-2 transition-all ${activeTab === 'student' ? 'active shadow-sm fw-bold' : 'bg-white text-muted border'}`}
            onClick={() => setActiveTab('student')}
          >
            <GraduationCap size={18} /> Student Feedback
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center gap-2 px-4 py-2 transition-all ${activeTab === 'mentor' ? 'active shadow-sm fw-bold' : 'bg-white text-muted border'}`}
            onClick={() => setActiveTab('mentor')}
          >
            <UserCheck size={18} /> Mentor Feedback
          </button>
        </li>
      </ul>

      {/* Main Card */}
      <div className="glass-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3 text-muted small text-uppercase fw-bold">Date</th>
                <th className="py-3 text-muted small text-uppercase fw-bold">
                  {activeTab === 'student' ? "Student Name" : "Mentor Name"}
                </th>
                <th className="py-3 text-muted small text-uppercase fw-bold">
                  {activeTab === 'student' ? "Mentor Reviewed" : "Student Assessed"}
                </th>
                <th className="py-3 text-muted small text-uppercase fw-bold">
                  {activeTab === 'student' ? "Rating" : "Stress Level"}
                </th>
                <th className="pe-4 py-3 text-muted small text-uppercase fw-bold">Comments</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="ps-4 text-muted small">
                    <div className="d-flex align-items-center gap-2">
                      <FileText size={14} className="text-secondary" /> {item.DateOfMentoring}
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-soft-primary text-primary d-flex align-items-center justify-content-center fw-bold small" style={{ width: "32px", height: "32px" }}>
                        {activeTab === 'student' ? item.StudentName.charAt(0) : item.MentorName.charAt(0)}
                      </div>
                      <span className="fw-medium text-dark">
                        {activeTab === 'student' ? item.StudentName : item.MentorName}
                      </span>
                    </div>
                  </td>

                  <td className="text-muted">
                    {activeTab === 'student' ? item.MentorName : item.StudentName}
                  </td>

                  <td>
                    {activeTab === 'student' ? (
                      <div className="d-flex">{renderStars(item.StudentRating)}</div>
                    ) : (
                      <span className={`badge ${getStressBadge(item.StressLevel)} rounded-pill px-3`}>
                        {item.StressLevel}
                      </span>
                    )}
                  </td>

                  <td className="pe-4 text-muted small fst-italic">
                    "{activeTab === 'student' ? item.StudentsOpinion : item.StaffOpinion}"
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No feedback found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .bg-success-subtle { background-color: #dcfce7 !important; }
        .bg-warning-subtle { background-color: #fef9c3 !important; }
        .bg-danger-subtle { background-color: #fee2e2 !important; }
        .bg-soft-primary { background-color: rgba(99, 102, 241, 0.1); }
        .transition-all { transition: all 0.2s ease; }
       `}</style>
    </div>
  );
};

export default Feedback;