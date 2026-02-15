// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   MoreVertical,
//   Download,
//   Plus,
//   Eye,
//   Edit,
//   Trash2,
//   AlertCircle,
//   CheckCircle2,
//   GraduationCap
// } from "lucide-react";

// function Students() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDept, setFilterDept] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [studentList, setStudentList] = useState([]);

//   // ===== FETCH STUDENTS =====
//   useEffect(() => {
//     fetch("http://localhost:3000/student")
//       .then(res => res.json())
//       .then(data => {
//         const studentsArray = Array.isArray(data.student) ? data.student : [];

//         const formatted = studentsArray.map(s => ({
//           id: s._id,
//           name: s.StudentName || "Unknown",
//           enrollment: String(s.EnrollmentNo || ""),
//           department: s.Department || "CSE",
//           year: s.Year || "3rd Year",
//           status: s.Status || "Active",
//           gpa: s.GPA || "N/A",
//           attendance: s.Attendance ?? 100
//         }));

//         setStudentList(formatted);
//       })
//       .catch(err => console.error("Error fetching students:", err));
//   }, []);

//   const departments = ["All", ...new Set(studentList.map(s => s.department))];
//   const statuses = ["All", "Active", "Probation", "Inactive"];

//   const filteredStudents = studentList.filter((s) => {
//     const name = (s.name || "").toLowerCase();
//     const enrollment = (s.enrollment || "").toLowerCase();
//     const search = searchTerm.toLowerCase();

//     const matchSearch = name.includes(search) || enrollment.includes(search);
//     const matchDept = filterDept === "All" || s.department === filterDept;
//     const matchStatus = filterStatus === "All" || s.status === filterStatus;

//     return matchSearch && matchDept && matchStatus;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Active": return "success";
//       case "Probation": return "danger";
//       default: return "secondary";
//     }
//   };

//   const handleExport = () => {
//     const headers = ["Name,Enrollment,Department,Year,Status,GPA,Attendance"];
//     const rows = filteredStudents.map(s =>
//       `${s.name},${s.enrollment},${s.department},${s.year},${s.status},${s.gpa},${s.attendance}`
//     );
//     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "students_list.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleArchive = (id) => {
//     if (window.confirm("Are you sure you want to archive this student?")) {
//       setStudentList(studentList.filter(s => s.id !== id));
//     }
//   };

//   const handleEdit = (id) => {
//     alert(`Edit functionality for Student ID ${id} coming soon!`);
//   };

//   return (
//     <div className="container-fluid p-4">

//       {/* ===== HEADER ===== */}
//       <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
//         <div className="d-flex align-items-center gap-3">
//           <div className="bg-soft-primary p-3 rounded-3">
//             <GraduationCap size={28} />
//           </div>
//           <div>
//             <h3 className="fw-bold mb-1">Student Directory</h3>
//             <p className="text-muted mb-0">
//               Manage {studentList.length} students across departments
//             </p>
//           </div>
//         </div>
//         <div className="d-flex gap-2">
//           <button className="btn btn-outline-primary" onClick={handleExport}>
//             <Download size={18} className="me-2" /> Export
//           </button>
//           <button className="btn btn-primary" onClick={() => navigate("/students/add")}>
//             <Plus size={18} className="me-2" /> Add Student
//           </button>
//         </div>
//       </div>

