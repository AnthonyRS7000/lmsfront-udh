import { useEffect, useState } from 'react';
import '../../students/gestion-matricula/css/Reglamento.css';
import TituloPage from '../../../components/pages/TituloPage';
import Card from '../../../components/pages/Card';
import Loading from '../../../components/pages/Loading';
import { EyeIcon } from '@heroicons/react/24/outline';
import ButtonPrincipal from '../../../components/pages/ButtonPrincipal';


const ManualDocente: React.FC = () => {

  const [pdfUrl, setPdfUrl] = useState(''); // Variable para el link del PDF
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        /*const response = await fetch('/api/malla-curricular');
        const data = await response.json();
        setPdfUrl(data.pdfUrl);*/
        setPdfUrl('http://www.udh.edu.pe/websauh/manualdocente.pdf');
      } catch (error) {
        setError(true);
      }finally {
        setLoading(false);
      }
    };
    fetchData();

     // Detectar si el dispositivo es móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Cambia el estado según el ancho de la pantalla
    };

    handleResize(); // Ejecutar al cargar la página
    window.addEventListener('resize', handleResize); // Escuchar cambios de tamaño
    return () => window.removeEventListener('resize', handleResize); // Limpiar el evento
  }, []);
  
  return (
    <div className="reglamento-container">
      <TituloPage titulo="Manual del Docente" />
      <Card>
        <div className="reglamento-info">
          {loading ? (
            <Loading />
          ) : error ? (
            <div>No se encontró el reglamento.</div>
          ) : isMobile ? (
            <div className="reglamento-download">
              <ButtonPrincipal
                icon={<EyeIcon />}
                text="Ver"
                onClick={() => window.open(pdfUrl, '_blank')}
              />
            </div>
          ) : (
            <div className="reglamento-pdf-viewer">
              <iframe
                src={pdfUrl}
                title="Reglamento PDF"
                width="100%"
                height="100%"
                frameBorder="0"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ManualDocente;