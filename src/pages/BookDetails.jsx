// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../services/api";
// import React from "react";

// const BoockDetails = () => {
//     const { id } = useParams();
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);

  

//    const fetchBookDetails = async () => {
//     try {
//       const res = await api.get(`/books/${id}`); 
//       setBook(res.data);
//     } catch (error) {
//       console.error("Error fetching book details", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//     useEffect(() => {
//         fetchBookDetails();
//     },[id]);


//     if (loading) {
//         return <p style={{ padding:'20px', alignContent:'center'}}>Loading....</p>;
//     }
//     if (!book){
//             return <p style={{padding:'20px', alignContent:'center'}}>Book not found</p>
//         }

//     return (
//          <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h2>{book.title}</h2>

//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Publisher:</strong> {book.publisher}</p>
//       <p><strong>Published Date:</strong> {book.publishDate ? book.publishDate.split('T')[0] : 'not specified'}</p>

//       <div style={{ marginTop: "15px" }}>
//         <strong>Overview:</strong>
//         <p style={{ maxHeight: "200px", overflowY: "auto" }}>
//           {book.overview}
//         </p>
//       </div>

//       <Link to="/" style={{ display: "inline-block", marginTop: "20px" }}>
//         ← Back to Home
//       </Link>
//     </div>
//     );
// };

// export default React.memo(BoockDetails);




import { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import{ BookContext } from "../context/BookContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchBooks } = useContext(BookContext);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching book details", error);
      setError("Failed to load book details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleDelete = useCallback(
  async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/delete-book/${id}`);
      fetchBooks();
      navigate("/");     
    } catch (error) {
      alert("Delete failed. Please try again.");
    }
  },
  [ navigate,fetchBooks]
);


  // Generate a placeholder cover based on book title
  const generatePlaceholderCover = (title, author) => {
    const colors = [
      'bg-primary', 'bg-secondary', 'bg-success',
      'bg-danger', 'bg-warning', 'bg-info', 'bg-dark'
    ];
    const color = colors[title.length % colors.length];

    return (
      <div className={`${color} text-white d-flex align-items-center justify-content-center rounded shadow h-100`}>
        <div className="text-center p-3">
          <h4 className="fw-bold">{title.split(' ').map(word => word[0]).join('').toUpperCase()}</h4>
          <p className="small mb-0">by {author ? author.split(' ')[0] : 'Unknown'}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
     <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-3">Loading book details...</h4>
            <p className="text-muted">Please wait while we fetch the book information.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger shadow-sm">
              <div className="d-flex align-items-center">
                <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                <div>
                  <h5 className="alert-heading mb-1">Book Not Found</h5>
                  <p className="mb-0">{error || "The book you're looking for doesn't exist or has been removed."}</p>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-arrow-left me-2"></i>Go Back
              </button>
              <Link to="/" className="btn btn-primary">
                <i className="bi bi-house-door me-2"></i>Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="bi bi-house-door me-1"></i>Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/books/${id}`} className="text-decoration-none">Books</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{book.title}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Book Cover Column */}
        <div className="col-lg-4 col-md-5">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body p-4">
              <div className="book-cover-container mb-4">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ height: '400px' }}>
                    {generatePlaceholderCover(book.title, book.author)}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="row g-2 text-center">
                {book.isbn && (
                  <div className="col-6">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block">ISBN</small>
                      <span className="fw-bold">{book.isbn}</span>
                    </div>
                  </div>
                )}

                {book.pageCount && (
                  <div className="col-6">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block">Pages</small>
                      <span className="fw-bold">{book.pageCount}</span>
                    </div>
                  </div>
                )}

                {book.language && (
                  <div className="col-6">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block">Language</small>
                      <span className="fw-bold text-uppercase">{book.language}</span>
                    </div>
                  </div>
                )}

                {book.category && (
                  <div className="col-6">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block">Category</small>
                      <span className="fw-bold">{book.category}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Book Details Column */}
        <div className="col-lg-8 col-md-7">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body p-4">
              {/* Title & Author Header */}
              <div className="mb-4">
                <h1 className="display-6 fw-bold text-primary mb-2">{book.title}</h1>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person-circle text-secondary me-2"></i>
                  <h2 className="h5 mb-0 text-muted">by {book.author || "Unknown Author"}</h2>
                </div>

                {/* Status Badge */}
                {book.status && (
                  <span className={`badge ${book.status === 'available' ? 'bg-success' : book.status === 'checked-out' ? 'bg-warning' : 'bg-secondary'} fs-6 px-3 py-2`}>
                    <i className={`bi ${book.status === 'available' ? 'bi-check-circle' : book.status === 'checked-out' ? 'bi-clock' : 'bi-x-circle'} me-1`}></i>
                    {book.status === 'available' ? 'Available' : book.status === 'checked-out' ? 'Checked Out' : book.status}
                  </span>
                )}
              </div>

              {/* Publication Details */}
              <div className="row g-3 mb-4">
                {book.publisher && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-building text-success mt-1 me-3"></i>
                      <div>
                        <h6 className="text-muted mb-1">Publisher</h6>
                        <p className="mb-0 fw-semibold">{book.publisher}</p>
                      </div>
                    </div>
                  </div>
                )}

                {book.publishDate && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-calendar-event text-primary mt-1 me-3"></i>
                      <div>
                        <h6 className="text-muted mb-1">Published Date</h6>
                        <p className="mb-0 fw-semibold">{formatDate(book.publishDate)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {book.edition && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-journal-text text-primary mt-1 me-3"></i>
                      <div>
                        <h6 className="text-muted mb-1">Edition</h6>
                        <p className="mb-0 fw-semibold">{book.edition}</p>
                      </div>
                    </div>
                  </div>
                )}

                {book.format && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-book text-primary mt-1 me-3"></i>
                      <div>
                        <h6 className="text-muted mb-1">Format</h6>
                        <p className="mb-0 fw-semibold">{book.format}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Book Overview */}
              <div className="mb-5">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-card-text text-primary fs-5 me-2"></i>
                  <h3 className="h5 mb-0">Overview</h3>
                </div>
                <div className="p-3 bg-light rounded">
                  <p className="mb-0" style={{ lineHeight: '1.8' }}>
                    {book.overview || "No overview available for this book."}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              {(book.tags || book.notes) && (
                <div className="mb-4">
                  <h4 className="h5 mb-3 text-muted">Additional Information</h4>
                  <div className="row g-3">
                    {book.tags && book.tags.length > 0 && (
                      <div className="col-12">
                        <h6 className="text-muted mb-2">Tags</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {book.tags.map((tag, index) => (
                            <span key={index} className="badge bg-info text-dark px-3 py-2">
                              <i className="bi bi-tag me-1"></i>{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {book.notes && (
                      <div className="col-12">
                        <h6 className="text-muted mb-2">Notes</h6>
                        <div className="p-3 bg-warning bg-opacity-10 rounded">
                          <p className="mb-0">
                            <i className="bi bi-info-circle me-2"></i>
                            {book.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="border-top pt-4 mt-4">
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>Back to Home
                  </Link>

                  <Link
                    to={`/edit-book/${id}`}
                    className="btn btn-outline-primary text-decoration-none d-inline-flex align-items-center"
                  > 
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Book
                  </Link>


                  {book.status === 'available' && (
                    <button className="btn btn-success">
                      <i className="bi bi-check-circle me-2"></i>Check Out
                    </button>
                  )}

                  {book.status === 'checked-out' && (
                    <button className="btn btn-warning">
                      <i className="bi bi-arrow-clockwise me-2"></i>Return Book
                    </button>
                  )}

                  <button className="btn btn-danger ms-auto" onClick={() => handleDelete(book._id)}>
                    <i className="bi bi-trash me-2"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons CSS (add this to your index.html for icons to work) */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
      />

      {/* Custom Styles */}
      <style jsx="true">{`
                .book-cover-container {
                    transition: transform 0.3s ease;
                }
                
                .book-cover-container:hover {
                    transform: translateY(-5px);
                }
                
                .breadcrumb {
                    background-color: #f8f9fa;
                    border-radius: 0.5rem;
                    padding: 0.75rem 1rem;
                }
                
                .card {
                    transition: transform 0.2s ease;
                }
                
                .card:hover {
                    transform: translateY(-2px);
                }
                
                @media (max-width: 768px) {
                    .display-6 {
                        font-size: 1.75rem;
                    }
                    
                    .btn {
                        width: 100%;
                        margin-bottom: 0.5rem;
                    }
                    
                    .d-flex.gap-3 {
                        flex-direction: column;
                    }
                }
            `}</style>
    </div>
  );
};

export default BookDetails;