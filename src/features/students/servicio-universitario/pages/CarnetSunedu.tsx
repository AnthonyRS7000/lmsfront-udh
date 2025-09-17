import React, { useState } from 'react';
import '../css/CarnetSunedu.css';

const CarnetSunedu: React.FC = () => {
  const [tipo, setTipo] = useState('');

  return (
    <div className="tramites-root carnet-root">
      <h2 className="tramites-title">GENERA RECIBOS DE PAGO</h2>

      <div className="tramites-card carnet-card">
        <div className="tramites-card-header">
          <h2 className="carnet-header-title">DATOS DEL TRÁMITE</h2>
        </div>
        <div className="tramites-card-body">
          <label className="carnet-label" htmlFor="tipo-tramite">TIPO DE TRÁMITE:</label>

          <div className="carnet-select-wrap">
            <select
              id="tipo-tramite"
              className="carnet-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Seleccione...</option>
              <option value="carnet-2025-2">CARNET UNIVERSITARIO 2025-2 (SUNEDU)</option>
            </select>
          </div>

          <div className="carnet-divider" />

          <div className="carnet-empty" />
        </div>
      </div>
    </div>
  );
};

export default CarnetSunedu;
