import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function SendOtp() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    try {
      const res = await api.post("/auth/send-otp", { email });
      alert(res.data.message);
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <form className="form" onSubmit={handleSendOtp}>
          <h2 className="send-otp-title">Forgot Password</h2>

          <input
            type="email"
            className="send-otp-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="send-otp-btn">
            Send OTP
          </button>

          <p className="send-otp-text">
            We’ll send a verification code to your email
          </p>
        </form>
      </div>
    </div>

  );
}

export default SendOtp;
