import { Link, useParams } from "react-router-dom";
import React, { useState,useEffect, useContext } from "react";
import { BookContext } from "../context/BookContext";


const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { books, fetchBooks } = useContext(BookContext);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  return (
    <>
      <div className="px-4 py-2" style={{ background: "#1976d2", color: "white", fontSize: "0.9rem" }}>
        <div className="container-fluid d-flex align-items-center">
          <span className="badge bg-light text-primary ms-auto">
            Total Books: {books?.length}
          </span>
        </div>
      </div>


       <nav className="navbar navbar-expand-lg border-bottom" style={{ background: "white" }}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <div className="rounded bg-primary p-2">
              <i className="bi bi-book text-white"></i>
            </div>
            <span style={{ color: "#1a237e" }}>Book Inventory</span>
            <small className="text-muted" style={{ fontSize: "0.7rem" }}>Management System</small>
          </Link>

          <button className="navbar-toggler" onClick={() => setExpanded(!expanded)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
            <div className="navbar-nav me-auto">
              <Link className="nav-link px-3" to="/">
  <i className="bi bi-house-door me-1 text-primary fs-6"></i>
  Home
</Link>

              <Link className="nav-link px-3" to="/add-book">
                <i className="bi bi-plus-circle me-1"></i>
                Add Book
              </Link>
            </div>
            <div className="d-flex align-items-center gap-3">              
            </div>
          </div>
        </div>
      </nav> 
    </>
  );
};

export default React.memo(Navbar);