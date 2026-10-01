import { Link } from "react-router";
import { ArrowLeft, Mail, MessageCircle, MousePointerClick, Pencil, Phone, Send, ShoppingBag } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { CONTACTS } from "@/mocks/data";

const TIMELINE = [
  { icon: MousePointerClick, title: "Clicou em “Ver ofertas”", meta: "Black Friday — Aviso antecipado", time: "Hoje, 14:33" },
  { icon: MessageCircle, title: "Respondeu no WhatsApp", meta: "“Perfeito, vou aproveitar!”", time: "Hoje, 14:32" },
  { icon: Send, title: "Recebeu campanha", meta: "Black Friday — Aviso antecipado", time: "Hoje, 14:30" },
  { icon: ShoppingBag, title: "Realizou uma compra", meta: "Pedido #10293 · R$ 349,90", time: "18 set" },
  { icon: Mail, title: "Abriu e-mail", meta: "Newsletter de setembro", time: "03 set" },
];

export default function ContactDetailPage() {
  const c = CONTACTS[0]; // TODO: buscar por useParams().id

  return (
    <div className="space-y-6">
      <Link to={ROUTES.contacts} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900">
        <ArrowLeft className="size-4" /> Contatos
      </Link>

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="space-y-6">
          <div className="card p-6 text-center">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-2xl font-semibold text-white">MC</div>
            <h1 className="mt-4 text-lg font-semibold">{c.name}</h1>
            <p className="text-sm text-zinc-500">Cliente desde set 2024</p>
            <div className="mt-3 flex justify-center gap-1">{c.tags.map((t) => <span key={t} className="badge badge-brand">{t}</span>)}</div>
            <div className="mt-6 flex gap-2">
              <button className="btn btn-primary flex-1"><MessageCircle /> Mensagem</button>
              <button className="btn btn-secondary btn-icon" aria-label="Editar"><Pencil /></button>
            </div>
          </div>

          <div className="card divide-y divide-zinc-100 text-sm">
            {[
              [Mail, "E-mail", c.email],
              [Phone, "Telefone", c.phone],
            ].map(([Icon, l, v]) => {
              const I = Icon as typeof Mail;
              return (
                <div key={l as string} className="flex items-center gap-3 px-5 py-3.5">
                  <I className="size-4 text-zinc-400" />
                  <div className="min-w-0"><p className="text-xs text-zinc-500">{l as string}</p><p className="truncate font-medium">{v as string}</p></div>
                </div>
              );
            })}
          </div>

          <div className="card">
            <div className="card-header"><p className="card-title">Campos personalizados</p></div>
            <dl className="card-body space-y-3 text-sm">
              {[["Cidade", "São Paulo"], ["Total gasto", "R$ 4.820,00"], ["Pedidos", "12"], ["Origem", "Instagram Ads"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><dt className="text-zinc-500">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[["Mensagens recebidas", "48"], ["Taxa de leitura", "92%"], ["Cliques", "17"]].map(([l, v]) => (
              <div key={l} className="card p-5"><p className="text-sm text-zinc-500">{l}</p><p className="mt-2 text-2xl font-semibold">{v}</p></div>
            ))}
          </div>

          <div className="card">
            <div className="card-header"><p className="card-title">Atividade</p></div>
            <ol className="card-body relative space-y-6">
              {TIMELINE.map(({ icon: Icon, title, meta, time }, i) => (
                <li key={i} className="relative flex gap-4">
                  {i < TIMELINE.length - 1 && <span className="absolute top-9 left-4 h-[calc(100%-12px)] w-px bg-zinc-200" />}
                  <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-zinc-200 bg-white"><Icon className="size-4 text-zinc-500" /></span>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-sm text-zinc-500">{meta}</p>
                  </div>
                  <span className="pt-1 text-xs whitespace-nowrap text-zinc-400">{time}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
