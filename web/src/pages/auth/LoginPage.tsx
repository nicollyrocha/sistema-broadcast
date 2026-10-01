import { useState, type FormEvent } from "react";
import { Link as RouterLink } from "react-router";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { ROUTES } from "@/config/routes";
import { authErrorMessage, signIn, signInWithGoogle } from "@/services/auth";
import { GoogleIcon } from "./GoogleIcon";

// O redirecionamento após o login é feito pelo AuthLayout, quando o usuário aparece no AuthContext.
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function run(action: () => Promise<unknown>) {
    setError(null);
    setSubmitting(true);
    try {
      await action();
    } catch (e) {
      setError(authErrorMessage(e));
      setSubmitting(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    run(() => signIn(email, password, remember));
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
      <p className="mt-2 text-sm text-zinc-500">Entre na sua conta para continuar.</p>

      <Button
        variant="outlined"
        size="large"
        fullWidth
        className="mt-8"
        startIcon={<GoogleIcon />}
        disabled={submitting}
        onClick={() => run(signInWithGoogle)}
      >
        Continuar com Google
      </Button>

      <Divider className="my-6 text-xs text-zinc-400">ou com e-mail</Divider>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="E-mail"
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <FormControlLabel
            control={<Checkbox size="small" checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
            label="Manter conectado"
            slotProps={{ typography: { className: "text-sm text-zinc-600" } }}
          />
          <Link component={RouterLink} to={ROUTES.forgotPassword} underline="hover" className="text-[13px] font-medium">
            Esqueceu a senha?
          </Link>
        </div>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={submitting || !email.trim() || !password}
        >
          {submitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Ainda não tem conta?{" "}
        <Link component={RouterLink} to={ROUTES.register} underline="hover" className="font-medium text-zinc-900">
          Crie grátis
        </Link>
      </p>
    </>
  );
}
