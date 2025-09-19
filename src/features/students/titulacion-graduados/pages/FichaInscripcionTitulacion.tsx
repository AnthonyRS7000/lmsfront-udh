import React, { useState } from 'react';
import '../css/FichaInscripcionTitulacion.css';

const FichaInscripcionTitulacion: React.FC = () => {
  const [accede, setAccede] = useState<'si' | 'no' | ''>('');

  return (
    <div className="tramites-root ficha-titulacion-root">
      <h2 className="tramites-title ficha-titulacion-title">FICHA DE INSCRIPCIÓN PARA TITULACIÓN</h2>

      <div className="tramites-card ficha-titulacion-card">
        <div className="tramites-card-header">
          <h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>¿Desea generar trámite de titulación?</h3>
        </div>
        <div className="tramites-card-body">
          <p style={{ marginTop: 6, color: 'var(--muted)' }}>Continue con su trámite de titulación</p>

          <div className="ficha-titulacion-actions">
            

            {accede === 'si' && (
              <a className="btn-primary" href="#" onClick={(e) => { e.preventDefault(); alert('Generando trámite...'); }}>Generar trámite</a>
            )}

            {accede === 'no' && (
              <div className="notice">No puedes aún acceder a esta opción</div>
            )}
          </div>
        </div>
      </div>
      <select className="yesno-select" value={accede} onChange={(e) => setAccede(e.target.value as any)}>
              <option value="">Seleccione...</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
    </div>
  );
};

export default FichaInscripcionTitulacion;
