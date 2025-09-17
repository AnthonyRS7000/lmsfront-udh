import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  rol: string;
  login: (token: string, rol: string) => void;
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

  const login = (token: string, rol: string) => {
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
