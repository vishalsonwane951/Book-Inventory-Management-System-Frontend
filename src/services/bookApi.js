import api from "./api";

export const getAllBooks = () => api.get("/");
export const getBookById = (id) => api.get(`/books/${id}`);
export const addBook = (data) => api.post("/createbook", data);
export const updateBook = (id, data) => api.put(`/update-book/${id}`, data);
export const deleteBook = (id) => api.delete(`/delete-book/${id}`);
