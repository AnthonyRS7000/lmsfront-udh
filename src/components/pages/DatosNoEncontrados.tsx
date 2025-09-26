import React from 'react';
import '../css/DatosNoEncontrados.css';
import Homero from "../../assets/homero-pensando.png";

const DatosNoEncontrados: React.FC = () => {
    return (
        <div className="error-container">
            <img
            src={Homero}
            alt="homero-pensando"
            className="error-image"
            />
            <p className="error-message">
            Datos no encontrados o no te encuentras registrado en el presente ciclo
            </p>
        </div>
    );
};

export default DatosNoEncontrados;