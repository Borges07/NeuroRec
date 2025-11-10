import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./Register.module.css";

const initialForm = {
  nome: "",
  userName: "",
  email: "",
  idade: "",
  senha: "",
  confirmPassword: "",
};

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.senha !== form.confirmPassword) {
      setNotification({
        type: "error",
        message: "As senhas precisam ser iguais.",
      });
      return;
    }

    setLoading(true);
    setNotification({ type: "", message: "" });

    try {
      await register({
        nome: form.nome,
        userName: form.userName,
        email: form.email,
        idade: form.idade ? Number(form.idade) : null,
        password: form.senha,
      });

      setNotification({
        type: "success",
        message: "Cadastro realizado com sucesso! Faça login para continuar.",
      });
      setForm(initialForm);
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      const message =
        err?.response?.data?.message ?? "Não foi possível criar sua conta.";
      setNotification({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {notification.message && (
          <div
            className={`${styles.notification} ${styles[notification.type]}`}
          >
            {notification.message}
          </div>
        )}

        <h1>
          Crie sua conta<span>.</span>
        </h1>
        <p className={styles.subtitle}>
          Já tem login? <Link to="/login">Entre com suas credenciais</Link>
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="nome">
            Nome completo
          </label>
          <input
            className={styles.input}
            id="nome"
            name="nome"
            type="text"
            placeholder="Digite seu nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label className={styles.label} htmlFor="userName">
            Nome de usuário
          </label>
          <input
            className={styles.input}
            id="userName"
            name="userName"
            type="text"
            placeholder="Escolha um usuário único"
            value={form.userName}
            onChange={handleChange}
            required
          />

          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className={styles.label} htmlFor="idade">
            Idade (opcional)
          </label>
          <input
            className={styles.input}
            id="idade"
            name="idade"
            type="number"
            min="0"
            placeholder="Sua idade"
            value={form.idade}
            onChange={handleChange}
          />

          <label className={styles.label} htmlFor="senha">
            Senha
          </label>
          <input
            className={styles.input}
            id="senha"
            name="senha"
            type="password"
            placeholder="Crie uma senha segura"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <label className={styles.label} htmlFor="confirmPassword">
            Confirmar senha
          </label>
          <input
            className={styles.input}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repita sua senha"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
