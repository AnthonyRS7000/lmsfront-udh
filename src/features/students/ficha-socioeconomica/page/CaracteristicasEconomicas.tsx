import React from 'react';
import SectionHeader from '../../../../components/pages/SectionHeader';
import { DocumentCurrencyDollarIcon } from '@heroicons/react/24/outline';

const CaracteristicasEconomicas: React.FC = () => {
    return (
    <div className="ficha-socio-section-body">
        <SectionHeader
            icon={<DocumentCurrencyDollarIcon className='ficha-socio-section-body-header-icon'/>}
            title="Características Económicas"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">¿Trabaja Ud?</label>
                <select className="ficha-socio-select">
                    <option>Si</option>
                    <option>No</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Tipo de Trabajo</label>
                <select className="ficha-socio-select">
                    <option>Si</option>
                    <option>No</option>
                </select>
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Empresa</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder='Nombre de la Empresa'
                />
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Ingreso Promedio Mensual (Familiar)</label>
                <input
                    type="number"
                    className="ficha-socio-input"
                    placeholder='Ingrese el monto sin decimales ni coma'
                    min="0"
                    step="1"
                />
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Turno de Trabajo</label>
                <select className="ficha-socio-select">
                    <option>Diurnno</option>
                    <option>Nocturno</option>
                </select>
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">¿Quién financia sus estudios?</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder='Padres'
                />
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">¿Donde toma su alimento?</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Casa</option>
                </select>
            </div>
        </div>

    </div>
    );
};

export default CaracteristicasEconomicas;