import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import {
  login as loginRequest,
  register as registerRequest,
} from "../services/authService.js";

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

  const register = useCallback(async (payload) => registerRequest(payload), []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    persistSession(null, null);
  }, [persistSession]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
      register,
    }),
    [token, user, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
