import React from 'react';

const BookTable = ({ books, onEdit, onDelete }) => {
  const getStockStatus = (quantity, threshold) => {
    if (quantity === 0) return <span className="badge bg-danger">Out of Stock</span>;
    if (quantity <= threshold) return <span className="badge bg-warning">Low Stock</span>;
    return <span className="badge bg-success">In Stock</span>;
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" className="ps-4">Title</th>
                <th scope="col">Author</th>
                <th scope="col">ISBN</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    <i className="bi bi-book display-6 d-block mb-2"></i>
                    No books found. Add your first book!
                  </td>
                </tr>
              ) : (
                books.map(book => (
                  <tr key={book._id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          {book.coverImage ? (
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="rounded"
                              style={{ width: '40px', height: '60px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="bg-light rounded d-flex align-items-center justify-content-center"
                                 style={{ width: '40px', height: '60px' }}>
                              <i className="bi bi-book text-muted"></i>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-0">{book.title}</h6>
                          <small className="text-muted">{book.publisher}</small>
                        </div>
                      </div>
                    </td>
                    <td>{book.author}</td>
                    <td>
                      <code>{book.isbn}</code>
                    </td>
                    <td>
                      <span className="badge bg-info bg-opacity-10 text-info">
                        {book.category}
                      </span>
                    </td>
                    <td>${book.price.toFixed(2)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span>{book.quantity}</span>
                        {book.quantity <= book.lowStockThreshold && (
                          <i className="bi bi-exclamation-triangle-fill text-warning ms-2"></i>
                        )}
                      </div>
                    </td>
                    <td>{getStockStatus(book.quantity, book.lowStockThreshold)}</td>
                    <td className="text-end pe-4">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(book)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(book._id)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookTable;