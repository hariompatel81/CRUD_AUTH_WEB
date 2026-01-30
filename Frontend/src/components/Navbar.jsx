import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { logout } from "../utils/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <h2>CRUD_AUTH_WEB</h2>

      <ul>
        <li><NavLink to="/dashboard">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>

      {/* Profile Dropdown */}
      <div className="profile-wrapper" ref={dropdownRef}>
        <div className="navbar-avatar" onClick={() => setOpen(!open)}>
          H
        </div>

        {open && (
          <div className="profile-dropdown">
            <NavLink to="/profile">My Profile</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
