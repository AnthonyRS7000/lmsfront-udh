import React from "react";
import ButtonPrincipal from "./ButtonPrincipal";
import "../css/CardItems.css";

interface CardItemsProps {
  title: string; // Título del card
  image: string; // URL de la imagen
  description: string; // Descripción del contenido
  buttons: { text: string; icon: React.ReactNode; onClick: () => void }[]; // Botones en el footer
  footerText?: React.ReactNode; // Texto adicional en el footer (puede incluir JSX)
}

const CardItems: React.FC<CardItemsProps> = ({ title, image, description, buttons, footerText }) => {
    return (
        <div className="card-items-container">
        {/* Header */}
        <div className="card-items-header">
            <h3 className="card-items-title">{title}</h3>
        </div>

        {/* Content */}
        <div className="card-items-content">
            <img src={image} alt={title} className="card-items-image" />
            <p className="card-items-description">{description}</p>
        </div>

        {/* Footer */}
        <div className="card-items-footer">
            <div className="card-items-buttons">
            {buttons.map((button, index) => (
                <ButtonPrincipal
                key={index}
                icon={button.icon}
                text={button.text}
                onClick={button.onClick}
                className="card-items-button"
                />
            ))}
            </div>
            {footerText && <div className="card-items-footer-text">{footerText}</div>}
        </div>
        </div>
    );
};

export default CardItems;