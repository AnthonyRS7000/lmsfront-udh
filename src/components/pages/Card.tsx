import React from "react";
import "../css/Card.css";

interface CardProps {
  children: React.ReactNode; // Contenido dinámico dentro del card
  className?: string; // Clase adicional para estilos personalizados
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`card-container ${className || ""}`}>{children}</div>;
};

export default Card;