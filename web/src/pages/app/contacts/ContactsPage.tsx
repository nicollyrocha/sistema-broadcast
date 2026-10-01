import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import {
  Pencil,
  Plug,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { FormDialog } from '@/components/ui/FormDialog'
import { ROUTES } from '@/config/routes'
import { useContacts } from '@/hooks/useRealtime'
import {
  CONNECTION_PARAM,
  useSelectedConnection,
} from '@/hooks/useSelectedConnection'
import { createContact, deleteContact, updateContact } from '@/services/api'
import { formatPhone, initials } from '@/lib/format'
import type { Contact } from '@/types'

/** Diálogo aberto: criar (null), editar (Contact) ou fechado (undefined). */
type Editing = Contact | null | undefined

export default function ContactsPage() {
  const {
    connections,
    loading: loadingConnections,
    selected: connection,
    select,
  } = useSelectedConnection()
  const {
    data: contacts,
    loading: loadingContacts,
    error,
  } = useContacts(connection?.id)

  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [editing, setEditing] = useState<Editing>(undefined)
  const [deleting, setDeleting] = useState<Contact | null>(null)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    const digits = term.replace(/\D/g, '')
    if (!term) return contacts
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        (digits && c.phone.includes(digits)),
    )
  }, [contacts, search])

  // Seleção só vale para contatos que ainda existem na conexão atual.
  const selection = selectedIds.filter((id) =>
    contacts.some((c) => c.id === id),
  )
  const allChecked =
    filtered.length > 0 && filtered.every((c) => selection.includes(c.id))
  const someChecked = filtered.some((c) => selection.includes(c.id))

  const toggle = (id: string) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    )
  const toggleAll = () =>
    setSelectedIds(
      allChecked
        ? selection.filter((id) => !filtered.some((c) => c.id === id))
        : [...new Set([...selection, ...filtered.map((c) => c.id)])],
    )

  function changeConnection(id: string) {
    setSelectedIds([])
    setSearch('')
    select(id)
  }

  if (!loadingConnections && connections.length === 0) {
    return (
      <div className="space-y-6">
        <Header />
        <Card className="flex flex-col items-center px-6 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/15">
            <Plug className="size-6" />
          </span>
          <p className="mt-4 font-semibold">Crie uma conexão primeiro</p>
          <p className="mt-1 text-sm text-zinc-500">
            Os contatos ficam dentro de uma conexão.
          </p>
          <Button
            component={Link}
            to={ROUTES.connections}
            variant="contained"
            className="mt-6"
            startIcon={<Plus className="size-4" />}
          >
            Nova conexão
          </Button>
        </Card>
      </div>
    )
  }

  const loading = loadingConnections || loadingContacts

  return (
    <div className="space-y-6">
      <Header
        subtitle={
          connection && !loading
            ? `${contacts.length} ${contacts.length === 1 ? 'contato' : 'contatos'} em ${connection.name}`
            : undefined
        }
        actions={
          <Button
            variant="contained"
            startIcon={<Plus className="size-4" />}
            disabled={!connection}
            onClick={() => setEditing(null)}
          >
            Novo contato
          </Button>
        }
      />

      {error && (
        <Alert severity="error">Não foi possível carregar os contatos.</Alert>
      )}

      <Card>
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 sm:flex-row items-end">
          <TextField
            select
            label="Conexão"
            className="sm:w-60"
            value={connection?.id ?? ''}
            onChange={(e) => changeConnection(e.target.value)}
            disabled={loadingConnections}
          >
            {connections.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="sm:max-w-sm"
            placeholder="Buscar por nome ou telefone..."
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

        {loading ? (
          <div className="space-y-2 p-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} variant="rounded" height={44} />
            ))}
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/15">
              <Users className="size-6" />
            </span>
            <p className="mt-4 font-semibold">Nenhum contato nesta conexão</p>
            <p className="mt-1 text-sm text-zinc-500">
              Adicione o primeiro contato de {connection?.name}.
            </p>
            <Button
              variant="contained"
              className="mt-6"
              startIcon={<Plus className="size-4" />}
              onClick={() => setEditing(null)}
            >
              Novo contato
            </Button>
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={allChecked}
                      indeterminate={someChecked && !allChecked}
                      onChange={toggleAll}
                      slotProps={{
                        input: { 'aria-label': 'Selecionar todos' },
                      }}
                    />
                  </TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Adicionado em</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-sm text-zinc-500"
                    >
                      Nenhum contato encontrado para “{search}”.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((c) => {
                  const checked = selection.includes(c.id)
                  return (
                    <TableRow
                      key={c.id}
                      hover
                      selected={checked}
                      className="group [&.Mui-selected]:bg-brand-50/50 last:[&_td]:border-0"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          size="small"
                          checked={checked}
                          onChange={() => toggle(c.id)}
                          slotProps={{
                            input: { 'aria-label': `Selecionar ${c.name}` },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8 bg-zinc-100 text-xs font-semibold text-zinc-600">
                            {initials(c.name)}
                          </Avatar>
                          <span className="font-medium text-zinc-900">
                            {c.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap tabular-nums">
                        {formatPhone(c.phone)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-zinc-500">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString('pt-BR')
                          : '—'}
                      </TableCell>
                      <TableCell align="right" className="whitespace-nowrap">
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            className="text-zinc-500"
                            onClick={() => setEditing(c)}
                          >
                            <Pencil className="size-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton
                            size="small"
                            className="text-zinc-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => setDeleting(c)}
                          >
                            <Trash2 className="size-4" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Barra de ação da seleção */}
      {connection && selection.length > 0 && (
        <Paper
          elevation={8}
          className="sticky bottom-6 z-10 mx-auto flex w-fit items-center gap-3 rounded-2xl bg-zinc-900 py-2 pr-2 pl-4 text-sm text-white"
        >
          <span>
            <b className="tabular-nums">{selection.length}</b>{' '}
            {selection.length === 1 ? 'selecionado' : 'selecionados'}
          </span>
          <Button
            size="small"
            color="inherit"
            className="text-zinc-300 hover:bg-white/10"
            startIcon={<X className="size-3.5" />}
            onClick={() => setSelectedIds([])}
          >
            Limpar
          </Button>
          <Button
            component={Link}
            to={`${ROUTES.inbox}?nova=1&${CONNECTION_PARAM}=${connection.id}&contatos=${selection.join(',')}`}
            size="small"
            variant="contained"
            startIcon={<Send className="size-3.5" />}
          >
            Enviar mensagem
          </Button>
        </Paper>
      )}

      {connection && (
        <>
          <ContactDialog
            connectionId={connection.id}
            editing={editing}
            onClose={() => setEditing(undefined)}
          />
          <ConfirmDialog
            open={deleting !== null}
            title="Excluir contato?"
            description={
              <>
                <b className="text-zinc-700">{deleting?.name}</b> será removido
                de {connection.name}. Esta ação não pode ser desfeita.
              </>
            }
            onConfirm={() =>
              deleteContact({ connectionId: connection.id, id: deleting!.id })
            }
            onClose={() => setDeleting(null)}
          />
        </>
      )}
    </div>
  )
}

function Header({
  subtitle,
  actions,
}: {
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="page-title">Contatos</h1>
        <p className="page-subtitle">
          {subtitle ?? 'Gerencie os contatos de cada conexão.'}
        </p>
      </div>
      {actions}
    </div>
  )
}

function ContactDialog({
  connectionId,
  editing,
  onClose,
}: {
  connectionId: string
  editing: Editing
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const digits = phone.replace(/\D/g, '')
  const phoneValid = digits.length >= 10 && digits.length <= 13

  return (
    <FormDialog
      open={editing !== undefined}
      title={editing ? 'Editar contato' : 'Novo contato'}
      submitLabel={editing ? 'Salvar' : 'Adicionar contato'}
      canSubmit={name.trim().length > 0 && phoneValid}
      onEnter={() => {
        setName(editing?.name ?? '')
        setPhone(editing ? formatPhone(editing.phone) : '')
      }}
      onSubmit={() =>
        editing
          ? updateContact({ connectionId, id: editing.id, name, phone })
          : createContact({ connectionId, name, phone })
      }
      onClose={onClose}
    >
      <TextField
        label="Nome"
        autoFocus
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 200 } }}
      />
      <TextField
        label="Telefone"
        placeholder="(11) 98812-3401"
        type="tel"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={phone.length > 0 && !phoneValid}
        helperText={
          phone.length > 0 && !phoneValid
            ? 'Informe DDD + número (10 a 13 dígitos).'
            : 'Com DDD. O código do país é opcional.'
        }
        slotProps={{ formHelperText: { className: 'mx-0' } }}
      />
    </FormDialog>
  )
}
