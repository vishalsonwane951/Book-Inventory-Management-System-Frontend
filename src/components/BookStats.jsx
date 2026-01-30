import React from 'react';

const BookStats = ({ stats }) => {
  return (
    <div className="row mb-4">
      <div className="col-sm-6 col-lg-3 mb-3">
        <div className="card border-primary border-2 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Total Books</h6>
                <h3 className="fw-bold mb-0">{stats.totalBooks}</h3>
              </div>
              <div className="bg-primary bg-opacity-10 p-3 rounded">
                <i className="bi bi-book text-primary fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-sm-6 col-lg-3 mb-3">
        <div className="card border-success border-2 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">In Stock</h6>
                <h3 className="fw-bold mb-0">{stats.booksInStock}</h3>
              </div>
              <div className="bg-success bg-opacity-10 p-3 rounded">
                <i className="bi bi-check-circle text-success fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-sm-6 col-lg-3 mb-3">
        <div className="card border-warning border-2 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Low Stock</h6>
                <h3 className="fw-bold mb-0">{stats.lowStock}</h3>
              </div>
              <div className="bg-warning bg-opacity-10 p-3 rounded">
                <i className="bi bi-exclamation-triangle text-warning fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-sm-6 col-lg-3 mb-3">
        <div className="card border-info border-2 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Total Value</h6>
                <h3 className="fw-bold mb-0">${stats.totalValue.toFixed(2)}</h3>
              </div>
              <div className="bg-info bg-opacity-10 p-3 rounded">
                <i className="bi bi-currency-dollar text-info fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStats;