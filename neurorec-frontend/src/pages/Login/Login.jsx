import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./Login.module.css";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      const redirectTo = location.state?.from?.pathname ?? "/chat";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        err?.message ??
        "Falha ao entrar. Tente novamente.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>
          Login<span>.</span>
        </h1>
        <p className={styles.subtitle}>
          Não tem uma conta? <Link to="/register">Crie uma agora</Link>
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="usernameOrEmail">
            Usuário ou Email
          </label>
          <input
            className={styles.input}
            id="usernameOrEmail"
            name="usernameOrEmail"
            type="text"
            placeholder="Digite seu usuário ou email"
            value={form.usernameOrEmail}
            onChange={handleChange}
            required
          />

          <label className={styles.label} htmlFor="password">
            Senha
          </label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <Link className={styles.forgot} to="#">
            Esqueceu sua senha?
          </Link>
        </form>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
