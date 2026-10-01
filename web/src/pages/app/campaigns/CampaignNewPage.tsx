import { Link } from "react-router";
import { ArrowLeft, Bold, Calendar, Check, Image, Italic, Link2, Mail, MessageCircle, Send, Smartphone, Smile } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { AUDIENCES } from "@/mocks/data";
import { cn, formatNumber } from "@/lib/format";

const STEPS = ["Configuração", "Audiência", "Mensagem", "Revisão"];

export default function CampaignNewPage() {
  const current = 2; // TODO: controle de etapas

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link to={ROUTES.campaigns} className="btn btn-secondary btn-icon" aria-label="Voltar"><ArrowLeft /></Link>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Nova campanha</h1>
            <p className="text-sm text-zinc-500">Rascunho salvo automaticamente</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary">Salvar rascunho</button>
          <button className="btn btn-primary">Continuar</button>
        </div>
      </div>

      {/* Stepper */}
      <ol className="card flex items-center gap-2 overflow-x-auto p-3">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold",
                i < current && "bg-brand-500 text-white",
                i === current && "bg-brand-50 text-brand-700 ring-2 ring-brand-500",
                i > current && "bg-zinc-100 text-zinc-500",
              )}
            >
              {i < current ? <Check className="size-3.5" /> : i + 1}
            </span>
            <span className={cn("text-sm font-medium whitespace-nowrap", i > current ? "text-zinc-400" : "text-zinc-900")}>{s}</span>
            {i < STEPS.length - 1 && <span className="mx-2 h-px min-w-6 flex-1 bg-zinc-200" />}
          </li>
        ))}
      </ol>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* Configuração */}
          <section className="card">
            <div className="card-header"><p className="card-title">Configuração</p></div>
            <div className="card-body space-y-5">
              <div>
                <label className="label">Nome da campanha</label>
                <input className="input" defaultValue="Black Friday — Aviso antecipado" />
                <p className="hint">Visível apenas para o seu time.</p>
              </div>
              <div>
                <label className="label">Canal</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: MessageCircle, name: "WhatsApp", desc: "Maior taxa de leitura", active: true },
                    { icon: Mail, name: "E-mail", desc: "Conteúdo rico", active: false },
                    { icon: Smartphone, name: "SMS", desc: "Alcance universal", active: false },
                  ].map(({ icon: Icon, name, desc, active }) => (
                    <button
                      key={name}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-4 text-left transition",
                        active ? "border-brand-500 bg-brand-50/50 ring-4 ring-brand-500/10" : "border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      <Icon className={cn("mt-0.5 size-5", active ? "text-brand-600" : "text-zinc-400")} />
                      <span>
                        <span className="block text-sm font-medium">{name}</span>
                        <span className="block text-xs text-zinc-500">{desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Audiência */}
          <section className="card">
            <div className="card-header">
              <p className="card-title">Audiência</p>
              <span className="text-sm text-zinc-500">18.420 destinatários</span>
            </div>
            <div className="divide-y divide-zinc-100">
              {AUDIENCES.slice(0, 4).map((a, i) => (
                <label key={a.id} className="flex cursor-pointer items-center gap-4 px-5 py-3.5 hover:bg-zinc-50">
                  <input type="checkbox" className="checkbox" defaultChecked={i === 0} />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{a.name}</span>
                    <span className="block text-xs text-zinc-500">{a.rule}</span>
                  </span>
                  <span className="text-sm text-zinc-500 tabular-nums">{formatNumber(a.count)}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Mensagem */}
          <section className="card">
            <div className="card-header">
              <p className="card-title">Mensagem</p>
              <select className="input h-8 w-48 text-[13px]">
                <option>Usar template...</option><option>Boas-vindas</option><option>Carrinho abandonado</option>
              </select>
            </div>
            <div className="card-body">
              <div className="overflow-hidden rounded-lg border border-zinc-200 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/10">
                <div className="flex gap-1 border-b border-zinc-100 bg-zinc-50/60 p-1.5">
                  {[Bold, Italic, Link2, Smile, Image].map((Icon, i) => (
                    <button key={i} className="btn btn-ghost btn-icon btn-sm"><Icon /></button>
                  ))}
                  <button className="btn btn-ghost btn-sm ml-auto font-mono text-xs">{"{{ variável }}"}</button>
                </div>
                <textarea
                  className="block min-h-40 w-full resize-y p-4 text-sm outline-none"
                  defaultValue={"Oi, {{nome}}! 👋 A Black Friday chegou mais cedo para você: *30% OFF* em toda a loja até domingo."}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-zinc-500">
                <span>Variáveis: {"{{nome}}"}, {"{{email}}"}, {"{{cupom}}"}</span>
                <span>112 / 1024</span>
              </div>
            </div>
          </section>

          {/* Envio */}
          <section className="card">
            <div className="card-header"><p className="card-title">Quando enviar</p></div>
            <div className="card-body grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 p-4">
                <input type="radio" name="when" className="mt-0.5 accent-brand-500" />
                <span><span className="block text-sm font-medium">Enviar agora</span><span className="text-xs text-zinc-500">O disparo começa imediatamente</span></span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-500 bg-brand-50/40 p-4">
                <input type="radio" name="when" defaultChecked className="mt-0.5 accent-brand-500" />
                <span className="flex-1">
                  <span className="block text-sm font-medium">Agendar</span>
                  <span className="mt-2 flex gap-2">
                    <input type="date" className="input h-9" /><input type="time" className="input h-9 w-28" />
                  </span>
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* Pré-visualização */}
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <div className="card p-5">
            <p className="card-title">Pré-visualização</p>
            <div className="mt-4 rounded-2xl bg-[#efeae2] p-4">
              <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
                Oi, Mariana! 👋 A Black Friday chegou mais cedo para você: <b>30% OFF</b> em toda a loja até domingo.
                <p className="mt-1 text-right text-[10px] text-zinc-400">14:30</p>
              </div>
              <div className="mt-1 max-w-[90%] rounded-lg bg-white py-2 text-center text-sm text-sky-600 shadow-sm">Ver ofertas</div>
            </div>
          </div>
          <div className="card divide-y divide-zinc-100 text-sm">
            {[["Destinatários", "18.420"], ["Custo estimado", "R$ 921,00"], ["Créditos após envio", "15.880"], ["Tempo estimado", "~ 4 min"]].map(([l, v]) => (
              <div key={l} className="flex justify-between px-5 py-3"><span className="text-zinc-500">{l}</span><span className="font-medium tabular-nums">{v}</span></div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary flex-1"><Send /> Enviar teste</button>
            <button className="btn btn-primary flex-1"><Calendar /> Agendar</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
