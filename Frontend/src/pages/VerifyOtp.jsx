import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./VerifyOtp.css";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email missing. Please try again.");
      navigate("/send-otp");
      return;
    }

    if (!otp) {
      alert("OTP is required");
      return;
    }

    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp
      });

      alert(res.data.message || "OTP verified");
      navigate("/reset-password", { state: { email } });

    } catch (error) {
      alert(
        error.response?.data?.message || "Invalid OTP"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <form className="form" onSubmit={handleVerifyOtp}>
          <h2 className="verify-title">Verify OTP</h2>

          <input
            type="text"
            className="verify-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="verify-btn">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
