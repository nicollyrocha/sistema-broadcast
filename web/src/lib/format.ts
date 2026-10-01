import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatNumber = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

export const formatPercent = (n: number, digits = 1) =>
  new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: digits }).format(n);

/** "02 out, 08:00" */
export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
    .format(new Date(iso))
    .replace(".", "");

/** "Mariana Costa" → "MC" */
export const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** "5511988123401" → "+55 (11) 98812-3401"; "1132104567" → "(11) 3210-4567" */
export function formatPhone(phone: string) {
  const d = phone.replace(/\D/g, "");
  const national = (n: string) => {
    const num = n.slice(2);
    return `(${n.slice(0, 2)}) ${num.slice(0, num.length - 4)}-${num.slice(-4)}`;
  };
  if (d.length === 10 || d.length === 11) return national(d);
  if (d.length === 12 || d.length === 13) return `+${d.slice(0, 2)} ${national(d.slice(2))}`;
  return phone;
}
