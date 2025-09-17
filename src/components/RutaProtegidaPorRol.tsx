import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutaProtegidaPorRol: React.FC<{ children: React.ReactNode; rolPermitido: string }> = ({ children, rolPermitido }) => {
  const { isAuthenticated, rol } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (rol !== rolPermitido) {
    // Si está autenticado pero no tiene el rol correcto, lo puedes redirigir a su dashboard
    if (rol === "estudiante") return <Navigate to="/estudiante" replace />;
    if (rol === "docente") return <Navigate to="/docente" replace />;
    if (rol === "administrativo") return <Navigate to="/administrativo" replace />;
    if (rol === "escuela") return <Navigate to="/escuela" replace />;
    if (rol === "facultad") return <Navigate to="/facultad" replace />;
    // O simplemente a la raíz
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default RutaProtegidaPorRol;