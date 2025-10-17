// src/context/AuthContext.tsx (Puerto 5173)
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
  // Validar si viene de logout (URL contiene /login)
  const isLoginPage = window.location.pathname.includes('/login');
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (isLoginPage) {
      localStorage.clear(); // Limpiar al entrar a login
      return false;
    }
    return !!localStorage.getItem("token");
  });

  const [rol, setRol] = useState(() => {
    if (isLoginPage) return "";
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario).rol?.toLowerCase() || "" : "";
  });

  const login = (token: string, usuario: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setIsAuthenticated(true);
    setRol(usuario.rol?.toLowerCase() || "");
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRol("");
  };

  useEffect(() => {
    // Detectar logout desde 5174
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '_logout_flag') {
        logout();
      }
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