import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { courses as seedCourses, categories } from "../../../data/courses.js";
import {
  bootstrapCourses,
  createCourse,
  getCourseById,
  updateCourse,
} from "../../../services/adminCourseService.js";
import styles from "./AdminCourseForm.module.css";

const initialState = {
  title: "",
  category: categories[0]?.id ?? "",
  description: "",
  duration: "",
  level: "",
  price: 0,
  rating: 4.0,
  highlights: "",
  syllabus: "",
};

export function AdminCourseForm() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const isEditing = Boolean(courseId);

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
    bootstrapCourses(seedCourses);
    if (isEditing) {
      loadCourse();
    }
  }, [courseId]);

  const loadCourse = async () => {
    const data = await getCourseById(courseId);
    if (!data) {
      setError("Curso não encontrado.");
      return;
    }
    setForm({
      ...data,
      highlights: (data.highlights || []).join("\n"),
      syllabus: (data.syllabus || []).join("\n"),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      duration: form.duration,
      level: form.level,
      price: Number(form.price) || 0,
      rating: Number(form.rating) || 0,
      highlights: form.highlights
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      syllabus: form.syllabus
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing) {
        await updateCourse(courseId, payload);
      } else {
        await createCourse(payload);
      }
      navigate("/admin/courses", { replace: true });
    } catch (err) {
      setError("Falha ao salvar o curso.");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Admin</p>
          <h1>{isEditing ? "Editar curso" : "Novo curso"}</h1>
          <p className={styles.subtitle}>
            Apenas mock local — os dados ficam no navegador.
          </p>
        </div>
        <Link className={styles.back} to="/admin/courses">
          Voltar
        </Link>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Título
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <div className={styles.grid}>
          <label>
            Categoria
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Duração
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Ex: 20h"
            />
          </label>

          <label>
            Nível
            <input
              name="level"
              value={form.level}
              onChange={handleChange}
              placeholder="Iniciante/Intermediário/Avançado"
            />
          </label>

          <label>
            Preço
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
            />
          </label>

          <label>
            Nota
            <input
              name="rating"
              type="number"
              step="0.1"
              value={form.rating}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Descrição
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <label>
          Destaques (1 por linha)
          <textarea
            name="highlights"
            value={form.highlights}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <label>
          Conteúdo/Syllabus (1 por linha)
          <textarea
            name="syllabus"
            value={form.syllabus}
            onChange={handleChange}
            rows={5}
          />
        </label>

        <div className={styles.actions}>
          <button type="submit">
            {isEditing ? "Salvar alterações" : "Criar curso"}
          </button>
          <Link to="/admin/courses" className={styles.cancel}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
