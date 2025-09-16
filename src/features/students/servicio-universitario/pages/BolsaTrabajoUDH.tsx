import React from 'react';
import '../css/BolsaTrabajoUDH.css';

const BolsaTrabajoUDH: React.FC = () => {
  return (
    <div className="tramites-root bolsa-trabajo-root">
      <h2 className="tramites-title bolsa-trabajo-title">BOLSA DE TRABAJO UDH</h2>

      <div className="tramites-card bolsa-trabajo-card">
        <div className="tramites-card-header">
          <h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>Ofertas exclusivas</h3>
        </div>
        <div className="tramites-card-body">
          <p style={{ marginTop: 4, color: 'var(--muted)', fontWeight: 600 }}>Ofertas de empleo exclusivas para nuestros estudiantes y egresados</p>
          <div className="action-center">
            <a className="btn-primary" href="https://udh.hiringroomcampus.com/" target="_blank" rel="noreferrer">Ir a Bolsa de Trabajo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BolsaTrabajoUDH;
