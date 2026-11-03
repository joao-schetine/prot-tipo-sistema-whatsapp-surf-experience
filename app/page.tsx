import Link from "next/link";
import { LISTAS, PESSOAS } from "@/lib/dados";
import { COR, Pill, Tag, quando } from "@/components/ui";

export default function Quadro() {
  const aguardando = PESSOAS.filter((p) => p.lista === "aguardando").length;
  const followHoje = PESSOAS.filter((p) => p.followUpEmDias === 0).length;
  const fichas = PESSOAS.filter((p) => p.ficha === "pendente").length;
  const vencendo = PESSOAS.filter((p) => p.lista === "ativo" && (p.venceEmDias ?? 99) <= 10).length;
  const kpis = [
    { n: aguardando, l: "leads aguardando você", cor: "sea", href: "#aguardando" },
    { n: followHoje, l: "follow-ups pra hoje", cor: "hot", href: "/agenda" },
    { n: vencendo, l: "planos vencendo em 10 dias", cor: "warm", href: "#ativo" },
    { n: fichas, l: "fichas de anamnese pendentes", cor: "cold", href: "#ativo" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Quadro de alunos</h1>
          <p className="mt-1 text-muted">Cada pessoa que fala com a escola cai numa lista. Toque num cartão pra abrir a ficha e a conversa.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => {
          const c = COR[k.cor];
          return (
            <a key={k.l} href={k.href} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 hover:border-sea">
              <span className={`num grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-xl font-extrabold ${c.bg} ${c.fg}`}>{k.n}</span>
              <span className="text-sm font-medium leading-tight">{k.l}</span>
            </a>
          );
        })}
      </div>

      <div className="scroll-x -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="flex gap-4 pb-3" style={{ width: "max-content" }}>
          {LISTAS.map((lista) => {
            const gente = PESSOAS.filter((p) => p.lista === lista.id);
            const c = COR[lista.cor];
            return (
              <section key={lista.id} id={lista.id} className="flex w-[280px] shrink-0 flex-col gap-3 rounded-2xl bg-surface/60 p-3 ring-1 ring-line">
                <header className="px-1">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 font-display text-base font-semibold"><span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />{lista.nome}</h2>
                    <span className="num rounded-full bg-bg px-2 text-sm font-bold text-muted">{gente.length}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{lista.dica}</p>
                </header>
                {gente.length === 0 && <p className="rounded-xl border border-dashed border-line p-4 text-center text-sm text-muted">Ninguém aqui por enquanto</p>}
                {gente.map((p) => (
                  <Link key={p.id} href={`/lead/${p.id}`} className="group flex flex-col gap-2 rounded-xl border border-line bg-surface p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sea">
                    <div className="flex items-start justify-between gap-2">
                      <strong className="leading-tight">{p.nome}</strong>
                      {p.followUpEmDias !== undefined && <span className={`shrink-0 text-[11px] font-bold ${p.followUpEmDias === 0 ? "text-hot" : "text-muted"}`}>{quando(p.followUpEmDias)}</span>}
                    </div>
                    {p.plano && <p className="text-sm text-muted">{p.plano}{p.valor ? <> · <span className="num font-medium text-ink">{p.valor}</span></> : null}</p>}
                    {p.lista === "ativo" && p.venceEmDias !== undefined && p.venceEmDias <= 10 && <Pill cor="warm">Vence em {p.venceEmDias} dias</Pill>}
                    {p.ficha === "pendente" && <Pill cor="cold">Ficha pendente</Pill>}
                    {p.alertas?.length ? <Pill cor="hot">Alerta pro instrutor</Pill> : null}
                    {p.tags.length > 0 && <div className="flex flex-wrap gap-1">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
                  </Link>
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
