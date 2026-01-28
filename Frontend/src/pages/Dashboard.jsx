import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.data.name);   // 👈 yahi main part hai
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Welcome{userName && `, ${userName}`} 
        </h1>

        <p className="dashboard-subtitle">
          Manage your account and explore features
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>View and update your profile details</p>
            <button>Go to Profile</button>
          </div>
        
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
