import React from 'react'
import './Dashboard.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <h1>Welcome to Dashboard</h1>
      <Footer />
    </div>
  );
};

export default Dashboard;
