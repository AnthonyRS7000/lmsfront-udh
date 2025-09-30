import React from 'react';
import '../css/BolsaTrabajoUDH.css';

const BolsaTrabajoUDH: React.FC = () => {
  return (
    <div className="bolsa-trabajo-root">
      <h2 className="bolsa-trabajo-title">Bolsa de Trabajo UDH</h2>

      <div className="bolsa-trabajo-card">
        <div className="bolsa-trabajo-card-header">
          <h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>Ofertas exclusivas</h3>
        </div>
        <div className="bolsa-trabajo-card-body">
          <p style={{ marginTop: 4, color: 'var(--muted)', fontWeight: 600 }}>Ofertas de empleo exclusivas para nuestros estudiantes y egresados</p>
          <div className="bolsa-trabajo-action-center">
            <a className="btn-primary bolsa-trabajo-btn-primary" href="https://udh.hiringroomcampus.com/" target="_blank" rel="noreferrer">Ir a Bolsa de Trabajo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BolsaTrabajoUDH;
