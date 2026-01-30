import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/main.css";
import Navbar from "../components/Navbar";

const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const Home = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 10;

  const fetchBooks = async () => {
    try {
      const res = await api.get("/allbook");
      setBook(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBook([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = useCallback(
    async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this book?");
      if (!confirmDelete) return;

      setBook((prev) => prev.filter((b) => b._id !== id));

      try {
        await api.delete(`/delete-book/${id}`);
      } catch (error) {
        alert("Delete failed. Restoring book...");
        fetchBooks(); 
      }
    },
    [fetchBooks]
  );

  const debouncedSearch = useDebounce(search, 300);

  const filteredBooks = useMemo(() => {
    if (!Array.isArray(book)) return [];
    const query = debouncedSearch.toLowerCase();
    return book.filter(
      (b) =>
        b.title?.toLowerCase().includes(query) ||
        b.author?.toLowerCase().includes(query) ||
        b.publisher?.toLowerCase().includes(query)
    );
  }, [book, debouncedSearch]);

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  const renderedRows = useMemo(
    () =>
      currentBooks.map((book) => (
        <tr key={book._id} className="align-middle">
          <td className="ps-4 fw-semibold">{book.title}</td>
          <td>{book.author}</td>
          <td className="d-none d-md-table-cell">{book.publisher}</td>
          <td className="d-none d-lg-table-cell">
            {book.publishDate ? (
              <span className="badge bg-light text-dark">{book.publishDate}</span>
            ) : (
              <span className="text-muted">Not specified</span>
            )}
          </td>
          <td className="pe-4">
            <div className="d-flex justify-content-end gap-2">
              <Link
                to={`/books/${book._id}`}
                className="btn btn-sm btn-outline-primary d-flex align-items-center"
              >
                <i className="bi bi-eye me-1 d-none d-sm-inline"></i>
                <span>View</span>
              </Link>

              <Link
                to={`/edit-book/${book._id}`}
                className="btn btn-sm btn-outline-warning d-flex align-items-center"
              >
                <i className="bi bi-pencil me-1 d-none d-sm-inline"></i>
                <span>Edit</span>
              </Link>

              <button
                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                onClick={() => handleDelete(book._id)}
              >
                <i className="bi bi-trash me-1 d-none d-sm-inline"></i>
                <span>Delete</span>
              </button>
            </div>
          </td>
        </tr>
      )),
    [currentBooks, handleDelete]
  );

  if (loading)
    return <p style={{ padding: "20px", textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <div className="container-fluid p-3 p-md-4">
      <div className="row mb-4  ">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-md-4">
            <div></div>
            <Link to="/add-book" className="text-decoration-none">
              <button className="btn btn-primary d-flex align-items-center">
                <i className="bi bi-plus-circle pe-2"></i> Add New Book
              </button>
            </Link>
          </div>


          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-12 col-md-8 col-lg-6">
                  <label htmlFor="searchInput" className="form-label fw-semibold">
                    Search Books
                  </label>
                  <div className="input-group">
                    <input
                      id="searchInput"
                      type="text"
                      className="form-control"
                      placeholder="Search by title, author, or publisher..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-4 col-lg-1">
                  <div className="d-grid">
                    <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col" className="ps-4">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col" className="d-none d-md-table-cell">Publisher</th>
                      <th scope="col" className="d-none d-lg-table-cell">Published Date</th>
                      <th scope="col" className="pe-4 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {book.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <div className="py-4">
                            <i className="bi bi-book text-muted" style={{ fontSize: "3rem" }}></i>
                            <h5 className="mt-3">No Books Found</h5>
                            <p className="text-muted mb-4">
                              Try adjusting your search or add a new book
                            </p>
                            <Link to="/add-book" className="btn btn-primary">
                              <i className="bi bi-plus-circle me-2"></i> Add First Book
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      renderedRows
                    )}
                  </tbody>
                </table>
              </div>

              {book.length > 0 && (
                <div className="d-flex justify-content-center border-top pt-3">
                  <nav aria-label="Page navigation">
                    <ul className="pagination mb-0">
                      {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
                        <li key={i} className="page-item">
                          <button
                            className={`page-link ${currentPage === i + 1 ? "active" : ""}`}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default React.memo(Home);
