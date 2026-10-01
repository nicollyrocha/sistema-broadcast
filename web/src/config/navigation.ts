import { BarChart3, Inbox, Plug, Settings, Users, type LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const APP_NAV: NavItem[] = [
  { label: "Caixa de entrada", to: ROUTES.inbox, icon: Inbox },
  { label: "Conexões", to: ROUTES.connections, icon: Plug },
  { label: "Contatos", to: ROUTES.contacts, icon: Users },
  { label: "Relatórios", to: ROUTES.reports, icon: BarChart3 },
];

export const APP_NAV_FOOTER: NavItem[] = [
  { label: "Configurações", to: ROUTES.settings, icon: Settings },
];
