import { useState } from "react";
import { Link } from "react-router";
import { Pencil, Plug, Plus, Trash2, Users } from "lucide-react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { FormDialog } from "@/components/ui/FormDialog";
import { ROUTES } from "@/config/routes";
import { CONNECTION_PARAM } from "@/hooks/useSelectedConnection";
import { useConnections } from "@/hooks/useRealtime";
import { createConnection, deleteConnection, updateConnection } from "@/services/api";
import type { Connection } from "@/types";

/** Diálogo aberto: criar (null), editar (Connection) ou fechado (undefined). */
type Editing = Connection | null | undefined;

export default function ConnectionsPage() {
  const { data: connections, loading, error } = useConnections();
  const [editing, setEditing] = useState<Editing>(undefined);
  const [deleting, setDeleting] = useState<Connection | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-title">Conexões</h1>
          <p className="page-subtitle">Cada conexão tem sua própria lista de contatos.</p>
        </div>
        <Button variant="contained" startIcon={<Plus className="size-4" />} onClick={() => setEditing(null)}>
          Nova conexão
        </Button>
      </div>

      {error && <Alert severity="error">Não foi possível carregar as conexões.</Alert>}

      {loading ? (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <Skeleton key={i} variant="rounded" height={88} />
          ))}
        </div>
      ) : connections.length === 0 ? (
        <Card className="flex flex-col items-center px-6 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/15">
            <Plug className="size-6" />
          </span>
          <p className="mt-4 font-semibold">Nenhuma conexão ainda</p>
          <p className="mt-1 text-sm text-zinc-500">Crie uma conexão para começar a cadastrar contatos.</p>
          <Button variant="contained" className="mt-6" startIcon={<Plus className="size-4" />} onClick={() => setEditing(null)}>
            Nova conexão
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {connections.map((c) => (
            <Card key={c.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/15">
                <Plug className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{c.name}</p>
                <p className="mt-0.5 text-sm text-zinc-500">
                  Criada em {c.createdAt ? new Date(c.createdAt).toLocaleDateString("pt-BR") : "—"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  component={Link}
                  to={`${ROUTES.contacts}?${CONNECTION_PARAM}=${c.id}`}
                  variant="outlined"
                  startIcon={<Users className="size-4" />}
                >
                  Contatos
                </Button>
                <Tooltip title="Renomear">
                  <IconButton size="small" className="text-zinc-500" onClick={() => setEditing(c)}>
                    <Pencil className="size-4" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton size="small" className="text-zinc-500 hover:bg-red-50 hover:text-red-600" onClick={() => setDeleting(c)}>
                    <Trash2 className="size-4" />
                  </IconButton>
                </Tooltip>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConnectionDialog editing={editing} onClose={() => setEditing(undefined)} />

      <ConfirmDialog
        open={deleting !== null}
        title="Excluir conexão?"
        description={
          <>
            A conexão <b className="text-zinc-700">{deleting?.name}</b> será excluída junto com todos os seus contatos e
            mensagens. Esta ação não pode ser desfeita.
          </>
        }
        onConfirm={() => deleteConnection({ id: deleting!.id })}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}

function ConnectionDialog({ editing, onClose }: { editing: Editing; onClose: () => void }) {
  const [name, setName] = useState("");

  return (
    <FormDialog
      open={editing !== undefined}
      title={editing ? "Renomear conexão" : "Nova conexão"}
      submitLabel={editing ? "Salvar" : "Criar conexão"}
      canSubmit={name.trim().length > 0}
      onEnter={() => setName(editing?.name ?? "")}
      onSubmit={() => (editing ? updateConnection({ id: editing.id, name }) : createConnection({ name }))}
      onClose={onClose}
    >
      <TextField
        label="Nome"
        placeholder="Ex.: Loja Centro"
        autoFocus
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 200 } }}
      />
    </FormDialog>
  );
}
