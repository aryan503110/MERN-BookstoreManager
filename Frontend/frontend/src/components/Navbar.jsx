import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({role}) => {
  return (
    <nav className='navbar'>
        <div
         className='navbar-right'>
          <Link to="/" className='navbar-link'>Home</Link>
            <Link to="/books" className='navbar-link'>Books</Link>
            <Link to='ask' className='navbar-link'>Ask AI</Link>
            {role === "admin" && <>
              <Link to="/addbook" className="navbar-link">Add Book</Link>
              <Link to="/addstudent" className="navbar-link">Add Student</Link>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            </>
            }
            {role === "" ?
            <Link to="/login" className='navbar-link'>Login</Link>
             : <Link to="/logout" className='navbar-link'>Logout</Link>
             }
            
        </div>
    </nav>
  )
}

export default Navbar