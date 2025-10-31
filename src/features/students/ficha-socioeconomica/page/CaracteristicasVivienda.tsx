import React from 'react';
import SectionHeader from '../../../../components/pages/SectionHeader';
import { HomeIcon } from '@heroicons/react/24/outline';
import '../css/CaracteristicasVivienda.css';

const CaracteristicasVivienda: React.FC = () => {
    return (
    <div className="ficha-socio-section-body">
        <SectionHeader
            icon={<HomeIcon className='ficha-socio-section-body-header-icon'/>}
            title="Características de su Vivienda"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field ficha-socio-checkbox-group">
            <label className="ficha-socio-label">Servicios con que dispone su vivienda</label>
            <div className="ficha-socio-checkbox-container">
                <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Agua
                </label>
                <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Desagüe
                </label>
                <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Energía eléctrica
                </label>
                <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Teléfono
                </label>
                <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Internet
                </label>
                <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                Computadora
                </label>
                <label className="ficha-socio-checkbox">
                <input type="checkbox" className="ficha-socio-checkbox-input" />
                <span className="ficha-socio-checkbox-circle"></span>
                TV por Cable
                </label>
            </div>
            </div>
        </div>

        {/* Régimen de Tenencia y Tipo de Vivienda */}
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Régimen de Tenencia de la Vivienda</label>
            <select className="ficha-socio-select">
                <option>Propia</option>
                <option>Alquilada</option>
                <option>Prestada</option>
            </select>
            </div>
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Tipo de Vivienda</label>
            <select className="ficha-socio-select">
                <option>Casa Independiente</option>
                <option>Departamento</option>
                <option>Habitación</option>
            </select>
            </div>
        </div>

    </div>
    );
};

export default CaracteristicasVivienda;