import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";
import Navbar from "./components/Navbar";
import React from "react";
import { BookProvider } from "./context/BookContext";

function App() {
  return (
    <BookProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddEditBook />} />
          <Route path="/edit-book/:id" element={<AddEditBook />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default React.memo(App);
