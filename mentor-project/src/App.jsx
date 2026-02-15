// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import Homepage from './Component/Homepage'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Layout from './Component/Layout'
// import Login from './Component/Login'
// import Role from './Component/Role'
// // import AdminDashboard from './Component/AdminDashboard'
// import Layout2 from './Component/Layout2'
// import MyStudents from './Component/MyStudents'
// import MyMentors from './Component/MyMentors'
// import AdminFeedback from './Component/AdminFeedback'
// import StudentDashboard from './Component/StudentDashboard'
// import MentorDashboard from './Component/MentorDashboard'
// import MentorSession from './Component/MenorSessions'
// import MentoringSessions from './Components2/MentoringSessions'



// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<Layout />}>
//             {/* <Route index element={<AdminDashboard />} /> */}
//             {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/students" element={<MyStudents />} />
//             <Route path="/mentors" element={<MyMentors />} />
//             <Route path="/sessions" element={<MentoringSessions />} />
//             <Route path="/feedback" element={<AdminFeedback />} />
//             <Route path="/student-dashboard" element={<StudentDashboard />} />
//             <Route path="/mentor-dashboard" element={<MentorDashboard />} />
//           </Route>
//         </Routes>
//         <Routes>
//           {/* <Route path="/" element={<Layout2/>}>
//             <Route index element={<Dashboard/>}/>
//             <Route path="/dashboard" element={<Dashboard/>}/>
//           </Route> */}
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//===============================================================================================================================================================================

//COMPONENTS2

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Components2/AdminLayout'
import AdminDashboard from './Components2/AdminDashboard'
import MentoringSessions from './Components2/MentoringSessions'
import AddMentoringSession from './Components2/AddMentoringSession'
import ViewMentoringSession from './Components2/ViewMentoringSession'
import MyStudent from './Components2/MyStudent'
import AddStudent from './Components2/AddStudent'
import Students from './Components2/Students'
import Mentors from './Components2/Mentors'
import MyMentor from './Components2/MyMentor'
import Reports from './Components2/Reports'
// import Login from "./Components2/Login";
// import RoleGuard from "./Components2/RoleGuard";
import Login from './Components2/login'
// import Login from './Components2/login'
import AdminLayout from './Components2/AdminLayout'
import Feedback from './Components2/Feedback'
import RoleGuard from './Components2/RoleGuard'
import Dashboard from './Components2/Dashboard'
import AddMentor from './Components2/AddMentor'
import AssignMentor from './Components2/AssignMentor'


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/" element={<AdminLayout />}
        // element={
        //     <RoleGuard allowedRole="ADMIN">
        //         <Layout />
        //     </RoleGuard>
        // }
        >

          {/* SHARED DASHBOARD - Accessible by All (Sidebar Filters Content) */}
          <Route path='dashboard' element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR", "STUDENT"]}>
              <Dashboard />
            </RoleGuard>
          } />

          <Route index element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR", "STUDENT"]}>
              <Dashboard />
            </RoleGuard>
          } />

          {/* ADMIN ONLY ROUTES */}
          <Route path="mentors" element={
            <RoleGuard allowedRoles={["ADMIN"]}>
              <Mentors />
            </RoleGuard>
          } />
          <Route path="mentor/:id" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR"]}>
              <MyMentor />
            </RoleGuard>
          } />
          <Route
            path="mentors/add"
            element={
              <RoleGuard allowedRoles={["ADMIN"]}>
                <AddMentor />
              </RoleGuard>
            }
          />
          <Route
            path="/assignmentor"
            element={
              <RoleGuard allowedRoles={["ADMIN"]}>
                <AssignMentor />
              </RoleGuard>
            }
          />

          <Route path="reports" element={
            <RoleGuard allowedRoles={["ADMIN"]}>
              <Reports />
            </RoleGuard>
          } />

          {/* SHARED MGMT ROUTES (Admin + Mentor) */}
          <Route path="students" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR"]}>
              <Students />
            </RoleGuard>
          } />
          <Route path="students/add" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR"]}>
              <AddStudent />
            </RoleGuard>
          } />
          <Route path="student/:id" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR", "STUDENT"]}>
              <MyStudent />
            </RoleGuard>
          } />
          <Route path="mentoring" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR", "STUDENT"]}>
              <MentoringSessions />
            </RoleGuard>
          } />
          <Route path="mentoring/add" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR"]}>
              <AddMentoringSession />
            </RoleGuard>
          } />
          <Route path="mentoring/view/:id" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR"]}>
              <ViewMentoringSession />
            </RoleGuard>
          } />
          <Route path="feedback" element={
            <RoleGuard allowedRoles={["ADMIN", "MENTOR"]}>
              <Feedback />
            </RoleGuard>
          } />
        </Route>

        {/* MENTOR
                <Route
                    path="/mentor/:id"
                    element={
                        <RoleGuard allowedRole="MENTOR">
                            <MyMentor />
                        </RoleGuard>
                    }
                />

                {/* STUDENT */}
        {/* <Route
                    path="/student/:id"
                    element={
                        <RoleGuard allowedRole="STUDENT">
                            <MyStudent />
                        </RoleGuard>
                    }
                /> */}

      </Routes>

    </BrowserRouter>
  )
}

