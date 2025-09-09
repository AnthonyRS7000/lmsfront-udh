import React, { useState } from "react";
import "../css/evaluacionDocente.css";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

interface Evaluacion {
  id: number;
  docente: string;
  curso: string;
  promedio: number; // De 0 a 20
  comentarios: string;
}

const EvaluacionDocente: React.FC = () => {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([
    {
      id: 1,
      docente: "Carlos Gómez",
      curso: "Programación Web",
      promedio: 18.2,
      comentarios: "Explica con claridad, excelente dominio del tema."
    },
    {
      id: 2,
      docente: "Lucía Ramos",
      curso: "Base de Datos",
      promedio: 16.5,
      comentarios: "Muy buena, aunque debe mejorar el tiempo de respuesta."
    },
  ]);

  return (
    <div className="evaluacion-container">
      <div className="evaluacion-header">
        <h2 className="evaluacion-title">
          <ClipboardDocumentCheckIcon className="icono-titulo" />
          Evaluación Docente
        </h2>
        <p className="evaluacion-subtitle">
          Resultados consolidados de encuestas estudiantiles.
        </p>
      </div>

      <div className="tabla-container">
        <table className="tabla-evaluacion">
          <thead>
            <tr>
              <th>Docente</th>
              <th>Curso</th>
              <th>Promedio</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.length > 0 ? (
              evaluaciones.map((eva) => (
                <tr key={eva.id}>
                  <td>{eva.docente}</td>
                  <td>{eva.curso}</td>
                  <td>{eva.promedio.toFixed(1)}</td>
                  <td>{eva.comentarios}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="texto-vacio">
                  No hay resultados registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvaluacionDocente;