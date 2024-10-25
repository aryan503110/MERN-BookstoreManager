import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Books.css";
import { Link } from "react-router-dom";

function Books({ role }) {
  const [books, setbooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8002/book/books")
      .then((res) => {
        setbooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="books-container">
      {books.map((e) => (
        <div className="item-card" key={e._id}>
          <img src={e.imageurl} alt={e.name} />
          <p>{e.name}</p>
          <p>{e.author}</p>
          {role === "admin" && (
            <span>
              <button>
                <Link to={`/book/${e._id}`}>Edit</Link>
              </button>
              <button>
                <Link to={`/delete/${e._id}`}>Delete</Link>
              </button>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Books;
