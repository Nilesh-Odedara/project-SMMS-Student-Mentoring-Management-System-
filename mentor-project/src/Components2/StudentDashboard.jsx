import React from "react";
import { User, Calendar, TrendingUp, BookOpen, Clock, Video, Briefcase, Rocket, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";
// import { toast } from "sonner"; // Removed as not installed

function StudentDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = React.useState({
        attendance: "100%",
        completedGoals: 3,
        totalGoals: 5,
        semester: 4
    });
    
    const [mentor, setMentor] = React.useState(null);
    const [nextSession, setNextSession] = React.useState(null);
    const [history, setHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const [assignmentsRes, staffRes, sessionsRes, studentProfileRes] = await Promise.all([
                    api.get("/studentmentor"),
                    api.get("/staff"),
                    api.get("/studentmentoring"),
                    api.get(`/student/${userId}`)
                ]);

                const allAssignments = assignmentsRes.data?.studentmentor || assignmentsRes.data?.studentMentor || [];
                const allStaff = staffRes.data?.staff || [];
                const allSessions = sessionsRes.data?.studentMentoring || [];
                const myProfile = studentProfileRes.data?.student;

                if (!myProfile) {
                    throw new Error("Student profile not found.");
                }

                const myStudentId = myProfile.studentId ?? myProfile.StudentId ?? myProfile._id;

                const assignmentsArr = Array.isArray(allAssignments) ? allAssignments : [allAssignments];
                const staffArr = Array.isArray(allStaff) ? allStaff : [allStaff];
                const sessionsArr = Array.isArray(allSessions) ? allSessions : [allSessions];

                // Find mentor assignment identifying this student using integer studentId or fallback
                const myAssignment = assignmentsArr.find(a => String(a.StudentId ?? a.studentId) === String(myStudentId));
                if (myAssignment) {
                    const myMentorData = staffArr.find(s => String(s.StaffID) === String(myAssignment.StaffId));
                    if (myMentorData) {
                        setMentor({
                            id: myMentorData.StaffID,
                            name: myMentorData.StaffName,
                            email: myMentorData.EmailAddress,
                            description: myMentorData.Description || "Senior Faculty",
                            initials: myMentorData.StaffName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()
                        });
                    }
                }

                // Filter sessions to only those concerning this student
                const mySessions = sessionsArr.filter(s => String(s.StudentMentorId) === String(myStudentId));
                
                // Parse history
                const pastSessions = mySessions.filter(s => s.AttendanceStatus === true || (s.DateOfMentoring && new Date(s.DateOfMentoring) <= new Date()));
                pastSessions.sort((a,b) => new Date(b.DateOfMentoring || b.createdAt) - new Date(a.DateOfMentoring || a.createdAt));
                
                const historyFormatted = pastSessions.slice(0, 5).map(s => {
                    const d = new Date(s.DateOfMentoring || s.createdAt);
                    return {
                        id: s._id,
                        date: `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`,
                        topic: s.IssuesDiscussed || "Mentoring Session",
                        feedback: s.StaffOpinion || "Session completed.",
                        status: s.AttendanceStatus ? "Completed" : "Logged"
                    };
                });
                setHistory(historyFormatted);

                // Find next session
                const upcomingSessions = mySessions.filter(s => {
                    if (s.AttendanceStatus === true) return false; // Already attended
                    if (s.ScheduledMeetingDate && new Date(s.ScheduledMeetingDate) > new Date()) return true;
                    return false;
                });

                upcomingSessions.sort((a,b) => new Date(a.ScheduledMeetingDate) - new Date(b.ScheduledMeetingDate));
                if (upcomingSessions.length > 0) {
                    const next = upcomingSessions[0];
                    const d = new Date(next.ScheduledMeetingDate);
                    
                    let hours = d.getHours();
                    let ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    const mins = d.getMinutes().toString().padStart(2, '0');
                    
                    const timeAgo = Math.floor((d - new Date()) / (1000 * 60 * 60 * 24));
                    const dayString = timeAgo === 0 ? "Today" : (timeAgo === 1 ? "Tomorrow" : `${timeAgo} days from now`);

                    setNextSession({
                        date: `${dayString}, ${hours}:${mins} ${ampm}`,
                        topic: next.MentoringMeetingAgenda || "Mentoring Session",
                        mentor: mentor ? mentor.name : "Your Mentor",
                        link: "https://meet.google.com" // Placeholder for actual link
                    });
                } else {
                    setNextSession(null);
                }

                // Temporary logic for stats - this should idealy be derived from real data
                const attendance = mySessions.length > 0 
                  ? Math.round((mySessions.filter(s => s.AttendanceStatus).length / mySessions.length) * 100) 
                  : 100;

                setStats({
                  attendance: `${attendance}%`,
                  completedGoals: historyFormatted.length,
                  totalGoals: historyFormatted.length + upcomingSessions.length,
                  semester: 4
                });

            } catch (err) {
                console.error("Failed to load student dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [mentor?.name]); // Re-run if mentor name resolves to populate nextSession properly

    const handleJoin = () => {
        // alert("Joining session..."); 
        // In a real app this would open a Zoom/Meet link
        window.open("https://meet.google.com", "_blank");
    };

    const handleMessage = () => {
        alert("Messaging feature is coming soon!");
    };

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

            {/* Welcome Section */}
            <div className="d-flex justify-content-between align-items-center mb-5 animate-slide-up">
                <div>
                    <h3 className="fw-bold mb-1 text-brand-gradient">Student Dashboard</h3>
                    <p className="text-muted mb-0">Track your progress and upcoming sessions</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill">
                        <BookOpen size={14} className="me-1" /> Semester {stats.semester}
                    </span>
                </div>
            </div>

            <div className="row g-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>

                {/* Next Session / Career Guidance Card - REDESIGNED */}
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-lg h-100 overflow-hidden text-white"
                        style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" }}>
                        <div className="card-body p-4 position-relative">

                            {/* Decorative Background Icons */}
                            <div className="position-absolute top-0 end-0 opacity-25 translate-middle-y me-n3 mt-3">
                                <Rocket size={120} />
                            </div>

                            <div className="position-relative z-1 d-flex flex-column h-100">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <div className="bg-white bg-opacity-25 p-2 rounded-circle">
                                        <Briefcase size={20} className="text-white" />
                                    </div>
                                    <span className="text-uppercase tracking-wider small fw-bold text-white opacity-75">Upcoming Mentoring</span>
                                </div>

                                {nextSession ? (
                                    <>
                                        <h3 className="fw-bold mb-1">{nextSession.topic}</h3>
                                        <p className="text-white opacity-75 mb-4 small">
                                            <User size={14} className="me-1" /> {mentor ? mentor.name : nextSession.mentor}
                                        </p>

                                        <div className="mt-auto">
                                            <div className="bg-white bg-opacity-10 rounded-3 p-3 mb-3 border border-white border-opacity-10 backdrop-blur-sm">
                                                <div className="d-flex align-items-center text-white">
                                                    <Clock size={16} className="me-2" />
                                                    <span className="fw-medium">{nextSession.date}</span>
                                                </div>
                                            </div>

                                            <button
                                                className="btn btn-white text-primary fw-bold w-100 d-flex align-items-center justify-content-center shadow-sm hover-scale"
                                                onClick={handleJoin}
                                                style={{ backgroundColor: "white", border: "none" }}
                                            >
                                                <Video size={18} className="me-2" /> Join Session
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-auto d-flex flex-column align-items-center justify-content-center text-center h-100">
                                        <div className="bg-white bg-opacity-25 p-3 rounded-circle mb-3">
                                            <Calendar size={32} className="text-white" />
                                        </div>
                                        <h5 className="fw-bold">No Upcoming Sessions</h5>
                                        <p className="small opacity-75">You're all caught up! Enjoy your free time.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Mentor Card */}
                <div className="col-md-6 col-lg-4">
                    <div className="glass-card p-4 h-100 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="text-uppercase text-muted fw-bold small mb-0">My Mentor</h6>
                            <span className="badge bg-success-subtle text-success">Online</span>
                        </div>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            {mentor ? (
                                <>
                                    <div className="rounded-circle bg-soft-info text-info d-flex align-items-center justify-content-center fw-bold fs-4 shadow-sm" style={{ width: "64px", height: "64px" }}>
                                        {mentor.initials}
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1">{mentor.name}</h5>
                                        <p className="text-muted small mb-0">{mentor.description}</p>
                                        <div className="d-flex align-items-center gap-1 mt-1">
                                            <div className="d-flex text-warning small">
                                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                                            </div>
                                            <span className="text-muted small">(5.0)</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-muted small w-100 text-center py-3">
                                    No mentor currently assigned.
                                </div>
                            )}
                        </div>
                        <div className="mt-auto d-flex gap-2">
                            <button
                                className="btn btn-outline-primary btn-sm flex-grow-1"
                                onClick={() => navigate(`/mentor/${mentor?.id || 1}`)}
                                disabled={!mentor}
                            >
                                View Profile
                            </button>
                            <button
                                className="btn btn-outline-dark btn-sm flex-grow-1"
                                onClick={handleMessage}
                            >
                                Message
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="col-md-6 col-lg-4">
                    <div className="glass-card p-4 h-100">
                        <h6 className="text-uppercase text-muted fw-bold small mb-4">Personal Growth</h6>

                        <div className="mb-4">
                            <div className="d-flex justify-content-between small fw-bold mb-1">
                                <span>Attendance</span>
                                <span className={stats.attendance === '100%' ? "text-success" : "text-warning"}>{stats.attendance}</span>
                            </div>
                            <div className="progress" style={{ height: "8px", borderRadius: "10px" }}>
                                <div className={`progress-bar ${stats.attendance === '100%' ? 'bg-success' : 'bg-warning'}`} style={{ width: stats.attendance, borderRadius: "10px" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex justify-content-between small fw-bold mb-1">
                                <span>Mentoring Goals</span>
                                <span className="text-warning">{stats.completedGoals}/{stats.totalGoals} Completed</span>
                            </div>
                            <div className="progress" style={{ height: "8px", borderRadius: "10px" }}>
                                <div className="progress-bar bg-warning" style={{ width: stats.totalGoals > 0 ? `${(stats.completedGoals/stats.totalGoals)*100}%` : '0%', borderRadius: "10px" }}></div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-top border-light">
                            <div className="d-flex align-items-center justify-content-between text-muted small cursor-pointer hover-text-primary" onClick={() => navigate("/mentoring")}>
                                <span>View Detailed Report</span>
                                <ChevronRight size={14} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Recent Activity / History */}
            <div className="glass-card p-4 mt-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Recent Mentoring History</h5>
                    <button className="btn btn-link text-decoration-none small fw-bold" onClick={() => navigate("/mentoring")}>View All</button>
                </div>
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead className="text-muted small text-uppercase">
                            <tr>
                                <th>Date</th>
                                <th>Topic</th>
                                <th>Feedback</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length > 0 ? history.map(item => (
                                <tr key={item.id}>
                                    <td className="text-muted">{item.date}</td>
                                    <td className="fw-medium">{item.topic}</td>
                                    <td className="text-muted small">"{item.feedback}"</td>
                                    <td><span className="badge bg-success-subtle text-success border border-success-subtle">{item.status}</span></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">No mentoring history found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        .bg-soft-primary { background-color: rgba(99, 102, 241, 0.1); }
        .bg-soft-info { background-color: rgba(6, 182, 212, 0.1); }
        .bg-success-subtle { background-color: #dcfce7 !important; }
        .backdrop-blur-sm { backdrop-filter: blur(4px); }
       `}</style>
        </div>
    );
}

export default StudentDashboard;
