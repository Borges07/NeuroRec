import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";
import styles from "./MyCourses.module.css";

export function MyCourses() {
  const { myCoursesList } = useCart();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Meus cursos</p>
          <h1>Conteúdos liberados</h1>
          <p className={styles.subtitle}>
            Acesse os cursos já adicionados após finalizar a compra.
          </p>
        </div>
        <Link className={styles.back} to="/">
          Voltar ao catálogo
        </Link>
      </header>

      {myCoursesList.length === 0 ? (
        <div className={styles.empty}>
          <h3>Nenhum curso comprado ainda</h3>
          <p>Finalize uma compra para liberar seu conteúdo.</p>
          <Link className={styles.cta} to="/">
            Ver cursos
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {myCoursesList.map((course) => (
            <article key={course.id} className={styles.card}>
              <span className={styles.category}>{course.category}</span>
              <h3>{course.title}</h3>
              <p className={styles.desc}>{course.description}</p>
              <div className={styles.meta}>
                <span>{course.level}</span>
                <span>{course.duration}</span>
                <span>⭐ {course.rating.toFixed(1)}</span>
              </div>
              <div className={styles.actions}>
                <Link to={`/courses/${course.id}`} className={styles.link}>
                  Acessar conteúdo
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
