// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddMentor() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const initialForm = {
//     StaffID: "",
//     StaffName: "",
//     MobileNo: "",
//     EmailAddress: "",
//     Password: "",
//     Description: ""
//   };

//   const [form, setForm] = useState(initialForm);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3000/staff", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form)
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to add mentor");
//       }

//       alert("Mentor added successfully");
//       navigate("/mentors"); // Navigate back to list
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <div className="container mt-5 d-flex justify-content-center">
//     <div className="card shadow-lg border-0 w-100" style={{ maxWidth: "650px", borderRadius: "18px" }}>

//       {/* Header */}
//       <div
//         className="card-header border-0 text-white"
//         style={{
//           background: "linear-gradient(135deg, #198754, #157347)",
//           borderRadius: "18px 18px 0 0"
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-center px-2 py-3">
//           <h4 className="fw-semibold mb-0">
//             <i className="bi bi-person-plus-fill me-2"></i>
//             Add Mentor
//           </h4>
//           <button
//             className="btn btn-sm btn-light rounded-pill px-3"
//             onClick={() => navigate("/mentors")}
//           >
//             <i className="bi bi-arrow-left me-1"></i> Back
//           </button>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="card-body px-4 py-4">
//         <form onSubmit={handleSubmit}>
//           <div className="row g-4">

//             {/* Staff ID */}
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Staff ID</label>
//               <input
//                 type="number"
//                 name="StaffID"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="101"
//                 value={form.StaffID}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Name */}
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Full Name</label>
//               <input
//                 type="text"
//                 name="StaffName"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="John Doe"
//                 value={form.StaffName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="col-12">
//               <label className="form-label fw-semibold">Email Address</label>
//               <input
//                 type="email"
//                 name="EmailAddress"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="john@example.com"
//                 value={form.EmailAddress}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Mobile */}
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Mobile Number</label>
//               <input
//                 type="number"
//                 name="MobileNo"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="9876543210"
//                 value={form.MobileNo}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Password */}
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Password</label>
//               <input
//                 type="password"
//                 name="Password"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="••••••••"
//                 value={form.Password}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Description */}
//             <div className="col-12">
//               <label className="form-label fw-semibold">Role / Description</label>
//               <textarea
//                 name="Description"
//                 className="form-control rounded-3"
//                 rows="3"
//                 placeholder="Mentor for final year students"
//                 value={form.Description}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Actions */}
//             <div className="col-12 d-flex justify-content-end gap-3 mt-3">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary px-4"
//                 onClick={() => navigate("/mentors")}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-success px-5"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Saving
//                   </>
//                 ) : (
//                   "Add Mentor"
//                 )}
//               </button>
//             </div>

//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );

// }

// export default AddMentor;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddMentor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const editId = location.state?.editId || null;
  const isEditMode = !!editId;

  const initialForm = {
    StaffID: "",
    StaffName: "",
    MobileNo: "",
    EmailAddress: "",
    Password: "",
    Description: ""
  };

  const [form, setForm] = useState(initialForm);

  // Fetch existing mentor data when in edit mode
  useEffect(() => {
    if (!editId) return;
    const fetchMentor = async () => {
      setFetchingData(true);
      try {
        const res = await fetch(`http://localhost:3000/staff/${editId}`);
        const data = await res.json();
        if (res.ok && data.staff) {
          const s = data.staff;
          setForm({
            StaffID: s.StaffID || "",
            StaffName: s.StaffName || "",
            MobileNo: s.MobileNo || "",
            EmailAddress: s.EmailAddress || "",
            Password: "",
            Description: s.Description || ""
          });
        }
      } catch (err) {
        console.error("Error fetching mentor for edit:", err);
      } finally {
        setFetchingData(false);
      }
    };
    fetchMentor();
  }, [editId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditMode
        ? `http://localhost:3000/staff/${editId}`
        : "http://localhost:3000/staff";
      const method = isEditMode ? "PATCH" : "POST";

      // For edit, only send fields that have values (don't send empty password)
      const payload = { ...form };
      if (isEditMode && !payload.Password) {
        delete payload.Password;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || (isEditMode ? "Failed to update mentor" : "Failed to add mentor"));
      }

      alert(isEditMode ? "Mentor updated successfully" : "Mentor added successfully");
      navigate(isEditMode ? `/mentor/${editId}` : "/mentors");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-lg border-0 w-100" style={{ maxWidth: "650px", borderRadius: "18px" }}>

      {/* Header */}
      <div
        className="card-header border-0 text-white"
        style={{
          background: "linear-gradient(135deg, #198754, #157347)",
          borderRadius: "18px 18px 0 0"
        }}
      >
        <div className="d-flex justify-content-between align-items-center px-2 py-3">
        <h4 className="fw-semibold mb-0">
            <i className={`bi ${isEditMode ? "bi-pencil-fill" : "bi-person-plus-fill"} me-2`}></i>
            {isEditMode ? "Edit Mentor" : "Add Mentor"}
          </h4>
          <button
            className="btn btn-sm btn-light rounded-pill px-3"
            onClick={() => navigate("/mentors")}
          >
            <i className="bi bi-arrow-left me-1"></i> Back
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">

            {/* Staff ID */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Staff ID</label>
              <input
                type="number"
                name="StaffID"
                className="form-control form-control-lg rounded-3"
                placeholder="101"
                value={form.StaffID}
                onChange={handleChange}
                required
                readOnly={isEditMode}
                style={isEditMode ? { backgroundColor: "#e9ecef" } : {}}
              />
            </div>

            {/* Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="StaffName"
                className="form-control form-control-lg rounded-3"
                placeholder="John Doe"
                value={form.StaffName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="col-12">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="EmailAddress"
                className="form-control form-control-lg rounded-3"
                placeholder="john@example.com"
                value={form.EmailAddress}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mobile */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Mobile Number</label>
              <input
                type="number"
                name="MobileNo"
                className="form-control form-control-lg rounded-3"
                placeholder="9876543210"
                value={form.MobileNo}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Password{isEditMode && <span className="text-muted fw-normal"> (leave blank to keep current)</span>}</label>
              <input
                type="password"
                name="Password"
                className="form-control form-control-lg rounded-3"
                placeholder="••••••••"
                value={form.Password}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">Role / Description</label>
              <textarea
                name="Description"
                className="form-control rounded-3"
                rows="3"
                placeholder="Mentor for final year students"
                value={form.Description}
                onChange={handleChange}
              />
            </div>

            {/* Actions */}
            <div className="col-12 d-flex justify-content-end gap-3 mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => navigate("/mentors")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success px-5"
                disabled={loading || fetchingData}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {isEditMode ? "Updating" : "Saving"}
                  </>
                ) : (
                  isEditMode ? "Update Mentor" : "Add Mentor"
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
);

}

export default AddMentor;
