import { Plus, Search } from "lucide-react";
import { CHANNEL_MAP } from "@/config/ui-maps";
import { TEMPLATES } from "@/mocks/data";
import type { Channel } from "@/types";
import { cn } from "@/lib/format";

const STATUS_CLASS: Record<string, string> = {
  Aprovado: "badge-success",
  Ativo: "badge-success",
  "Em análise": "badge-warning",
  Rascunho: "badge-neutral",
};

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Templates</h1>
          <p className="page-subtitle">Mensagens reutilizáveis para campanhas e automações.</p>
        </div>
        <button className="btn btn-primary"><Plus /> Novo template</button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
          <input className="input pl-9" placeholder="Buscar template..." />
        </label>
        <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5 text-sm font-medium shadow-card">
          {["Todos", "WhatsApp", "E-mail", "SMS"].map((t, i) => (
            <button key={t} className={cn("rounded-md px-3 py-1.5", i === 0 ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900")}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {TEMPLATES.map((t) => {
          const ch = CHANNEL_MAP[t.channel as Channel];
          return (
            <div key={t.id} className="card group cursor-pointer overflow-hidden transition hover:shadow-pop">
              <div className="h-36 bg-zinc-50 p-4">
                <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white p-3 text-xs leading-relaxed text-zinc-700 shadow-sm ring-1 ring-zinc-200/60">
                  <span className="line-clamp-4">{t.preview}</span>
                </div>
              </div>
              <div className="border-t border-zinc-100 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-medium">{t.name}</p>
                  <span className={cn("badge", STATUS_CLASS[t.status])}>{t.status}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                  <ch.icon className="size-3.5" /> {ch.label} · {t.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
