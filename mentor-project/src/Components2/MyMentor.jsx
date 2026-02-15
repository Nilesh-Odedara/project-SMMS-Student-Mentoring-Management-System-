// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { students, mentors } from "../data/dummyData";

// // function MyMentor() {
// //   const navigate = useNavigate();

// //   // Dummy mentor (in real app, by id)
// //   const mentor = mentors[0];

// //   // Assigned students (dummy link)
// //   const assignedStudents = students.filter(
// //     (s) => s.mentor === mentor.name
// //   );

// //   return (
// //     <div className="container-fluid p-4 bg-light" style={{ minHeight: "100vh" }}>

// //       {/* Header */}
// //       <div className="mb-4">
// //         <h4 className="fw-bold mb-1">Mentor Profile</h4>
// //         <p className="text-muted mb-0">
// //           Overview of mentor and assigned students
// //         </p>
// //       </div>

// //       {/* Mentor Info */}
// //       <div className="card border-0 shadow-sm mb-4">
// //         <div className="card-body">
// //           <div className="row">

// //             <div className="col-md-8">
// //               <h5 className="fw-bold mb-3">{mentor.name}</h5>

// //               <div className="row">
// //                 <div className="col-md-6 mb-2">
// //                   <strong>Department:</strong> {mentor.department}
// //                 </div>
// //                 <div className="col-md-6 mb-2">
// //                   <strong>Status:</strong>{" "}
// //                   <span
// //                     className={`badge ${
// //                       mentor.status === "Active"
// //                         ? "bg-success"
// //                         : "bg-secondary"
// //                     }`}
// //                   >
// //                     {mentor.status}
// //                   </span>
// //                 </div>
// //                 <div className="col-md-6 mb-2">
// //                   <strong>Email:</strong> {mentor.email}
// //                 </div>
// //                 <div className="col-md-6 mb-2">
// //                   <strong>Mobile:</strong> {mentor.mobile}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Quick Stats */}
// //             <div className="col-md-4">
// //               <div className="border rounded p-3 h-100">
// //                 <p className="text-muted mb-1">Assigned Students</p>
// //                 <h4 className="fw-bold mb-0">{assignedStudents.length}</h4>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>

// //       {/* Assigned Students */}
// //       <div className="card border-0 shadow-sm">
// //         <div className="card-body p-0">

// //           <div className="p-3">
// //             <h6 className="fw-bold mb-0">Assigned Students</h6>
// //           </div>

// //           <div className="table-responsive">
// //             <table className="table table-hover mb-0">
// //               <thead className="table-light">
// //                 <tr>
// //                   <th>Name</th>
// //                   <th>Enrollment</th>
// //                   <th>Department</th>
// //                   <th>Year</th>
// //                   <th className="text-end">Action</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {assignedStudents.map((s) => (
// //                   <tr key={s.id}>
// //                     <td>{s.name}</td>
// //                     <td>{s.enrollment}</td>
// //                     <td>{s.department}</td>
// //                     <td>{s.year}</td>
// //                     <td className="text-end">
// //                       <button
// //                         className="btn btn-outline-primary btn-sm"
// //                         onClick={() => navigate(`/student/${s.id}`)}
// //                       >
// //                         View Profile
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}

// //                 {assignedStudents.length === 0 && (
// //                   <tr>
// //                     <td colSpan="5" className="text-center text-muted py-4">
// //                       No students assigned
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>

// //             </table>
// //           </div>

// //         </div>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MyMentor;





// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function MyMentor() {
//   console.log('🎯 MyMentor component rendered');
//   const navigate = useNavigate();
//   let { id } = useParams();
//   console.log('🎯 useParams id:', id);
//   console.log('🎯 window.location.pathname:', window.location.pathname);
  
//   const [mentor, setMentor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fallback: extract id from URL if useParams doesn't work
//   if (!id) {
//     console.log('📍 useParams returned undefined, extracting from URL');
//     const pathArray = window.location.pathname.split('/').filter(p => p);
//     console.log('📍 Path array:', pathArray);
//     id = pathArray[pathArray.length - 1];
//     console.log('📍 Extracted ID:', id);
//   }

//   useEffect(() => {
//     console.log('🎯 useEffect running with id:', id);
//     if (!id || id === 'mentor' || id === '') {
//       setError("No mentor ID provided. URL: " + window.location.pathname);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const url = `http://localhost:3000/staff/?id=${id}`;
//     console.log('🔄 Fetching mentor from:', url);
    
