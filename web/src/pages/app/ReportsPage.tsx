import { Calendar, Download } from "lucide-react";
import { CHART_BARS, STATS } from "@/mocks/data";

const BY_CHANNEL = [
  { name: "WhatsApp", sent: "182.410", rate: 72, color: "bg-emerald-500" },
  { name: "E-mail", sent: "58.201", rate: 41, color: "bg-sky-500" },
  { name: "SMS", sent: "7.780", rate: 18, color: "bg-violet-500" },
];

const HOURS = ["00h", "04h", "08h", "12h", "16h", "20h"];
const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-subtitle">Performance consolidada de todos os canais.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary"><Calendar /> 01 set – 30 set</button>
          <button className="btn btn-secondary"><Download /> Exportar CSV</button>
        </div>
      </div>

      <div className="card grid divide-y divide-zinc-100 sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4 xl:divide-x">
        {STATS.map((s) => (
          <div key={s.label} className="p-5">
            <p className="text-sm text-zinc-500">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</p>
            <p className={s.up ? "mt-1 text-xs text-emerald-600" : "mt-1 text-xs text-red-600"}>{s.delta} vs. período anterior</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="card">
          <div className="card-header"><p className="card-title">Entregas x leituras</p></div>
          <div className="card-body">
            {/* TODO: componente de gráfico */}
            <div className="flex h-64 items-end gap-3">
              {CHART_BARS.map((h, i) => (
                <div key={i} className="flex flex-1 items-end gap-0.5">
                  <div className="flex-1 rounded-t bg-zinc-200" style={{ height: `${h * 2.4}px` }} />
                  <div className="flex-1 rounded-t bg-brand-500" style={{ height: `${h * 1.6}px` }} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-zinc-200" /> Entregues</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-brand-500" /> Lidas</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><p className="card-title">Por canal</p></div>
          <div className="card-body space-y-5">
            {BY_CHANNEL.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm"><span className="font-medium">{c.name}</span><span className="text-zinc-500 tabular-nums">{c.sent}</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100"><div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.rate}%` }} /></div>
                <p className="mt-1 text-xs text-zinc-500">{c.rate}% de taxa de leitura</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div><p className="card-title">Melhor horário de engajamento</p><p className="text-xs text-zinc-500">Taxa de leitura por dia e hora</p></div>
        </div>
        <div className="card-body overflow-x-auto">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[40px_repeat(24,1fr)] gap-1">
              {DAYS.map((d, di) => (
                <div key={d} className="contents">
                  <span className="text-xs leading-5 text-zinc-500">{d}</span>
                  {Array.from({ length: 24 }).map((_, h) => {
                    const v = Math.max(0.06, Math.sin((h - 6) / 4) * 0.5 + 0.4 - di * 0.03);
                    return <span key={h} className="h-5 rounded-sm bg-brand-500" style={{ opacity: Math.min(1, v) }} />;
                  })}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-[40px_repeat(6,1fr)] text-xs text-zinc-400">
              <span />{HOURS.map((h) => <span key={h}>{h}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
