import React from 'react';
import SectionHeader from '../../../../components/pages/SectionHeader';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const CaracteristicasAcademicas: React.FC = () => {
    return (
    <div className="ficha-socio-section-body">
        <SectionHeader
            icon={<AcademicCapIcon className='ficha-socio-section-body-header-icon'/>}
            title="Características Académicas"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Colegio de Procedencia</label>
                <select className="ficha-socio-select">
                    <option>Privado</option>
                    <option>Estatal</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Nombre Colegio</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder='Nombre del Colegio'
                />
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Departamento Colegio</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Huánuco</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Modalidad de Ingreso</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Huánuco</option>
                </select>
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">¿Qué aspecto influenció para que eliga usted a la Universidad de Huánuco?</label>
                <select className="ficha-socio-select">
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Medio de difusión por el que se enteró de la UDH</label>
                <select className="ficha-socio-select">
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Semestre de Ingreso a la UDH</label>
                <select className="ficha-socio-select">
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Turno de Estudio</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Femenino</option>
                </select>
            </div>
        </div>

    </div>
    );
};

export default CaracteristicasAcademicas;