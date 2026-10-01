import { Link } from "react-router";
import { ArrowLeft, Copy, Download, Pause } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { CAMPAIGN_STATUS_MAP, CHANNEL_MAP } from "@/config/ui-maps";
import { CAMPAIGNS, CONTACTS } from "@/mocks/data";
import { cn, formatNumber, formatPercent } from "@/lib/format";

export default function CampaignDetailPage() {
  const c = CAMPAIGNS[0]; // TODO: buscar por useParams().id
  const ch = CHANNEL_MAP[c.channel];
  const st = CAMPAIGN_STATUS_MAP[c.status];

  const funnel = [
    { label: "Enviadas", value: c.recipients },
    { label: "Entregues", value: c.delivered },
    { label: "Lidas", value: c.opened },
    { label: "Clicaram", value: c.clicked },
  ];

  return (
    <div className="space-y-6">
      <Link to={ROUTES.campaigns} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900">
        <ArrowLeft className="size-4" /> Campanhas
      </Link>

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="page-title">{c.name}</h1>
            <span className={cn("badge", st.className)}><span className="badge-dot animate-pulse" />{st.label}</span>
          </div>
          <p className="page-subtitle flex items-center gap-2">
            <ch.icon className="size-4" /> {ch.label} · {c.audience} · Iniciada {c.date}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary"><Copy /> Duplicar</button>
          <button className="btn btn-secondary"><Download /> Exportar</button>
          <button className="btn btn-dark"><Pause /> Pausar</button>
        </div>
      </div>

      {/* Progresso */}
      <div className="card p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Progresso do envio</span>
          <span className="text-zinc-500 tabular-nums">{formatNumber(c.delivered)} de {formatNumber(c.recipients)}</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400" style={{ width: `${(c.delivered / c.recipients) * 100}%` }} />
        </div>
      </div>

      {/* Funil */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {funnel.map((f, i) => (
          <div key={f.label} className="card p-5">
            <p className="text-sm text-zinc-500">{f.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{formatNumber(f.value)}</p>
            <p className="mt-1 text-xs text-zinc-500">{i === 0 ? "100%" : formatPercent(f.value / c.recipients)} do total</p>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full bg-brand-500" style={{ width: `${(f.value / c.recipients) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="card overflow-hidden">
          <div className="card-header"><p className="card-title">Destinatários</p><input className="input h-8 w-56" placeholder="Buscar..." /></div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead><tr><th>Contato</th><th>Status</th><th>Atualizado</th></tr></thead>
              <tbody>
                {CONTACTS.slice(0, 6).map((ct, i) => (
                  <tr key={ct.id}>
                    <td><p className="font-medium text-zinc-900">{ct.name}</p><p className="text-xs text-zinc-500">{ct.phone}</p></td>
                    <td>
                      <span className={cn("badge", ["badge-success", "badge-info", "badge-success", "badge-neutral", "badge-danger", "badge-info"][i])}>
                        {["Clicou", "Lida", "Clicou", "Entregue", "Falhou", "Lida"][i]}
                      </span>
                    </td>
                    <td className="text-zinc-500">há {i + 2} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><p className="card-title">Mensagem enviada</p></div>
          <div className="card-body">
            <div className="rounded-2xl bg-[#efeae2] p-4">
              <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
                Oi, Mariana! 👋 A Black Friday chegou mais cedo para você: <b>30% OFF</b> em toda a loja até domingo.
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              {[["Template", "Black Friday v2"], ["Remetente", "+55 11 4000-1234"], ["Criada por", "Nic"], ["Custo", "R$ 921,00"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><dt className="text-zinc-500">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
