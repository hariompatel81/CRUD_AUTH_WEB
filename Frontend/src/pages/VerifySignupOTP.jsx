import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./VerifySignupOTP.css";

export default function VerifySignupOTP() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Signup page se email yahan milega

  const handleVerify = async () => {
    try {
      const response = await api.post("/auth/signup/verify-otp", { email, otp });
      if (response.data.success) {
        alert("Email verified successfully! You can now login.");
        navigate("/"); // Wapas login page par bhej dein
      }
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    }
  };

return (
  <div className="verify-page">
    <div className="verify-container">
      <h2>Verify Your Email</h2>
      <p>OTP sent to: <b>{email}</b></p>
      
      <input 
        type="text" 
        maxLength="6" 
        placeholder="Enter 6-digit OTP" 
        onChange={(e) => setOtp(e.target.value)} 
      />
      
      <button onClick={handleVerify}>Verify OTP</button>
      
      <div className="resend-text">
        Didn't receive the code? <span className="resend-link">Resend OTP</span>
      </div>
    </div>
  </div>
);
}