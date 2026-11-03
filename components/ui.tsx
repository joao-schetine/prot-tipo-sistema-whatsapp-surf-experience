import type { ListaId } from "@/lib/dados";

export const COR: Record<string, { fg: string; bg: string; dot: string }> = {
  sea: { fg: "text-sea", bg: "bg-sea-soft", dot: "bg-sea" },
  hot: { fg: "text-hot", bg: "bg-hot-soft", dot: "bg-hot" },
  warm: { fg: "text-warm", bg: "bg-warm-soft", dot: "bg-warm" },
  cold: { fg: "text-cold", bg: "bg-cold-soft", dot: "bg-cold" },
  ok: { fg: "text-ok", bg: "bg-ok-soft", dot: "bg-ok" },
  sand: { fg: "text-sand", bg: "bg-sand-soft", dot: "bg-sand" },
  muted: { fg: "text-muted", bg: "bg-line/50", dot: "bg-muted" }
};

export function Pill({ cor, children }: { cor: string; children: React.ReactNode }) {
  const c = COR[cor] ?? COR.muted;
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${c.fg} ${c.bg}`}><span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />{children}</span>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-line px-1.5 py-0.5 text-[11px] font-medium text-muted">{children}</span>;
}

export function quando(d?: number) {
  if (d === undefined) return "";
  if (d <= 0) return "Hoje";
  if (d === 1) return "Amanhã";
  if (d < 7) return `Em ${d} dias`;
  if (d < 14) return "Semana que vem";
  return `Em ${Math.round(d / 7)} semanas`;
}

export type { ListaId };
