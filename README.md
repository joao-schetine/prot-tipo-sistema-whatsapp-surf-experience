# Surf Experience · Sistema (atendente de WhatsApp + CRM)

Um sistema só: o WhatsApp é a porta de entrada e o CRM é onde tudo fica guardado.

## O que tem aqui

- `/` · **Quadro**: listas de alunos (aguardando você, prospects quente/morno/frio, ativos, comunidade, viagens, inativos)
- `/lead/[id]` · **Ficha**: perfil, observações, anamnese, conversa do WhatsApp e botões (assumir conversa, pacote/viagem fechada)
- `/agenda` · **Agenda** de follow-ups e renovações
- `/atendente/` · protótipo da conversa da IA no WhatsApp
- `Roteiro_Perguntas_Surf_Experience.xlsx` · roteiro de perguntas, preços e regras da IA

Por enquanto usa **dados de exemplo** (pessoas fictícias). Banco planejado: SQLite (Turso).

## Rodar no computador

```
npm install
npm run dev
```

Feito com Next.js + Tailwind. Publicado automaticamente na Vercel a cada versão.
