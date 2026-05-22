import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;