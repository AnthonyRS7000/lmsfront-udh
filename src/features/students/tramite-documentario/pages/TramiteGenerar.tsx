import React, { useState } from 'react';
import '../css/TramiteDocumentario.css';

const TIPOS_TRAMITE = [
  { value: 'ANULACION_DE_NOTA', label: 'ANULACION DE NOTA' },
  // Puedes agregar más tipos aquí
];

const TramiteDocumentario: React.FC = () => {
  const [tipoTramite, setTipoTramite] = useState('ANULACION_DE_NOTA');
  const [detalle, setDetalle] = useState('');

  return (
    <div className="tramite-documentario-root">
      <h2 className="rend-acad-title">Generar Trámite Documentario</h2>
      {/* Card de selección de trámite */}
      <div className="tramite-documentario-card tramite-documentario-card-select">
        <label className="tramite-documentario-label" htmlFor="tipo-tramite">
          TIPO DE TRÁMITE:
        </label>
        <select
          id="tipo-tramite"
          className="tramite-documentario-select"
          value={tipoTramite}
          onChange={e => setTipoTramite(e.target.value)}
        >
          {TIPOS_TRAMITE.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Card del formulario según trámite */}
      <div className="tramite-documentario-card tramite-documentario-card-form">
        {tipoTramite === 'ANULACION_DE_NOTA' && (
          <form className="tramite-documentario-form">
            <h2 className="tramite-documentario-title">TRAMITE: ANULACION DE NOTA</h2>
            <p>
              Sr. Decano de la Facultad de INGENIERÍA, ante usted expongo, que teniendo la necesidad de anular la(s) nota(s) de los siguiente(s) curso(s) solicito a su despacho tenga a bien atender lo solicitado, para ello adjunto los siguientes datos:
            </p>
            <div className="tramite-documentario-form-row">
              <label htmlFor="detalle" className="tramite-documentario-form-label">
                Semestre(s) en el cual llevaron los curso(s):
              </label>
              <textarea
                id="detalle"
                className="tramite-documentario-textarea"
                value={detalle}
                onChange={e => setDetalle(e.target.value)}
                rows={6}
                placeholder="Sr. Alumno(a) mencionar los nombres completos del curso a anular."
              />
            </div>
            <div className="tramite-documentario-ayuda">
              <span>Sr. Alumno(a) mencionar los nombres completos del curso a anular.</span>
            </div>
            <p>Es todo cuanto informo a su despacho.</p>
            <div className="tramite-documentario-costo">
              <b>( Costo: S/. 5.00 )</b>
            </div>
            <div className="tramite-documentario-btn-row">
              <button type="submit" className="tramite-documentario-btn-enviar">
                <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Enviar" style={{ width: 24, marginRight: 6, verticalAlign: 'middle' }} />
                Enviar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TramiteDocumentario;