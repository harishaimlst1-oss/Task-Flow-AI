import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { hasPermission } from "../utils/rbac";

type ProtectedRouteProps = {
  permission?: string;
  children: React.ReactNode;
};

const ProtectedRoute = ({ permission, children }: ProtectedRouteProps) => {
  const session = useAuthStore((state) => state.session);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !hasPermission(session.role, permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
