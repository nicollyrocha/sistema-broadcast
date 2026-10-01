import { Navigate, Outlet, useLocation } from "react-router";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/contexts/AuthContext";

export function AuthLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Já logado (ou acabou de entrar/cadastrar): volta para a página que pediu o login, ou para o app.
  if (!loading && user) {
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
    return <Navigate to={from ?? ROUTES.inbox} replace />;
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_minmax(0,560px)] xl:grid-cols-[1fr_640px]">
      {/* Coluna do formulário */}
      <div className="flex flex-col bg-white px-4 py-6 sm:px-10">
        <Logo className="self-start" />
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-[380px]">
            <Outlet />
          </div>
        </div>
        <p className="text-center text-xs text-zinc-400">Seus dados protegidos · Em conformidade com a LGPD</p>
      </div>

      {/* Painel lateral de marca */}
      <aside className="relative hidden overflow-hidden bg-night-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-brand-500/25 blur-[120px]" />

        <Chip
          className="relative self-start border-white/10 bg-white/5 text-zinc-300"
          variant="outlined"
          size="small"
          icon={<span className="ml-2 size-1.5 rounded-full bg-emerald-400" />}
          label="Envios agendados com precisão de minuto"
        />

        <div className="relative">
          <p className="text-3xl leading-tight font-semibold tracking-tight text-white">
            “Agendo os avisos da semana na segunda de manhã e não penso mais nisso.”
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Avatar className="size-10 bg-gradient-to-br from-brand-400 to-brand-700">AB</Avatar>
            <div>
              <p className="text-sm font-medium text-white">Ana Beatriz Souza</p>
              <p className="text-sm text-zinc-500">Dona de loja</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
