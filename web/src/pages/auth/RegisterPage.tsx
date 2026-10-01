import { Link } from "react-router";
import { Check } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { GoogleIcon } from "./GoogleIcon";

export default function RegisterPage() {
  return (
    <>
      <span className="badge badge-brand">14 dias grátis · sem cartão</span>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Crie sua conta</h1>
      <p className="mt-2 text-sm text-zinc-500">Comece a disparar campanhas em minutos.</p>

      <button type="button" className="btn btn-secondary btn-lg mt-8 w-full">
        <GoogleIcon /> Cadastrar com Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200" /> ou <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="name">Nome</label>
            <input id="name" className="input" placeholder="Seu nome" autoComplete="name" />
          </div>
          <div>
            <label className="label" htmlFor="company">Empresa</label>
            <input id="company" className="input" placeholder="Empresa" autoComplete="organization" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="email">E-mail corporativo</label>
          <input id="email" type="email" className="input" placeholder="voce@empresa.com" autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="password">Senha</label>
          <input id="password" type="password" className="input" placeholder="Mínimo 8 caracteres" autoComplete="new-password" />
          <ul className="mt-2 grid grid-cols-2 gap-1 text-xs text-zinc-500">
            {["8+ caracteres", "1 número", "1 letra maiúscula", "1 símbolo"].map((r) => (
              <li key={r} className="flex items-center gap-1.5">
                <Check className="size-3 text-zinc-300" /> {r}
              </li>
            ))}
          </ul>
        </div>
        <label className="flex items-start gap-2 text-sm text-zinc-600">
          <input type="checkbox" className="checkbox mt-0.5" />
          <span>
            Concordo com os <a href="#" className="font-medium text-zinc-900 underline-offset-2 hover:underline">Termos</a> e a{" "}
            <a href="#" className="font-medium text-zinc-900 underline-offset-2 hover:underline">Política de Privacidade</a>.
          </span>
        </label>
        <button type="submit" className="btn btn-primary btn-lg w-full">Criar conta</button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Já tem uma conta?{" "}
        <Link to={ROUTES.login} className="font-medium text-zinc-900 hover:text-brand-600">Entrar</Link>
      </p>
    </>
  );
}
