import React from 'react';
import SectionHeader from '../../../../components/pages/SectionHeader';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const VariableEtnica: React.FC = () => {
    return (
    <div className="ficha-socio-section-body">
        <SectionHeader
            icon={<GlobeAltIcon className='ficha-socio-section-body-header-icon'/>}
            title="Variable Étnica"
        />
       {/* Grupo étnico */}
      <div className="ficha-socio-row">
        <div className="ficha-socio-field">
          <label className="ficha-socio-label">Grupo étnico en el que se autoidentifica:</label>
          <select className="ficha-socio-select">
            <option>a) Quechua</option>
            <option>b) Aimara</option>
            <option>c) Mestizo</option>
            <option>d) No sabe/no responde</option>
          </select>
        </div>
      </div>

      {/* Detalle étnico */}
      <div className="ficha-socio-row">
        <div className="ficha-socio-field">
          <label className="ficha-socio-label">Detalle étnico (sólo si seleccionó la opción a):</label>
          <select className="ficha-socio-select">
            <option>Ninguno (Ninguno)</option>
            <option>Detalle 1</option>
            <option>Detalle 2</option>
          </select>
        </div>
      </div>

      {/* Lengua indígena */}
      <div className="ficha-socio-row">
        <div className="ficha-socio-field">
          <label className="ficha-socio-label">¿Habla alguna lengua indígena u originaria?:</label>
          <select className="ficha-socio-select">
            <option>a) Sí</option>
            <option>b) No</option>
          </select>
        </div>
      </div>

      {/* Lengua étnica */}
      <div className="ficha-socio-row">
        <div className="ficha-socio-field">
          <label className="ficha-socio-label">Lengua étnica u originaria (sólo si seleccionó la opción a):</label>
          <select className="ficha-socio-select">
            <option>Ninguno (Ninguno)</option>
            <option>Quechua</option>
            <option>Aimara</option>
          </select>
        </div>
      </div>

    </div>
    );
};

export default VariableEtnica;