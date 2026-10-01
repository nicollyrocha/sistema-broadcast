import { Check, CreditCard, Download } from "lucide-react";
import { PLANS } from "@/mocks/data";
import { cn } from "@/lib/format";

const INVOICES = [
  { id: "INV-2026-09", date: "01 set 2026", amount: "R$ 297,00", status: "Pago" },
  { id: "INV-2026-08", date: "01 ago 2026", amount: "R$ 342,50", status: "Pago" },
  { id: "INV-2026-07", date: "01 jul 2026", amount: "R$ 297,00", status: "Pago" },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Assinatura</h1>
        <p className="page-subtitle">Gerencie seu plano, consumo e faturas.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row">
            <div>
              <span className="badge badge-brand">Plano atual</span>
              <p className="mt-3 text-2xl font-semibold tracking-tight">Growth</p>
              <p className="text-sm text-zinc-500">R$ 297/mês · Renova em 01 out 2026</p>
            </div>
            <div className="flex gap-2 self-start">
              <button className="btn btn-secondary">Cancelar</button>
              <button className="btn btn-primary">Mudar plano</button>
            </div>
          </div>
          <div className="relative mt-8 grid gap-6 sm:grid-cols-3">
            {[["Mensagens", 34120, 50000], ["Números WhatsApp", 2, 3], ["Membros do time", 4, 10]].map(([l, used, total]) => (
              <div key={l as string}>
                <div className="flex justify-between text-sm"><span className="text-zinc-600">{l}</span><span className="font-medium tabular-nums">{used.toLocaleString("pt-BR")} / {total.toLocaleString("pt-BR")}</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${((used as number) / (total as number)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <p className="card-title">Forma de pagamento</p>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-zinc-200 p-4">
            <span className="grid h-8 w-12 place-items-center rounded-md bg-zinc-900 text-white"><CreditCard className="size-4" /></span>
            <div className="flex-1"><p className="text-sm font-medium">•••• 4242</p><p className="text-xs text-zinc-500">Expira 08/2028</p></div>
            <button className="btn btn-ghost btn-sm">Alterar</button>
          </div>
          <p className="mt-4 text-xs text-zinc-500">Faturas enviadas para financeiro@lojaexemplo.com.br</p>
        </div>
      </div>

      <section>
        <h2 className="text-base font-semibold">Planos</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={cn("card flex flex-col p-6", p.highlighted && "ring-2 ring-brand-500")}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{p.name}</p>
                {p.highlighted && <span className="badge badge-brand">Atual</span>}
              </div>
              <p className="mt-3"><span className="text-3xl font-semibold tracking-tight">{p.price}</span><span className="text-zinc-500">{p.period}</span></p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => <li key={f} className="flex items-center gap-2 text-zinc-600"><Check className="size-4 text-brand-500" /> {f}</li>)}
              </ul>
              <button className={cn("btn mt-6 w-full", p.highlighted ? "btn-secondary" : "btn-dark")} disabled={p.highlighted}>
                {p.highlighted ? "Plano atual" : p.price === "Sob consulta" ? "Falar com vendas" : "Fazer downgrade"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="card overflow-hidden">
        <div className="card-header"><p className="card-title">Histórico de faturas</p></div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Fatura</th><th>Data</th><th>Valor</th><th>Status</th><th /></tr></thead>
            <tbody>
              {INVOICES.map((i) => (
                <tr key={i.id}>
                  <td className="font-mono text-xs">{i.id}</td><td>{i.date}</td><td className="tabular-nums">{i.amount}</td>
                  <td><span className="badge badge-success">{i.status}</span></td>
                  <td className="text-right"><button className="btn btn-ghost btn-sm"><Download /> PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
