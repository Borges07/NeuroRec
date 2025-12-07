const STORAGE_KEY = "neurorec_admin_courses";

function loadCourses() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Erro ao ler cursos salvos:", error);
    return [];
  }
}

function persistCourses(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function bootstrapCourses(seedCourses) {
  if (loadCourses().length === 0 && Array.isArray(seedCourses)) {
    persistCourses(seedCourses);
  }
}

export async function listCourses() {
  return loadCourses();
}

export async function getCourseById(id) {
  return loadCourses().find((course) => course.id === id) || null;
}

export async function createCourse(course) {
  const courses = loadCourses();
  const id = course.id || `${Date.now()}`;
  const newCourse = { ...course, id };
  persistCourses([newCourse, ...courses]);
  return newCourse;
}

export async function updateCourse(id, data) {
  const courses = loadCourses();
  const next = courses.map((course) =>
    course.id === id ? { ...course, ...data, id } : course
  );
  persistCourses(next);
  return next.find((course) => course.id === id) || null;
}

export async function deleteCourse(id) {
  const courses = loadCourses().filter((course) => course.id !== id);
  persistCourses(courses);
  return true;
}
