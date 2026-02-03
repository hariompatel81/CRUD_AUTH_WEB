import { Route, Routes, Navigate } from "react-router-dom"; // <--- Navigate yahan se aayega
import AuthForm from './auth/AuthForm';
import ProtectRoute from "./routes/ProtectRoute";
import Dashboard from './pages/Dashboard';
import PublicRoute from "./routes/PublicRoute";
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import VerifySignupOTP from "./pages/VerifySignupOtp";

const App = () => {
  return (
    <Routes>
      {/* 1. Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthForm />} />
        <Route path="/verify-signup-otp" element={<VerifySignupOTP />} />
        <Route path="/send-otp" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* 2. Protected Routes */}
      <Route element={<ProtectRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 3. Catch-all Route (404/Redirect) */}
      {/* Agar koi galat URL dale toh seedha "/" par bhej do */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;