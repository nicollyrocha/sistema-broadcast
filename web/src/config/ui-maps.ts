import { CheckCheck, Clock, type LucideIcon } from "lucide-react";
import type { ChipProps } from "@mui/material/Chip";
import type { MessageStatus } from "@/types";

/** Use com <Chip variant="outlined" color={color} className={className} /> */
export const MESSAGE_STATUS_MAP: Record<
  MessageStatus,
  { label: string; color: ChipProps["color"]; className: string; icon: LucideIcon }
> = {
  sent: { label: "Enviada", color: "success", className: "border-emerald-600/20 bg-emerald-50", icon: CheckCheck },
  scheduled: { label: "Agendada", color: "info", className: "border-sky-600/20 bg-sky-50", icon: Clock },
};
