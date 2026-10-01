import { Clock, GitBranch, MessageCircle, MoreHorizontal, Plus, Workflow, Zap } from "lucide-react";
import { AUTOMATIONS } from "@/mocks/data";
import { cn, formatNumber } from "@/lib/format";

const RECIPES = [
  { icon: Zap, title: "Boas-vindas", desc: "Sequência para novos contatos" },
  { icon: Clock, title: "Carrinho abandonado", desc: "Lembrete em 1h, 24h e 72h" },
  { icon: GitBranch, title: "Reengajamento", desc: "Recupere inativos com oferta" },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Automações</h1>
          <p className="page-subtitle">Fluxos que disparam mensagens com base em eventos e comportamento.</p>
        </div>
        <button className="btn btn-primary"><Plus /> Nova automação</button>
      </div>

      {/* Modelos prontos */}
      <div>
        <p className="mb-3 text-sm font-medium text-zinc-700">Começar com um modelo</p>
        <div className="grid gap-4 md:grid-cols-3">
          {RECIPES.map(({ icon: Icon, title, desc }) => (
            <button key={title} className="card flex items-center gap-4 p-4 text-left transition hover:border-brand-300 hover:shadow-pop">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-sm"><Icon className="size-5" /></span>
              <span><span className="block text-sm font-semibold">{title}</span><span className="block text-xs text-zinc-500">{desc}</span></span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="card divide-y divide-zinc-100">
        {AUTOMATIONS.map((a) => (
          <div key={a.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl ring-1", a.active ? "bg-emerald-50 text-emerald-600 ring-emerald-600/15" : "bg-zinc-50 text-zinc-400 ring-zinc-200")}>
              <Workflow className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{a.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><Zap className="size-3" /> {a.trigger}</span>
                <span className="flex items-center gap-1"><MessageCircle className="size-3" /> {a.steps} etapas</span>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div><p className="text-xs text-zinc-500">Execuções</p><p className="font-semibold tabular-nums">{formatNumber(a.runs)}</p></div>
              <div><p className="text-xs text-zinc-500">Conversão</p><p className="font-semibold tabular-nums">{a.conversion}</p></div>
              {/* Toggle visual */}
              <button className={cn("relative h-6 w-11 rounded-full transition", a.active ? "bg-brand-500" : "bg-zinc-200")} aria-label="Ativar">
                <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", a.active ? "left-5.5" : "left-0.5")} />
              </button>
              <button className="btn btn-ghost btn-icon btn-sm" aria-label="Ações"><MoreHorizontal /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
