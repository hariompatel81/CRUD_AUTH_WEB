import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./ResetPassword.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Something went wrong. Please try again.");
      navigate("/send-otp");
      return;
    }

    if (!newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/reset-password", {
        email,
        newPassword
      });

      alert(res.data.message || "Password reset successful");
      navigate("/");

    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <form className="form" onSubmit={handleResetPassword}>
          <h2 className="reset-title">Reset Password</h2>

          <input
            type="password"
            className="reset-input"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            className="reset-input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
