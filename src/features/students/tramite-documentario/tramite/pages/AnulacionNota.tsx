import React from 'react';

const AnulacionNota: React.FC = () => {

  return (
    <div className="tramite-documentario-card tramite-documentario-card-form">
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
    </div>
  );
};

export default AnulacionNota;