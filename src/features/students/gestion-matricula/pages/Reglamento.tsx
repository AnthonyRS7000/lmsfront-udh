import React, { useEffect, useState } from 'react';
import '../css/Reglamento.css';
import TituloPage from '../../../../components/pages/TituloPage';
import Card from '../../../../components/pages/Card';
import Loading from '../../../../components/pages/Loading';
import DatosNoEncontrados from '../../../../components/pages/DatosNoEncontrados';


const Reglamento: React.FC = () => {

  const [pdfUrl, setPdfUrl] = useState(''); // Variable para el link del PDF
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulación de llamada a API
    const fetchData = async () => {
      try {
        setLoading(true);
        // Reemplaza por tu endpoint real
        const response = await fetch('/api/malla-curricular');
        const data = await response.json();
        setPdfUrl(data.pdfUrl || 'http://www.udh.edu.pe/doc/reglamentoestudiospregrado.pdf');
      } catch (error) {
        setPdfUrl('http://www.udh.edu.pe/doc/reglamentoestudiospregrado.pdf');
        //setError(true);
      }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="reglamento-container">
      <TituloPage titulo="Reglamento Del Estudiante" />
      <Card>
        <div className="reglamento-info">
          {loading ? (
            <Loading />
          ) : error ? (
            <DatosNoEncontrados />
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
      </Card>
    </div>
  );
};

export default Reglamento;