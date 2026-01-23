import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById } from "../services/bookApi";

import axios from "axios";

const BoockDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBoockDetails();
    },[id]);

    const fetchBoockDetails = async () => {
        try  {
             const res = await getBookById(id);
            setBook(res.data);
            } catch (error) {
            console.error('Error fetching Book Details',error);
        }  finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p style={{ padding:'20px', alignContent:'center'}}>Loading....</p>;
    }
    if (!book){
            return <p style={{padding:'20px', alignContent:'center'}}>Book not found</p>
        }

    return (
         <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>{book.title}</h2>

      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Published Date:</strong> {book.publishDate}</p>

      <div style={{ marginTop: "15px" }}>
        <strong>Overview:</strong>
        <p style={{ maxHeight: "200px", overflowY: "auto" }}>
          {book.overview}
        </p>
      </div>

      <Link to="/" style={{ display: "inline-block", marginTop: "20px" }}>
        ← Back to Home
      </Link>
    </div>
    );
};

export default BoockDetails;