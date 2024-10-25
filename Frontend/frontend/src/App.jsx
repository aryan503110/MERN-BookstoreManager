import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Books from "./components/Books";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import AddBook from "./components/AddBook";
import Logout from "./components/Logout";
import EditBook from "./components/EditBook";
import DeleteBook from "./components/DeleteBook";
import AskAI from "./components/AskAI";

function App() {
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8002/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar role={role} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login setRole={setRole} />}></Route>
          <Route path="/books" element={<Books role={role} />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/addstudent" element={<AddStudent />}></Route>
          <Route path="/addbook" element={<AddBook />}></Route>
          <Route path="/logout" element={<Logout setRole={setRole} />}></Route>
          <Route path="/book/:id" element={<EditBook/>}></Route>
          <Route path="/delete/:id" element={<DeleteBook/>}></Route>
          <Route path="/ask" element={<AskAI/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
