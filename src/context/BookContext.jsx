import React, { createContext, useState, useCallback } from "react";
import api from "../services/api";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const res = await api.get("/allbook");
    setBooks(res.data);
  }, []);

  return (
    <BookContext.Provider value={{ books, setBooks, fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
};
