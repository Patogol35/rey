import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Esperar a que cargue el estado (evita parpadeos)
  if (loading) return null;

  // Si ya está logueado → lo sacas del login
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
