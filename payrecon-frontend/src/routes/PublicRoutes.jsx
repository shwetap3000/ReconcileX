import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Not logged in
  return <Outlet />;
};

export default PublicRoute;