import React from "react";
import './Home.css'

function Home() {
  return (
    <div className="homepage-container">
    <div className="image-container">
      <img 
        src="https://img.freepik.com/premium-vector/bookstore-shop-exterior-woman_169241-6676.jpg" 
        alt="Bookstore Exterior" 
        className="homepage-image"
      />
    </div>
    <div className="text-container">
      <h1 className="homepage-title">Welcome to Your BookStore</h1>
      <h3 className="homepage-subtitle">Read the Books from Different Authors</h3>
      <h5 className="homepage-tagline">Your Only Stop to Read and Learn</h5>
    </div>
  </div>
  );
}

export default Home;