//       {/* ===== SEARCH BAR ===== */}
//       <div className="row g-3 mb-4">
//         <div className="col-md-5">
//           <div className="position-relative">
//             <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
//             <input
//               type="text"
//               className="form-control ps-5"
//               placeholder="Search by name or enrollment..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
//             {departments.map(d => <option key={d}>{d}</option>)}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//             {statuses.map(s => <option key={s}>{s === "All" ? "Filter Status" : s}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* ===== TABLE (THIS WAS MISSING BEFORE) ===== */}
//       <div className="table-responsive">
//         <table className="table table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Student</th>
//               <th>Status</th>
//               <th>Department</th>
//               <th>GPA / Attendance</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.length > 0 ? filteredStudents.map(s => (
//               <tr key={s.id}>
//                 <td>
//                   <strong>{s.name}</strong>
//                   <div className="text-muted small">{s.enrollment}</div>
//                 </td>
//                 <td>
//                   <span className={`badge bg-${getStatusColor(s.status)}-subtle text-${getStatusColor(s.status)}`}>
//                     {s.status === "Active"
//                       ? <CheckCircle2 size={12} className="me-1" />
//                       : <AlertCircle size={12} className="me-1" />}
//                     {s.status}
//                   </span>
//                 </td>
//                 <td>
//                   {s.department}
//                   <div className="text-muted small">{s.year}</div>
//                 </td>
//                 <td>
//                   <strong>{s.gpa}</strong> / {s.attendance}%
//                 </td>
//                 <td className="text-end">
//                   <div className="dropdown">
//                     <button className="btn btn-light" data-bs-toggle="dropdown">
//                       <MoreVertical size={16} />
//                     </button>
//                     <ul className="dropdown-menu dropdown-menu-end">
//                       <li>
//                         <button className="dropdown-item" onClick={() => navigate(`/student/${s.id}`)}>
//                           <Eye size={16} className="me-2" /> View
//                         </button>
//                       </li>
//                       <li>
//                         <button className="dropdown-item" onClick={() => handleEdit(s.id)}>
//                           <Edit size={16} className="me-2" /> Edit
//                         </button>
//                       </li>
//                       <li><hr className="dropdown-divider" /></li>
//                       <li>
//                         <button className="dropdown-item text-danger" onClick={() => handleArchive(s.id)}>
//                           <Trash2 size={16} className="me-2" /> Archive
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-muted">
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Students;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MoreVertical,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle2,
  GraduationCap
} from "lucide-react";

