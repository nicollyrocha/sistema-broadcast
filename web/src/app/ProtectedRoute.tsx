import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/config/routes";

/** Guarda das rotas /app: sem usuário logado, manda para o login. */
export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  return <Outlet />;
}
