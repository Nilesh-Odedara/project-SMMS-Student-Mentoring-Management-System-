import React from "react";
import { Users, Calendar, AlertCircle, CheckCircle2, MoreHorizontal, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function MentorDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = React.useState({
        assignedStudents: 0,
        sessionsToday: 0,
        pendingReports: 0
    });
    const [myStudents, setMyStudents] = React.useState([]);
    const [todaySchedule, setTodaySchedule] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const [assignmentsRes, studentsRes, sessionsRes, staffProfileRes] = await Promise.all([
                    api.get("/studentmentor"),
                    api.get("/student"),
                    api.get("/studentmentoring"),
                    api.get(`/staff/${userId}`)
                ]);

                const allAssignments = assignmentsRes.data?.studentmentor || assignmentsRes.data?.studentMentor || [];
                const allStudents = studentsRes.data?.student || [];
                const allSessions = sessionsRes.data?.studentMentoring || [];
                const myProfile = staffProfileRes.data?.staff;

                if (!myProfile) {
                    throw new Error("Staff profile not found.");
                }

                const myStaffId = myProfile.StaffID;

                const assignmentsArr = Array.isArray(allAssignments) ? allAssignments : [allAssignments];
                const studentsArr = Array.isArray(allStudents) ? allStudents : [allStudents];
                const sessionsArr = Array.isArray(allSessions) ? allSessions : [allSessions];

                // Students assigned to this mentor using integer StaffID
                const myAssignments = assignmentsArr.filter(a => String(a.StaffId) === String(myStaffId));
                
                // Map student details
                const studentsList = myAssignments.map(assignment => {
                    const studentData = studentsArr.find(s => String(s.studentId ?? s.StudentId ?? s._id) === String(assignment.StudentId ?? assignment.studentId));
                    
                    if (!studentData) return null;
                    
                    // Find their latest session to determine risk
                    const studentSessions = sessionsArr.filter(s => String(s.StudentMentorId) === String(assignment.StudentId)); // Assuming StudentMentorId here denotes the student ID based on existing logic 
                    studentSessions.sort((a, b) => new Date(b.DateOfMentoring || b.createdAt) - new Date(a.DateOfMentoring || a.createdAt));
                    
                    const lastSession = studentSessions.length > 0 ? studentSessions[0] : null;
                    const risk = lastSession ? (lastSession.StressLevel === 'High' ? 'High' : (lastSession.StressLevel === 'Medium' ? 'Medium' : 'Low')) : "Low";
                    const status = risk === 'High' ? 'Critical' : (risk === 'Medium' ? 'Attention' : 'Active');
                    
                    let lastSessionText = "No previous sessions";
                    if (lastSession) {
                        const timeAgo = Math.floor((new Date() - new Date(lastSession.createdAt)) / (1000 * 60 * 60 * 24));
                        lastSessionText = timeAgo === 0 ? "Today" : (timeAgo === 1 ? "Yesterday" : `${timeAgo} days ago`);
                    }

                    return {
                        id: studentData.studentId,
                        name: studentData.StudentName,
                        status: status,
                        risk: risk,
                        lastSession: lastSessionText
                    };
                }).filter(Boolean);

                setMyStudents(studentsList);

                // Today's schedule
                const today = new Date().toISOString().split('T')[0];
                const myStudentIds = myAssignments.map(a => String(a.StudentId));
                
                const sessionsTodayData = [];
                sessionsArr.forEach(session => {
                    if (myStudentIds.includes(String(session.StudentMentorId))) { // Check if this session is for one of their students
                        // Check if session date matches today
                        const sessionDate = session.DateOfMentoring ? session.DateOfMentoring.toString().split('T')[0] : '';
                        const scheduledDate = session.ScheduledMeetingDate ? session.ScheduledMeetingDate.toString().split('T')[0] : '';
                        
                        if (sessionDate === today || scheduledDate === today) {
                            const student = studentsArr.find(s => String(s.studentId) === String(session.StudentMentorId));
                            
                            // Format time
                            const dateObj = new Date(session.ScheduledMeetingDate || session.DateOfMentoring || session.createdAt);
                            let hours = dateObj.getHours();
                            let ampm = hours >= 12 ? 'PM' : 'AM';
                            hours = hours % 12;
                            hours = hours ? hours : 12; // the hour '0' should be '12'
                            const mins = dateObj.getMinutes().toString().padStart(2, '0');
                            
                            sessionsTodayData.push({
                                id: session._id,
                                timeStr: `${hours.toString().padStart(2, '0')}:${mins}`,
                                ampm: ampm,
                                topic: session.IssuesDiscussed || "Mentoring Session",
                                studentName: student ? student.StudentName : "Student",
                                isUrgent: session.StressLevel === 'High'
                            });
                        }
                    }
                });
                
                setTodaySchedule(sessionsTodayData.sort((a,b) => (""+a.timeStr).localeCompare(b.timeStr)));

                setStats({
                    assignedStudents: myAssignments.length,
                    sessionsToday: sessionsTodayData.length,
                    pendingReports: 0 // Placeholder as reports metric implies a separate workflow
                });

            } catch (err) {
                console.error("Failed to fetch mentor dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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
            <div className="d-flex justify-content-between align-items-center mb-5 animate-slide-up">
                <div>
                    <h3 className="fw-bold mb-1 text-brand-gradient">Mentor Portal</h3>
                    <p className="text-muted mb-0">Overview of your students and schedule</p>
                </div>
                <button
                    className="btn btn-primary d-flex align-items-center shadow-lg hover-scale"
                    onClick={() => navigate("/mentoring/add")}
                >
                    <Calendar size={18} className="me-2" /> Schedule Session
                </button>
            </div>

            {/* Stats Row */}
            <div className="row g-4 mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="col-md-4">
                    <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted small fw-bold text-uppercase mb-1">Assigned Students</p>
                            <h2 className="fw-bold text-dark mb-0">{stats.assignedStudents}</h2>
                        </div>
                        <div className="bg-soft-primary p-3 rounded-circle">
                            <Users size={28} className="text-primary" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted small fw-bold text-uppercase mb-1">Sessions Today</p>
                            <h2 className="fw-bold text-dark mb-0">{stats.sessionsToday}</h2>
                        </div>
                        <div className="bg-soft-info p-3 rounded-circle">
                            <Calendar size={28} className="text-info" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted small fw-bold text-uppercase mb-1">Pending Reports</p>
                            <h2 className="fw-bold text-dark mb-0">{stats.pendingReports}</h2>
                        </div>
                        <div className="bg-soft-warning p-3 rounded-circle">
                            <AlertCircle size={28} className="text-warning" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>

                {/* Student List */}
                <div className="col-lg-8">
                    <div className="glass-card p-0 overflow-hidden h-100">
                        <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold text-dark mb-0">My Students</h6>
                            <span
                                className="text-primary small fw-bold cursor-pointer hover-text-dark"
                                onClick={() => navigate("/students")}
                            >
                                View All
                            </span>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light text-muted small text-uppercase">
                                    <tr>
                                        <th className="ps-4 py-3">Student Name</th>
                                        <th>Status</th>
                                        <th>Stress Level</th>
                                        <th>Last Session</th>
                                        <th className="pe-4 text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-muted">No students assigned to you yet.</td>
                                        </tr>
                                    ) : myStudents.map(student => (
                                        <tr key={student.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/student/${student.id}`)}>
                                            <td className="ps-4 fw-medium text-dark">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-muted fw-bold small" style={{ width: "32px", height: "32px" }}>
                                                        {student.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td>
                                                {student.status === 'Active' && <span className="badge bg-success-subtle text-success">Active</span>}
                                                {student.status === 'Attention' && <span className="badge bg-warning-subtle text-warning-emphasis">Attention</span>}
                                                {student.status === 'Critical' && <span className="badge bg-danger-subtle text-danger">Critical</span>}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className={`rounded-circle ${student.risk === 'High' ? 'bg-danger' : student.risk === 'Medium' ? 'bg-warning' : 'bg-success'}`} style={{ width: "8px", height: "8px" }}></div>
                                                    <span className="small text-muted">{student.risk}</span>
                                                </div>
                                            </td>
                                            <td className="text-muted small">{student.lastSession}</td>
                                            <td className="pe-4 text-end" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    className="btn btn-icon btn-sm text-muted hover-text-primary"
                                                    onClick={() => alert("Messaging " + student.name)}
                                                    title="Message Student"
                                                >
                                                    <MessageSquare size={16} />
                                                </button>
                                                <button className="btn btn-icon btn-sm text-muted hover-text-dark ms-1">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Upcoming Sessions / Schedule */}
                <div className="col-lg-4">
                    <div className="glass-card p-4 h-100">
                        <h6 className="fw-bold text-dark mb-4">Today's Schedule</h6>

                        {todaySchedule.length === 0 ? (
                            <div className="text-center text-muted p-4">
                                <Calendar size={48} className="opacity-25 mb-3 mx-auto" />
                                <p className="mb-0">No sessions scheduled for today</p>
                            </div>
                        ) : (
                            todaySchedule.map((session, index) => (
                                <div className="d-flex gap-3 mb-4" key={index}>
                                    <div className="text-center" style={{ minWidth: "45px" }}>
                                        <div className="fw-bold text-dark">{session.timeStr}</div>
                                        <div className="text-muted small">{session.ampm}</div>
                                    </div>
                                    <div className={`card border-0 ${session.isUrgent ? 'bg-white border-start border-4 border-danger' : 'bg-primary text-white'} shadow-sm flex-grow-1 p-3`}>
                                        <div className={`fw-bold mb-1 ${session.isUrgent ? 'text-dark' : ''}`}>{session.topic}</div>
                                        <div className={`small ${session.isUrgent ? 'text-muted' : 'opacity-75'}`}>with {session.studentName}</div>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </div>

            </div>

            <style>{`
        .bg-soft-primary { background-color: rgba(99, 102, 241, 0.1); }
        .bg-soft-info { background-color: rgba(6, 182, 212, 0.1); }
        .bg-soft-warning { background-color: rgba(245, 158, 11, 0.1); }
        .bg-success-subtle { background-color: #dcfce7 !important; }
        .bg-warning-subtle { background-color: #fef9c3 !important; }
        .bg-danger-subtle { background-color: #fee2e2 !important; }
       `}</style>
        </div>
    );
}

export default MentorDashboard;
