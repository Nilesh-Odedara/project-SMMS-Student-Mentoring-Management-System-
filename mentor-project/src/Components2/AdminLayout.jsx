import React, { useState } from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Footer from "./Footer"

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="d-flex flex-column min-vh-100 position-relative">
            {/* Background Texture - Fixed to viewport */}
            <div className="app-background position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}></div>

            {/* 1. Header: Full Width Navbar */}
            <header className="flex-shrink-0 sticky-top z-1030 bg-white shadow-sm">
                <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            </header>

            {/* 2. Middle Section: Sidebar + Content */}
            <div className="flex-grow-1 d-flex position-relative overflow-hidden">

                {/* Mobile Backdrop */}
                {isSidebarOpen && (
                    <div
                        className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-1040 d-md-none"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Sidebar: Left Column */}
                {/* On Mobile: Absolute/Fixed over content. On Desktop: Relative block */}
                <aside
                    className={`bg-white border-end transition-transform ${isSidebarOpen ? 'd-block position-absolute start-0 h-100 z-1050 shadow-lg' : 'd-none d-md-block'}`}
                    style={{ width: "260px", minHeight: "100%" }}
                >
                    <Sidebar />
                </aside>

                {/* Main Content: Right Column */}
                <main className="flex-grow-1 bg-light bg-opacity-10 d-flex flex-column" style={{ minWidth: 0 }}>
                    <div className="p-0 h-100 overflow-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* 3. Footer: Full Width Bottom */}
            <footer className="flex-shrink-0 z-1020">
                <Footer />
            </footer>

            <style>{`
                .transition-transform { transition: transform 0.3s ease-in-out; }
            `}</style>
        </div>
    )
}
export default AdminLayout