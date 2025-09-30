import React, { useEffect, useState } from 'react';
import '../css/MallaCurricular.css';

const MallaCurricular: React.FC = () => {
  const [nombreCarrera, setNombreCarrera] = useState(''); // Variable para el título
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
        setNombreCarrera(data.nombreCarrera || 'Ingeniería de Sistemas');
        setPdfUrl(data.pdfUrl || 'https://www.africau.edu/images/default/sample.pdf');
      } catch (error) {
        setNombreCarrera('INGENIERÍA DE SISTEMAS');
        setPdfUrl('http://www.udh.edu.pe/doc/mallaingsistemas.pdf');
      }
      setCargando(false);
    };
    fetchData();
  }, []);

  return (
    <div className="malla-container">
      {/* Usar estilos de TituloPage */}
      <div className="titulo-page-container">
        <h1 className="titulo-page">Malla Curricular</h1>
      </div>
      <div className="malla-card">
        <h3 className="malla-carrera">{nombreCarrera}</h3>
        {cargando ? (
          <div className="malla-cargando">Cargando PDF...</div>
        ) : (
          <div className="malla-pdf-viewer">
            <iframe
              src={pdfUrl}
              title="Malla Curricular PDF"
              width="100%"
              height="859px"
              frameBorder="0"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MallaCurricular;