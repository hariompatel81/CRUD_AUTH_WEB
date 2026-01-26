import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectRoute = () => {
  return ( isAuthenticated() ? <Outlet /> : <Navigate to="/" replace/> );
};

export default ProtectRoute;
