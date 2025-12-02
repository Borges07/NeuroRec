import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories, courses } from "../../data/courses.js";
import styles from "./Home.module.css";

const allCategoryId = "all";

export function Home() {
  const [activeCategory, setActiveCategory] = useState(allCategoryId);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return courses.filter((course) => {
      const matchCategory =
        activeCategory === allCategoryId || course.category === activeCategory;
      const haystack = `${course.title} ${course.description} ${course.level}`
        .toLowerCase()
        .replaceAll("ç", "c")
        .replaceAll("ã", "a")
        .replaceAll("õ", "o")
        .replaceAll("á", "a")
        .replaceAll("é", "e")
        .replaceAll("í", "i")
        .replaceAll("ó", "o")
        .replaceAll("ú", "u");
      const needle = term
        .replaceAll("ç", "c")
        .replaceAll("ã", "a")
        .replaceAll("õ", "o")
        .replaceAll("á", "a")
        .replaceAll("é", "e")
        .replaceAll("í", "i")
        .replaceAll("ó", "o")
        .replaceAll("ú", "u");

      if (!needle) return matchCategory;
      return matchCategory && haystack.includes(needle);
    });
  }, [activeCategory, searchTerm]);

  const getCategoryLabel = (id) =>
    categories.find((item) => item.id === id)?.label ?? id;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Marketplace NeuroRec</p>
          <h1>
            Encontre o curso certo,
            <br />
            sem distrações.
          </h1>
          <p className={styles.subtitle}>
            Catálogo direto ao ponto: tecnologia, dados, design e negócios na
            mesma paleta da NeuroRec. Filtre, pesquise e abra o conteúdo de cada
            curso em poucos cliques.
          </p>

          <div className={styles.heroActions}>
            <a className={styles.primaryCta} href="#catalogo">
              Ver cursos
            </a>
            <Link className={styles.secondaryCta} to="/chat">
              Pedir recomendação no chat
            </Link>
          </div>

          <div className={styles.heroBadges}>
            <span>Curadoria atualizada</span>
            <span>Recomendações IA</span>
            <span>Conteúdo detalhado</span>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <h3>Hoje em destaque</h3>
          <ul>
            {courses.slice(0, 3).map((course) => (
              <li key={course.id}>
                <div>
                  <p className={styles.panelCategory}>
                    {getCategoryLabel(course.category)}
                  </p>
                  <strong>{course.title}</strong>
                  <span>{course.level}</span>
                </div>
                <Link to={`/courses/${course.id}`}>Ver</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.catalog} id="catalogo">
        <header className={styles.catalogHeader}>
          <div>
            <p className={styles.kicker}>Catálogo</p>
            <h2>Cursos completos</h2>
            <p className={styles.subtitle}>
              Explore o marketplace por categoria ou busque por tema, nível ou
              ferramenta.
            </p>
          </div>
          <div className={styles.searchBox}>
            <input
              type="search"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </header>

        <div className={styles.filters}>
          {[allCategoryId, ...categories.map((item) => item.id)].map((id) => {
            const label =
              id === allCategoryId
                ? "Todos"
                : categories.find((item) => item.id === id)?.label ?? id;
            const isActive = id === activeCategory;
            return (
              <button
                key={id}
                type="button"
                className={isActive ? styles.filterActive : styles.filter}
                onClick={() => setActiveCategory(id)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className={styles.grid}>
          {filteredCourses.length === 0 ? (
            <div className={styles.empty}>
              <h3>Nenhum curso encontrado</h3>
              <p>
                Ajuste a categoria ou refine a busca para encontrar o conteúdo
                ideal.
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <article key={course.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.category}>
                    {getCategoryLabel(course.category)}
                  </span>
                  <span className={styles.price}>
                    R${course.price.toFixed(2)}
                  </span>
                </div>

                <h3>{course.title}</h3>
                <p className={styles.description}>{course.description}</p>

                <ul className={styles.highlights}>
                  {course.highlights.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className={styles.meta}>
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                  <span>⭐ {course.rating.toFixed(1)}</span>
                </div>

                <div className={styles.cardActions}>
                  <Link
                    className={styles.detailLink}
                    to={`/courses/${course.id}`}
                  >
                    Ver conteúdo
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className={styles.contact}>
        <div>
          <p className={styles.kicker}>Suporte</p>
          <h2>Precisa de ajuda?</h2>
          <p className={styles.subtitle}>
            Fale com a equipe NeuroRec para suporte, parceria ou dúvidas sobre
            o catálogo.
          </p>
        </div>
        <div className={styles.contactInfo}>
          <p>Email: contato@neurorec.com</p>
          <p>Telefone: (62) 1234-5678</p>
          <div className={styles.socials}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
