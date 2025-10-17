import React from "react";
import "../css/ButtonSecundario.css";

interface ButtonSecundarioProps {
  icon: React.ReactNode; // Ícono dinámico (puede ser un componente SVG o JSX)
  text: string; // Texto del botón
  onClick: () => void; // Función que se ejecutará al hacer clic
  className?: string; // Clase adicional para estilos personalizados
}

const ButtonSecundario: React.FC<ButtonSecundarioProps> = ({ icon, text, onClick, className }) => {
  return (
    <button className={`button-secundario ${className || ""}`} onClick={onClick}>
      <span className="button-secundario-icon">{icon}</span>
      <span className="button-secundario-text">{text}</span>
    </button>
  );
};

export default ButtonSecundario;