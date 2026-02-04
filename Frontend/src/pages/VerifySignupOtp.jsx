import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./VerifySignupOtp.css"; // Is file ko update karenge niche di gayi CSS se

export default function VerifySignupOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safety check: Agar email location state se na mile
  const email = location.state?.email || "User";

  const handleVerify = async () => {
    if (otp.length < 6) return alert("Please enter 6-digit OTP");
    
    try {
      const response = await api.post("/auth/signup/verify-otp", { email, otp });
      if (response.data.success) {
        alert("Email verified successfully! Please Login.");
        navigate("/"); 
      }
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await api.post("/auth/resend-otp", { 
        email, 
        type: "singupOTP" 
      });
      alert(response.data.message || "OTP Sent Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        <h2>Verify Your Email</h2>
        <p>Sent to: <b>{email}</b></p>
        
        <input 
          type="text" 
          maxLength="6" 
          placeholder="Enter 6-digit OTP" 
          value={otp}
          onChange={(e) => setOtp(e.target.value)} 
        />
        
        <button onClick={handleVerify}>Verify OTP</button>
        
        <div className="resend-text">
          Didn't receive the code?{" "}
          <span 
            className={`resend-link ${loading ? "disabled" : ""}`} 
            onClick={!loading ? handleResendOtp : null}
          >
            {loading ? "Sending..." : "Resend OTP"}
          </span>
        </div>
      </div>
    </div>
  );
}