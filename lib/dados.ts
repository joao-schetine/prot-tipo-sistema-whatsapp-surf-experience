// Dados de EXEMPLO (pessoas fictícias) até o banco SQLite entrar.

export type ListaId =
  | "aguardando"
  | "quente"
  | "morno"
  | "frio"
  | "ativo"
  | "comunidade"
  | "viagens"
  | "inativo";

export type Lista = { id: ListaId; nome: string; dica: string; cor: string };

export const LISTAS: Lista[] = [
  { id: "aguardando", nome: "Aguardando você", dica: "A IA terminou o quiz. É só fechar.", cor: "sea" },
  { id: "quente", nome: "Prospect quente", dica: "Chance alta. Follow-up a cada 2 ou 3 dias.", cor: "hot" },
  { id: "morno", nome: "Prospect morno", dica: "Talvez volte. Follow-up a cada 2 ou 3 semanas.", cor: "warm" },
  { id: "frio", nome: "Prospect frio", dica: "Pouca chance. Um contato por mês.", cor: "cold" },
  { id: "ativo", nome: "Alunos ativos", dica: "Com plano em andamento.", cor: "ok" },
  { id: "comunidade", nome: "Comunidade", dica: "Não faz aula, mas vive a escola: eventos e viagens.", cor: "sand" },
  { id: "viagens", nome: "Viagens", dica: "Fechou ou quer viagem. Recebe as próximas.", cor: "sea" },
  { id: "inativo", nome: "Inativos", dica: "Não vão voltar por agora.", cor: "muted" }
];

export type Msg = { de: "cliente" | "ia" | "voce"; texto: string; hora: string };

export type Pessoa = {
  id: string;
  nome: string;
  lista: ListaId;
  tags: string[];
  telefone: string;
  idade?: string;
  paraQuem?: string;
  pessoas?: string;
  onde?: string;
  jaSurfou?: string;
  objetivo?: string;
  rotina?: string;
  horario?: string;
  plano?: string; // escolhido ou atual
  valor?: string;
  venceEmDias?: number; // pra ativos
  followUpEmDias?: number; // próximo contato (0 = hoje)
  ficha?: "pendente" | "completa" | "nao-enviada";
  alertas?: string[];
  observacoes: string;
  conversa: Msg[];
};

const conv = (...m: [Msg["de"], string, string][]): Msg[] => m.map(([de, texto, hora]) => ({ de, texto, hora }));

