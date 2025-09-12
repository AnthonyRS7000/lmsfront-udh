import React from 'react';
import '../css/Reglamento.css';

const Reglamento: React.FC = () => {
  const pdfPath = '/src/features/students/gestion-matricula/reglamentoestudiospregrado.pdf';

  return (
    <div className="reglamento-root">
      <h2 className="reglamento-title">Reglamento del Estudiante</h2>

      <div className="reglamento-card">
        <iframe
          src={pdfPath}
          title="Reglamento del Estudiante"
          className="reglamento-pdf"
        />
      </div>
    </div>
  );
};

export default Reglamento;
