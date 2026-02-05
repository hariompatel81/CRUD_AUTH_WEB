import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { logout } from "../utils/auth";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios"; // Axios instance import karein

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState("?"); // Default value
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const name = res.data.data.name;
        if (name) {
          // Name ka pehla letter nikaal kar Uppercase mein convert karein
          setInitial(name.charAt(0).toUpperCase());
        }
      } catch (err) {
        console.log("Navbar profile fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Close dropdown on outside click logic 
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

      <div className="profile-wrapper" ref={dropdownRef}>
        <div className="navbar-avatar" onClick={() => setOpen(!open)}>
          {initial} {/* Yahan ab dynamic initial dikhega */}
        </div>

        {open && (
          <div className="profile-dropdown">
            <NavLink to="/profile" onClick={() => setOpen(false)}>My Profile</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;