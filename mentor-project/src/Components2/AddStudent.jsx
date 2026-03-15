// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Save, User, Mail, Phone, BookOpen, GraduationCap, UserCheck } from "lucide-react";

// function AddStudent() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: "",
//         enrollment: "",
//         email: "",
//         phone: "",
//         department: "Computer Science",
//         year: "1st Year",
//         mentor: ""
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//      const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const payload = {
//                 studentId: Date.now(),
//                 StudentName: formData.name,
//                 EnrollmentNo: formData.enrollment,
//                 Password: "default123",
//                 MobileNo: formData.phone,
//                 EmailAddress: formData.email,
//                 Description: `${formData.department} - ${formData.year}${formData.mentor ? ` | Mentor: ${formData.mentor}` : ""}`
//             };

//             const res = await fetch("http://localhost:3000/student", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload)
//             });

//             const data = await res.json();

//             if (res.ok) {
//                 alert("Student Added Successfully!");
//                 navigate("/students");
//             } else {
//                 alert(data.message || "Failed to add student.");
//             }
//         } catch (err) {
//             console.error("Error adding student:", err);
//             alert("Server error. Please make sure the backend is running.");
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div className="container-fluid p-4">

//             {/* Header */}
//             <div className="d-flex align-items-center mb-4 animate-slide-up">
//                 <button className="btn btn-light rounded-circle p-2 me-3 shadow-sm border" onClick={() => navigate(-1)}>
//                     <ArrowLeft size={20} className="text-muted" />
//                 </button>
//                 <div>
//                     <h3 className="fw-bold mb-1 text-brand-gradient">Add New Student</h3>
//                     <p className="text-muted mb-0">Enter student details to register</p>
//                 </div>
//             </div>

//             {/* Form Card */}
//             <div className="row animate-slide-up" style={{ animationDelay: "0.1s" }}>
//                 <div className="col-lg-8 mx-auto">
//                     <div className="glass-card p-5">
//                         <form onSubmit={handleSubmit}>
//                             <h5 className="fw-bold text-brand mb-4 d-flex align-items-center">
//                                 <User size={20} className="me-2" /> Personal Information
//                             </h5>

//                             <div className="row g-4 mb-4">
//                                 <div className="col-md-6">
//                                     <label className="form-label text-muted small fw-bold text-uppercase">Full Name</label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         className="form-control"
//                                         required
//                                         placeholder="e.g. Rahul Sharma"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label text-muted small fw-bold text-uppercase">Enrollment No.</label>
//                                     <input
//                                         type="text"
//                                         name="enrollment"
//                                         className="form-control"
//                                         required
//                                         placeholder="e.g. CS210045"
//                                         value={formData.enrollment}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label text-muted small fw-bold text-uppercase">Email Address</label>
//                                     <div className="input-group">
//                                         <span className="input-group-text bg-light border-end-0"><Mail size={16} className="text-muted" /></span>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             className="form-control border-start-0 ps-0"
//                                             required
//                                             placeholder="student@example.com"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label text-muted small fw-bold text-uppercase">Phone Number</label>
//                                     <div className="input-group">
//                                         <span className="input-group-text bg-light border-end-0"><Phone size={16} className="text-muted" /></span>
//                                         <input
//                                             type="tel"
//                                             name="phone"
//                                             className="form-control border-start-0 ps-0"
//                                             required
//                                             placeholder="+91 98765 43210"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             <hr className="text-muted opacity-25 my-5" />

//                             <h5 className="fw-bold text-brand mb-4 d-flex align-items-center">
//                                 <GraduationCap size={20} className="me-2" /> Academic Details
//                             </h5>

//                             <div className="row g-4 mb-4">
//                                 <div className="col-md-6">
//                                     <label className="form-label text-muted small fw-bold text-uppercase">Department</label>
//                                     <select name="department" className="form-select" value={formData.department} onChange={handleChange}>
//                                         <option>Computer Science</option>
//                                         <option>Information Tech</option>
//                                         <option>Electronics</option>
//                                         <option>Mechanical</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label text-muted small fw-bold text-uppercase">Current Year</label>
//                                     <select name="year" className="form-select" value={formData.year} onChange={handleChange}>
//                                         <option>1st Year</option>
//                                         <option>2nd Year</option>
//                                         <option>3rd Year</option>
//                                         <option>4th Year</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <label className="form-label text-muted small fw-bold text-uppercase">Assign Mentor</label>
//                                     <div className="input-group">
//                                         <span className="input-group-text bg-light border-end-0"><UserCheck size={16} className="text-muted" /></span>
//                                         <select name="mentor" className="form-select border-start-0" value={formData.mentor} onChange={handleChange}>
//                                             <option value="">Select a Mentor...</option>
//                                             <option>Dr. Anjali Gupta</option>
//                                             <option>Prof. Vikram Singh</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="d-flex justify-content-end gap-3 mt-5">
//                                 <button type="button" className="btn btn-outline-primary px-4" onClick={() => navigate(-1)}>Cancel</button>
//                                 <button type="submit" className="btn btn-primary px-5 d-flex align-items-center shadow-lg">
//                                     <Save size={18} className="me-2" /> Register Student
//                                 </button>
//                             </div>