function Students() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [studentList, setStudentList] = useState([]);

  // ===== FETCH STUDENTS =====
  useEffect(() => {
    fetch("http://localhost:3000/student")
      .then(res => res.json())
      .then(data => {
        const studentsArray = Array.isArray(data.student) ? data.student : [];

        const formatted = studentsArray.map(s => ({
          id: s._id,
          name: s.StudentName || "Unknown",
          enrollment: String(s.EnrollmentNo || ""),
          email: s.EmailAddress || "",
          mobile: String(s.MobileNo || ""),
          department: s.Department || "CSE",
          year: s.Year || "3rd Year",
          status: s.Status || "Active",
          gpa: s.GPA || "N/A",
          attendance: s.Attendance ?? 100
        }));

        setStudentList(formatted);
      })
      .catch(err => console.error("Error fetching students:", err));
  }, []);

  const departments = ["All", ...new Set(studentList.map(s => s.department))];
  const statuses = ["All", "Active", "Probation", "Inactive"];

  const filteredStudents = studentList.filter((s) => {
    const name = (s.name || "").toLowerCase();
    const enrollment = (s.enrollment || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchSearch = name.includes(search) || enrollment.includes(search);
    const matchDept = filterDept === "All" || s.department === filterDept;
    const matchStatus = filterStatus === "All" || s.status === filterStatus;

    return matchSearch && matchDept && matchStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "success";
      case "Probation": return "danger";
      default: return "secondary";
    }
  };

  const handleExport = () => {
    const headers = ["Name,Enrollment,Department,Year,Status,GPA,Attendance"];
    const rows = filteredStudents.map(s =>
      `${s.name},${s.enrollment},${s.department},${s.year},${s.status},${s.gpa},${s.attendance}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [editStudent, setEditStudent] = useState(null);
  const [editForm, setEditForm] = useState({ StudentName: "", EnrollmentNo: "", MobileNo: "", EmailAddress: "" });
  const [editLoading, setEditLoading] = useState(false);

  const handleArchive = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await fetch(`http://localhost:3000/student/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (res.ok) {
          setStudentList(studentList.filter(s => s.id !== id));
        } else {
          alert(data.message || "Failed to delete student.");
        }
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Server error. Please make sure the backend is running.");
      }
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setEditForm({
      StudentName: student.name,
      EnrollmentNo: student.enrollment,
      MobileNo: student.mobile || "",
      EmailAddress: student.email || ""
    });
  };

  const handleEditSubmit = async () => {
    if (!editStudent) return;
    setEditLoading(true);
    try {
      const payload = {
        StudentName: editForm.StudentName,
        EnrollmentNo: Number(String(editForm.EnrollmentNo).replace(/\D/g, "")),
        MobileNo: Number(String(editForm.MobileNo).replace(/\D/g, "")),
        EmailAddress: editForm.EmailAddress
      };
      const res = await fetch(`http://localhost:3000/student/${editStudent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setStudentList(studentList.map(s =>
          s.id === editStudent.id
            ? { ...s, name: editForm.StudentName, enrollment: String(editForm.EnrollmentNo), email: editForm.EmailAddress, mobile: String(editForm.MobileNo) }
            : s
        ));
        setEditStudent(null);
      } else {
        const errMsg = data.message || (data.err && (data.err.message || JSON.stringify(data.err))) || "Failed to update student.";
        alert(errMsg);
      }
    } catch (err) {
      console.error("Error updating student:", err);
      alert("Server error. Please make sure the backend is running.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4">

      {/* ===== HEADER ===== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-soft-primary p-3 rounded-3">
            <GraduationCap size={28} />
          </div>
          <div>
            <h3 className="fw-bold mb-1">Student Directory</h3>
            <p className="text-muted mb-0">
              Manage {studentList.length} students across departments
            </p>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={handleExport}>
            <Download size={18} className="me-2" /> Export
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/students/add")}>
            <Plus size={18} className="me-2" /> Add Student
          </button>
        </div>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <div className="position-relative">
            <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search by name or enrollment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            {statuses.map(s => <option key={s}>{s === "All" ? "Filter Status" : s}</option>)}
          </select>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-responsive" style={{ overflow: "visible" }}>
        <table className="table table-hover align-middle" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead className="table-light">
            <tr>
              <th style={{ width: "30%" }}>Student</th>
              <th style={{ width: "15%" }}>Status</th>
              <th style={{ width: "20%" }}>Department</th>
              <th style={{ width: "20%" }}>GPA / Attendance</th>
              <th className="text-end" style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? filteredStudents.map(s => (
              <tr key={s.id}>
                <td>
                  <strong>{s.name}</strong>
                  <div className="text-muted small">{s.enrollment}</div>
                </td>
                <td>
                  <span className={`badge bg-${getStatusColor(s.status)}-subtle text-${getStatusColor(s.status)}`}>
                    {s.status === "Active"
                      ? <CheckCircle2 size={12} className="me-1" />
                      : <AlertCircle size={12} className="me-1" />}
                    {s.status}
                  </span>
                </td>
                <td>
                  {s.department}
                  <div className="text-muted small">{s.year}</div>
                </td>
                <td>
                  <strong>{s.gpa}</strong> / {s.attendance}%
                </td>
                <td className="text-end">
                  <div className="dropdown">
                    <button className="btn btn-light" data-bs-toggle="dropdown">
                      <MoreVertical size={16} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button className="dropdown-item" onClick={() => navigate(`/student/${s.id}`)}>
                          <Eye size={16} className="me-2" /> View
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => handleEdit(s)}>
                          <Edit size={16} className="me-2" /> Edit
                        </button>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => handleArchive(s.id)}>
                          <Trash2 size={16} className="me-2" /> Archive
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ===== EDIT MODAL ===== */}
      {editStudent && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Edit Student</h5>
                <button type="button" className="btn-close" onClick={() => setEditStudent(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.StudentName}
                    onChange={(e) => setEditForm({ ...editForm, StudentName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Enrollment No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.EnrollmentNo}
                    onChange={(e) => setEditForm({ ...editForm, EnrollmentNo: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Mobile No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.MobileNo}
                    onChange={(e) => setEditForm({ ...editForm, MobileNo: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editForm.EmailAddress}
                    onChange={(e) => setEditForm({ ...editForm, EmailAddress: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setEditStudent(null)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleEditSubmit} disabled={editLoading}>
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Students;
