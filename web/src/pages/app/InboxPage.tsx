import { CheckCheck, MoreVertical, Paperclip, Search, Send, Smile, Tag, UserPlus } from "lucide-react";
import { CONVERSATIONS } from "@/mocks/data";
import { cn } from "@/lib/format";

export default function InboxPage() {
  const active = CONVERSATIONS[0];

  return (
    <div className="card -mx-4 grid h-[calc(100vh-8rem)] overflow-hidden rounded-none sm:mx-0 sm:rounded-(--radius-card) md:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr_300px]">
      {/* Lista de conversas */}
      <aside className="flex min-h-0 flex-col border-r border-zinc-100">
        <div className="space-y-3 border-b border-zinc-100 p-4">
          <h1 className="text-lg font-semibold">Caixa de entrada</h1>
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
            <input className="input h-9 pl-9" placeholder="Buscar conversa..." />
          </label>
          <div className="flex gap-1 text-xs font-medium">
            {["Abertas", "Minhas", "Resolvidas"].map((t, i) => (
              <button key={t} className={cn("rounded-md px-2.5 py-1", i === 0 ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-100")}>{t}</button>
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((c, i) => (
            <li key={c.id}>
              <button className={cn("flex w-full gap-3 border-l-2 px-4 py-3.5 text-left transition", i === 0 ? "border-brand-500 bg-brand-50/40" : "border-transparent hover:bg-zinc-50")}>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{c.name}</span>
                    <span className="text-[11px] text-zinc-400">{c.time}</span>
                  </span>
                  <span className="mt-0.5 flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-zinc-500">{c.last}</span>
                    {c.unread > 0 && <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-500 text-[11px] font-semibold text-white">{c.unread}</span>}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Conversa */}
      <section className="hidden min-h-0 flex-col md:flex">
        <header className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
          <div>
            <p className="font-medium">{active.name}</p>
            <p className="text-xs text-emerald-600">WhatsApp · online</p>
          </div>
          <div className="flex gap-1">
            <button className="btn btn-secondary btn-sm"><CheckCheck /> Resolver</button>
            <button className="btn btn-ghost btn-icon btn-sm" aria-label="Mais"><MoreVertical /></button>
          </div>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto bg-zinc-50/60 p-6">
          <p className="text-center text-xs text-zinc-400">Hoje</p>
          <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-brand-500 p-3 text-sm text-white">
            Oi, Mariana! 👋 A Black Friday chegou mais cedo para você: 30% OFF em toda a loja até domingo.
            <p className="mt-1 text-right text-[10px] text-white/70">14:30 · Campanha</p>
          </div>
          <div className="max-w-md rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-card ring-1 ring-zinc-200/60">
            Que demais! Vale para os produtos da coleção nova também?
            <p className="mt-1 text-[10px] text-zinc-400">14:31</p>
          </div>
          <div className="max-w-md rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-card ring-1 ring-zinc-200/60">
            Perfeito, vou aproveitar o cupom!
            <p className="mt-1 text-[10px] text-zinc-400">14:32</p>
          </div>
        </div>
        <footer className="border-t border-zinc-100 p-4">
          <div className="flex items-end gap-2 rounded-xl border border-zinc-200 p-2 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/10">
            <button className="btn btn-ghost btn-icon btn-sm" aria-label="Anexar"><Paperclip /></button>
            <button className="btn btn-ghost btn-icon btn-sm" aria-label="Emoji"><Smile /></button>
            <textarea rows={1} className="flex-1 resize-none py-1.5 text-sm outline-none" placeholder="Escreva uma resposta..." />
            <button className="btn btn-primary btn-sm"><Send /> Enviar</button>
          </div>
        </footer>
      </section>

      {/* Detalhes do contato */}
      <aside className="hidden border-l border-zinc-100 p-5 xl:block">
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-semibold text-white">MC</div>
          <p className="mt-3 font-semibold">{active.name}</p>
          <p className="text-sm text-zinc-500">+55 11 98812-3401</p>
        </div>
        <div className="mt-6 space-y-2">
          <button className="btn btn-secondary w-full"><UserPlus /> Atribuir</button>
          <button className="btn btn-secondary w-full"><Tag /> Adicionar tag</button>
        </div>
        <dl className="mt-6 space-y-3 border-t border-zinc-100 pt-6 text-sm">
          {[["Tags", "VIP, SP"], ["Total gasto", "R$ 4.820"], ["Última compra", "18 set"], ["Responsável", "—"]].map(([k, v]) => (
            <div key={k} className="flex justify-between"><dt className="text-zinc-500">{k}</dt><dd className="font-medium">{v}</dd></div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
