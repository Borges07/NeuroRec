import { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const displayName = useMemo(() => {
    if (!user) return "Visitante";
    if (user.nome) return user.nome;
    if (user.userName) return user.userName;
    if (user.email) return user.email;
    return "Usuário";
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        NeuroRec
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/my-courses"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Meus cursos
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Carrinho
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Admin
          </NavLink>
        )}
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Chat
        </NavLink>

        <NavLink
          to="/Courses"
          end
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          cursos
        </NavLink>
      </nav>

      <div className={styles.actions}>
        {isAuthenticated ? (
          <>
            <span className={styles.userBadge}>Olá, {displayName}</span>
            <button
              type="button"
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link className={styles.actionBtn} to="/login">
              Entrar
            </Link>
            <Link className={styles.actionBtn} to="/register">
              Criar conta
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