//     fetch(url)
//       .then(res => {
//         console.log('📡 Response status:', res.status);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log('✅ Mentor data:', data);
//         // API returns {message, staff: Array}, find the mentor with matching StaffID
//         if (data.staff && Array.isArray(data.staff)) {
//           // Try to match by StaffID first, then by index, then by _id
//           let foundMentor = data.staff.find(s => s.StaffID === parseInt(id));
          
//           // If not found by StaffID, try by array index (id as index+1)
//           if (!foundMentor) {
//             foundMentor = data.staff[parseInt(id) - 1];
//           }
          
//           // If still not found, try by _id
//           if (!foundMentor) {
//             foundMentor = data.staff.find(s => s._id === id);
//           }
          
//           if (foundMentor) {
//             console.log('Found mentor:', foundMentor);
//             setMentor(foundMentor);
//           } else {
//             console.warn('Mentor not found with id:', id);
//             setError('Mentor not found');
//           }
//         } else {
//           setMentor(data);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('❌ Fetch error:', err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="p-4">
//         <div className="text-center text-muted py-5">
//           <div className="spinner-border text-success" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-2">Loading mentor profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <div className="alert alert-danger" role="alert">
//           Error loading mentor: {error}
//         </div>
//       </div>
//     );
//   }

//   if (!mentor) {
//     return (
//       <div className="p-4">
//         <div className="alert alert-info" role="alert">
//           <strong>No mentor data found</strong><br/>
//           Mentor ID: {id}<br/>
//           Check browser console for more details.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="mb-4">
//         <h4 className="fw-bold mb-1">
//           <i className="bi bi-person-circle me-2 text-success"></i>
//           Mentor Profile
//         </h4>
//         <p className="text-muted mb-0">Overview of mentor and assigned students</p>
//       </div>

//       {/* Profile Card */}
//       <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
//         <div className="card-body p-4">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <div className="d-flex align-items-center gap-4">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold"
//                   style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                 >
//                   {mentor.StaffName.charAt(0)}
//                 </div>
//                 <div>
//                   <h4 className="fw-bold mb-1">{mentor.StaffName}</h4>
//                   <p className="text-muted mb-2">{mentor.Department || 'Staff'}</p>
//                   <span className="badge bg-success">
//                     {mentor.Description || 'Active'}
//                   </span>
//                 </div>
//               </div>

//               <div className="row mt-4">
//                 <div className="col-md-6 mb-2">
//                   <i className="bi bi-envelope text-muted me-2"></i>
//                   <span>{mentor.EmailAddress}</span>
//                 </div>
//                 <div className="col-md-6 mb-2">
//                   <i className="bi bi-telephone text-muted me-2"></i>
//                   <span>{mentor.MobileNo}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="bg-success-subtle rounded-3 p-4 text-center">
//                 <i className="bi bi-people fs-1 text-success d-block mb-2"></i>
//                 <div className="display-5 fw-bold text-success">-</div>
//                 <div className="text-muted">Assigned Students</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Note: Assigned Students list would require a separate API call */}
//       <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
//         <div className="card-body p-4">
//           <div className="text-center text-muted py-5">
//             <i className="bi bi-info-circle fs-1 d-block mb-2"></i>
//             <p>Assigned students data will be available when the backend API is ready</p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
//         .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1) !important; }
//         .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1) !important; }
//       `}</style>
//     </div>
//   );
// }

