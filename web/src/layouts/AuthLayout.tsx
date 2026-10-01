import { Outlet } from "react-router";
import { Logo } from "@/components/layout/Logo";

export function AuthLayout() {
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
        <p className="text-center text-xs text-zinc-400">
          Protegido por criptografia ponta a ponta · Em conformidade com a LGPD
        </p>
      </div>

      {/* Painel lateral de marca */}
      <aside className="relative hidden overflow-hidden bg-night-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-brand-500/25 blur-[120px]" />

        <div className="relative">
          <span className="badge border-0 bg-white/5 text-zinc-300 ring-white/10">
            <span className="badge-dot text-emerald-400" /> 99,98% de uptime nos últimos 90 dias
          </span>
        </div>

        <div className="relative">
          <p className="text-3xl leading-tight font-semibold tracking-tight text-white">
            “Saímos de planilhas e disparos manuais para 400 mil mensagens por mês — com o time de 3 pessoas.”
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="size-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700" />
            <div>
              <p className="text-sm font-medium text-white">Ana Beatriz Souza</p>
              <p className="text-sm text-zinc-500">Head de CRM, Loja Exemplo</p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["+2.400", "empresas"],
              ["1,2 bi", "mensagens/ano"],
              ["4,9/5", "avaliação"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-semibold text-white">{v}</p>
                <p className="text-xs text-zinc-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
