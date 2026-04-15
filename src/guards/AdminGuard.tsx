import { useAuth } from "../../pages/auth/AuthContext";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user?.token) return <Navigate to="/login" />;
  if (user?.role !== "ADMIN") return <Navigate to="/home" />;
  return <>{children}</>;
};

export default AdminGuard;
