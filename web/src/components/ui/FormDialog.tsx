import { useState, type FormEvent, type ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { apiErrorMessage } from "@/services/api";

interface FormDialogProps {
  open: boolean;
  title: string;
  submitLabel: string;
  canSubmit?: boolean;
  onSubmit: () => Promise<unknown>;
  onClose: () => void;
  /** Chamado quando o dialog termina de abrir — bom para preencher os campos. */
  onEnter?: () => void;
  children: ReactNode;
}

/** Dialog com formulário: trava enquanto salva, fecha no sucesso e mostra o erro da function. */
export function FormDialog({ open, title, submitLabel, canSubmit = true, onSubmit, onClose, onEnter, children }: FormDialogProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    setBusy(true);
    setError(null);
    try {
      await onSubmit();
      onClose();
    } catch (err) {
      setError(apiErrorMessage(err));
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
      slotProps={{
        paper: { component: "form", onSubmit: handleSubmit, noValidate: true } as object,
        transition: { onEnter: () => (setError(null), onEnter?.()) },
      }}
    >
      <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
      <DialogContent className="space-y-4 pt-1!">
        {error && <Alert severity="error">{error}</Alert>}
        {children}
      </DialogContent>
      <DialogActions className="px-6 pb-5">
        <Button variant="outlined" onClick={onClose} disabled={busy}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={!canSubmit || busy}>
          {busy ? "Salvando..." : submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