// export default MyMentor;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MyMentor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mentor, setMentor] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("No mentor ID provided.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch mentor details by _id
        const mentorRes = await fetch(`http://localhost:3000/staff/${id}`);
        if (!mentorRes.ok) throw new Error("Failed to fetch mentor");
        const mentorData = await mentorRes.json();
        const mentorObj = mentorData.staff;
        if (!mentorObj) throw new Error("Mentor not found");
        setMentor(mentorObj);

        // 2. Fetch student-mentor assignments and all students in parallel
        const [assignmentsRes, studentsRes] = await Promise.all([
          fetch("http://localhost:3000/studentmentor"),
          fetch("http://localhost:3000/student")
        ]);

        const assignmentsData = await assignmentsRes.json();
        const studentsData = await studentsRes.json();

        const assignments = assignmentsData.studentMentor || [];
        const allStudents = studentsData.student
          ? (Array.isArray(studentsData.student) ? studentsData.student : [studentsData.student])
          : (Array.isArray(studentsData) ? studentsData : []);

        // 3. Filter assignments for this mentor's StaffID
        const mentorAssignments = assignments.filter(
          (a) => a.StaffId === mentorObj.StaffID
        );

        // 4. Build student map by studentId number
        const studentMap = {};
        allStudents.forEach((s) => {
          studentMap[s.studentId] = s;
        });

        // 5. Resolve assigned students
        const resolved = mentorAssignments.map((a) => {
          const student = studentMap[a.StudentId] || {};
          return {
            assignmentId: a._id,
            studentId: a.StudentId,
            studentMongoId: student._id || null,
            name: student.StudentName || `Student #${a.StudentId}`,
            enrollmentNo: student.EnrollmentNo || "N/A",
            email: student.EmailAddress || "N/A",
            mobile: student.MobileNo || "N/A",
            fromDate: a.FromDate ? new Date(a.FromDate).toLocaleDateString() : "N/A",
            toDate: a.ToDate ? new Date(a.ToDate).toLocaleDateString() : "N/A",
            description: a.Description || ""
          };
        });

        setAssignedStudents(resolved);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this mentor? This action cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:3000/staff/${id}`, { method: "DELETE" });
      if (res.ok) {
        navigate("/mentors");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete mentor.");
      }
    } catch (err) {
      alert("An error occurred while deleting the mentor.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center text-muted py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading mentor profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="alert alert-danger" role="alert">
          Error loading mentor: {error}
        </div>
        <button className="btn btn-outline-success" onClick={() => navigate("/mentors")}>
          Back to Mentors
        </button>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="p-4">
        <div className="alert alert-info" role="alert">
          No mentor data found.
        </div>
        <button className="btn btn-outline-success" onClick={() => navigate("/mentors")}>
          Back to Mentors
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            <i className="bi bi-person-circle me-2 text-success"></i>
            Mentor Profile
          </h4>
          <p className="text-muted mb-0">Overview of mentor and assigned students</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/mentors")}>
          <i className="bi bi-arrow-left me-1"></i> Back
        </button>
      </div>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold"
                  style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                >
                  {mentor.StaffName.charAt(0)}
                </div>
                <div>
                  <h4 className="fw-bold mb-1">{mentor.StaffName}</h4>
                  <span className="badge bg-light text-dark me-2">ID: {mentor.StaffID}</span>
                  <span className="badge bg-success">
                    {mentor.Description || "Active"}
                  </span>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6 mb-2">
                  <i className="bi bi-envelope text-muted me-2"></i>
                  <span>{mentor.EmailAddress}</span>
                </div>
                <div className="col-md-6 mb-2">
                  <i className="bi bi-telephone text-muted me-2"></i>
                  <span>{mentor.MobileNo}</span>
                </div>
              </div>

              {/* Edit and Delete buttons */}
              <div className="d-flex gap-2 mt-3">
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => navigate("/mentors/add", { state: { editId: id, mentorData: mentor } })}
                >
                  <i className="bi bi-pencil me-1"></i> Edit Mentor
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <i className="bi bi-trash me-1"></i> {deleting ? "Deleting..." : "Delete Mentor"}
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-success-subtle rounded-3 p-4 text-center">
                <i className="bi bi-people fs-1 text-success d-block mb-2"></i>
                <div className="display-5 fw-bold text-success">{assignedStudents.length}</div>
                <div className="text-muted">Assigned Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Students Table */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="card-body p-0">
          <div className="p-3 border-bottom">
            <h6 className="fw-bold mb-0">
              <i className="bi bi-people me-2 text-success"></i>
              Assigned Students
            </h6>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Enrollment</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>From</th>
                  <th>To</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignedStudents.map((s) => (
                  <tr key={s.assignmentId}>
                    <td className="fw-semibold">{s.name}</td>
                    <td>{s.enrollmentNo}</td>
                    <td>{s.email}</td>
                    <td>{s.mobile}</td>
                    <td>{s.fromDate}</td>
                    <td>{s.toDate}</td>
                    <td className="text-end">
                      {s.studentMongoId ? (
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate(`/student/${s.studentMongoId}`)}
                        >
                          View Profile
                        </button>
                      ) : (
                        <span className="text-muted small">No profile</span>
                      )}
                    </td>
                  </tr>
                ))}
                {assignedStudents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No students assigned to this mentor
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default MyMentor;
