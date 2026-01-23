import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";
import Navbar from "./components/Navbar";
import BoockDetails from "./pages/BookDetails";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/add-book" element={<AddEditBook />} />
        <Route path="/edit-book/:id" element={<AddEditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
