import { ListFilter, MoreHorizontal, Plus, RefreshCw, Users } from "lucide-react";
import { AUDIENCES } from "@/mocks/data";
import { cn, formatNumber } from "@/lib/format";

export default function AudiencesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Audiências</h1>
          <p className="page-subtitle">Listas estáticas e segmentos que se atualizam sozinhos.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary"><Users /> Nova lista</button>
          <button className="btn btn-primary"><Plus /> Novo segmento</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {AUDIENCES.map((a) => {
          const dynamic = a.type === "Segmento dinâmico";
          return (
            <div key={a.id} className="card group flex flex-col p-5 transition hover:shadow-pop">
              <div className="flex items-start justify-between">
                <span className={cn("grid size-10 place-items-center rounded-xl ring-1", dynamic ? "bg-brand-50 text-brand-600 ring-brand-500/15" : "bg-zinc-50 text-zinc-600 ring-zinc-200")}>
                  {dynamic ? <ListFilter className="size-5" /> : <Users className="size-5" />}
                </span>
                <button className="btn btn-ghost btn-icon btn-sm opacity-0 transition group-hover:opacity-100" aria-label="Ações"><MoreHorizontal /></button>
              </div>
              <p className="mt-4 font-semibold">{a.name}</p>
              <p className="mt-1 line-clamp-2 flex-1 text-sm text-zinc-500">{a.rule}</p>
              <div className="mt-5 flex items-end justify-between border-t border-zinc-100 pt-4">
                <div>
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">{formatNumber(a.count)}</p>
                  <p className="text-xs text-zinc-500">contatos</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  {dynamic && <RefreshCw className="size-3" />} {a.updated}
                </span>
              </div>
            </div>
          );
        })}

        <button className="flex min-h-56 flex-col items-center justify-center gap-2 rounded-(--radius-card) border-2 border-dashed border-zinc-200 text-zinc-500 transition hover:border-brand-300 hover:bg-brand-50/30 hover:text-brand-600">
          <Plus className="size-6" />
          <span className="text-sm font-medium">Criar segmento</span>
        </button>
      </div>
    </div>
  );
}