export const PESSOAS: Pessoa[] = [
  {
    id: "ana", nome: "Ana Ribeiro", lista: "aguardando", tags: ["Família", "Temporada"], telefone: "(11) 9xxxx-0101",
    idade: "34 anos", paraQuem: "Família ou grupo de amigos", pessoas: "3 pessoas", onde: "Tô de temporada", jaSurfou: "Nenhuma",
    objetivo: "Ganhar confiança no mar", rotina: "Muda bastante · tarde", horario: "15h ou 16h30",
    plano: "Pacote 4 aulas · a partir de 2 pessoas", valor: "R$ 440 (2x)", ficha: "nao-enviada", followUpEmDias: 0,
    observacoes: "Quer perder o medo e se divertir com os filhos. Quer começar esta semana. Aceitou o upgrade de 2 pra 4 aulas.",
    conversa: conv(
      ["cliente", "Oi! Vi o Instagram de vocês e queria saber sobre as aulas 🏄", "14:02"],
      ["ia", "Oi! Que bom que você chamou 🤙 Aqui é da Surf Experience. Como posso te chamar?", "14:02"],
      ["cliente", "Ana", "14:03"],
      ["ia", "Prazer, Ana! As aulas seriam pra você ou pra outra pessoa?", "14:03"],
      ["cliente", "Família ou grupo de amigos", "14:03"],
      ["ia", "Que massa surfar junto! Pelo que você me contou, separei as opções que mais combinam: Pacote de aulas a partir de 2 pessoas ⭐ ou Surf Coach. Qual faz mais sentido?", "14:06"],
      ["cliente", "Pacote 2 aulas", "14:07"],
      ["ia", "Fechado! Só uma dica: no pacote de 4, cada aula sai R$ 110 em vez de R$ 120, e dá pra parcelar em 2x.", "14:07"],
      ["cliente", "Quero o de 4 aulas", "14:08"],
      ["ia", "Fechou, Ana! 🤙 Já já alguém do nosso time te chama aqui pra acertar horário e pagamento.", "14:08"]
    )
  },
  {
    id: "leo", nome: "Leonardo Prado", lista: "aguardando", tags: ["Surf Coach", "Avançado"], telefone: "(13) 9xxxx-0202",
    idade: "25 anos", paraQuem: "Pra mim", onde: "Moro em Santos", jaSurfou: "Incontáveis", objetivo: "Evoluir a técnica",
    rotina: "Horário fixo · 2x por semana", horario: "6h45 ou 8h", plano: "Surf Coach Elite · 8 aulas", valor: "R$ 1.680 (3x)",
    ficha: "nao-enviada", followUpEmDias: 0,
    observacoes: "Maior dificuldade: manobras de borda. Sente que está estagnado. Quer vídeo análise.",
    conversa: conv(
      ["cliente", "Fala! Queria evoluir meu surf", "13:40"],
      ["ia", "Boa, Leonardo! Qual sua maior dificuldade no surf hoje?", "13:41"],
      ["cliente", "manobras de borda, tô meio estagnado", "13:42"],
      ["ia", "Pelo seu objetivo, o acompanhamento individual tende a fazer bastante diferença ⭐ Qual dessas faz mais sentido?", "13:45"],
      ["cliente", "Surf Coach Elite, 8 aulas", "13:46"],
      ["ia", "Fechou, Leonardo! 🤙 Já já alguém do nosso time te chama aqui.", "13:46"]
    )
  },
  {
    id: "carla", nome: "Carla Mendes", lista: "quente", tags: ["Iniciante"], telefone: "(13) 9xxxx-0303",
    idade: "29 anos", paraQuem: "Pra mim", onde: "Moro em Santos", jaSurfou: "Nenhuma", objetivo: "Aprender e criar uma rotina",
    rotina: "Horário fixo · 2x por semana", horario: "8h", plano: "Fixo 2x · Trimestral", valor: "R$ 259/mês",
    followUpEmDias: 0, observacoes: "Viu os valores ontem. Vai ver com o namorado se ele quer fazer junto.",
    conversa: conv(["ia", "Fechou, Carla! Já já alguém do nosso time te chama 🤙", "Ontem"], ["voce", "Oi Carla! Ficou alguma dúvida sobre o plano?", "Ontem"], ["cliente", "Vou ver com meu namorado se ele faz junto", "Ontem"])
  },
  {
    id: "pedro", nome: "Pedro Alves", lista: "quente", tags: ["Iniciante", "Fim de semana"], telefone: "(11) 9xxxx-0404",
    idade: "41 anos", paraQuem: "Pra mim", onde: "Moro em Santos", jaSurfou: "Menos de 5 vezes", objetivo: "Aprender e criar uma rotina",
    rotina: "Só fim de semana", horario: "9h30", plano: "Flex 1x · Mensal", valor: "R$ 339/mês",
    followUpEmDias: 2, observacoes: "Achou caro o Flex. Ofereci Pacote 4 aulas.", conversa: conv(["cliente", "Achei um pouco caro", "Seg"], ["voce", "Entendo! Você tinha algum investimento mensal em mente?", "Seg"])
  },
  {
    id: "julia", nome: "Júlia Costa", lista: "morno", tags: ["Criança"], telefone: "(13) 9xxxx-0505",
    idade: "9 anos (filha)", paraQuem: "Pro meu filho ou filha", onde: "Moro em Santos", jaSurfou: "Nenhuma",
    objetivo: "Experimentar pela primeira vez", plano: "Aula avulsa (semana)", valor: "R$ 98",
    followUpEmDias: 9, observacoes: "Mãe quer esperar o fim das provas da filha. Filha se sente mais ou menos confortável no mar.",
    conversa: conv(["cliente", "Vou esperar acabar as provas dela", "Há 5 dias"])
  },
  {
    id: "rafa", nome: "Rafael Souza", lista: "morno", tags: ["Viagem"], telefone: "(11) 9xxxx-0606",
    jaSurfou: "Menos de 20 vezes", plano: "Viagem internacional", followUpEmDias: 14,
    observacoes: "Interessado na próxima viagem internacional, mas depende das férias.", conversa: conv(["cliente", "Quando sai a próxima internacional?", "Semana passada"])
  },
  {
    id: "marcos", nome: "Marcos Lima", lista: "frio", tags: [], telefone: "(13) 9xxxx-0707",
    jaSurfou: "Nenhuma", plano: "Fixo 1x · Mensal", followUpEmDias: 25, observacoes: "Parou de responder depois dos valores.", conversa: []
  },
  {
    id: "bia", nome: "Beatriz Nunes", lista: "ativo", tags: ["Fixo 2x"], telefone: "(13) 9xxxx-0808",
    plano: "Fixo 2x · Semestral", valor: "R$ 239/mês", venceEmDias: 6, ficha: "completa", alertas: ["Na água: já passou sufoco no mar"],
    observacoes: "Turma das 8h. Plano vence em 6 dias: oferecer renovação.", conversa: []
  },
  {
    id: "tiago", nome: "Tiago Rocha", lista: "ativo", tags: ["Surf Coach"], telefone: "(13) 9xxxx-0909",
    plano: "Surf Coach Básico · 12 aulas", valor: "R$ 1.620 (4x)", venceEmDias: 40, ficha: "pendente",
    observacoes: "Fechou ontem. Ficha de anamnese enviada, ainda não preencheu.", conversa: []
  },
  {
    id: "duda", nome: "Duda Martins", lista: "comunidade", tags: ["Avançado", "Não faz mais aula"], telefone: "(13) 9xxxx-1010",
    observacoes: "Surfa sozinha, vai em todos os eventos. Boa pra indicar amigos.", conversa: []
  },
  {
    id: "gui", nome: "Guilherme Reis", lista: "comunidade", tags: ["Só eventos"], telefone: "(13) 9xxxx-1111",
    observacoes: "Só vai às festas da escola.", conversa: []
  },
  {
    id: "lara", nome: "Lara Fontes", lista: "viagens", tags: ["Viagem nacional", "Comunidade"], telefone: "(11) 9xxxx-1212",
    plano: "Viagem nacional · fechada", ficha: "completa", observacoes: "Fechou a última viagem nacional. Entrou na comunidade.", conversa: []
  },
  {
    id: "sergio", nome: "Sérgio Paiva", lista: "inativo", tags: [], telefone: "(13) 9xxxx-1313",
    observacoes: "Mudou de cidade.", conversa: []
  }
];

export function pessoa(id: string) {
  return PESSOAS.find((p) => p.id === id);
}

export function sugestaoFollowUp(p: Pessoa) {
  const n = p.nome.split(" ")[0];
  if (p.lista === "ativo" && p.venceEmDias !== undefined && p.venceEmDias <= 10)
    return `Oi ${n}! Seu plano vence em ${p.venceEmDias} dias. Bora renovar e manter a evolução? 🤙`;
  if (p.lista === "quente")
    return `Oi ${n}! Tudo bem? Passando pra saber se você conseguiu dar uma olhadinha nas opções que conversamos. Ficou alguma dúvida ou posso te ajudar a organizar pra começarmos?`;
  return `Oi ${n}! Tudo certo? Lembrei da nossa conversa sobre surfar e queria saber se conseguimos colocar esse plano em prática! Como tá sua disponibilidade pros próximos dias?`;
}
