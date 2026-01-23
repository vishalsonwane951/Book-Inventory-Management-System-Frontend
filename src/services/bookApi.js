import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllBooks = () => axios.get(`${API_URL}/allbooks`);
export const getBookById = (id) => axios.get(`${API_URL}/books/${id}`);
export const addBook = (data) => axios.post(`${API_URL}/createbook`, data);
export const updateBook = (id, data) => axios.put(`${API_URL}/update-book/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API_URL}/delete-book/${id}`);
