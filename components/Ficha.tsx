"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LISTAS, type Msg, type Pessoa, sugestaoFollowUp } from "@/lib/dados";
import { Pill, Tag, quando } from "./ui";

const FORM_URL = "https://forms.gle/LjgdqswLnYp7q3wT9";
const agora = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export default function Ficha({ inicial }: { inicial: Pessoa }) {
  const [p, setP] = useState<Pessoa>(inicial);
  const [msgs, setMsgs] = useState<Msg[]>(inicial.conversa);
  const [voceAssumiu, setVoceAssumiu] = useState(false);
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("");
  const fim = useRef<HTMLDivElement>(null);
  useEffect(() => { fim.current?.scrollIntoView({ block: "nearest" }); }, [msgs]);

  const lista = LISTAS.find((l) => l.id === p.lista)!;
  const viagem = (p.plano ?? "").toLowerCase().includes("viagem") || p.lista === "viagens";
  const podeFechar = ["aguardando", "quente", "morno", "frio"].includes(p.lista);

  function flash(t: string) { setAviso(t); setTimeout(() => setAviso(""), 2600); }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const t = texto.trim(); if (!t) return;
    setMsgs((m) => [...m, { de: "voce", texto: t, hora: agora() }]);
    setTexto("");
    if (!voceAssumiu) { setVoceAssumiu(true); flash("A IA pausou: você está no controle desta conversa"); }
  }

  function fechar() {
    const nome = p.nome.split(" ")[0];
    setVoceAssumiu(false);
    setP((x) => ({ ...x, lista: viagem ? "viagens" : "ativo", tags: viagem ? [...x.tags.filter((t) => t !== "Comunidade"), "Comunidade"] : x.tags, ficha: "pendente", followUpEmDias: undefined }));
    setMsgs((m) => [
      ...m,
      { de: "ia", hora: agora(), texto: viagem ? `${nome}, sua vaga na viagem tá garantida! 🎉🌊 Agora você também faz parte da comunidade Surf Experience.` : `${nome}, seja muito bem-vindo(a) à Surf Experience! 🎉🏄` },
      { de: "ia", hora: agora(), texto: `Pra deixar tudo pronto, preenche nossa ficha de anamnese (uns 3 minutos): ${FORM_URL}` }
    ]);
    flash(viagem ? "Viagem fechada: ficha enviada e pessoa nas listas Viagens + Comunidade" : "Pacote fechado: ficha enviada e aluno movido pra Ativos");
  }

  function fichaChegou() {
    setP((x) => ({ ...x, ficha: "completa", alertas: ["Na água: já passou sufoco no mar", "Atenção do instrutor: câimbras"] }));
    setMsgs((m) => [...m, { de: "ia", hora: agora(), texto: `Recebi sua ficha, ${p.nome.split(" ")[0]}! Tá tudo certo por aqui ✅` }]);
    flash("Ficha recebida e salva no CRM");
  }

  const perfil: [string, string | undefined][] = [
    ["Para quem", p.paraQuem], ["Pessoas", p.pessoas], ["Idade", p.idade], ["Mora em Santos?", p.onde], ["Já surfou", p.jaSurfou],
    ["Objetivo", p.objetivo], ["Rotina", p.rotina], ["Horário", p.horario], ["Plano", p.plano], ["Valor", p.valor]
  ];

  return (
    <div className="flex flex-col gap-5">
      <Link href="/" className="text-sm font-medium text-sea">← Voltar pro quadro</Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-extrabold tracking-tight">{p.nome}</h1>
            <Pill cor={lista.cor}>{lista.nome}</Pill>
          </div>
          <p className="num mt-1 text-sm text-muted">{p.telefone}{p.followUpEmDias !== undefined ? ` · próximo contato: ${quando(p.followUpEmDias).toLowerCase()}` : ""}</p>
          {p.tags.length > 0 && <div className="mt-2 flex flex-wrap gap-1">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setVoceAssumiu((v) => !v); flash(voceAssumiu ? "A IA voltou a responder" : "A IA pausou: você está no controle"); }}
            className={`rounded-xl border px-4 py-2 text-sm font-bold ${voceAssumiu ? "border-warm bg-warm-soft text-warm" : "border-line bg-surface"}`}>
            {voceAssumiu ? "Devolver pra IA" : "Assumir conversa"}
          </button>
          {podeFechar && <button onClick={fechar} className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-bg">{viagem ? "Viagem fechada · enviar ficha" : "Pacote fechado · enviar ficha"}</button>}
          {p.ficha === "pendente" && <button onClick={fichaChegou} className="rounded-xl border border-cold bg-cold-soft px-4 py-2 text-sm font-bold text-cold">Simular ficha preenchida</button>}
        </div>
      </div>

      {aviso && <div role="status" className="rounded-xl bg-ok-soft px-4 py-2.5 text-sm font-medium text-ok">{aviso}</div>}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* coluna esquerda */}
        <div className="flex min-w-0 flex-col gap-4">
          {p.alertas?.length ? (
            <div className="flex flex-col gap-2 rounded-2xl border border-hot/30 bg-hot-soft p-4">
              <strong className="text-sm text-hot">Alertas pro instrutor</strong>
              {p.alertas.map((a) => <p key={a} className="text-sm text-hot">{a}</p>)}
            </div>
          ) : null}

          <section className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-display text-lg font-semibold">Perfil</h2>
            <dl className="mt-3 grid grid-cols-[minmax(110px,auto)_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
              {perfil.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="contents"><dt className="text-xs uppercase tracking-wide text-muted">{k}</dt><dd className="num font-medium">{v}</dd></div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-display text-lg font-semibold">Observações</h2>
            <p className="mt-2 text-sm leading-relaxed">{p.observacoes}</p>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-semibold">Ficha de anamnese</h2>
              {p.ficha === "completa" ? <Pill cor="ok">Completa</Pill> : p.ficha === "pendente" ? <Pill cor="cold">Aguardando</Pill> : <Pill cor="muted">Não enviada</Pill>}
            </div>
            <p className="mt-2 text-sm text-muted">
              {p.ficha === "completa" ? "Respostas salvas no CRM. Os alertas aparecem no topo." : p.ficha === "pendente" ? "Link enviado. Se não preencher em 24h, a IA lembra." : "Vai sozinha quando você marcar o fechamento."}
            </p>
          </section>

          {p.followUpEmDias !== undefined && (
            <section className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="font-display text-lg font-semibold">Mensagem sugerida pro follow-up</h2>
              <p className="mt-2 rounded-xl bg-bg p-3 text-sm leading-relaxed">{sugestaoFollowUp(p)}</p>
              <button onClick={() => setTexto(sugestaoFollowUp(p))} className="mt-3 rounded-xl border border-line px-3 py-1.5 text-sm font-bold">Usar na conversa</button>
            </section>
          )}
        </div>

        {/* conversa */}
        <section className="flex min-h-[520px] min-w-0 flex-col overflow-hidden rounded-2xl border border-line">
          <div className="flex items-center justify-between bg-head px-4 py-3 text-head-ink">
            <strong>Conversa no WhatsApp</strong>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${voceAssumiu ? "bg-warm-soft text-warm" : "bg-white/15"}`}>{voceAssumiu ? "Você no controle" : "IA atendendo"}</span>
          </div>
          <div className="flex max-h-[560px] flex-1 flex-col gap-2 overflow-y-auto bg-chat p-4">
            {msgs.length === 0 && <p className="m-auto text-sm text-muted">Sem conversa registrada ainda</p>}
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] whitespace-pre-line break-words rounded-xl px-3 py-2 text-sm shadow-sm ${m.de === "cliente" ? "self-end rounded-tr-sm bg-bubble-out" : "self-start rounded-tl-sm bg-bubble"}`}>
                {m.de !== "cliente" && <span className={`mb-0.5 block text-[11px] font-bold ${m.de === "voce" ? "text-hot" : "text-sea"}`}>{m.de === "voce" ? "Você" : "IA"}</span>}
                {m.texto}
                <span className="num mt-1 block text-right text-[10px] text-muted">{m.hora}</span>
              </div>
            ))}
            <div ref={fim} />
          </div>
          <form onSubmit={enviar} className="flex gap-2 border-t border-line bg-surface p-3">
            <label htmlFor="msg" className="sr-only">Mensagem pro cliente</label>
            <input id="msg" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreva pro cliente (sai pelo WhatsApp da escola)…"
              className="min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 py-2.5 text-sm" />
            <button className="rounded-xl bg-sea px-4 text-sm font-bold text-white">Enviar</button>
          </form>
        </section>
      </div>
    </div>
  );
}
