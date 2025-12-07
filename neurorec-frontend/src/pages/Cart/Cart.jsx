import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";
import styles from "./Cart.module.css";

export function Cart() {
  const { cartCourses, removeFromCart, finalizePurchase } = useCart();

  const total = cartCourses.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Carrinho</p>
          <h1>Revise sua seleção</h1>
          <p className={styles.subtitle}>
            Ajuste os cursos e finalize para enviá-los para &quot;Meus cursos&quot;.
          </p>
        </div>
        <div className={styles.summary}>
          <span>Total</span>
          <strong>R${total.toFixed(2)}</strong>
          <button
            type="button"
            onClick={finalizePurchase}
            disabled={cartCourses.length === 0}
          >
            Finalizar compra
          </button>
          <Link to="/my-courses">Ir para Meus cursos</Link>
        </div>
      </header>

      {cartCourses.length === 0 ? (
        <div className={styles.empty}>
          <h3>Seu carrinho está vazio</h3>
          <p>Escolha cursos no catálogo.</p>
          <Link className={styles.back} to="/">
            Voltar ao catálogo
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {cartCourses.map((course) => (
            <article key={course.id} className={styles.item}>
              <div>
                <p className={styles.category}>{course.category}</p>
                <h3>{course.title}</h3>
                <p className={styles.desc}>{course.description}</p>
                <div className={styles.meta}>
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                  <span>⭐ {course.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className={styles.itemActions}>
                <strong>R${course.price.toFixed(2)}</strong>
                <button type="button" onClick={() => removeFromCart(course.id)}>
                  Remover
                </button>
                <Link to={`/courses/${course.id}`}>Ver conteúdo</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
