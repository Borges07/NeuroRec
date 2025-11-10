import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./Home.module.css";

const categories = [
  { id: "tech", label: "Tecnologia" },
  { id: "data", label: "Dados & IA" },
  { id: "design", label: "UX/UI & Produto" },
  { id: "business", label: "Negócios & Marketing" },
];

const marketplaceCourses = [
  {
    id: "react-pro",
    category: "tech",
    title: "React Pro: do Zero ao Profissional",
    description:
      "Crie aplicações modernas com React 19, Vite e padrões escaláveis.",
    duration: "32h",
    level: "Intermediário",
  },
  {
    id: "spring-micro",
    category: "tech",
    title: "Microsserviços com Spring Boot 3",
    description:
      "Construa APIs resilientes, seguras e preparadas para produção.",
    duration: "26h",
    level: "Avançado",
  },
  {
    id: "data-analytics",
    category: "data",
    title: "Analytics com Python e Power BI",
    description:
      "Monte painéis completos e conduza análises orientadas a dados.",
    duration: "24h",
    level: "Intermediário",
  },
  {
    id: "prompt-engineering",
    category: "data",
    title: "Prompt Engineering para Profissionais",
    description:
      "Aprenda técnicas avançadas para gerar resultados consistentes com IA.",
    duration: "12h",
    level: "Intermediário",
  },
  {
    id: "ux-strategy",
    category: "design",
    title: "UX Strategy & Research",
    description:
      "Mapeie jornadas, conduza pesquisas e alinhe produto ao negócio.",
    duration: "18h",
    level: "Avançado",
  },
  {
    id: "product-design",
    category: "design",
    title: "Product Design Sprint",
    description:
      "Prototipe soluções rápidas e valide hipóteses com usuários reais.",
    duration: "14h",
    level: "Intermediário",
  },
  {
    id: "growth-ops",
    category: "business",
    title: "Growth Ops para Startups",
    description: "Estruture experimentos, métricas e squads de crescimento.",
    duration: "16h",
    level: "Intermediário",
  },
  {
    id: "digital-branding",
    category: "business",
    title: "Branding & Conteúdo Digital",
    description:
      "Construa presença digital consistente e campanhas de alto impacto.",
    duration: "10h",
    level: "Iniciante",
  },
];

export function Home() {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    return marketplaceCourses.filter((course) => {
      const matchCategory = course.category === activeCategory;
      const search = searchTerm.trim().toLowerCase();

      if (!search) {
        return matchCategory;
      }

      const haystack =
        `${course.title} ${course.description} ${course.level}`.toLowerCase();
      return matchCategory && haystack.includes(search);
    });
  }, [activeCategory, searchTerm]);

  if (!isAuthenticated) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              Transforme sua carreira com a <span>NeuroRec</span>
            </h1>
            <h3>
              Marketplace inteligente de cursos com recomendações guiadas por
              IA.
            </h3>
            <p>
              Tenha acesso a trilhas completas em tecnologia, design, marketing
              e ciência de dados com professores certificados e conteúdo sempre
              atualizado. Aprenda no seu ritmo e conquiste novos patamares
              profissionais.
            </p>

            <div className={styles.actions}>
              <Link className={styles.ctaPrimary} to="/register">
                Criar conta gratuita
              </Link>
              <Link className={styles.ctaSecondary} to="/login">
                Já tenho conta
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualInner} />
          </div>
        </section>

        <section className={styles.highlights}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>+250</span>
            <span className={styles.statLabel}>Cursos especializados</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>92%</span>
            <span className={styles.statLabel}>dos alunos recomendam</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>Acesso ilimitado</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>+80</span>
            <span className={styles.statLabel}>Instrutores certificados</span>
          </div>
        </section>

        <section className={styles.features}>
          <h2>Por que aprender com a NeuroRec?</h2>
          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <h3>Trilhas personalizadas</h3>
              <p>
                Receba recomendações geradas pela nossa IA e siga roteiros de
                estudo pensados para o seu objetivo profissional.
              </p>
            </article>
            <article className={styles.featureCard}>
              <h3>Experiência imersiva</h3>
              <p>
                Aulas on-demand, exercícios práticos, fóruns com especialistas e
                feedback contínuo para acelerar seu aprendizado.
              </p>
            </article>
            <article className={styles.featureCard}>
              <h3>Certificados reconhecidos</h3>
              <p>
                Validamos suas conquistas com certificações compartilháveis para
                reforçar o currículo e abrir portas no mercado.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.contact}>
          <h2>Fale com a equipe NeuroRec</h2>
          <p>Email: contato@neurorec.com</p>
          <p>Telefone: (62) 1234-5678</p>
          <p>Endereço: Rua Exemplo, 123, Goiânia - GO</p>

          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${styles.memberPage}`}>
      <section className={styles.dashboardHero}>
        <div className={styles.dashboardCopy}>
          <h1>Boa jornada de estudos!</h1>
          <p>
            Continue exatamente de onde parou, desbloqueie novos módulos e use o
            chat NeuroRec para receber planos de estudo personalizados.
          </p>
        </div>

        <div className={styles.dashboardSummary}>
          <article className={styles.summaryCard}>
            <span>Tempo de estudo</span>
            <strong>12h esta semana</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Trilhas ativas</span>
            <strong>3 cursos em andamento</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Recomendações disponíveis</span>
            <strong>+6 novos cursos</strong>
          </article>
        </div>
      </section>

      <section className={styles.courseDiscovery}>
        <header className={styles.discoveryHeader}>
          <div>
            <h2>Explore cursos por categoria</h2>
            <p>
              Use a busca para encontrar temas específicos e filtre pelas
              trilhas recomendadas.
            </p>
          </div>

          <div className={styles.searchRow}>
            <input
              className={styles.searchField}
              type="search"
              placeholder="Buscar por curso, habilidade ou instrutor"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </header>

        <div className={styles.categoryTabs}>
          {categories.map((category) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                className={
                  isActive ? styles.categoryButtonActive : styles.categoryButton
                }
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className={styles.courseGrid}>
          {filteredCourses.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>Nenhum curso encontrado</h3>
              <p>
                Tente ajustar os termos da busca ou escolher outra categoria.
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <article key={course.id} className={styles.courseCard}>
                <header>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </header>

                <footer className={styles.courseMeta}>
                  <span className={styles.tag}>{course.level}</span>
                  <span className={styles.tag}>{course.duration}</span>
                  <Link
                    className={styles.courseLink}
                    to={`/courses/${course.id}`}
                  >
                    Ver detalhes
                  </Link>
                </footer>
              </article>
            ))
          )}
        </div>
      </section>

      <section className={styles.chatPromo}>
        <div className={styles.chatContent}>
          <h2>Chat NeuroRec</h2>
          <p>
            Tire dúvidas instantaneamente, gere planos de estudo sob demanda e
            receba recomendações personalizadas em tempo real com a nossa IA.
          </p>

          <div className={styles.chatActions}>
            <Link className={styles.ctaPrimary} to="/chat">
              Abrir chat inteligente
            </Link>
            <Link className={styles.ctaSecondary} to="/progress">
              Ver meus aprendizados
            </Link>
          </div>
        </div>

        <div className={styles.chatVisual}>
          <span>IA</span>
          <p>
            “Posso montar um plano com foco em microserviços para você. Vamos
            começar com fundamentos de arquitetura e depois mergulhamos em
            Spring Boot 3.”
          </p>
        </div>
      </section>
    </div>
  );
}
