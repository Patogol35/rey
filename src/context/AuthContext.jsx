import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserProfile } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================
  // 🔄 RECUPERAR TOKENS
  // =====================
  useEffect(() => {
    const savedAccess = localStorage.getItem("access");
    const savedRefresh = localStorage.getItem("refresh");

    if (savedAccess) setAccess(savedAccess);
    if (savedRefresh) setRefresh(savedRefresh);

    // 👇 Si NO hay token, terminamos loading de una
    if (!savedAccess) {
      setLoading(false);
    }
  }, []);

  // =====================
  // 👤 OBTENER PERFIL
  // =====================
  useEffect(() => {
    const fetchProfile = async () => {
      if (!access) {
        setUser(null);
        return;
      }

      try {
        const data = await getUserProfile(access);
        setUser(data);
      } catch (err) {
        console.error("Error obteniendo perfil:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [access]);

  const isAuthenticated = !!access;

  // =====================
  // 🔐 LOGIN
  // =====================
  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
    setAccess(accessToken);
    setRefresh(refreshToken);
  };

  // =====================
  // 🚪 LOGOUT
  // =====================
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
    setRefresh(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      access,
      refresh,
      user,
      isAuthenticated,
      login,
      logout,
      loading,
    }),
    [access, refresh, user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
