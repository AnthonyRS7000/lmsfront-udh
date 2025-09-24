import React, { useState } from "react";
import "../css/AnulacionTaller.css"; // Asegúrate de tener un archivo CSS para estilos personalizados
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const AnulacionTaller = () => {
  const [semestre, setSemestre] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Trámite enviado con los siguientes datos:\nSemestre: ${semestre}`);
  };

  return (
    <div className="anulacion-taller-card">
        <h1 className="anulacion-taller-title">ANULACIÓN DE TALLER</h1>
        <p className="anulacion-taller-description">
            Sr. Decano de la Facultad de INGENIERÍA, ante usted expongo, que teniendo la necesidad de anular algunos talleres para la expedición de mi Certificado de Estudios, solicito a su despacho tenga a bien acceder a mi petición, para ello adjunto los siguientes datos:
        </p>
        <form onSubmit={handleSubmit} className="anulacion-taller-form">
            <label htmlFor="semestre" className="anulacion-taller-label">
            Semestre(s) en el cual llevaron los talleres:
            </label>
            <textarea
            id="semestre"
            name="semestre"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            className="anulacion-taller-textarea"
            placeholder="Sr. Alumno(a) mencionar los nombres completos del taller o talleres a anular."
            ></textarea>
            <p className="anulacion-taller-footer">
            Es todo cuanto informo a su despacho.
            </p>
            <p className="anulacion-taller-cost">( Costo: S/. 5.00 )</p>
            <button type="submit" className="anulacion-taller-submit-btn">
            <PaperAirplaneIcon className="anulacion-taller-submit-icon" />
            Enviar
            </button>
        </form>
    </div>
);
};

export default AnulacionTaller;