//                         </form>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default AddStudent;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ArrowLeft, Save, User, Mail, Phone, BookOpen, GraduationCap, UserCheck } from "lucide-react";

function AddStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        enrollment: "",
        email: "",
        phone: "",
        password: "",
        department: "Computer Science",
        year: "1st Year",
        mentor: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Clean phone: remove all non-digit characters so it can be stored as Number
            const cleanPhone = formData.phone.replace(/\D/g, "");
            // Clean enrollment: remove non-digit characters for Number field
            const cleanEnrollment = formData.enrollment.replace(/\D/g, "");

            if (!cleanEnrollment) {
                alert("Enrollment number must contain digits.");
                setLoading(false);
                return;
            }
            if (!cleanPhone) {
                alert("Phone number must contain digits.");
                setLoading(false);
                return;
            }

            const payload = {
                studentId: Date.now(),
                StudentName: formData.name,
                EnrollmentNo: Number(cleanEnrollment),
                Password: formData.password,
                MobileNo: Number(cleanPhone),
                EmailAddress: formData.email,
                Description: `${formData.department} - ${formData.year}${formData.mentor ? ` | Mentor: ${formData.mentor}` : ""}`
            };

            const res = await api.post("/student", payload);

            const data = res.data;

            if (res.status === 200 || res.status === 201) {
                alert("Student Added Successfully!");
                navigate("/students");
            } else {
                // Backend returns { err } on failure, not { message }
                const errMsg = data.message || (data.err && (data.err.message || JSON.stringify(data.err))) || "Failed to add student.";
                alert(errMsg);
            }
        } catch (err) {
            console.error("Error adding student:", err);
            alert("Server error. Please make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-4">

            {/* Header */}
            <div className="d-flex align-items-center mb-4 animate-slide-up">
                <button className="btn btn-light rounded-circle p-2 me-3 shadow-sm border" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} className="text-muted" />
                </button>
                <div>
                    <h3 className="fw-bold mb-1 text-brand-gradient">Add New Student</h3>
                    <p className="text-muted mb-0">Enter student details to register</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="row animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="col-lg-8 mx-auto">
                    <div className="glass-card p-5">
                        <form onSubmit={handleSubmit}>
                            <h5 className="fw-bold text-brand mb-4 d-flex align-items-center">
                                <User size={20} className="me-2" /> Personal Information
                            </h5>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        required
                                        placeholder="e.g. Rahul Sharma"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Enrollment No.</label>
                                    <input
                                        type="text"
                                        name="enrollment"
                                        className="form-control"
                                        required
                                        placeholder="e.g. CS210045"
                                        value={formData.enrollment}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><Mail size={16} className="text-muted" /></span>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control border-start-0 ps-0"
                                            required
                                            placeholder="student@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Phone Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><Phone size={16} className="text-muted" /></span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control border-start-0 ps-0"
                                            required
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        required
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <hr className="text-muted opacity-25 my-5" />

                            <h5 className="fw-bold text-brand mb-4 d-flex align-items-center">
                                <GraduationCap size={20} className="me-2" /> Academic Details
                            </h5>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Department</label>
                                    <select name="department" className="form-select" value={formData.department} onChange={handleChange}>
                                        <option>Computer Science</option>
                                        <option>Information Tech</option>
                                        <option>Electronics</option>
                                        <option>Mechanical</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Current Year</label>
                                    <select name="year" className="form-select" value={formData.year} onChange={handleChange}>
                                        <option>1st Year</option>
                                        <option>2nd Year</option>
                                        <option>3rd Year</option>
                                        <option>4th Year</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Assign Mentor</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><UserCheck size={16} className="text-muted" /></span>
                                        <select name="mentor" className="form-select border-start-0" value={formData.mentor} onChange={handleChange}>
                                            <option value="">Select a Mentor...</option>
                                            <option>Dr. Anjali Gupta</option>
                                            <option>Prof. Vikram Singh</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-3 mt-5">
                                <button type="button" className="btn btn-outline-primary px-4" onClick={() => navigate(-1)}>Cancel</button>
                                <button type="submit" className="btn btn-primary px-5 d-flex align-items-center shadow-lg" disabled={loading}>
                                    <Save size={18} className="me-2" /> {loading ? "Registering..." : "Register Student"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddStudent;
