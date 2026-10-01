import { Mail, MessageCircle, Smartphone, type LucideIcon } from "lucide-react";
import type { CampaignStatus, Channel, Contact } from "@/types";

export const CHANNEL_MAP: Record<Channel, { label: string; icon: LucideIcon; className: string }> = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle, className: "bg-emerald-50 text-emerald-600 ring-emerald-600/15" },
  email: { label: "E-mail", icon: Mail, className: "bg-sky-50 text-sky-600 ring-sky-600/15" },
  sms: { label: "SMS", icon: Smartphone, className: "bg-violet-50 text-violet-600 ring-violet-600/15" },
};

export const CAMPAIGN_STATUS_MAP: Record<CampaignStatus, { label: string; className: string }> = {
  draft: { label: "Rascunho", className: "badge-neutral" },
  scheduled: { label: "Agendada", className: "badge-info" },
  sending: { label: "Enviando", className: "badge-brand" },
  sent: { label: "Enviada", className: "badge-success" },
  paused: { label: "Pausada", className: "badge-warning" },
  failed: { label: "Falhou", className: "badge-danger" },
};

export const CONTACT_STATUS_MAP: Record<Contact["status"], { label: string; className: string }> = {
  subscribed: { label: "Inscrito", className: "badge-success" },
  unsubscribed: { label: "Descadastrado", className: "badge-neutral" },
  bounced: { label: "Inválido", className: "badge-danger" },
};
