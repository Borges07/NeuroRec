import { api } from "./api.js";

const normalizeCourse = (course) => {
  if (!course) return null;

  const id =
    course.id ??
    course.title ??
    course.name ??
    `course-${Date.now()}`;
  const description = course.description ?? "Sem descrição";

  const highlights = Array.isArray(course.highlights)
    ? course.highlights
    : description
      .split(".")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3);

  const syllabus = Array.isArray(course.syllabus)
    ? course.syllabus
    : [];

  return {
    id: String(id),
    title: course.title ?? course.name ?? "Curso",
    category: course.category ?? "geral",
    description,
    duration: course.duration ?? "Livre",
    level: course.level ?? "Geral",
    price: Number(course.price ?? 0),
    rating: Number(course.preview ?? course.rating ?? 4.5) || 4.5,
    highlights,
    syllabus,
  };
};

// export async function fetchCourses() {
//   const { data } = await api.get("/courses");
//   const normalized = Array.isArray(data)
//     ? data.map(normalizeCourse).filter(Boolean)
//     : [];

//   return normalized;
// }

export async function fetchCourses() {
  const response = await fetch("http://localhost:8080/courses");
  const raw = await response.json();

  // NORMALIZAÇÃO
  const normalized = raw.map((course) => ({
    id: course.id,
    title: course.name || "Sem título",
    description: course.description || "Sem descrição",
    category: course.category || "Geral",
    price: Number(course.price) || 0,

    // Campos que ainda NÃO existem no banco
    duration: course.duration || "",  // vazio por enquanto
    level: course.level || "Livre",   // padrão
    rating: course.rating || 5,       // default
    highlights: course.highlights || [], // array sempre
  }));

  return normalized;
}

export async function fetchCourseById(id) {
  const { data } = await api.get(`/courses/${id}`);
  const course = normalizeCourse(data);
  return course;
}
