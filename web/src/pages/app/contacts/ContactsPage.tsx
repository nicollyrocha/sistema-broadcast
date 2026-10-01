import { Link } from "react-router";
import { Download, Filter, MoreHorizontal, Plus, Search, Upload } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { CONTACT_STATUS_MAP } from "@/config/ui-maps";
import { CONTACTS } from "@/mocks/data";
import { cn } from "@/lib/format";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Contatos</h1>
          <p className="page-subtitle">84.312 contatos · 81.904 inscritos</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary"><Download /> Exportar</button>
          <button className="btn btn-secondary"><Upload /> Importar CSV</button>
          <button className="btn btn-primary"><Plus /> Adicionar</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[["Novos este mês", "+3.204"], ["Taxa de opt-in", "97,1%"], ["Engajados (30d)", "42.180"]].map(([l, v]) => (
          <div key={l} className="card p-5"><p className="text-sm text-zinc-500">{l}</p><p className="mt-2 text-2xl font-semibold tracking-tight">{v}</p></div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
            <input className="input pl-9" placeholder="Buscar por nome, e-mail ou telefone..." />
          </label>
          <select className="input sm:w-44"><option>Todas as tags</option><option>VIP</option><option>Lead</option><option>Cliente</option></select>
          <button className="btn btn-secondary h-10"><Filter /> Filtros</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr><th className="w-10"><input type="checkbox" className="checkbox" /></th><th>Nome</th><th>Telefone</th><th>Tags</th><th>Status</th><th>Criado em</th><th /></tr>
            </thead>
            <tbody>
              {CONTACTS.map((c) => {
                const st = CONTACT_STATUS_MAP[c.status];
                return (
                  <tr key={c.id}>
                    <td><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <Link to={ROUTES.contactDetail(c.id)} className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span><span className="block font-medium text-zinc-900">{c.name}</span><span className="block text-xs text-zinc-500">{c.email}</span></span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap tabular-nums">{c.phone}</td>
                    <td><div className="flex gap-1">{c.tags.map((t) => <span key={t} className="badge badge-neutral">{t}</span>)}</div></td>
                    <td><span className={cn("badge", st.className)}>{st.label}</span></td>
                    <td className="whitespace-nowrap text-zinc-500">{c.createdAt}</td>
                    <td><button className="btn btn-ghost btn-icon btn-sm" aria-label="Ações"><MoreHorizontal /></button></td>
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
