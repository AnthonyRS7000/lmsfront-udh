import React, { useState, useRef } from 'react';
import '../css/FichaSocioeconomica.css';
import TituloPage from '../../../../components/pages/TituloPage';
import ButtonPrincipal from '../../../../components/pages/ButtonPrincipal';
import { ChevronDownIcon, ChevronUpIcon, DocumentCheckIcon, XMarkIcon, UserIcon, AcademicCapIcon,DocumentCurrencyDollarIcon, HomeIcon, UserGroupIcon, LightBulbIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import InformacionPersonal from './InformacionPersonal';
import CaracteristicasAcademicas from './CaracteristicasAcademicas';
import CaracteristicasEconomicas from './CaracteristicasEconomicas';
import CaracteristicasVivienda from './CaracteristicasVivienda';
import CaracteristicasParentales from './CaracteristicasParentales';
import AptitudesPersonales from './ApititudesPersonales';
import VariableEtnica from './VariableEtnica';

const FichaSocioeconomica: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>('A');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const sections = [
    { id: 'A', title: 'Información Personal', icon: <UserIcon className='ficha-socio-section-icon'/>, content: <InformacionPersonal /> },
    { id: 'B', title: 'Características Académicas', icon: <AcademicCapIcon className='ficha-socio-section-icon'/>, content: <CaracteristicasAcademicas /> },
    { id: 'C', title: 'Características Económicas', icon: <DocumentCurrencyDollarIcon className='ficha-socio-section-icon'/>, content: <CaracteristicasEconomicas /> },
    { id: 'D', title: 'Características de su Vivienda', icon: <HomeIcon className='ficha-socio-section-icon'/>, content: <CaracteristicasVivienda /> },
    { id: 'E', title: 'Características Parentales', icon: <UserGroupIcon className='ficha-socio-section-icon'/>, content: <CaracteristicasParentales /> },
    { id: 'F', title: 'Aptitudes Personales', icon: <LightBulbIcon className='ficha-socio-section-icon'/>, content: <AptitudesPersonales /> },
    { id: 'G', title: 'Variable Étnica', icon: <GlobeAltIcon className='ficha-socio-section-icon'/>, content: <VariableEtnica /> },
  ];
  const toggleSection = (section: string) => {
    const newActiveSection = activeSection === section ? null : section;
    setActiveSection(newActiveSection);

    // Hacer scroll después de actualizar el estado
    setTimeout(() => {
      const targetRef = sectionRefs.current[newActiveSection];
      if (targetRef) {
        targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Posicionar en el centro
      }
    }, 0);
  };

  return (
    <div className="ficha-socio-container">
      <TituloPage titulo="Ficha Socioeconómica" />
      <p className="ficha-socio-subtitle">
        Complete los siguientes datos para continuar con su proceso.
      </p>

      <div className="ficha-socio-card">
        {sections.map((section) => (
          <div key={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} className="ficha-socio-section">
            <button
              className={`ficha-socio-section-header ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <div className="ficha-socio-section-left">
                {section.icon} {section.title}
              </div>
              <div className="ficha-socio-section-right">
                {activeSection === section.id ? (
                  <ChevronUpIcon className="ficha-socio-section-icon" />
                ) : (
                  <ChevronDownIcon className="ficha-socio-section-icon" />
                )}
              </div>
            </button>
            {activeSection === section.id && (section.content)}
          </div>
        ))}
      </div>

      <div className="ficha-socio-footer">
        <p className="ficha-socio-footer-text">
          Declaro bajo juramento que los datos que he consignado son veraces,
          sujetándome a las normas de la Universidad en el caso de comprobarse
          lo contrario.
        </p>
        <div className="ficha-socio-footer-buttons">
          <ButtonPrincipal
            icon={<XMarkIcon />}
            text="Cancelar"
            className="ficha-socio-button-cancel"
          />
          <ButtonPrincipal
            icon={<DocumentCheckIcon />}
            text="Guardar Ficha"
            className="ficha-socio-button-save"
          />
        </div>
      </div>
    </div>
  );
};

export default FichaSocioeconomica;