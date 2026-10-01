import type { ReactNode } from "react";
import { Copy, KeyRound, MoreHorizontal, Plus, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/format";

const TABS = ["Perfil", "Workspace", "Equipe", "Notificações", "Chaves de API", "Segurança"];

const MEMBERS = [
  { name: "Nic", email: "nic@lojaexemplo.com.br", role: "Proprietário" },
  { name: "Ana Souza", email: "ana@lojaexemplo.com.br", role: "Administrador" },
  { name: "Carlos Dias", email: "carlos@lojaexemplo.com.br", role: "Editor" },
  { name: "Paula Reis", email: "paula@lojaexemplo.com.br", role: "Atendente" },
];

function Section({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-b border-zinc-200/70 py-8 first:pt-0 last:border-0 lg:grid-cols-[280px_1fr]">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{desc}</p>
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Configurações</h1>
        <p className="page-subtitle">Gerencie sua conta, seu workspace e o acesso do time.</p>
      </div>

      {/* TODO: cada aba pode virar uma rota filha (/app/configuracoes/:aba) */}
      <div className="tabs">
        {TABS.map((t, i) => <button key={t} className={cn("tab", i === 0 && "active")}>{t}</button>)}
      </div>

      <div>
        <Section title="Perfil" desc="Suas informações pessoais e foto.">
          <div className="card card-body space-y-5">
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-semibold text-white">NC</div>
              <button className="btn btn-secondary btn-sm"><Upload /> Alterar foto</button>
              <button className="btn btn-ghost btn-sm">Remover</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label">Nome</label><input className="input" defaultValue="Nic" /></div>
              <div><label className="label">Sobrenome</label><input className="input" /></div>
              <div className="sm:col-span-2"><label className="label">E-mail</label><input className="input" type="email" placeholder="voce@empresa.com" /></div>
              <div><label className="label">Idioma</label><select className="input"><option>Português (Brasil)</option><option>English</option></select></div>
              <div><label className="label">Fuso horário</label><select className="input"><option>(GMT-03:00) São Paulo</option></select></div>
            </div>
            <div className="flex justify-end gap-2 border-t border-zinc-100 pt-5">
              <button className="btn btn-ghost">Cancelar</button>
              <button className="btn btn-primary">Salvar alterações</button>
            </div>
          </div>
        </Section>

        <Section title="Equipe" desc="Convide pessoas e defina permissões por função.">
          <div className="card overflow-hidden">
            <div className="flex gap-2 border-b border-zinc-100 p-4">
              <input className="input" placeholder="email@empresa.com" />
              <select className="input w-40"><option>Editor</option><option>Administrador</option><option>Atendente</option></select>
              <button className="btn btn-primary h-10"><Plus /> Convidar</button>
            </div>
            <ul className="divide-y divide-zinc-100">
              {MEMBERS.map((m) => (
                <li key={m.email} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="grid size-9 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">{m.name.split(" ").map((n) => n[0]).join("")}</span>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{m.name}</p><p className="truncate text-xs text-zinc-500">{m.email}</p></div>
                  <span className="badge badge-neutral">{m.role}</span>
                  <button className="btn btn-ghost btn-icon btn-sm" aria-label="Ações"><MoreHorizontal /></button>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="Notificações" desc="Escolha o que você quer receber por e-mail.">
          <div className="card divide-y divide-zinc-100">
            {[
              ["Campanha concluída", "Resumo quando um disparo terminar", true],
              ["Falhas de entrega", "Alertas quando a taxa de falha passar de 5%", true],
              ["Limite do plano", "Aviso ao atingir 80% da franquia", true],
              ["Novidades do produto", "Lançamentos e dicas mensais", false],
            ].map(([t, d, on]) => (
              <div key={t as string} className="flex items-center justify-between gap-4 px-5 py-4">
                <div><p className="text-sm font-medium">{t}</p><p className="text-xs text-zinc-500">{d}</p></div>
                <button className={cn("relative h-6 w-11 shrink-0 rounded-full transition", on ? "bg-brand-500" : "bg-zinc-200")} aria-label={t as string}>
                  <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", on ? "left-5.5" : "left-0.5")} />
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Chaves de API" desc="Use para integrar o Ecoa com seus sistemas.">
          <div className="card">
            <div className="flex items-center gap-3 px-5 py-4">
              <KeyRound className="size-4 text-zinc-400" />
              <div className="min-w-0 flex-1"><p className="text-sm font-medium">Produção</p><p className="truncate font-mono text-xs text-zinc-500">ecoa_live_••••••••••••••••3f9a</p></div>
              <button className="btn btn-ghost btn-icon btn-sm" aria-label="Copiar"><Copy /></button>
            </div>
            <div className="border-t border-zinc-100 p-4"><button className="btn btn-secondary btn-sm"><Plus /> Gerar nova chave</button></div>
          </div>
        </Section>

        <Section title="Zona de perigo" desc="Ações irreversíveis para o workspace.">
          <div className="card flex flex-col justify-between gap-4 border-red-200 p-5 sm:flex-row sm:items-center">
            <div><p className="text-sm font-medium">Excluir workspace</p><p className="text-xs text-zinc-500">Remove todos os contatos, campanhas e histórico.</p></div>
            <button className="btn btn-danger"><Trash2 /> Excluir</button>
          </div>
        </Section>
      </div>
    </div>
  );
}
