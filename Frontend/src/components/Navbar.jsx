import React from 'react';
import "./Navbar.css";
import { logout } from '../utils/auth';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // token remove
    navigate('/', { replace: true }); // redirect
  };

  return (
    <div className='navbar'>
      <h2>CRUD_AUTH_WEB</h2>

      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
