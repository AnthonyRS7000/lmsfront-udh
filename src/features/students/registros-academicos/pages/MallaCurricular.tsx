import React, { useEffect, useState } from 'react';
import '../css/MallaCurricular.css';
import Card from '../../../../components/pages/Card';
import TituloPage from '../../../../components/pages/TituloPage';
import Loading from '../../../../components/pages/Loading';
import { EyeIcon } from '@heroicons/react/24/outline';
import ButtonPrincipal from '../../../../components/pages/ButtonPrincipal';

const MallaCurricular: React.FC = () => {
  const [nombreCarrera, setNombreCarrera] = useState(''); // Variable para el título
  const [pdfUrl, setPdfUrl] = useState(''); // Variable para el link del PDF
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Listado de links de mallas curriculares
  const mallasCurriculares = [
    { escuela: 'DERECHO Y CIENCIAS POLÍTICAS', link: 'http://www.udh.edu.pe/doc/malladerechopresencial.pdf' },
    { escuela: 'OBSTETRICIA', link: 'http://www.udh.edu.pe/doc/mallaobstetricia.pdf' },
    { escuela: 'ENFERMERÍA', link: 'http://www.udh.edu.pe/doc/mallaenfermeria.pdf' },
    { escuela: 'ODONTOLOGÍA', link: 'http://www.udh.edu.pe/doc/mallaodontologia.pdf' },
    { escuela: 'PSICOLOGÍA', link: 'http://www.udh.edu.pe/doc/mallapsicologiapresencial.pdf' },
    { escuela: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA', link: 'http://www.udh.edu.pe/doc/mallaingsistemas.pdf' },
    { escuela: 'INGENIERÍA CIVIL', link: 'http://www.udh.edu.pe/doc/mallaingcivil.pdf' },
    { escuela: 'ARQUITECTURA', link: 'http://www.udh.edu.pe/doc/mallaarquitectura.pdf' },
    { escuela: 'INGENIERÍA AMBIENTAL', link: 'http://www.udh.edu.pe/doc/mallaingambiental.pdf' },
    { escuela: 'ZOOTECNIA', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'EDUCACIÓN BÁSICA: INICIAL Y PRIMARIA', link: 'http://www.udh.edu.pe/doc/mallaeducacionbasica.pdf' },
    { escuela: 'EDUCACIÓN: ESPECIALIDAD IDIOMA EXTRANJERO INGLÉS', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'ADMINISTRACIÓN DE EMPRESAS', link: 'http://www.udh.edu.pe/doc/mallaadministracionpresencial.pdf' },
    { escuela: 'CONTABILIDAD Y FINANZAS', link: 'http://www.udh.edu.pe/doc/mallacontabilidadpresencial.pdf' },
    { escuela: 'TURISMO, HOTELERÍA Y GASTRONOMÍA', link: 'http://www.udh.edu.pe/doc/mallaturismopresencial.pdf' },
    { escuela: 'MARKETING Y NEGOCIOS INTERNACIONALES', link: 'http://www.udh.edu.pe/doc/mallamarketing.pdf' },

    { escuela: 'MAESTRÍA EN DERECHO Y CIENCIAS POLÍTICAS, CON MENCIÓN EN DERECHO DEL TRABAJO Y SEGURIDAD SOCIAL', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN DERECHO Y CIENCIAS POLÍTICAS, CON MENCIÓN EN DERECHO CIVIL Y COMERCIAL', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN DERECHO Y CIENCIAS POLÍTICAS, CON MENCIÓN EN DERECHO PENAL', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN DERECHO Y CIENCIAS POLÍTICAS, CON MENCIÓN EN DERECHO PROCESAL', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS DE LA SALUD, CON MENCIÓN EN SALUD PÚBLICA Y DOCENCIA UNIVERSITARIA', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS DE LA SALUD, CON MENCIÓN EN GERENCIA EN SERVICIOS DE SALUD', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS DE LA SALUD, CON MENCIÓN EN ODONTOESTOMATOLOGIA', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN INGENIERÍA DE SISTEMAS E INFORMÁTICA, CON MENCIÓN EN GERENCIA DE SISTEMAS Y TECNOLOGIAS DE INFORMACIÓN', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN INGENIERÍA, CON MENCIÓN EN GESTIÓN AMBIENTAL Y DESARROLLO SOSTENIBLE', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS DE LA EDUCACIÓN, CON MENCIÓN EN DOCENCIA EN EDUCACIÓN SUPERIOR E INVESTIGACIÓN', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS DE LA EDUCACIÓN, CON MENCIÓN EN PSICOLOGÍA EDUCATIVA', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS DE LA EDUCACIÓN, CON MENCIÓN EN DOCENCIA Y GERENCIA EDUCATIVA', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS ADMINISTRATIVAS, CON MENCIÓN GESTIÓN PÚBLICA', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'MAESTRÍA EN CIENCIAS CONTABLES, CON MENCIÓN EN AUDITORIA Y TRIBUTACION', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'DOCTORADO EN DERECHO', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'DOCTORADO EN CIENCIAS DE LA SALUD', link: 'http://www.udh.edu.pe/doc/a' },
    { escuela: 'DOCTORADO EN CIENCIAS DE LA EDUCACIÓN', link: 'http://www.udh.edu.pe/doc/a' },
  ];

  useEffect(() => {
    const datosUdh = localStorage.getItem('datos_udh');
    const escuela = datosUdh ? JSON.parse(datosUdh).escuela : '';
    setNombreCarrera(escuela || 'Escuela no especificada');

    const malla = mallasCurriculares.find((item) => item.escuela === escuela);
    setPdfUrl(malla ? malla.link : '');

    // Detectar si el dispositivo es móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="malla-container">
      <TituloPage titulo="Malla Curricular" />
      <Card>
        <h3 className="malla-carrera">{nombreCarrera}</h3>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className='malla-mensaje'>No se encontró el reglamento.</div>
        ) : pdfUrl ? (
          isMobile ? (
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
          )
        ) : (
          <div className='malla-mensaje'>No se encontró la malla curricular para esta escuela.</div>
        )}
      </Card>
    </div>
  );
};

export default MallaCurricular;