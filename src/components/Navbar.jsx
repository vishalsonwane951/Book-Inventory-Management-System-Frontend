import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "12px", background: "#1976d2" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
        Home
      </Link>
      <Link to="/add-book" style={{ color: "#fff" }}>
        Add Book
      </Link>
    </nav>
  );
};

export default Navbar;
