import styles from "./CourseCard.module.css";

export function CourseCard({ course }) {
  if (!course) return null;

  const price = Number(course.price ?? 0);
  const preview = Number(course.preview ?? 0);

  return (
    <article className={styles.card}>
      <span className={styles.category}>{course.category}</span>
      <h4 className={styles.name}>{course.name}</h4>
      <p className={styles.description}>
        {course.description ?? "Descrição indisponível no momento."}
      </p>
      <div className={styles.meta}>
        <span className={styles.price}>R${price.toFixed(2)}</span>
        <span className={styles.rating}>⭐ {preview.toFixed(1)}</span>
      </div>
    </article>
  );
}
