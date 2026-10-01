import type { ReactNode } from "react";
import { Trash2, Upload } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

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

const NOTIFICATIONS = [
  { title: "Mensagem agendada enviada", desc: "Aviso quando um agendamento for disparado", on: true },
  { title: "Falhas de envio", desc: "Alerta quando uma mensagem não for entregue", on: true },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Configurações</h1>
        <p className="page-subtitle">Gerencie sua conta e preferências.</p>
      </div>

      <div>
        <Section title="Perfil" desc="Suas informações pessoais.">
          <Card className="space-y-5 p-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-16 bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-semibold">NC</Avatar>
              <Button variant="outlined" size="small" startIcon={<Upload className="size-3.5" />}>Alterar foto</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Nome" />
              <TextField label="E-mail" type="email" />
              <TextField select label="Fuso horário" defaultValue="America/Sao_Paulo" helperText="Usado para agendar suas mensagens." className="sm:col-span-2">
                <MenuItem value="America/Sao_Paulo">(GMT-03:00) São Paulo</MenuItem>
                <MenuItem value="America/Manaus">(GMT-04:00) Manaus</MenuItem>
              </TextField>
            </div>
            <div className="flex justify-end border-t border-zinc-100 pt-5">
              <Button variant="contained">Salvar alterações</Button>
            </div>
          </Card>
        </Section>

        <Section title="Senha" desc="Altere a senha de acesso.">
          <Card className="space-y-4 p-5">
            <TextField label="Senha atual" type="password" autoComplete="current-password" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Nova senha" type="password" autoComplete="new-password" />
              <TextField label="Confirmar nova senha" type="password" autoComplete="new-password" />
            </div>
            <div className="flex justify-end border-t border-zinc-100 pt-5">
              <Button variant="outlined">Atualizar senha</Button>
            </div>
          </Card>
        </Section>

        <Section title="Notificações" desc="Escolha o que você quer receber por e-mail.">
          <Card className="divide-y divide-zinc-100">
            {NOTIFICATIONS.map((n) => (
              <label key={n.title} className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
                <span>
                  <span className="block text-sm font-medium">{n.title}</span>
                  <span className="block text-xs text-zinc-500">{n.desc}</span>
                </span>
                <Switch defaultChecked={n.on} />
              </label>
            ))}
          </Card>
        </Section>

        <Section title="Excluir conta" desc="Remove permanentemente sua conta, contatos e mensagens.">
          <Card className="flex flex-col justify-between gap-4 border-red-200 p-5 sm:flex-row sm:items-center">
            <p className="text-sm text-zinc-600">Esta ação não pode ser desfeita.</p>
            <Button variant="contained" color="error" startIcon={<Trash2 className="size-4" />}>Excluir conta</Button>
          </Card>
        </Section>
      </div>
    </div>
  );
}
