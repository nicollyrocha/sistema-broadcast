import { useState, type FormEvent } from "react";
import { Link as RouterLink } from "react-router";
import { Check } from "lucide-react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/format";
import { authErrorMessage, signInWithGoogle, signUp } from "@/services/auth";
import { GoogleIcon } from "./GoogleIcon";

const PASSWORD_RULES: { label: string; test: (p: string) => boolean }[] = [
  { label: "8+ caracteres", test: (p) => p.length >= 8 },
  { label: "1 número", test: (p) => /\d/.test(p) },
  { label: "1 letra maiúscula", test: (p) => /[A-Z]/.test(p) },
  { label: "1 símbolo", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

// O redirecionamento após o cadastro é feito pelo AuthLayout, quando o usuário aparece no AuthContext.
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const passwordOk = PASSWORD_RULES.every((r) => r.test(password));
  const canSubmit = name.trim() && email.trim() && passwordOk && accepted && !submitting;

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
    if (canSubmit) run(() => signUp(name, email, password));
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
      <p className="mt-2 text-sm text-zinc-500">Comece a enviar mensagens em minutos.</p>

      <Button
        variant="outlined"
        size="large"
        fullWidth
        className="mt-8"
        startIcon={<GoogleIcon />}
        disabled={submitting}
        onClick={() => run(signInWithGoogle)}
      >
        Cadastrar com Google
      </Button>

      <Divider className="my-6 text-xs text-zinc-400">ou</Divider>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Nome" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          label="E-mail"
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <TextField
            label="Senha"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ul className="mt-2 grid grid-cols-2 gap-1 text-xs text-zinc-500">
            {PASSWORD_RULES.map((r) => {
              const ok = r.test(password);
              return (
                <li key={r.label} className={cn("flex items-center gap-1.5", ok && "text-emerald-600")}>
                  <Check className={cn("size-3", ok ? "text-emerald-500" : "text-zinc-300")} /> {r.label}
                </li>
              );
            })}
          </ul>
        </div>
        <FormControlLabel
          className="items-start"
          control={
            <Checkbox
              size="small"
              className="-mt-1.5"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
          }
          slotProps={{ typography: { className: "text-sm text-zinc-600" } }}
          label={
            <>
              Concordo com os <Link href="#" underline="hover" className="font-medium text-zinc-900">Termos</Link> e a{" "}
              <Link href="#" underline="hover" className="font-medium text-zinc-900">Política de Privacidade</Link>.
            </>
          }
        />
        <Button type="submit" variant="contained" size="large" fullWidth disabled={!canSubmit}>
          {submitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Já tem uma conta?{" "}
        <Link component={RouterLink} to={ROUTES.login} underline="hover" className="font-medium text-zinc-900">
          Entrar
        </Link>
      </p>
    </>
  );
}
