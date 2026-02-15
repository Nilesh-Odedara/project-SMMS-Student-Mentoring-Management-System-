import { Outlet, Link } from "react-router-dom";

function MentorLayout() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/mentor/1">
          Mentor Panel
        </Link>
        <div className="d-flex gap-3">
          <Link className="nav-link text-white" to="/mentor/1">Dashboard</Link>
          <Link className="nav-link text-white" to="/login">Logout</Link>
        </div>
      </nav>

      <div className="container my-4">
        <Outlet />
      </div>

      <footer className="text-center text-muted py-3 small">
        Mentor Portal © 2026
      </footer>
    </>
  );
}

export default MentorLayout;
