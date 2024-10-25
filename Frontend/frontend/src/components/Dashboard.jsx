import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; 

const Dashboard = () => {
  const [students, setStudents] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [books, setBooks] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8002/dashboard')
      .then(res => {
        if (res.data.ok) {
          setStudents(res.data.student);
          setAdmins(res.data.admin);
          setBooks(res.data.book);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-box">
          <h2 className="box-title">Total Books</h2>
          <p className="box-value">{books}</p>
        </div>
        <div className="dashboard-box">
          <h2 className="box-title">Total Students</h2>
          <p className="box-value">{students}</p>
        </div>
        <div className="dashboard-box">
          <h2 className="box-title">Total Admins</h2>
          <p className="box-value">{admins}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;