export default App













//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//===============================================================================================================================================================================

//COMPONENTS3



// import React from "react";
// import { Routes, Route, Navigate, Outlet, BrowserRouter } from "react-router-dom";
// import Login from "./Components3/Login";
// import AdminLayout from "./Components3/AdminLayout";
// import AdminDashboard from "./Components3/AdminDashboard";
// import MentoringSessions from "./Components3/MentoringSessions";
// import AddMentoringSession from "./Components2/AddMentoringSession";
// import ViewMentoringSession from "./Components3/ViewMentoringSession";
// import Mentors from "./Components3/Mentors";
// import Students from "./Components3/Students";
// import Reports from "./Components3/Reports";
// import MyStudent from "./Components3/MyStudent";
// import MentorLayout from "./Components3/MentorLayout";
// import RoleGuard from "./Components3/RoleGuard";
// import MyMentor from "./Components3/MyMentor";
// import StudentLayout from "./Components3/StudentLayout";
// // import Login from "./pages/Login";
// // import AdminDashboard from "./pages/AdminDashboard";
// // import MentoringSessions from "./pages/MentoringSessions";
// // import AddMentoringSession from "./pages/AddMentoringSession";
// // import ViewMentoringSession from "./pages/ViewMentoringSession";
// // import Mentors from "./pages/Mentors";
// // import MyMentor from "./pages/MyMentor";
// // import Students from "./pages/Students";
// // import MyStudent from "./pages/MyStudent";
// // import Reports from "./pages/Reports";
// // import AdminLayout from "./components/AdminLayout";
// // import MentorLayout from "./components/MentorLayout";
// // import StudentLayout from "./components/StudentLayout";
// // import RoleGuard from "./components/RoleGuard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         {/* Admin Routes */}
//         <Route path="/" element={
//           <RoleGuard allowedRole="ADMIN">
//             <AdminLayout />
//           </RoleGuard>
//         }>
//           <Route index element={<AdminDashboard />} />
//           <Route path="mentoring" element={<MentoringSessions />} />
//           <Route path="mentoring/add" element={<AddMentoringSession />} />
//           <Route path="mentoring/view/:id" element={<ViewMentoringSession />} />
//           <Route path="mentors" element={<Mentors />} />
//           <Route path="mentor/:id" element={<MyMentor />} />
//           <Route path="students" element={<Students />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="student/:id" element={<MyStudent />} />
//         </Route>

//         {/* Mentor Routes */}
//         <Route path="/mentor" element={
//           <RoleGuard allowedRole="MENTOR">
//             <MentorLayout />
//           </RoleGuard>
//         }>
//           <Route path=":id" element={<MyMentor />} />
//           <Route path="student/:id" element={<MyStudent />} />
//         </Route>

//         {/* Student Routes */}
//         <Route path="/student" element={
//           <RoleGuard allowedRole="STUDENT">
//             <StudentLayout />
//           </RoleGuard>
//         }>
//           <Route path=":id" element={<MyStudent />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>

//   );
// }

// export default App;
