function StudentLayout({ children }) {
  return (
    <>
      <nav className="navbar navbar-light bg-light px-4">
        <span className="navbar-brand">Student Portal</span>
        <a href="/login" className="btn btn-sm btn-outline-secondary">
          Logout
        </a>
      </nav>

      <div className="container my-4">
        {children}
      </div>
    </>
  );
}

export default StudentLayout;
