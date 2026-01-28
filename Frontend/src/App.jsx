import { Route, Routes } from "react-router-dom";
import AuthForm from './auth/AuthForm'
import ProtectRoute from "./routes/ProtectRoute";
import Dashboard from './pages/Dashboard'
import PublicRoute from "./routes/PublicRoute"
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      //public route
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthForm />} />
        <Route path="/send-otp" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Route>

      //protected route
      <Route element={<ProtectRoute />} >
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/profile" element={<Profile />} />     
      </Route>
      
    </Routes>
  );
};

export default App;
