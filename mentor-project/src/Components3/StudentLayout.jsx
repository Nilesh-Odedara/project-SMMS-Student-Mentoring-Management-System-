import { Outlet, Link } from "react-router-dom";

function StudentLayout() {
  return (
    <>
      <nav className="navbar navbar-light bg-light px-4">
        <span className="navbar-brand">Student Portal</span>
        <Link to="/login" className="btn btn-sm btn-outline-secondary">
          Logout
        </Link>
      </nav>

      <div className="container my-4">
        <Outlet />
      </div>
    </>
  );
}

export default StudentLayout;
