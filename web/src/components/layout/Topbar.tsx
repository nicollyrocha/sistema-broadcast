import { Link } from "react-router";
import { Bell, HelpCircle, Menu, Plus, Search } from "lucide-react";
import { ROUTES } from "@/config/routes";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button className="btn btn-ghost btn-icon lg:hidden" onClick={onMenuClick} aria-label="Abrir menu">
          <Menu />
        </button>

        <label className="relative hidden max-w-md flex-1 sm:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
          <input className="input h-9 bg-zinc-50 pr-14 pl-9 shadow-none" placeholder="Buscar campanhas, contatos..." />
          <span className="kbd absolute top-1/2 right-2.5 -translate-y-1/2">Ctrl K</span>
        </label>

        <div className="ml-auto flex items-center gap-1">
          <button className="btn btn-ghost btn-icon" aria-label="Ajuda">
            <HelpCircle />
          </button>
          <button className="btn btn-ghost btn-icon relative" aria-label="Notificações">
            <Bell />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-brand-500 ring-2 ring-white" />
          </button>
          <Link to={ROUTES.campaignNew} className="btn btn-primary ml-2 hidden sm:inline-flex">
            <Plus /> Nova campanha
          </Link>
          <button className="ml-2 flex items-center gap-2 rounded-full p-0.5 transition hover:bg-zinc-100" aria-label="Conta">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-semibold text-white">
              NC
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
