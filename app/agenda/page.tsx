import Link from "next/link";
import { LISTAS, PESSOAS, sugestaoFollowUp } from "@/lib/dados";
import { Pill, quando } from "@/components/ui";

export default function Agenda() {
  const itens = PESSOAS.flatMap((p) => {
    const out: { p: typeof p; dias: number; motivo: string }[] = [];
    if (p.followUpEmDias !== undefined && p.lista !== "aguardando") out.push({ p, dias: p.followUpEmDias, motivo: "Follow-up" });
    if (p.lista === "aguardando") out.push({ p, dias: 0, motivo: "Fechar com o lead" });
    if (p.lista === "ativo" && p.venceEmDias !== undefined && p.venceEmDias <= 10) out.push({ p, dias: Math.max(0, p.venceEmDias - 5), motivo: "Renovação do plano" });
    if (p.ficha === "pendente") out.push({ p, dias: 1, motivo: "Lembrete da ficha (a IA manda sozinha)" });
    return out;
  }).sort((a, b) => a.dias - b.dias);

  const grupos = [
    { t: "Hoje", f: (d: number) => d <= 0 },
    { t: "Esta semana", f: (d: number) => d > 0 && d < 7 },
    { t: "Próximas semanas", f: (d: number) => d >= 7 }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Agenda de contatos</h1>
        <p className="mt-1 text-muted">Quente: a cada 2 ou 3 dias · Morno: a cada 2 ou 3 semanas · Frio: uma vez por mês.</p>
      </div>
      {grupos.map((g) => {
        const lista = itens.filter((i) => g.f(i.dias));
        return (
          <section key={g.t} className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">{g.t}<span className="num rounded-full bg-surface px-2 text-sm text-muted ring-1 ring-line">{lista.length}</span></h2>
            {lista.length === 0 && <p className="text-sm text-muted">Nada marcado.</p>}
            <div className="grid gap-3 md:grid-cols-2">
              {lista.map(({ p, dias, motivo }) => {
                const l = LISTAS.find((x) => x.id === p.lista)!;
                return (
                  <Link key={p.id + motivo} href={`/lead/${p.id}`} className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-4 hover:border-sea">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <strong>{p.nome}</strong>
                      <span className={`text-xs font-bold ${dias <= 0 ? "text-hot" : "text-muted"}`}>{quando(dias)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2"><Pill cor={l.cor}>{l.nome}</Pill><span className="text-sm font-medium">{motivo}</span></div>
                    {motivo !== "Lembrete da ficha (a IA manda sozinha)" && motivo !== "Fechar com o lead" && <p className="rounded-xl bg-bg p-3 text-sm leading-relaxed text-muted">{sugestaoFollowUp(p)}</p>}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
