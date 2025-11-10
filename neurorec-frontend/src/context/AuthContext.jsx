import { createContext, useCallback, useMemo, useState } from "react";
import {
  login as loginRequest,
  register as registerRequest,
} from "../services/authService.js";

export const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = "neurorec_token";
const USER_STORAGE_KEY = "neurorec_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = Boolean(token);

  const persistSession = useCallback((nextToken, nextUser) => {
    if (nextToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    if (nextUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  const login = useCallback(
    async (credentials) => {
      const response = await loginRequest(credentials);

      const nextToken = response.token;
      const nextUser = {
        userName: response.user?.userName ?? credentials.usernameOrEmail,
        email: response.user?.email ?? null,
      };

      setToken(nextToken);
      setUser(nextUser);
      persistSession(nextToken, nextUser);

      return response;
    },
    [persistSession]
  );

  const register = useCallback(async (payload) => {
    const response = await registerRequest(payload);

    if (response.user) {
      setUser({
        userName: response.user.userName,
        email: response.user.email,
        nome: response.user.nome,
      });
    }

    return response;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    persistSession(null, null);
  }, [persistSession]);

  const value = useMemo(
    () => ({ token, user, isAuthenticated, login, logout, register }),
    [token, user, isAuthenticated, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
