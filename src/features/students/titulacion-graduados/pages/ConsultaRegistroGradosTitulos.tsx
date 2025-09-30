import React from 'react';
import '../css/ConsultaRegistroGradosTitulos.css';
import '../../../../components/css/TituloPage.css';

const ConsultaRegistroGradosTitulos: React.FC = () => {
  return (
    <div className="tramites-root consulta-registros-root">
      <div className="titulo-page-container">
        <h2 className="titulo-page">Consulta de Registro de Grados y Títulos</h2>
      </div>

      <div className="tramites-card consulta-registros-card">
        <div className="tramites-card-header">
          <h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>Consulta pública</h3>
        </div>
        <div className="tramites-card-body">
          <p style={{ marginTop: 4, color: 'var(--muted)', fontWeight: 600 }}>Accede al registro oficial de grados y títulos entregados por la institución.</p>
          <div className="action-center">
            <a className="btn-primary" href="http://tramitegraduadosudh.com/" target="_blank" rel="noreferrer">Ir al registro</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaRegistroGradosTitulos;
