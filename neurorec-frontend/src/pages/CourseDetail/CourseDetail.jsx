import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { categories, courses, findCourseById } from "../../data/courses.js";
import { useCart } from "../../hooks/useCart.js";
import styles from "./CourseDetail.module.css";

export function CourseDetail() {
  const { courseId } = useParams();
  const { addToCart, cart } = useCart();
  const course = useMemo(() => findCourseById(courseId), [courseId]);
  const categoryLabel = useMemo(
    () =>
      categories.find((item) => item.id === course?.category)?.label ??
      course?.category,
    [course]
  );

  const related = useMemo(
    () =>
      courses
        .filter(
          (item) => item.category === course?.category && item.id !== course?.id
        )
        .slice(0, 3),
    [course]
  );

  if (!course) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Curso não encontrado</h1>
          <p>Volte para o catálogo e escolha outro conteúdo.</p>
          <Link to="/" className={styles.backLink}>
            Voltar para os cursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">Cursos</Link>
          <span>/</span>
          <span>{course.title}</span>
        </div>
        <p className={styles.kicker}>{categoryLabel}</p>
        <h1>{course.title}</h1>
        <p className={styles.lead}>{course.description}</p>

        <div className={styles.meta}>
          <span>{course.level}</span>
          <span>{course.duration}</span>
          <span>⭐ {course.rating.toFixed(1)}</span>
          <span className={styles.price}>R${course.price.toFixed(2)}</span>
        </div>

        <div className={styles.actions}>
          <Link className={styles.primary} to="/chat">
            Perguntar no chat NeuroRec
          </Link>
          <button
            type="button"
            className={styles.addCart}
            onClick={() => addToCart(course.id)}
            disabled={cart.includes(course.id)}
          >
            {cart.includes(course.id) ? "No carrinho" : "Adicionar ao carrinho"}
          </button>
          <a className={styles.secondary} href="#conteudo">
            Ver conteúdo do curso
          </a>
        </div>
      </header>

      <section id="conteudo" className={styles.section}>
        <h2>Conteúdo do curso</h2>
        <ul className={styles.syllabus}>
          {course.syllabus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>O que você leva</h2>
        <div className={styles.highlightGrid}>
          {course.highlights.map((item) => (
            <div key={item} className={styles.highlightCard}>
              {item}
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.section}>
          <div className={styles.relatedHeader}>
            <h2>Mais nesta trilha</h2>
            <Link to="/">Ver catálogo completo</Link>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <article key={item.id} className={styles.relatedCard}>
                <p className={styles.relatedCategory}>{item.category}</p>
                <h3>{item.title}</h3>
                <p className={styles.relatedDesc}>{item.description}</p>
                <div className={styles.relatedMeta}>
                  <span>{item.level}</span>
                  <span>{item.duration}</span>
                  <span>⭐ {item.rating.toFixed(1)}</span>
                </div>
                <Link to={`/courses/${item.id}`} className={styles.relatedLink}>
                  Ver detalhes
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
