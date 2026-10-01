import { Link } from "react-router";
import { ArrowDownRight, ArrowUpRight, Calendar, ChevronRight, Download, FileText, Plus, Upload, Workflow } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { CHANNEL_MAP, CAMPAIGN_STATUS_MAP } from "@/config/ui-maps";
import { CAMPAIGNS, CHART_BARS, STATS } from "@/mocks/data";
import { cn, formatNumber } from "@/lib/format";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Boa tarde, Nic 👋</h1>
          <p className="page-subtitle">Aqui está o desempenho dos seus envios nos últimos 30 dias.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary"><Calendar /> Últimos 30 dias</button>
          <button className="btn btn-secondary btn-icon" aria-label="Exportar"><Download /></button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-sm text-zinc-500">{s.label}</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
              <span className={cn("badge", s.up ? "badge-success" : "badge-danger")}>
                {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* Gráfico */}
        <div className="card">
          <div className="card-header">
            <div>
              <p className="card-title">Volume de envios</p>
              <p className="text-xs text-zinc-500">Mensagens entregues por dia</p>
            </div>
            <div className="flex rounded-lg bg-zinc-100 p-0.5 text-xs font-medium">
              {["Todos", "WhatsApp", "E-mail", "SMS"].map((t, i) => (
                <button key={t} className={cn("rounded-md px-2.5 py-1", i === 0 ? "bg-white shadow-card" : "text-zinc-500")}>{t}</button>
              ))}
            </div>
          </div>
          <div className="card-body">
            {/* TODO: substituir por componente de gráfico */}
            <div className="flex h-64 items-end gap-2">
              {CHART_BARS.map((h, i) => (
                <div key={i} className="group relative flex-1">
                  <div className="rounded-t-md bg-brand-500/15 transition group-hover:bg-brand-500/25" style={{ height: `${h * 2.4}px` }}>
                    <div className="h-full rounded-t-md bg-gradient-to-t from-brand-500 to-brand-400" style={{ height: `${h * 0.7}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs text-zinc-400">
              <span>17 set</span><span>24 set</span><span>01 out</span>
            </div>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="card">
          <div className="card-header"><p className="card-title">Ações rápidas</p></div>
          <div className="space-y-1 p-2">
            {[
              { icon: Plus, label: "Criar campanha", desc: "WhatsApp, e-mail ou SMS", to: ROUTES.campaignNew },
              { icon: Upload, label: "Importar contatos", desc: "CSV ou integração", to: ROUTES.contacts },
              { icon: Workflow, label: "Nova automação", desc: "Fluxos que rodam sozinhos", to: ROUTES.automations },
              { icon: FileText, label: "Criar template", desc: "Mensagens reutilizáveis", to: ROUTES.templates },
            ].map(({ icon: Icon, label, desc, to }) => (
              <Link key={label} to={to} className="group flex items-center gap-3 rounded-lg p-3 transition hover:bg-zinc-50">
                <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-500/10">
                  <Icon className="size-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block text-xs text-zinc-500">{desc}</span>
                </span>
                <ChevronRight className="size-4 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Campanhas recentes */}
      <div className="card overflow-hidden">
        <div className="card-header">
          <p className="card-title">Campanhas recentes</p>
          <Link to={ROUTES.campaigns} className="text-sm font-medium text-brand-600 hover:text-brand-700">Ver todas</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr><th>Campanha</th><th>Status</th><th>Destinatários</th><th>Entrega</th><th>Data</th></tr>
            </thead>
            <tbody>
              {CAMPAIGNS.slice(0, 5).map((c) => {
                const ch = CHANNEL_MAP[c.channel];
                const st = CAMPAIGN_STATUS_MAP[c.status];
                const rate = c.recipients ? Math.round((c.delivered / c.recipients) * 100) : 0;
                return (
                  <tr key={c.id}>
                    <td>
                      <Link to={ROUTES.campaignDetail(c.id)} className="flex items-center gap-3">
                        <span className={cn("grid size-8 place-items-center rounded-lg ring-1", ch.className)}><ch.icon className="size-4" /></span>
                        <span>
                          <span className="block font-medium text-zinc-900">{c.name}</span>
                          <span className="block text-xs text-zinc-500">{c.audience}</span>
                        </span>
                      </Link>
                    </td>
                    <td><span className={cn("badge", st.className)}><span className="badge-dot" />{st.label}</span></td>
                    <td className="tabular-nums">{formatNumber(c.recipients)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${rate}%` }} />
                        </div>
                        <span className="text-xs text-zinc-500 tabular-nums">{rate}%</span>
                      </div>
                    </td>
                    <td className="text-zinc-500">{c.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
