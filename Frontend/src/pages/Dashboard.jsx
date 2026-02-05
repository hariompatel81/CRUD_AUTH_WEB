import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    api.get(`/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.data.name);   
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
        
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
