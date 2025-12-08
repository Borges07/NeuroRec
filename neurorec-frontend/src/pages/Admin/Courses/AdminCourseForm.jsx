import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { categories } from "../../../data/courses.js";
import {
  createCourse,
  getCourseById,
  updateCourse,
} from "../../../services/adminCourseService.js";
import styles from "./AdminCourseForm.module.css";

const initialState = {
  name: "",
  category: categories[0]?.id ?? "",
  description: "",
  price: 0,
  preview: 0,
};

export function AdminCourseForm() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const isEditing = Boolean(courseId);

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
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
      name: data.name ?? "",
      category: data.category ?? "",
      description: data.description ?? "",
      price: data.price ?? 0,
      preview: data.preview ?? 0,
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
      name: form.name,
      category: form.category,
      description: form.description,
      price: Number(form.price) || 0,
      preview: Number(form.preview) || 0,
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
            Persistido no backend: apenas admins autenticados podem salvar.
          </p>
        </div>
        <Link className={styles.back} to="/admin/courses">
          Voltar
        </Link>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <div className={styles.grid}>
          <label>
            Categoria
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              list="category-options"
              placeholder="tech / data / design..."
              required
            />
            <datalist id="category-options">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </datalist>
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
            Preview / Nota
            <input
              name="preview"
              type="number"
              step="0.1"
              value={form.preview}
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
