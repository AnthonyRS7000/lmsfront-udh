import React from 'react';
import SectionHeader from '../../../../components/pages/SectionHeader';
import { UserGroupIcon } from '@heroicons/react/24/outline';

const CaracteristicasParentales: React.FC = () => {
    return (
    <div className="ficha-socio-section-body">
        <SectionHeader
            icon={<UserGroupIcon className='ficha-socio-section-body-header-icon'/>}
            title="Características Parentales"
        />
        {/* ¿Viven sus padres? */}
        <div className="ficha-socio-row ficha-socio-checkbox-group">
            <label className="ficha-socio-label">¿Viven sus padres?</label>
            <div className="ficha-socio-checkbox-container">
            <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Padre
            </label>
            <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Madre
            </label>
            </div>
        </div>

        {/* Información del Padre */}
        <SectionHeader
            icon={<span className="ficha-socio-section-body-header-icon">👨</span>}
            title="Información del Padre"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Edad del padre (si vive)</label>
            <input
                type="text"
                className="ficha-socio-input"
                placeholder="54"
            />
            </div>
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Grado de Instrucción</label>
            <select className="ficha-socio-select">
                <option>Primaria</option>
                <option>Secundaria</option>
                <option>Superior Incompleta</option>
                <option>Superior Completa</option>
            </select>
            </div>
        </div>

        {/* Información de la Madre */}
        <SectionHeader
            icon={<span className="ficha-socio-section-body-header-icon">👩</span>}
            title="Información de la Madre"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Edad de la madre (si vive)</label>
            <input
                type="text"
                className="ficha-socio-input"
                placeholder="44"
            />
            </div>
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Grado de Instrucción</label>
            <select className="ficha-socio-select">
                <option>Primaria</option>
                <option>Secundaria</option>
                <option>Superior Incompleta</option>
                <option>Superior Completa</option>
            </select>
            </div>
        </div>

    </div>
    );
};

export default CaracteristicasParentales;