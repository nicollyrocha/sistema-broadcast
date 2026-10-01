import { CheckCircle2, Code2, Mail, MessageCircle, Plus, Settings2, Smartphone, Webhook } from "lucide-react";
import { cn } from "@/lib/format";

const CHANNELS = [
  { icon: MessageCircle, name: "WhatsApp Business", detail: "+55 11 4000-1234 · Loja Exemplo", status: "connected", meta: "Qualidade: Alta · Limite: 100k/dia", color: "bg-emerald-50 text-emerald-600 ring-emerald-600/15" },
  { icon: Mail, name: "E-mail", detail: "news@lojaexemplo.com.br", status: "connected", meta: "SPF ✓ · DKIM ✓ · DMARC ✓", color: "bg-sky-50 text-sky-600 ring-sky-600/15" },
  { icon: Smartphone, name: "SMS", detail: "Nenhum remetente configurado", status: "disconnected", meta: "Rotas premium para o Brasil", color: "bg-violet-50 text-violet-600 ring-violet-600/15" },
];

const INTEGRATIONS = ["Shopify", "WooCommerce", "Nuvemshop", "VTEX", "HubSpot", "RD Station", "Zapier", "Make"];

export default function ChannelsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Canais e integrações</h1>
        <p className="page-subtitle">Conecte seus canais de envio e as ferramentas que você já usa.</p>
      </div>

      <section className="space-y-3">
        {CHANNELS.map(({ icon: Icon, name, detail, status, meta, color }) => {
          const connected = status === "connected";
          return (
            <div key={name} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl ring-1", color)}><Icon className="size-6" /></span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{name}</p>
                  {connected ? (
                    <span className="badge badge-success"><CheckCircle2 className="size-3" /> Conectado</span>
                  ) : (
                    <span className="badge badge-neutral">Não conectado</span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-zinc-600">{detail}</p>
                <p className="text-xs text-zinc-400">{meta}</p>
              </div>
              {connected ? (
                <button className="btn btn-secondary"><Settings2 /> Gerenciar</button>
              ) : (
                <button className="btn btn-primary"><Plus /> Conectar</button>
              )}
            </div>
          );
        })}
      </section>

      <section>
        <h2 className="text-base font-semibold">Integrações</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((i, idx) => (
            <div key={i} className="card flex items-center gap-3 p-4">
              <span className="grid size-10 place-items-center rounded-lg bg-zinc-100 text-sm font-bold text-zinc-700">{i[0]}</span>
              <div className="flex-1"><p className="text-sm font-medium">{i}</p><p className="text-xs text-zinc-500">{idx < 2 ? "Conectado" : "Disponível"}</p></div>
              <button className={cn("btn btn-sm", idx < 2 ? "btn-ghost" : "btn-secondary")}>{idx < 2 ? "Config." : "Conectar"}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <Code2 className="size-5 text-brand-500" />
          <p className="mt-3 font-semibold">API REST</p>
          <p className="mt-1 text-sm text-zinc-500">Dispare mensagens e gerencie contatos programaticamente.</p>
          <button className="btn btn-secondary btn-sm mt-4">Ver documentação</button>
        </div>
        <div className="card p-5">
          <Webhook className="size-5 text-brand-500" />
          <p className="mt-3 font-semibold">Webhooks</p>
          <p className="mt-1 text-sm text-zinc-500">Receba eventos de entrega, leitura e respostas em tempo real.</p>
          <button className="btn btn-secondary btn-sm mt-4">Configurar endpoint</button>
        </div>
      </section>
    </div>
  );
}
