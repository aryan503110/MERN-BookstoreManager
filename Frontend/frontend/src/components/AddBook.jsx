import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

function AddBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageurl, setimageurl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8002/book/add", {
        name,
        author,
        imageurl
      })
      .then((res) => {
        if (res.data.added) {
          navigate('/books');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="book-form-container">
      <form className="book-form">
        <h2>Add Book</h2>
        <div className="form-group">
          <label htmlFor="name">Book Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter book name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Enter image URL"
            value={imageurl}
            onChange={(e) => setimageurl(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;