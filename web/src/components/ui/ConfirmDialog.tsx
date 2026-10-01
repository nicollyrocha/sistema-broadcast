import { useState, type ReactNode } from "react";
import { Trash2 } from "lucide-react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { apiErrorMessage } from "@/services/api";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  onConfirm: () => Promise<unknown>;
  onClose: () => void;
}

/** Confirmação de exclusão: fica aberta (com loading) até a ação terminar; mostra o erro se falhar. */
export function ConfirmDialog({ open, title, description, confirmLabel = "Excluir", onConfirm, onClose }: ConfirmDialogProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setBusy(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setError(apiErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={busy ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ transition: { onExited: () => setError(null) } }}
    >
      <DialogTitle className="flex flex-col gap-4 pb-1">
        <span className="grid size-10 place-items-center rounded-full bg-red-50 text-red-600">
          <Trash2 className="size-5" />
        </span>
        <span className="text-base font-semibold">{title}</span>
      </DialogTitle>
      <DialogContent className="space-y-3 text-sm text-zinc-500">
        <div>{description}</div>
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions className="px-6 pb-5">
        <Button variant="outlined" onClick={onClose} disabled={busy}>
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={busy}>
          {busy ? "Excluindo..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
