import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import {
  CalendarClock,
  Inbox,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
  X,
} from 'lucide-react'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import { ROUTES } from '@/config/routes'
import { MESSAGE_STATUS_MAP } from '@/config/ui-maps'
import { useContacts, useMessages } from '@/hooks/useRealtime'
import { useSelectedConnection } from '@/hooks/useSelectedConnection'
import {
  apiErrorMessage,
  deleteMessage,
  sendMessage,
  updateMessage,
} from '@/services/api'
import type { Contact, Message } from '@/types'
import { cn, formatDateTime, formatPhone, initials } from '@/lib/format'

type Filter = 'all' | 'sent' | 'scheduled'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'sent', label: 'Enviadas' },
  { key: 'scheduled', label: 'Agendadas' },
]

export default function InboxPage() {
  const [params, setParams] = useSearchParams()
  const { connections, selected: connection, select } = useSelectedConnection()
  /* Tempo real (onSnapshot): quando o processScheduledMessages marca uma
  mensagem como enviada, a lista atualiza sozinha. */
  const { data: messages } = useMessages(connection?.id)
  const { data: contacts } = useContacts(connection?.id)

  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Message | null>(null)
  const [deleting, setDeleting] = useState<Message | null>(null)
  const composerOpen = params.has('nova') || editing !== null

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    return messages.filter(
      (m) =>
        (filter === 'all' || m.status === filter) &&
        m.content.toLowerCase().includes(term),
    )
  }, [messages, filter, search])

  const openComposer = () => {
    params.set('nova', '1')
    setParams(params)
  }
  const closeComposer = () => {
    setEditing(null)
    params.delete('nova')
    params.delete('contatos')
    setParams(params, { replace: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Caixa de entrada</h1>
          <p className="page-subtitle">
            Todas as mensagens que você enviou ou agendou.
          </p>
        </div>
        <TextField
          select
          label="Conexão"
          className="sm:w-56"
          value={connection?.id ?? ''}
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

      {!connection && (
        <Alert severity="info">
          Crie uma conexão em{' '}
          <Link to={ROUTES.connections} className="font-medium underline">
            Conexões
          </Link>{' '}
          para começar a enviar mensagens.
        </Alert>
      )}

      {/* Filtros */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <ToggleButtonGroup
          exclusive
          size="small"
          value={filter}
          onChange={(_, v: Filter | null) => v && setFilter(v)}
          className="gap-1 rounded-[10px] bg-zinc-200/60 p-1"
        >
          {FILTERS.map((f) => {
            const count =
              f.key === 'all'
                ? messages.length
                : messages.filter((m) => m.status === f.key).length
            return (
              <ToggleButton
                key={f.key}
                value={f.key}
                className={cn(
                  'm-0 h-8 gap-2 rounded-md border-0 px-3 text-sm font-medium text-zinc-500 normal-case hover:bg-transparent hover:text-zinc-900',
                  'aria-pressed:bg-white aria-pressed:text-zinc-900 aria-pressed:shadow-card aria-pressed:hover:bg-white',
                )}
              >
                {f.label}
                <span
                  className={cn(
                    'min-w-5 rounded-full px-1.5 text-xs tabular-nums',
                    filter === f.key
                      ? 'bg-brand-50 text-brand-700'
                      : 'bg-zinc-300/50',
                  )}
                >
                  {count}
                </span>
              </ToggleButton>
            )
          })}
        </ToggleButtonGroup>

        <TextField
          className="sm:w-72"
          placeholder="Buscar mensagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="size-4 text-zinc-400" />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      {/* Lista de mensagens */}
      {visible.length === 0 ? (
        <Card className="flex flex-col items-center px-6 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/15">
            <Inbox className="size-6" />
          </span>
          <p className="mt-4 font-semibold">
            {messages.length === 0
              ? 'Nenhuma mensagem ainda'
              : 'Nenhuma mensagem neste filtro'}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Crie sua primeira mensagem para enviar ou agendar.
          </p>
          <Button
            variant="contained"
            className="mt-6"
            startIcon={<Plus className="size-4" />}
            onClick={openComposer}
            disabled={!connection}
          >
            Nova mensagem
          </Button>
        </Card>
      ) : (
        <Card component="ul" className="divide-y divide-zinc-100">
          {visible.map((m) => {
            const st = MESSAGE_STATUS_MAP[m.status]
            const recipients = contacts.filter((c) =>
              m.contactIds.includes(c.id),
            )
            const date = m.status === 'scheduled' ? m.scheduledAt : m.sentAt
            return (
              <li
                key={m.id}
                className="group flex flex-col gap-4 p-5 transition hover:bg-zinc-50/60 sm:flex-row sm:items-start"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Chip
                      size="small"
                      variant="outlined"
                      color={st.color}
                      className={st.className}
                      icon={<st.icon className="size-3" />}
                      label={st.label}
                    />
                    {date && (
                      <span className="text-zinc-500">
                        {m.status === 'scheduled' ? 'para ' : 'em '}
                        {formatDateTime(date)}
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 line-clamp-2 text-sm text-zinc-800">
                    {m.content}
                  </p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <AvatarGroup
                      max={4}
                      spacing={6}
                      className="[&_.MuiAvatar-root]:size-7 [&_.MuiAvatar-root]:border-2 [&_.MuiAvatar-root]:border-white [&_.MuiAvatar-root]:bg-zinc-100 [&_.MuiAvatar-root]:text-[10px] [&_.MuiAvatar-root]:text-zinc-600"
                    >
                      {recipients.map((c) => (
                        <Avatar key={c.id}>{initials(c.name)}</Avatar>
                      ))}
                    </AvatarGroup>
                    <span className="text-xs text-zinc-500">
                      {recipients.length === 1
                        ? recipients[0].name
                        : `${m.contactIds.length} contatos`}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                  {/* Só mensagens agendadas podem ser editadas */}
                  {m.status === 'scheduled' && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Pencil className="size-3.5" />}
                      onClick={() => setEditing(m)}
                    >
                      Editar
                    </Button>
                  )}
                  <Tooltip title="Excluir">
                    <IconButton
                      size="small"
                      className="text-zinc-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => setDeleting(m)}
                    >
                      <Trash2 className="size-4" />
                    </IconButton>
                  </Tooltip>
                </div>
              </li>
            )
          })}
        </Card>
      )}

      {connection && (
        <>
          <Composer
            open={composerOpen}
            connectionId={connection.id}
            contacts={contacts}
            message={editing}
            initialContactIds={params.get('contatos')?.split(',') ?? []}
            onClose={closeComposer}
          />
          <DeleteDialog
            open={deleting !== null}
            onConfirm={() =>
              deleteMessage({ connectionId: connection.id, id: deleting!.id })
            }
            onClose={() => setDeleting(null)}
          />
        </>
      )}
    </div>
  )
}

/* ───────── Painel: nova / editar mensagem ───────── */

/** ISO → "2026-10-02" e "08:00" no fuso local (para os inputs date/time) */
function toLocalInputs(iso?: string) {
  if (!iso) return { date: '', time: '' }
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  }
}

function Composer({
  open,
  connectionId,
  contacts,
  message,
  initialContactIds,
  onClose,
}: {
  open: boolean
  connectionId: string
  contacts: Contact[]
  message: Message | null
  initialContactIds: string[]
  onClose: () => void
}) {
  const [mode, setMode] = useState<'now' | 'schedule'>('now')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Preenche o formulário toda vez que o painel abre
  function reset() {
    const when = toLocalInputs(message?.scheduledAt)
    setMode(message?.status === 'scheduled' ? 'schedule' : 'now')
    setSelectedIds(message?.contactIds ?? initialContactIds)
    setContent(message?.content ?? '')
    setDate(when.date)
    setTime(when.time)
    setSearch('')
    setError(null)
  }

  const selected = contacts.filter((c) => selectedIds.includes(c.id))
  const listed = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.trim().toLowerCase()),
  )
  const allSelected = contacts.length > 0 && selected.length === contacts.length

  const toggle = (id: string) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    )

  const scheduledAt =
    mode === 'schedule' && date && time ? new Date(`${date}T${time}`) : null
  const scheduleInvalid =
    mode === 'schedule' && (!scheduledAt || scheduledAt <= new Date())
  const canSubmit =
    selected.length > 0 && content.trim() !== '' && !scheduleInvalid && !saving

  // Grava no Firestore via Cloud Function: sem data = enviada, com data = agendada
  async function submit() {
    setSaving(true)
    setError(null)
    try {
      const input = {
        connectionId,
        content,
        contactIds: selected.map((c) => c.id),
        scheduledAt: scheduledAt?.toISOString(),
      }
      if (message) await updateMessage({ ...input, id: message.id })
      else await sendMessage(input)
      onClose()
    } catch (e) {
      setError(apiErrorMessage(e))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { className: 'w-full max-w-xl' },
        transition: { onEnter: reset },
      }}
    >
      <header className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
        <div>
          <h2 className="font-semibold">
            {message ? 'Editar mensagem' : 'Nova mensagem'}
          </h2>
          <p className="text-xs text-zinc-500">
            Escolha os contatos, escreva e envie ou agende.
          </p>
        </div>
        <IconButton onClick={onClose} aria-label="Fechar">
          <X className="size-5" />
        </IconButton>
      </header>

      <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
        {error && <Alert severity="error">{error}</Alert>}

        {/* 1. Contatos */}
        <section>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-zinc-700">
              Destinatários
            </p>
            <Button
              size="small"
              className="h-auto px-1 text-xs"
              onClick={() =>
                setSelectedIds(allSelected ? [] : contacts.map((c) => c.id))
              }
            >
              {allSelected ? 'Limpar seleção' : 'Selecionar todos'}
            </Button>
          </div>

          {selected.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.map((c) => (
                <Chip
                  key={c.id}
                  size="small"
                  label={c.name}
                  onDelete={() => toggle(c.id)}
                  deleteIcon={<X className="size-3.5" />}
                  className="h-7 rounded-full bg-brand-50 pr-0.5 text-brand-800 ring-1 ring-brand-500/15 [&_.MuiChip-deleteIcon]:mr-1.5 [&_.MuiChip-deleteIcon]:text-brand-400 [&_.MuiChip-deleteIcon:hover]:text-brand-700"
                />
              ))}
            </div>
          )}

          <Card className="mt-3">
            <TextField
              placeholder="Buscar contato..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="[&_fieldset]:border-0 [&_.MuiOutlinedInput-root]:rounded-none [&_.Mui-focused]:shadow-none"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="size-4 text-zinc-400" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <List
              dense
              disablePadding
              className="max-h-56 overflow-y-auto border-t border-zinc-100"
            >
              {listed.map((c) => (
                <ListItemButton
                  key={c.id}
                  className="gap-3 px-3"
                  onClick={() => toggle(c.id)}
                >
                  <Checkbox
                    size="small"
                    edge="start"
                    disableRipple
                    checked={selectedIds.includes(c.id)}
                    tabIndex={-1}
                    className="p-0"
                  />
                  <Avatar className="size-7 bg-zinc-100 text-[10px] font-semibold text-zinc-600">
                    {initials(c.name)}
                  </Avatar>
                  <ListItemText
                    primary={c.name}
                    secondary={formatPhone(c.phone)}
                    slotProps={{
                      primary: { className: 'truncate text-sm font-medium' },
                      secondary: { className: 'text-xs tabular-nums' },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Card>
          <p className="mt-1.5 text-xs text-zinc-500">
            {selected.length} de {contacts.length} contatos selecionados
          </p>
        </section>

        {/* 2. Mensagem */}
        <section>
          <TextField
            label="Mensagem"
            placeholder="Escreva sua mensagem..."
            multiline
            minRows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            helperText={
              <span className="flex justify-between">
                <span>
                  A mensagem será enviada individualmente para cada contato.
                </span>
                <span className="tabular-nums">{content.length}/1000</span>
              </span>
            }
            slotProps={{
              formHelperText: { className: 'mx-0' },
              htmlInput: { maxLength: 1000 },
            }}
          />
        </section>

        {/* 3. Quando enviar */}
        <section>
          <p className="mb-2 text-[13px] font-medium text-zinc-700">
            Quando enviar
          </p>
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={mode}
            onChange={(_, v) => v && setMode(v)}
            className="grid gap-3 sm:grid-cols-2"
          >
            {[
              {
                key: 'now',
                icon: Send,
                title: 'Enviar agora',
                desc: 'O envio começa imediatamente',
              },
              {
                key: 'schedule',
                icon: CalendarClock,
                title: 'Agendar',
                desc: 'Escolha data e horário',
              },
            ].map(({ key, icon: Icon, title, desc }) => (
              <ToggleButton
                key={key}
                value={key}
                className={cn(
                  'm-0 justify-start gap-3 rounded-xl border p-4 text-left normal-case',
                  'border-zinc-200 text-zinc-900 hover:border-zinc-300',
                  'aria-pressed:border-brand-500 aria-pressed:bg-brand-50/50 aria-pressed:ring-4 aria-pressed:ring-brand-500/10',
                )}
              >
                <Icon
                  className={cn(
                    'size-5 self-start',
                    mode === key ? 'text-brand-600' : 'text-zinc-400',
                  )}
                />
                <span>
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block text-xs font-normal text-zinc-500">
                    {desc}
                  </span>
                </span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {mode === 'schedule' && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <TextField
                label="Data"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Horário"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <p
                className={cn(
                  'col-span-2 text-xs',
                  date && time && scheduleInvalid
                    ? 'text-red-600'
                    : 'text-zinc-500',
                )}
              >
                {date && time && scheduleInvalid
                  ? 'Escolha uma data e horário no futuro.'
                  : 'Fuso horário: (GMT-03:00) São Paulo'}
              </p>
            </div>
          )}
        </section>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t border-zinc-100 px-6 py-4">
        <Button color="inherit" className="text-zinc-600" onClick={onClose}>
          Cancelar
        </Button>
        {mode === 'now' ? (
          <Button
            variant="contained"
            startIcon={<Send className="size-4" />}
            disabled={!canSubmit}
            onClick={submit}
          >
            {saving ? 'Enviando...' : 'Enviar agora'}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<CalendarClock className="size-4" />}
            disabled={!canSubmit}
            onClick={submit}
          >
            {saving
              ? 'Salvando...'
              : message
                ? 'Salvar agendamento'
                : 'Agendar envio'}
          </Button>
        )}
      </footer>
    </Drawer>
  )
}

/* ───────── Confirmação de exclusão ───────── */

function DeleteDialog({
  open,
  onConfirm,
  onClose,
}: {
  open: boolean
  onConfirm: () => Promise<unknown>
  onClose: () => void
}) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setDeleting(true)
    setError(null)
    try {
      await onConfirm()
      onClose()
    } catch (e) {
      setError(apiErrorMessage(e))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="flex flex-col gap-4 pb-1">
        <span className="grid size-10 place-items-center rounded-full bg-red-50 text-red-600">
          <Trash2 className="size-5" />
        </span>
        <span className="text-base font-semibold">Excluir mensagem?</span>
      </DialogTitle>
      <DialogContent className="space-y-3 text-sm text-zinc-500">
        <p>
          Esta ação não pode ser desfeita. Se a mensagem estiver agendada, ela
          não será mais enviada.
        </p>
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions className="px-6 pb-5">
        <Button variant="outlined" onClick={onClose} disabled={deleting}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Excluindo...' : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
