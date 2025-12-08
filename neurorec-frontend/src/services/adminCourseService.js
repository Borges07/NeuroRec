import { api } from "./api.js";

export async function listCourses() {
  const { data } = await api.get("/courses");
  return data;
}

export async function getCourseById(id) {
  const { data } = await api.get(`/courses/${id}`);
  return data;
}

export async function createCourse(payload) {
  const { data } = await api.post("/courses", payload);
  return data;
}

export async function updateCourse(id, payload) {
  const { data } = await api.put(`/courses/${id}`, payload);
  return data;
}

export async function deleteCourse(id) {
  await api.delete(`/courses/${id}`);
  return true;
}
