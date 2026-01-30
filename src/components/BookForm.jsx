import React, { useState, useEffect } from 'react';

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    year: new Date().getFullYear(),
    price: 0,
    quantity: 0,
    lowStockThreshold: 5,
    description: ''
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categories = [
    'Fiction', 'Non-Fiction', 'Science', 'Technology', 
    'Biography', 'History', 'Art', 'Children', 'Cookbook'
  ];

  return (
    <>
      <div className="modal-header bg-primary text-white">
        <h5 className="modal-title">
          {book ? 'Edit Book' : 'Add New Book'}
        </h5>
        <button 
          type="button" 
          className="btn-close btn-close-white"
          onClick={onCancel}
        ></button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="row g-3">
            {/* Basic Information */}
            <div className="col-md-6">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Author *</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">ISBN *</label>
              <input
                type="text"
                className="form-control"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Publisher & Year */}
            <div className="col-md-6">
              <label className="form-label">Publisher</label>
              <input
                type="text"
                className="form-control"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Publication Year</label>
              <input
                type="number"
                className="form-control"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            
            {/* Pricing & Stock */}
            <div className="col-md-4">
              <label className="form-label">Price ($)</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Low Stock Threshold</label>
              <input
                type="number"
                className="form-control"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            
            {/* Description */}
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Cover Image Upload (Optional) */}
            <div className="col-12">
              <label className="form-label">Cover Image URL</label>
              <input
                type="url"
                className="form-control"
                name="coverImage"
                value={formData.coverImage || ''}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
              />
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {book ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </>
  );
};

export default BookForm;