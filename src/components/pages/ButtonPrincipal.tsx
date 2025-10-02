import React from "react";
import "../css/ButtonPrincipal.css";

interface ButtonPrincipalProps {
  icon: React.ReactNode; // Ícono dinámico (puede ser un componente SVG o JSX)
  text: string; // Texto del botón
  onClick: () => void; // Función que se ejecutará al hacer clic
  className?: string; // Clase adicional para estilos personalizados
}

const ButtonPrincipal: React.FC<ButtonPrincipalProps> = ({ icon, text, onClick, className }) => {
  return (
    <button className={`button-principal ${className || ""}`} onClick={onClick}>
      <span className="button-icon">{icon}</span>
      <span className="button-text">{text}</span>
    </button>
  );
};

export default ButtonPrincipal;