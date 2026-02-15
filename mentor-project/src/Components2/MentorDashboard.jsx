import React from "react";
import { Users, Calendar, AlertCircle, CheckCircle2, MoreHorizontal, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MentorDashboard() {
    const navigate = useNavigate();

    const myStudents = [
        { id: 1, name: "Riya Patel", status: "Active", risk: "Low", lastSession: "2 days ago" },
        { id: 2, name: "Arjun Mehta", status: "Attention", risk: "Medium", lastSession: "1 week ago" },
        { id: 3, name: "Sneha Gupta", status: "Active", risk: "Low", lastSession: "Yesterday" },
        { id: 4, name: "Rohan Kumar", status: "Critical", risk: "High", lastSession: "1 month ago" },
    ];

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
                            <h2 className="fw-bold text-dark mb-0">42</h2>
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
                            <h2 className="fw-bold text-dark mb-0">3</h2>
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
                            <h2 className="fw-bold text-dark mb-0">5</h2>
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
                                    {myStudents.map(student => (
                                        <tr key={student.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/student/${student.id}`)}>
                                            <td className="ps-4 fw-medium text-dark">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-muted fw-bold small" style={{ width: "32px", height: "32px" }}>
                                                        {student.name.charAt(0)}
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

                        <div className="d-flex gap-3 mb-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark">10:00</div>
                                <div className="text-muted small">AM</div>
                            </div>
                            <div className="card border-0 bg-primary text-white shadow-sm flex-grow-1 p-3">
                                <div className="fw-bold mb-1">Weekly Review</div>
                                <div className="small opacity-75">with Riya Patel</div>
                            </div>
                        </div>

                        <div className="d-flex gap-3 mb-4">
                            <div className="text-center">
                                <div className="fw-bold text-dark">02:30</div>
                                <div className="text-muted small">PM</div>
                            </div>
                            <div className="card border-0 bg-white border-start border-4 border-warning shadow-sm flex-grow-1 p-3">
                                <div className="fw-bold mb-1 text-dark">Urgent Counseling</div>
                                <div className="small text-muted">with Rohan Kumar</div>
                            </div>
                        </div>

                        <div className="d-flex gap-3">
                            <div className="text-center">
                                <div className="fw-bold text-dark">04:00</div>
                                <div className="text-muted small">PM</div>
                            </div>
                            <div className="card border-0 bg-white border-start border-4 border-info shadow-sm flex-grow-1 p-3">
                                <div className="fw-bold mb-1 text-dark">Project Sync</div>
                                <div className="small text-muted">with Group A</div>
                            </div>
                        </div>

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
