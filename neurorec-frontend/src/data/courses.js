export const categories = [
  { id: "all", label: "Todos" },
  { id: "tech", label: "Tecnologia" },
  { id: "data", label: "Dados & IA" },
  { id: "design", label: "UX/UI & Produto" },
  { id: "business", label: "Negocios & Marketing" },
];

export const courses = [
  {
    id: "react-pro",
    title: "React Pro: do Zero ao Profissional",
    category: "tech",
    description:
      "Crie aplicacoes modernas com React 19, roteamento e padroes escalaveis usando Vite.",
    duration: "32h",
    level: "Intermediario",
    price: 299.9,
    rating: 4.8,
    highlights: [
      "Projeto completo com auth e consumo de API",
      "Hooks modernos e composicao de componentes",
      "Boas praticas de performance e acessibilidade",
    ],
    syllabus: [
      "Fundamentos e setup com Vite",
      "Componentes, estado e hooks",
      "Roteamento, formularios e validacao",
      "Consumo de APIs e gerenciamento de tokens",
      "Testes e deploy",
    ],
  },
  {
    id: "spring-micro",
    title: "Microsservicos com Spring Boot 3",
    category: "tech",
    description:
      "Construa APIs resilientes com Spring Security, JPA e observabilidade pronta para producao.",
    duration: "26h",
    level: "Avancado",
    price: 349.0,
    rating: 4.7,
    highlights: [
      "Autenticacao JWT e controle de acesso",
      "Persistencia com Postgres e JPA",
      "Observabilidade com logs e metrics",
    ],
    syllabus: [
      "Design de microsservicos e DDD leve",
      "Persistencia e migracoes",
      "Seguranca com JWT",
      "Testes de integracao",
      "Containerizacao e deploy",
    ],
  },
  {
    id: "data-analytics",
    title: "Analytics com Python e Power BI",
    category: "data",
    description:
      "Monte paineis completos e conduza analises orientadas a dados com Python e Power BI.",
    duration: "24h",
    level: "Intermediario",
    price: 259.0,
    rating: 4.6,
    highlights: [
      "ETL com pandas e limpeza de dados",
      "Visualizacoes ricas no Power BI",
      "Modelagem de indicadores de negocio",
    ],
    syllabus: [
      "Python para analise rapida",
      "Modelagem de dados no Power BI",
      "Dashboards e storytelling",
      "Publicacao e compartilhamento",
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering para Profissionais",
    category: "data",
    description:
      "Aprenda tecnicas avancadas para gerar resultados consistentes com IA generativa.",
    duration: "12h",
    level: "Intermediario",
    price: 189.0,
    rating: 4.5,
    highlights: [
      "Estruturas de prompt reutilizaveis",
      "Avaliacao de qualidade e guardrails",
      "Automacao com APIs e ferramentas",
    ],
    syllabus: [
      "Fundamentos de LLMs",
      "Taticas de prompt e cadeias",
      "Reducoes de alucinacao",
      "Boas praticas de evaluacao",
    ],
  },
  {
    id: "ux-strategy",
    title: "UX Strategy & Research",
    category: "design",
    description:
      "Mapeie jornadas, conduza pesquisas e alinhe produto ao negocio com processos claros.",
    duration: "18h",
    level: "Avancado",
    price: 229.0,
    rating: 4.7,
    highlights: [
      "Planejamento de discovery continuo",
      "Testes com usuarios e analise",
      "Roadmap orientado a valor",
    ],
    syllabus: [
      "Pesquisa exploratoria",
      "Jornadas e service blueprint",
      "Teste de usabilidade",
      "Product strategy e OKRs",
    ],
  },
  {
    id: "product-design",
    title: "Product Design Sprint",
    category: "design",
    description:
      "Prototipe solucoes rapidas e valide hipoteses com usuarios reais em ciclos curtos.",
    duration: "14h",
    level: "Intermediario",
    price: 199.0,
    rating: 4.4,
    highlights: [
      "Workshops de ideacao",
      "Prototipos navegaveis",
      "MVP e validacao rapida",
    ],
    syllabus: [
      "Planejamento do sprint",
      "Mapeamento de problemas",
      "Prototipacao de alta fidelidade",
      "Sessao de testes e ajustes",
    ],
  },
  {
    id: "growth-ops",
    title: "Growth Ops para Startups",
    category: "business",
    description:
      "Estruture experimentos, metricas e squads de crescimento com foco em resultados.",
    duration: "16h",
    level: "Intermediario",
    price: 219.0,
    rating: 4.3,
    highlights: [
      "North Star Metric e funil AARRR",
      "Planejamento de experimentos",
      "Integracao marketing-produto",
    ],
    syllabus: [
      "Bases de growth",
      "Instrumentacao e analise",
      "Roteiro de experimentos",
      "Escalando campanhas vencedoras",
    ],
  },
  {
    id: "digital-branding",
    title: "Branding & Conteudo Digital",
    category: "business",
    description:
      "Construa presenca digital consistente e campanhas de alto impacto para marcas.",
    duration: "10h",
    level: "Iniciante",
    price: 149.0,
    rating: 4.2,
    highlights: [
      "Narrativa de marca e tom de voz",
      "Planejamento editorial",
      "Medicao e otimizacao de canais",
    ],
    syllabus: [
      "Fundamentos de branding",
      "Guia de estilo e voz",
      "Calendario de conteudo",
      "Medicao de performance",
    ],
  },
];

export const findCourseById = (courseId) =>
  courses.find((course) => course.id === courseId);
