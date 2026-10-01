import { cn } from "@/lib/format";
import { SITE } from "@/config/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#ff5a1f" />
      <circle cx="16" cy="16" r="3.5" fill="#fff" />
      <path
        d="M10.5 10.5a7.8 7.8 0 0 0 0 11M21.5 10.5a7.8 7.8 0 0 1 0 11"
        stroke="#fff"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className={cn("text-[17px] font-semibold tracking-tight", dark ? "text-white" : "text-zinc-900")}>
        {SITE.name}
      </span>
    </span>
  );
}
