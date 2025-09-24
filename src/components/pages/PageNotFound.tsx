import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/PageNotFound.css";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };
  return (
  <div className="page-notfound-root">
    <div className="page-notfound-card">
      <h1 className="page-notfound-title">404</h1>
      <h2 className="page-notfound-subtitle">Página no encontrada</h2>
      <p className="page-notfound-text">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <a className="page-notfound-link" onClick={handleGoBack}>
        Volver
      </a>
    </div>
  </div>
  );
};

export default PageNotFound;