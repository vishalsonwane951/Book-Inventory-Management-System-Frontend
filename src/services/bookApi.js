import axios from "axios";

const API_URI = process.env.API_URL

export const getAllBooks = () => axios.get(`${API_URI}/allbooks`);
export const getBookById = (id) => axios.get(`${API_URI}/books/${id}`);
export const addBook = (data) => axios.post(`${API_URI}/createbook`, data);
export const updateBook = (id, data) => axios.put(`${API_URI}/update-book/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API_URI}/delete-book/${id}`);
