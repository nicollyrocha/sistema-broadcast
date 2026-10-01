import { CalendarClock } from "lucide-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useContacts, useMessages } from "@/hooks/useRealtime";
import { useSelectedConnection } from "@/hooks/useSelectedConnection";
import type { Message } from "@/types";
import { cn, formatDateTime } from "@/lib/format";

const DAYS = 14;

const headerProps = {
  className: "border-b border-zinc-100 px-5 py-4",
  slotProps: { title: { className: "text-sm font-semibold" }, subheader: { className: "text-xs" } },
};

/* ───────── Cálculos do relatório ───────── */

/** "2026-10-01" no fuso local — usado para agrupar por dia. */
const dayKey = (date: Date) => date.toLocaleDateString("sv-SE");

/** "01 out" */
const shortDay = (date: Date) => date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");

/** Quantidade de mensagens enviadas em cada um dos últimos 14 dias (do mais antigo para hoje). */
function sentPerDay(sent: Message[]) {
  const days = Array.from({ length: DAYS }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (DAYS - 1 - i));
    return { date, total: 0 };
  });
  for (const m of sent) {
    const day = days.find((d) => dayKey(d.date) === dayKey(new Date(m.sentAt!)));
    if (day) day.total++;
  }
  return days;
}

/** Quantas mensagens enviadas cada contato recebeu e quando foi a última. */
function messagesPerContact(sent: Message[]) {
  const result: Record<string, { total: number; last: string }> = {};
  for (const m of sent) {
    for (const id of m.contactIds) {
      const item = (result[id] ??= { total: 0, last: m.sentAt! });
      item.total++;
      if (m.sentAt! > item.last) item.last = m.sentAt!;
    }
  }
  return result;
}

/* ───────── Tela ───────── */

export default function ReportsPage() {
  const { connections, selected: connection, select } = useSelectedConnection();
  const { data: messages } = useMessages(connection?.id);
  const { data: contacts } = useContacts(connection?.id);

  const sent = messages.filter((m) => m.status === "sent" && m.sentAt);
  const upcoming = messages
    .filter((m) => m.status === "scheduled" && m.scheduledAt)
    .sort((a, b) => a.scheduledAt!.localeCompare(b.scheduledAt!));

  const perContact = messagesPerContact(sent);
  const ranking = contacts
    .filter((c) => perContact[c.id])
    .map((c) => ({ ...c, ...perContact[c.id] }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const daily = sentPerDay(sent);
  const max = Math.max(...daily.map((d) => d.total), 1);

  const stats = [
    { label: "Mensagens enviadas", value: sent.length },
    { label: "Agendadas", value: upcoming.length },
    { label: "Contatos alcançados", value: Object.keys(perContact).length },
    { label: "Contatos na conexão", value: contacts.length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-subtitle">Visão geral dos seus envios.</p>
        </div>
        <TextField
          select
          label="Conexão"
          className="sm:w-56"
          value={connection?.id ?? ""}
          onChange={(e) => select(e.target.value)}
          disabled={connections.length === 0}
        >
          {connections.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-sm text-zinc-500">{s.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader
            title="Mensagens enviadas por dia"
            subheader={`${shortDay(daily[0].date)} – ${shortDay(daily[DAYS - 1].date)}`}
            {...headerProps}
          />
          <CardContent className="p-5">
            <div className="grid grid-cols-[32px_1fr] gap-3">
              {/* Eixo Y */}
              <div className="flex h-56 flex-col justify-between text-right text-[11px] text-zinc-400 tabular-nums">
                {[1, 0.75, 0.5, 0.25, 0].map((f) => (
                  <span key={f}>{Math.round(max * f)}</span>
                ))}
              </div>
              <div className="relative h-56">
                {/* Linhas de grade */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className={cn("block w-full border-t", i === 4 ? "border-zinc-300" : "border-dashed border-zinc-200")} />
                  ))}
                </div>
                {/* Barras */}
                <div className="relative flex h-full items-end justify-between gap-1.5 px-1">
                  {daily.map((d, i) => {
                    const h = (d.total / max) * 100;
                    const last = i === daily.length - 1;
                    return (
                      <div key={i} className="group relative flex h-full flex-1 items-end justify-center">
                        <span className="pointer-events-none absolute rounded-md bg-zinc-900 px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100" style={{ bottom: `calc(${h}% + 6px)` }}>
                          {d.total} · {shortDay(d.date)}
                        </span>
                        <div
                          className={cn("w-full max-w-7 rounded-t-[5px] transition-colors", last ? "bg-brand-500" : "bg-brand-200 group-hover:bg-brand-300")}
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 ml-11 flex justify-between text-[11px] text-zinc-400">
              <span>{shortDay(daily[0].date)}</span>
              <span>{shortDay(daily[Math.floor(DAYS / 2)].date)}</span>
              <span>{shortDay(daily[DAYS - 1].date)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Próximos agendamentos" {...headerProps} />
          {upcoming.length === 0 && <p className="px-5 py-8 text-center text-sm text-zinc-500">Nenhuma mensagem agendada.</p>}
          <List disablePadding className="divide-y divide-zinc-100">
            {upcoming.slice(0, 5).map((m) => (
              <ListItem key={m.id} className="gap-3 px-5 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-600 ring-1 ring-sky-600/15">
                  <CalendarClock className="size-4" />
                </span>
                <ListItemText
                  className="m-0 min-w-0"
                  primary={m.content}
                  secondary={`${formatDateTime(m.scheduledAt!)} · ${m.contactIds.length} contato${m.contactIds.length > 1 ? "s" : ""}`}
                  slotProps={{ primary: { className: "truncate text-sm font-medium" }, secondary: { className: "text-xs" } }}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </div>

      <Card>
        <CardHeader title="Contatos que mais receberam mensagens" {...headerProps} />
        {ranking.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-zinc-500">Nenhuma mensagem enviada ainda.</p>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Contato</TableCell>
                  <TableCell align="right">Mensagens recebidas</TableCell>
                  <TableCell>Última mensagem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranking.map((c) => (
                  <TableRow key={c.id} hover className="last:[&_td]:border-0">
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell align="right" className="tabular-nums">{c.total}</TableCell>
                    <TableCell className="text-zinc-500">{formatDateTime(c.last)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
}
