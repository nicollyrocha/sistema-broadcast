import { Link } from "react-router";
import { ArrowLeft, KeyRound } from "lucide-react";
import { ROUTES } from "@/config/routes";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="grid size-12 place-items-center rounded-xl border border-zinc-200 bg-white shadow-card">
        <KeyRound className="size-5 text-brand-500" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">Esqueceu sua senha?</h1>
      <p className="mt-2 text-sm text-zinc-500">Informe seu e-mail e enviaremos um link para redefinir.</p>

      <form className="mt-8 space-y-4">
        <div>
          <label className="label" htmlFor="email">E-mail</label>
          <input id="email" type="email" className="input" placeholder="voce@empresa.com" autoComplete="email" />
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-full">Enviar link de redefinição</button>
      </form>

      <Link to={ROUTES.login} className="btn btn-ghost mt-6 w-full">
        <ArrowLeft /> Voltar para o login
      </Link>
    </>
  );
}
