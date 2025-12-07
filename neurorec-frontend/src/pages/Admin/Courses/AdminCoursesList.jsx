import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { courses as seedCourses } from "../../../data/courses.js";
import {
  bootstrapCourses,
  deleteCourse,
  listCourses,
} from "../../../services/adminCourseService.js";
import styles from "./AdminCoursesList.module.css";

export function AdminCoursesList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    bootstrapCourses(seedCourses);
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listCourses();
      setCourses(data);
    } catch (err) {
      setError("Erro ao carregar cursos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja remover este curso?")) return;
    await deleteCourse(id);
    load();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Admin</p>
          <h1>Catálogo de cursos</h1>
          <p className={styles.subtitle}>
            Mock local: os cursos são guardados no navegador (localStorage).
          </p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => load()}>
            Recarregar
          </button>
          <button type="button" onClick={() => navigate("/admin/courses/new")}>
            Novo curso
          </button>
        </div>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <div className={styles.empty}>Carregando...</div>
      ) : courses.length === 0 ? (
        <div className={styles.empty}>
          <h3>Nenhum curso cadastrado</h3>
          <p>Adicione um curso para iniciar o catálogo.</p>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Título</span>
            <span>Categoria</span>
            <span>Preço</span>
            <span>Nível</span>
            <span>Ações</span>
          </div>
          {courses.map((course) => (
            <div key={course.id} className={styles.row}>
              <div>
                <strong>{course.title}</strong>
                <p className={styles.desc}>{course.description}</p>
              </div>
              <span>{course.category}</span>
              <span>R${Number(course.price ?? 0).toFixed(2)}</span>
              <span>{course.level}</span>
              <div className={styles.actions}>
                <Link to={`/admin/courses/${course.id}/edit`}>Editar</Link>
                <button type="button" onClick={() => handleDelete(course.id)}>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
