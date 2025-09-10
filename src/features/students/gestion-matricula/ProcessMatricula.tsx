import React from 'react';
import './TramitePage.css';

const ProcessMatricula: React.FC = () => {
  return (
    <div className="process-matricula-root">
      <h3 className="process-title">Ficha de inscripción por cursos</h3>
      <div className="process-table-wrap">
        <table className="process-table">
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>ASIGNATURAS</th>
              <th>CICLO</th>
              <th>CRÉD.</th>
              <th>SECCIÓN</th>
              <th>INSCRIBIR</th>
            </tr>
          </thead>
          <tbody>
            {/* Filas de ejemplo para maquetar la vista */}
            {Array.from({ length: 12 }).map((_, i) => (
              <tr key={i}>
                <td>01L{5000 + i}</td>
                <td>ASIGNATURA DE EJEMPLO {i + 1}</td>
                <td>{(i % 6) + 1}</td>
                <td>{3}</td>
                <td>A</td>
                <td><input type="checkbox" aria-label={`Inscribir ${i}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessMatricula;
