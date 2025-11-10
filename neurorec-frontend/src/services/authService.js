import { api } from "./api.js";

export const login = async ({ usernameOrEmail, password }) => {
  const { data } = await api.post("/user/login", { usernameOrEmail, password });

  if (!data?.success) {
    throw new Error(data?.message ?? "Credenciais inválidas");
  }

  return data;
};

export const register = async (payload) => {
  const { data } = await api.post("/user/register", payload);

  if (!data?.success) {
    throw new Error(data?.message ?? "Não foi possível registrar o usuário");
  }

  return data;
};
