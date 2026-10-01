import { NavLink } from "react-router";
import { ChevronsUpDown, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { APP_NAV, APP_NAV_FOOTER, type NavItem } from "@/config/navigation";
import { cn } from "@/lib/format";

function Item({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <NavLink to={item.to} end={item.end} onClick={onNavigate} className={({ isActive }) => cn("nav-item", isActive && "active")}>
      <Icon />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className="rounded-md bg-brand-500 px-1.5 py-px text-[11px] font-semibold text-white">{item.badge}</span>
      )}
    </NavLink>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col border-r border-zinc-200/80 bg-zinc-50">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      {/* Seletor de workspace */}
      <div className="px-3">
        <button className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white p-2 text-left shadow-card transition hover:border-zinc-300">
          <span className="grid size-8 place-items-center rounded-lg bg-zinc-900 text-xs font-semibold text-white">LE</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-zinc-900">Loja Exemplo</span>
            <span className="block text-xs text-zinc-500">Plano Growth</span>
          </span>
          <ChevronsUpDown className="size-4 text-zinc-400" />
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {APP_NAV.map((group, i) => (
          <div key={group.label ?? i}>
            {group.label && (
              <p className="mb-1.5 px-2.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">{group.label}</p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <Item key={item.to} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-3 border-t border-zinc-200/80 p-3">
        {/* Uso do plano */}
        <div className="rounded-xl border border-zinc-200 bg-white p-3.5 shadow-card">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-700">Mensagens no mês</span>
            <span className="text-zinc-500">68%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full w-[68%] rounded-full bg-brand-500" />
          </div>
          <p className="mt-2 text-xs text-zinc-500">34.120 de 50.000</p>
          <button className="btn btn-sm btn-dark mt-3 w-full">
            <Sparkles /> Fazer upgrade
          </button>
        </div>

        <div className="space-y-0.5">
          {APP_NAV_FOOTER.map((item) => (
            <Item key={item.to} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </aside>
  );
}
