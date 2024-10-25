import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css"; // We'll create this CSS file

function AddStudent() {
  const [rollno, setRollno] = useState("");
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8002/student/register", {
        username,
        password,
        rollno,
        grade,
      })
      .then((res) => {
        if (res.data.registered) {
          navigate('/dashboard');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        <div className="form-group">
          <label htmlFor="rollno">Roll No:</label>
          <input
            type="number"
            id="rollno"
            placeholder="Enter Roll No."
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            placeholder="Enter Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AddStudent;