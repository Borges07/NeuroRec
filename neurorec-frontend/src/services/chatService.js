import { api } from "./api.js";

export const sendMessage = async (message) => {
  const { data } = await api.post("/chat", { message });
  return data;
};
