import api from "./api";

export const getAllBooks = () => api.get(`${API_URI}/allbooks`);
export const getBookById = (id) => api.get(`${API_URI}/books/${id}`);
export const addBook = (data) => api.post(`${API_URI}/createbook`, data);
export const updateBook = (id, data) => api.put(`${API_URI}/update-book/${id}`, data);
export const deleteBook = (id) => api.delete(`${API_URI}/delete-book/${id}`);
