import React, { useEffect, useState } from 'react';
import '../css/Reglamento.css';

const Reglamento: React.FC = () => {

  const [pdfUrl, setPdfUrl] = useState(''); // Variable para el link del PDF
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simulación de llamada a API
    const fetchData = async () => {
      setCargando(true);
      try {
        // Reemplaza por tu endpoint real
        const response = await fetch('/api/malla-curricular');
        const data = await response.json();
        setPdfUrl(data.pdfUrl || 'http://www.udh.edu.pe/doc/reglamentoestudiospregrado.pdf');
      } catch (error) {
        setPdfUrl('http://www.udh.edu.pe/doc/reglamentoestudiospregrado.pdf');
      }
      setCargando(false);
    };
    fetchData();
  }, []);
  
  return (
    <div className="reglamento-container">
      <h2 className="reglamento-title">Reglamento Del Estudiante</h2>
      <div className="reglamento-card">
        <div className="reglamento-info">
          {cargando ? (
            <div className="malla-cargando">Cargando PDF...</div>
          ) : (
            <div className="malla-pdf-viewer">
              <iframe
                src={pdfUrl}
                title="Malla Curricular PDF"
                width="100%"
                height="980px"
                frameBorder="0"
              />
            </div>
          )}
        </div>
        {/* Puedes agregar aquí más contenido, enlaces o documentos */}
      </div>
    </div>
  );
};

export default Reglamento;