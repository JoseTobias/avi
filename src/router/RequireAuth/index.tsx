import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { verifyAuth } = useAuth();
  let location = useLocation();

  if (!verifyAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
