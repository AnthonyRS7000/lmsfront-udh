import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  rol: string;
  login: (token: string, usuario: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  rol: "",
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [rol, setRol] = useState(() => {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario).rol?.toLowerCase() || "" : "";
  });

  const login = (token: string, usuario: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setIsAuthenticated(true);
    setRol(usuario.rol?.toLowerCase() || "");

  // Disparar eventos para actualizar otros componentes
  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new Event("user-updated")); // 👈 Nuevo
};

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRol("");

    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const usuario = localStorage.getItem("usuario");

      setIsAuthenticated(!!token);
      setRol(usuario ? JSON.parse(usuario).rol?.toLowerCase() || "" : "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
