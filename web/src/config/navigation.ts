import {
  LayoutDashboard,
  Send,
  Workflow,
  FileText,
  Users,
  ListFilter,
  BarChart3,
  Plug,
  CreditCard,
  Settings,
  Inbox,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "./routes";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
  end?: boolean;
}
export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const APP_NAV: NavGroup[] = [
  {
    items: [
      { label: "Visão geral", to: ROUTES.app, icon: LayoutDashboard, end: true },
      { label: "Caixa de entrada", to: ROUTES.inbox, icon: Inbox, badge: "12" },
    ],
  },
  {
    label: "Envios",
    items: [
      { label: "Campanhas", to: ROUTES.campaigns, icon: Send },
      { label: "Automações", to: ROUTES.automations, icon: Workflow },
      { label: "Templates", to: ROUTES.templates, icon: FileText },
    ],
  },
  {
    label: "Audiência",
    items: [
      { label: "Contatos", to: ROUTES.contacts, icon: Users },
      { label: "Audiências", to: ROUTES.audiences, icon: ListFilter },
    ],
  },
  {
    label: "Análise",
    items: [{ label: "Relatórios", to: ROUTES.reports, icon: BarChart3 }],
  },
];

export const APP_NAV_FOOTER: NavItem[] = [
  { label: "Canais", to: ROUTES.channels, icon: Plug },
  { label: "Assinatura", to: ROUTES.billing, icon: CreditCard },
  { label: "Configurações", to: ROUTES.settings, icon: Settings },
];
