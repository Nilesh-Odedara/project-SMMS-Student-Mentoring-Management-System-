import React from "react";
import { User, Calendar, TrendingUp, BookOpen, Clock, Video, Briefcase, Rocket, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner"; // Removed as not installed

function StudentDashboard() {
    const navigate = useNavigate();

    const nextSession = {
        date: "Tomorrow, 10:30 AM",
        topic: "Career Guidance & Internship Prep",
        mentor: "Prof. Anjali Sharma",
        link: "#"
    };

    const handleJoin = () => {
        // alert("Joining session..."); 
        // In a real app this would open a Zoom/Meet link
        window.open("https://meet.google.com", "_blank");
    };

    const handleMessage = () => {
        alert("Messaging feature is coming soon!");
    };

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
                        <BookOpen size={14} className="me-1" /> Semester 4
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
                                    <span className="text-uppercase tracking-wider small fw-bold text-white opacity-75">Career & Guidance</span>
                                </div>

                                <h3 className="fw-bold mb-1">{nextSession.topic}</h3>
                                <p className="text-white opacity-75 mb-4 small">
                                    <User size={14} className="me-1" /> {nextSession.mentor}
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
                            <div className="rounded-circle bg-soft-info text-info d-flex align-items-center justify-content-center fw-bold fs-4 shadow-sm" style={{ width: "64px", height: "64px" }}>
                                AS
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">Prof. Anjali Sharma</h5>
                                <p className="text-muted small mb-0">Senior Lecturer, CSE Dept</p>
                                <div className="d-flex align-items-center gap-1 mt-1">
                                    <div className="d-flex text-warning small">
                                        {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                                    </div>
                                    <span className="text-muted small">(4.8)</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto d-flex gap-2">
                            <button
                                className="btn btn-outline-primary btn-sm flex-grow-1"
                                onClick={() => navigate("/mentor/1")}
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
                                <span className="text-success">85%</span>
                            </div>
                            <div className="progress" style={{ height: "8px", borderRadius: "10px" }}>
                                <div className="progress-bar bg-success" style={{ width: "85%", borderRadius: "10px" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex justify-content-between small fw-bold mb-1">
                                <span>Mentoring Goals</span>
                                <span className="text-warning">3/5 Completed</span>
                            </div>
                            <div className="progress" style={{ height: "8px", borderRadius: "10px" }}>
                                <div className="progress-bar bg-warning" style={{ width: "60%", borderRadius: "10px" }}></div>
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
                            <tr>
                                <td className="text-muted">Oct 12, 2025</td>
                                <td className="fw-medium">Mid-Sem Project Review</td>
                                <td className="text-muted small">"Good progress, focus on documentation."</td>
                                <td><span className="badge bg-success-subtle text-success border border-success-subtle">Completed</span></td>
                            </tr>
                            <tr>
                                <td className="text-muted">Sep 28, 2025</td>
                                <td className="fw-medium">Academic Stress Management</td>
                                <td className="text-muted small">"Discussed time management strategies."</td>
                                <td><span className="badge bg-success-subtle text-success border border-success-subtle">Completed</span></td>
                            </tr>
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
