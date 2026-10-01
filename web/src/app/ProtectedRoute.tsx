import { Outlet } from "react-router";

/**
 * Guarda das rotas /app.
 * TODO: usar useAuth() e redirecionar para ROUTES.login quando não houver usuário.
 */
export function ProtectedRoute() {
  return <Outlet />;
}
