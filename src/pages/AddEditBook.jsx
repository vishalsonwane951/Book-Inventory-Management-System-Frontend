import React, {useEffect, useCallback, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { BookContext } from "../context/BookContext";

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBooks } = useContext(BookContext); // 🔥 navbar auto-refresh

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    publishDate: "",
    overview: "",
  });

  const [error, setErrors] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        const book = res.data;

        setFormData({
          ...book,
          publishDate: book.publishDate
            ? new Date(book.publishDate).toISOString().split("T")[0]
            : "",
        });
      } catch (err) {
        console.error("Fetch book error:", err);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = useCallback((field, value) => {
    const cleanValue =
      field === "author"
        ? value.replace(/[^a-zA-Z\s.]/g, "")
        : value;

    setFormData((prev) => ({
      ...prev,
      [field]: cleanValue,
    }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.publisher.trim())
      newErrors.publisher = "Publisher is required";
    if (!formData.publishDate)
      newErrors.publishDate = "Publish Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      try {
        const payload = {
          ...formData,
          publishDate: new Date(formData.publishDate),
        };

        if (id) {
          await api.put(`/update-book/${id}`, payload);
        } else {
          await api.post("/createbook", payload);
        }

        await fetchBooks();
        navigate("/");
      } catch (err) {
        console.error("Submit error:", err);
      }
    },
    [formData, id, navigate, validate, fetchBooks]
  );



  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">{id ? "Edit Book" : "Add Book"}</h2>
            </div>

            <div className="card-body p-4">
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-semibold">Title *</label>
                <input
                  id="title"
                  type="text"
                  className={`form-control ${error.title ? "is-invalid" : ""}`}
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />

                {error.title && <div className="invalid-feedback">{error.title}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="author" className="form-label fw-semibold">Author *</label>
                <input
                  id="author"
                  type="text"
                  className={`form-control ${error.author ? 'is-invalid' : ''}`}
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => handleChange('author', e.target.value)}
                />
                {error.author && <div className="invalid-feedback">{error.author}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="publisher" className="form-label fw-semibold">Publisher *</label>
                <input
                  id="publisher"
                  type="text"
                  className={`form-control ${error.publisher ? 'is-invalid' : ''}`}
                  placeholder="Enter publisher name"
                  value={formData.publisher}
                  onChange={(e) => handleChange('publisher', e.target.value)}
                />
                {error.publisher && <div className="invalid-feedback">{error.publisher}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="publishDate" className="form-label fw-semibold">Publish Date *</label>
                <input
                  id="publishDate"
                  type="date"
                  className={`form-control ${error.publishDate ? 'is-invalid' : ''}`}
                  value={formData.publishDate?.split("T")[0]}
                  onChange={(e) =>
                    setFormData({ ...formData, publishDate: e.target.value })
                  }
                />

                {error.publishDate && <div className="invalid-feedback">{error.publishDate}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="overview" className="form-label fw-semibold">Overview</label>
                <textarea
                  id="overview"
                  className="form-control"
                  placeholder="Enter book overview/description"
                  rows="4"
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                />
                <div className="form-text">Optional: Provide a brief description of the book</div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2"
                  onClick={handleSubmit}
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

export default React.memo(AddEditBook);