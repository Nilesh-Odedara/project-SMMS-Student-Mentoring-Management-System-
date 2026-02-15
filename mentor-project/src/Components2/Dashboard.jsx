import React from 'react';
import AdminDashboard from './AdminDashboard';
import MentorDashboard from './MentorDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
        return <AdminDashboard />;
    } else if (role === "MENTOR") {
        return <MentorDashboard />;
    } else {
        // Default to Student or specific Student Dashboard
        return <StudentDashboard />;
    }
};

export default Dashboard;
