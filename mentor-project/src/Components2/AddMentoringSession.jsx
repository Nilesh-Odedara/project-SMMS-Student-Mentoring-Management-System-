
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  UserCheck,
  Calendar,
  Clock,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Search,
  ChevronDown,
  ListChecks,
  X
} from "lucide-react";

// Reusable searchable dropdown component
function SearchableDropdown({ label, icon: Icon, placeholder, options, value, onChange, required, displayKey, valueKey, renderOption }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Find the selected option's display text
  const selectedOption = options.find(o => String(o[valueKey]) === String(value));
  const displayText = selectedOption ? (renderOption ? renderOption(selectedOption) : selectedOption[displayKey]) : "";

  // Sync search text with selected value
  useEffect(() => {
    if (!isOpen) {
      setSearch(displayText);
    }
  }, [displayText, isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch(displayText);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [displayText]);

  const filtered = options.filter(o => {
    const text = renderOption ? renderOption(o) : o[displayKey];
    return text?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <label className="form-label text-muted small fw-bold text-uppercase">{label}</label>
      <div className="input-group">
        <span className="input-group-text bg-light border-end-0">
          <Icon size={16} className="text-muted" />
        </span>
        <input
          type="text"
          className="form-control border-start-0 border-end-0 ps-0"
          placeholder={placeholder}
          value={isOpen ? search : displayText}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearch("");
          }}
          required={required}
          autoComplete="off"
        />
        <span
          className="input-group-text bg-light border-start-0"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (value) {
              onChange("");
              setSearch("");
              setIsOpen(true);
            } else {
              setIsOpen(!isOpen);
            }
          }}
        >
          {value ? <X size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
        </span>
      </div>

      {isOpen && (
        <div
          className="border rounded-2 shadow-sm bg-white"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1050,
            maxHeight: "200px",
            overflowY: "auto",
            marginTop: "2px"
          }}
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-muted small">No results found</div>
          ) : (
            filtered.map((o) => (
              <div
                key={o[valueKey]}
                className={`px-3 py-2 ${String(o[valueKey]) === String(value) ? "bg-primary text-white" : ""}`}
                style={{ cursor: "pointer" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(String(o[valueKey]));
                  setIsOpen(false);
                  setSearch(renderOption ? renderOption(o) : o[displayKey]);
                }}
                onMouseEnter={(e) => {
                  if (String(o[valueKey]) !== String(value)) {
                    e.currentTarget.style.backgroundColor = "#f0f4ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (String(o[valueKey]) !== String(value)) {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
              >
                <div className="small">{renderOption ? renderOption(o) : o[displayKey]}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function AddMentoringSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const preSelectedStudentId = searchParams.get("studentId") || "";
  const preSelectedStudentName = searchParams.get("studentName") || "";

  // Edit mode: passed from ViewMentoringSession via router state
  const editId = location.state?.editId || null;
  const isEditMode = !!editId;

  const [studentsList, setStudentsList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSession, setFetchingSession] = useState(false);
  const [formData, setFormData] = useState({
    studentId: preSelectedStudentId,
    mentorName: "",
    date: "",
    attendance: "Present",
    stressLevel: "Low",
    nextSessionDate: "",
    issues: "",
    agenda: ""
  });

  // Fetch students and staff lists from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, staffRes] = await Promise.all([
          fetch("http://localhost:3000/student"),
          fetch("http://localhost:3000/staff")
        ]);
        const studentsData = await studentsRes.json();
        const staffData = await staffRes.json();

        if (studentsRes.ok) {
          const arr = Array.isArray(studentsData) ? studentsData : studentsData.student ? (Array.isArray(studentsData.student) ? studentsData.student : [studentsData.student]) : [];
          setStudentsList(arr);
        }
        if (staffRes.ok) {
          const arr = Array.isArray(staffData) ? staffData : staffData.staff ? (Array.isArray(staffData.staff) ? staffData.staff : [staffData.staff]) : [];
          setStaffList(arr);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Fetch existing session data when in edit mode
  useEffect(() => {
    if (!editId) return;
    const fetchSession = async () => {
      setFetchingSession(true);
      try {
        const res = await fetch(`http://localhost:3000/studentmentoring/${editId}`);
        const data = await res.json();
        if (res.ok && data.studentMentoring) {
          const s = data.studentMentoring;
          const formatDate = (d) => {
            if (!d) return "";
            return new Date(d).toISOString().split("T")[0];
          };
          setFormData({
            studentId: s.StudentMentorId ? String(s.StudentMentorId) : "",
            mentorName: s.Description || "",
            date: formatDate(s.DateOfMentoring),
            attendance: s.AttendanceStatus || "Present",
            stressLevel: s.StressLevel || "Low",
            nextSessionDate: formatDate(s.NextMentoringDate),
            issues: s.IssuesDiscussed || "",
            agenda: s.MentoringMeetingAgenda || ""
          });
        }
      } catch (err) {
        console.error("Error fetching session for edit:", err);
      } finally {
        setFetchingSession(false);
      }
    };
    fetchSession();
  }, [editId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        StudentMentoringId: Date.now(),
        StudentMentorId: Number(formData.studentId),
        DateOfMentoring: formData.date ? new Date(formData.date) : new Date(),
        ScheduledMeetingDate: formData.date ? new Date(formData.date) : new Date(),
        NextMentoringDate: formData.nextSessionDate ? new Date(formData.nextSessionDate) : null,
        IssuesDiscussed: formData.issues,
        MentoringMeetingAgenda: formData.agenda,
        AttendanceStatus: formData.attendance,
        AbsentRemarks: formData.attendance === "Absent" ? "Student was absent" : "",
        IsParentPresent: false,
        ParentName: "",
        ParentMobileNo: 0,
        StudentsOpinion: "",
        ParentsOpinion: "",
        StaffOpinion: "",
        StressLevel: formData.stressLevel,
        LearnerType: "",
        MentoriongDocument: "",
        Description: formData.mentorName
      };

      const url = isEditMode
        ? `http://localhost:3000/studentmentoring/${editId}`
        : "http://localhost:3000/studentMentoring";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        alert(isEditMode ? "Session Updated Successfully!" : "Session Logged Successfully!");
        navigate(isEditMode ? `/mentoring/view/${editId}` : -1);
      } else {
        alert(data.message || (isEditMode ? "Failed to update session." : "Failed to log session."));
      }
    } catch (err) {
      console.error("Error logging session:", err);
      alert("Server error. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Build dropdown options for students
  const studentOptions = studentsList.map(s => ({
    ...s,
    _valueKey: String(s.studentId),
    _displayLabel: `${s.StudentName} - ${s.EnrollmentNo}`
  }));

  // Build dropdown options for staff/mentors
  // Handle common staff model field names
  const staffOptions = staffList.map(s => ({
    ...s,
    _valueKey: s.StaffName || s.staffName || s.name || s._id,
    _displayLabel: `${s.StaffName || s.staffName || s.name || "Staff"} ${s.Department ? `- ${s.Department}` : (s.department ? `- ${s.department}` : "")}`
  }));

  return (
    <div className="container-fluid p-4">

      {/* Header */}
      <div className="d-flex align-items-center mb-4 animate-slide-up">
        <button className="btn btn-light rounded-circle p-2 me-3 shadow-sm border" onClick={() => navigate("/mentoring")}>
          <ArrowLeft size={20} className="text-muted" />
        </button>
        <div>
          <h3 className="fw-bold mb-1 text-brand-gradient">{isEditMode ? "Edit Session" : "Log New Session"}</h3>
          <p className="text-muted mb-0">{isEditMode ? "Update mentoring session details" : "Record a mentoring interaction"}</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="row animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="col-lg-8 mx-auto">
          <div className="glass-card p-5">
            <form onSubmit={handleSubmit}>

              <h5 className="fw-bold text-brand mb-4 d-flex align-items-center">
                <User size={20} className="me-2" /> Session Details
              </h5>

              <div className="row g-4 mb-4">
                {/* Student Selection - Searchable Dropdown */}
                <div className="col-md-6">
                  <SearchableDropdown
                    label="Student"
                    icon={User}
                    placeholder="Search student..."
                    options={studentOptions}
                    value={formData.studentId}
                    onChange={(val) => setFormData({ ...formData, studentId: val })}
                    required={true}
                    displayKey="_displayLabel"
                    valueKey="_valueKey"
                    renderOption={(o) => o._displayLabel}
                  />
                </div>

                {/* Mentor Selection - Searchable Dropdown */}
                <div className="col-md-6">
                  {staffOptions.length > 0 ? (
                    <SearchableDropdown
                      label="Mentor Name"
                      icon={UserCheck}
                      placeholder="Search mentor..."
                      options={staffOptions}
                      value={formData.mentorName}
                      onChange={(val) => setFormData({ ...formData, mentorName: val })}
                      required={true}
                      displayKey="_displayLabel"
                      valueKey="_valueKey"
                      renderOption={(o) => o._displayLabel}
                    />
                  ) : (
                    <div>
                      <label className="form-label text-muted small fw-bold text-uppercase">Mentor Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><UserCheck size={16} className="text-muted" /></span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0"
                          name="mentorName"
                          placeholder="Enter mentor name"
                          value={formData.mentorName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase">Date of Session</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><Calendar size={16} className="text-muted" /></span>
                    <input
                      type="date"
                      className="form-control border-start-0 ps-0"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Next Date */}
                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase">Next Follow-up</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><Clock size={16} className="text-muted" /></span>
                    <input
                      type="date"
                      className="form-control border-start-0 ps-0"
                      name="nextSessionDate"
                      value={formData.nextSessionDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-4 mb-4">
                {/* Attendance */}
                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase d-block">Attendance</label>
                  <div className="btn-group w-100" role="group">
                    <input type="radio" className="btn-check" name="attendance" id="present" value="Present" checked={formData.attendance === "Present"} onChange={handleChange} />
                    <label className={`btn ${formData.attendance === "Present" ? "btn-success" : "btn-outline-success"}`} htmlFor="present"><CheckCircle2 size={16} className="me-1" /> Present</label>

                    <input type="radio" className="btn-check" name="attendance" id="absent" value="Absent" checked={formData.attendance === "Absent"} onChange={handleChange} />
                    <label className={`btn ${formData.attendance === "Absent" ? "btn-danger" : "btn-outline-danger"}`} htmlFor="absent"><XCircle size={16} className="me-1" /> Absent</label>
                  </div>
                </div>

                {/* Stress */}
                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold text-uppercase d-block">Stress Level</label>
                  <div className="btn-group w-100" role="group">
                    {["Low", "Medium", "High"].map(level => (
                      <React.Fragment key={level}>
                        <input
                          type="radio"
                          className="btn-check"
                          name="stressLevel"
                          id={`stress-${level}`}
                          value={level}
                          checked={formData.stressLevel === level}
                          onChange={handleChange}
                        />
                        <label
                          className={`btn ${formData.stressLevel === level
                              ? (level === "High" ? "btn-danger" : level === "Medium" ? "btn-warning text-white" : "btn-success")
                              : "btn-outline-secondary"
                            }`}
                          htmlFor={`stress-${level}`}
                        >
                          {level}
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Issues */}
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold text-uppercase">
                  <MessageSquare size={14} className="me-1" /> Discussion Points / Issues
                </label>
                <textarea
                  className="form-control"
                  name="issues"
                  rows="4"
                  placeholder="Summarize the discussion..."
                  value={formData.issues}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Agenda */}
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold text-uppercase">
                  <ListChecks size={14} className="me-1" /> Agenda / Action Items
                </label>
                <textarea
                  className="form-control"
                  name="agenda"
                  rows="3"
                  placeholder="List agenda items or action items..."
                  value={formData.agenda}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Actions */}
              <div className="d-flex justify-content-end gap-3 mt-5">
                <button
                  type="button"
                  className="btn btn-outline-primary px-4"
                  onClick={() => navigate("/mentoring")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-5 d-flex align-items-center shadow-lg" disabled={loading || fetchingSession}>
                  <Save size={18} className="me-2" /> {loading ? (isEditMode ? "Updating..." : "Logging...") : (isEditMode ? "Update Session" : "Log Session")}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AddMentoringSession;
