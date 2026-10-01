import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatNumber = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

export const formatCompact = (n: number) =>
  new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export const formatPercent = (n: number, digits = 1) =>
  new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: digits }).format(n);

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
