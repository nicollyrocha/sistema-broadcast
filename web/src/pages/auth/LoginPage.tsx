import { Link } from "react-router";
import { ROUTES } from "@/config/routes";
import { GoogleIcon } from "./GoogleIcon";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
      <p className="mt-2 text-sm text-zinc-500">Entre na sua conta para continuar.</p>

      <button type="button" className="btn btn-secondary btn-lg mt-8 w-full">
        <GoogleIcon /> Continuar com Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200" /> ou com e-mail <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <form className="space-y-4">
        <div>
          <label className="label" htmlFor="email">E-mail</label>
          <input id="email" type="email" className="input" placeholder="voce@empresa.com" autoComplete="email" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="label" htmlFor="password">Senha</label>
            <Link to={ROUTES.forgotPassword} className="mb-1.5 text-[13px] font-medium text-brand-600 hover:text-brand-700">
              Esqueceu a senha?
            </Link>
          </div>
          <input id="password" type="password" className="input" placeholder="••••••••" autoComplete="current-password" />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-600">
          <input type="checkbox" className="checkbox" /> Manter conectado
        </label>
        <button type="submit" className="btn btn-primary btn-lg w-full">Entrar</button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Ainda não tem conta?{" "}
        <Link to={ROUTES.register} className="font-medium text-zinc-900 hover:text-brand-600">Crie grátis</Link>
      </p>
    </>
  );
}
