import React, { useState } from "react";
import { mentors } from "../data/dummyData";
import { useNavigate } from "react-router-dom";

function Mentors() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMentors = mentors.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold mb-1">
            <i className="bi bi-person-badge-fill me-2 text-success"></i>
            Mentors
          </h4>
          <p className="text-muted mb-0">Manage and monitor mentor information</p>
        </div>
        <button className="btn btn-success">
          <i className="bi bi-plus-lg me-2"></i>
          Add Mentor
        </button>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Cards */}
      <div className="row g-4">
        {filteredMentors.map((m) => (
          <div className="col-lg-4 col-md-6" key={m.id}>
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
              <div className="card-body">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success fw-bold"
                    style={{ width: "56px", height: "56px", fontSize: "1.25rem" }}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{m.name}</h6>
                    <span className="badge bg-light text-dark">{m.department}</span>
                  </div>
                  <span
                    className={`badge ${
                      m.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>

                <div className="border-top pt-3">
                  <div className="row g-2 small">
                    <div className="col-12">
                      <i className="bi bi-envelope text-muted me-2"></i>
                      {m.email}
                    </div>
                    <div className="col-12">
                      <i className="bi bi-telephone text-muted me-2"></i>
                      {m.mobile}
                    </div>
                    <div className="col-12">
                      <i className="bi bi-people text-muted me-2"></i>
                      <span className="fw-semibold">{m.totalStudents}</span> students assigned
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-outline-success btn-sm flex-fill"
                    onClick={() => navigate(`/mentor/${m.id}`)}
                    >
                    <i className="bi bi-eye me-1"></i>
                    View
                  </button>
                  <button className="btn btn-outline-secondary btn-sm flex-fill">
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredMentors.length === 0 && (
          <div className="col-12">
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox fs-1 d-block mb-2"></i>
              No mentors found
            </div>
          </div>
        )}
      </div>

      <style>{`
        .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
      `}</style>
    </div>
  );
}

export default Mentors;
