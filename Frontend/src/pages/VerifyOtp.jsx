import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./VerifyOtp.css";

export default function VerifyOtp() { // Export standard tarike se kiya
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email missing. Please try again.");
      navigate("/auth/send-otp"); // Sahi path par bhejein
      return;
    }

    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      alert(res.data.message || "OTP verified");

      // Reset token ke saath redirect
      navigate("/reset-password", {
        state: {
          email: email,
          token: res.data.resetToken
        }
      });
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    if (!email) return alert("Email is missing!");
    
    setLoading(true);
    try {
      // Backend ke logic ke hisab se type bhejein
      const res = await api.post("/auth/resend-otp", { 
        email, 
        type: "forgotPassword" 
      });
      alert(res.data.message || "New OTP Sent!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <form className="form" onSubmit={handleVerifyOtp}>
          <h2 className="verify-title">Verify OTP</h2>
          
          <p className="verify-subtitle">Sent to: <b>{email}</b></p>

          <input
            type="text"
            className="verify-input"
            placeholder="Enter 6-digit OTP"
            value={otp}
            maxLength="6"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit" className="verify-btn">
            Verify OTP
          </button>

          <div className="resend-container">
            <span>Didn't receive the code? </span>
            <span 
              className={`resend-link ${loading ? "disabled" : ""}`}
              onClick={!loading ? handleResendOtp : null}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}