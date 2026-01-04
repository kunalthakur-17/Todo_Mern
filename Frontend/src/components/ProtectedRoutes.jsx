import { Navigate, useLocation } from "react-router-dom";
import { clearAuthData } from "../utils/tokenUtils";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("userRole");
  const location = useLocation();

  useEffect(() => {
    // Check for role mismatch and clear auth if found
    if (token && role) {
      const path = location.pathname;
      const isClientPath = path.startsWith("/client");
      const isCompanyAdminPath = path.startsWith("/admin");
      const isStaffPath = path.startsWith("/staff");
      const isVendorPath = path.startsWith("/vendor");

      const hasRoleMismatch = 
        (role === "company_admin" && (isClientPath || isStaffPath || isVendorPath)) ||
        (role === "client" && (isCompanyAdminPath || isStaffPath || isVendorPath)) ||
        (role === "staff" && (isCompanyAdminPath || isClientPath || isVendorPath)) ||
        (role === "vendor" && (isCompanyAdminPath || isClientPath || isStaffPath));

      if (hasRoleMismatch) {
        // Clear all auth data
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login";
        return;
      }
    }
  }, [token, role, location.pathname]);

  // Check if token exists and user has proper role
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      sessionStorage.clear();
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
