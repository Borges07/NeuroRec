import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export function AdminRoute({ redirectTo = "/login" }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
