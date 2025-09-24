import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [rol, setRol] = useState(localStorage.getItem("rol")?.toLowerCase() || "");
  const navigate = useNavigate();

  const login = (token: string, rol: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol.toLowerCase());
    setIsAuthenticated(true);
    setRol(rol.toLowerCase());

    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setIsAuthenticated(false);
    setRol("");

    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const rol = localStorage.getItem("rol");

      setIsAuthenticated(!!token);
      setRol(rol || "");
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
