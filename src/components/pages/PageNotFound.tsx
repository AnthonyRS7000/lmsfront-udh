import React from "react";
import "../css/PageNotFound.css";

const PageNotFound: React.FC = () => (
  <div className="page-notfound-root">
    <div className="page-notfound-card">
      <h1 className="page-notfound-title">404</h1>
      <h2 className="page-notfound-subtitle">Página no encontrada</h2>
      <p className="page-notfound-text">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <a className="page-notfound-link" href="/">
        Volver al inicio
      </a>
    </div>
  </div>
);

export default PageNotFound;