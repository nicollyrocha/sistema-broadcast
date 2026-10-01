import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, KeyRound } from "lucide-react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { ROUTES } from "@/config/routes";
import { authErrorMessage, resetPassword } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    try {
      await resetPassword(email);
      setStatus("sent");
    } catch (err) {
      setError(authErrorMessage(err));
      setStatus("idle");
    }
  }

  return (
    <>
      <Paper variant="outlined" className="grid size-12 place-items-center rounded-xl shadow-card">
        <KeyRound className="size-5 text-brand-500" />
      </Paper>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">Esqueceu sua senha?</h1>
      <p className="mt-2 text-sm text-zinc-500">Informe seu e-mail e enviaremos um link para redefinir.</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
        {error && <Alert severity="error">{error}</Alert>}
        {status === "sent" && (
          <Alert severity="success">Se houver uma conta com este e-mail, você receberá o link em instantes.</Alert>
        )}
        <TextField
          label="E-mail"
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" size="large" fullWidth disabled={status === "sending" || !email.trim()}>
          {status === "sending" ? "Enviando..." : "Enviar link de redefinição"}
        </Button>
      </form>

      <Button component={Link} to={ROUTES.login} color="inherit" fullWidth className="mt-6 text-zinc-600" startIcon={<ArrowLeft className="size-4" />}>
        Voltar para o login
      </Button>
    </>
  );
}
