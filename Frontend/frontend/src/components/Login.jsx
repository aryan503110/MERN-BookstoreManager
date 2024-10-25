import React, { useState } from "react";
import axios from "axios";
import './Login.css'
import { useNavigate } from "react-router-dom";

function Login({setRole}) {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [role, setrole] = useState('admin');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8002/auth/login", { username, password, role })
      .then((res) =>{
        if(res.data.login && res.data.role ==='admin'){
            setRole('admin')
            navigate('/dashboard')
        }else if(res.data.login && res.data.role ==='student'){
            setRole('student')
            navigate('/')
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div  className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Username :</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
        ></input>
        <label>Password :</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <label>Role :</label>
        <select onChange={(e) => setrole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
