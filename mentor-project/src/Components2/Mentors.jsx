import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Mentors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/staff")
      .then(res => {
        const data = res.data;
        setMentors(data.staff || []);
        setError("");
      })
      .catch(() => setError("Unable to load mentors"))
      .finally(() => setLoading(false));
  }, []);

  const filteredMentors = mentors.filter(m =>
    m.StaffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.EmailAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            <i className="bi bi-person-badge-fill me-2 text-success"></i>
            Mentors
          </h4>
          <p className="text-muted mb-0">
            Manage and monitor mentor information
          </p>
        </div>
        <button
          className="btn btn-success"
          onClick={() => navigate("/mentors/add")}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Mentor
        </button>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 16 }}>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="row g-4">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success" />
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {!loading && !error && filteredMentors.map(m => (
          <div className="col-lg-4 col-md-6" key={m._id}>
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: 16 }}
            >
              <div className="card-body">
                <div className="d-flex gap-3 mb-3">
                  <div
                    className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center fw-bold text-success"
                    style={{ width: 56, height: 56 }}
                  >
                    {m.StaffName.charAt(0)}
                  </div>

                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{m.StaffName}</h6>
                    <span className="badge bg-light text-dark">
                      ID: {m.StaffID}
                    </span>
                  </div>
                </div>

                <div className="border-top pt-3 small">
                  <div className="mb-1">
                    <i className="bi bi-envelope me-2 text-muted"></i>
                    {m.EmailAddress}
                  </div>
                  <div className="mb-1">
                    <i className="bi bi-telephone me-2 text-muted"></i>
                    {m.MobileNo}
                  </div>
                  <div className="text-muted mt-2">
                    {m.Description || "No description available"}
                  </div>
                </div>

                <button
                  className="btn btn-outline-success btn-sm w-100 mt-3"
                  onClick={() => navigate(`/mentor/${m._id}`)}
                >
                  <i className="bi bi-eye me-1"></i>
                  View
                </button>
              </div>
            </div>
          </div>
        ))}

        {!loading && !error && filteredMentors.length === 0 && (
          <div className="text-center text-muted py-5">
            No mentors found
          </div>
        )}
      </div>

      <style>{`
        .bg-success-subtle {
          background-color: rgba(25, 135, 84, 0.1);
        }
      `}</style>
    </div>
  );
}

export default Mentors;
