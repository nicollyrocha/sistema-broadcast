import { Link } from "react-router";
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { CAMPAIGN_STATUS_MAP, CHANNEL_MAP } from "@/config/ui-maps";
import { CAMPAIGNS } from "@/mocks/data";
import { cn, formatNumber, formatPercent } from "@/lib/format";

const TABS = ["Todas", "Enviando", "Agendadas", "Enviadas", "Rascunhos"];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Campanhas</h1>
          <p className="page-subtitle">Crie, agende e acompanhe seus disparos.</p>
        </div>
        <Link to={ROUTES.campaignNew} className="btn btn-primary"><Plus /> Nova campanha</Link>
      </div>

      <div className="tabs">
        {TABS.map((t, i) => (
          <button key={t} className={cn("tab", i === 0 && "active")}>
            {t}
            {i === 0 && <span className="ml-2 rounded-full bg-zinc-100 px-1.5 text-xs text-zinc-600">{CAMPAIGNS.length}</span>}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
            <input className="input pl-9" placeholder="Buscar campanha..." />
          </label>
          <select className="input sm:w-44">
            <option>Todos os canais</option><option>WhatsApp</option><option>E-mail</option><option>SMS</option>
          </select>
          <button className="btn btn-secondary h-10"><Filter /> Filtros</button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="w-10"><input type="checkbox" className="checkbox" /></th>
                <th>Campanha</th><th>Canal</th><th>Status</th><th className="text-right">Enviadas</th>
                <th className="text-right">Abertura</th><th className="text-right">Cliques</th><th>Data</th><th />
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c) => {
                const ch = CHANNEL_MAP[c.channel];
                const st = CAMPAIGN_STATUS_MAP[c.status];
                return (
                  <tr key={c.id}>
                    <td><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <Link to={ROUTES.campaignDetail(c.id)} className="font-medium text-zinc-900 hover:text-brand-600">{c.name}</Link>
                      <p className="text-xs text-zinc-500">{c.audience}</p>
                    </td>
                    <td><span className={cn("badge", ch.className)}><ch.icon className="size-3" />{ch.label}</span></td>
                    <td><span className={cn("badge", st.className)}><span className="badge-dot" />{st.label}</span></td>
                    <td className="text-right tabular-nums">{formatNumber(c.recipients)}</td>
                    <td className="text-right tabular-nums">{c.delivered ? formatPercent(c.opened / c.delivered) : "—"}</td>
                    <td className="text-right tabular-nums">{c.delivered ? formatPercent(c.clicked / c.delivered) : "—"}</td>
                    <td className="whitespace-nowrap text-zinc-500">{c.date}</td>
                    <td><button className="btn btn-ghost btn-icon btn-sm" aria-label="Ações"><MoreHorizontal /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 text-sm text-zinc-500">
          <span>Mostrando 1–{CAMPAIGNS.length} de {CAMPAIGNS.length}</span>
          <div className="flex gap-2">
            <button className="btn btn-secondary btn-sm" disabled>Anterior</button>
            <button className="btn btn-secondary btn-sm">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}
