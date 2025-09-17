import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  rol: string;
  login: (token: string) => void;
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
  const [rol, setRol] = useState(localStorage.getItem("rol") || "");

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
      setRol(localStorage.getItem("rol") || "");
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const login = (token: string) => {
    // Determina el rol por el primer dígito del token
    let rol = "";
    if (token.startsWith("5")) rol = "estudiante";
    else if (token.startsWith("4")) rol = "docente";
    else if (token.startsWith("3")) rol = "administrativo";
    else if (token.startsWith("2")) rol = "escuela";
    else if (token.startsWith("1")) rol = "facultad";
    setIsAuthenticated(true);
    setRol(rol);
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRol("");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};