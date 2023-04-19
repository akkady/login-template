import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

export const ROLES = {
  admin: "ADMIN",
  user: "USER",
};

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const decoded = auth?.token ? jwtDecode(auth?.token) : undefined;
  const roles = decoded?.roles || [];
  return roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : decoded?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
