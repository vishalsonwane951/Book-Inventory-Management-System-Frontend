import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, getBookById, updateBook } from "../services/bookApi";

const AddEditBook = () => {
  const { id }= useParams();
  const navigate = useNavigate();


  const [ formdata, setFormData] = useState({
    title:  "",
    author: "",
    publisher: "",
    publishDate: "",
    overview: "",
  });

  const [error, setError] = useState({});

  useEffect(()=> {
    if (id) {
      getBookById(id).then((res)=> setFormData(res.data));
    }
  },[id]);

  const validate =()=> {
    if (!formdata.title.trim()) error.title = "Title is required";
    if (!formdata.author.trim()) error.author = "Author is required";
    if (!formdata.publisher.trim()) error.publisher = "Publisher is required";
    if (!formdata.publishDate.trim()) error.publishDate = "Publish Date is required";
    setError(error);
    return Object.keys(error).length === 0;



  }
  const habdlesubmit = async (e)=> {
    e.preventDefault();
    if (!validate()) return;

    id ? await updateBook (id, formdata) : await addBook(formdata);
    navigate("/");
  }
  
  return(
    <div className="container py-4">
  <div className="row justify-content-center">
    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">{id ? "Edit Book" : "Add Book"}</h2>
        </div>
        
        <div className="card-body p-4">
          {/* Title Field */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">Title *</label>
            <input
              id="title"
              type="text"
              className={`form-control ${error.title ? 'is-invalid' : ''}`}
              placeholder="Enter book title"
              value={formdata.title}
              onChange={(e) => setFormData({...formdata, title: e.target.value})}
            />
            {error.title && <div className="invalid-feedback">{error.title}</div>}
          </div>

          {/* Author Field */}
          <div className="mb-3">
            <label htmlFor="author" className="form-label fw-semibold">Author *</label>
            <input
              id="author"
              type="text"
              className={`form-control ${error.author ? 'is-invalid' : ''}`}
              placeholder="Enter author name"
              value={formdata.author}
              onChange={(e) => setFormData({...formdata, author: e.target.value})}
            />
            {error.author && <div className="invalid-feedback">{error.author}</div>}
          </div>

          {/* Publisher Field */}
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label fw-semibold">Publisher *</label>
            <input
              id="publisher"
              type="text"
              className={`form-control ${error.publisher ? 'is-invalid' : ''}`}
              placeholder="Enter publisher name"
              value={formdata.publisher}
              onChange={(e) => setFormData({...formdata, publisher: e.target.value})}
            />
            {error.publisher && <div className="invalid-feedback">{error.publisher}</div>}
          </div>

          {/* Publish Date Field */}
          <div className="mb-3">
            <label htmlFor="publishDate" className="form-label fw-semibold">Publish Date *</label>
            <input
              id="publishDate"
              type="date"
              className={`form-control ${error.publishDate ? 'is-invalid' : ''}`}
              value={formdata.publishDate}
              onChange={(e) => setFormData({...formdata, publishDate: e.target.value})}
            />
            {error.publishDate && <div className="invalid-feedback">{error.publishDate}</div>}
          </div>

          {/* Overview Field */}
          <div className="mb-4">
            <label htmlFor="overview" className="form-label fw-semibold">Overview</label>
            <textarea
              id="overview"
              className="form-control"
              placeholder="Enter book overview/description"
              rows="4"
              value={formdata.overview}
              onChange={(e) => setFormData({ ...formdata, overview: e.target.value })}
            />
            <div className="form-text">Optional: Provide a brief description of the book</div>
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2"
              onClick={habdlesubmit}
            >
              {id ? "Update Book" : "Add Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );

};

export default AddEditBook;