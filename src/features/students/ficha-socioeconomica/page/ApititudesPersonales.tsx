import React from 'react';
import SectionHeader from '../../../../components/pages/SectionHeader';
import { LightBulbIcon } from '@heroicons/react/24/outline';

const AptitudesPersonales: React.FC = () => {
    return (
    <div className="ficha-socio-section-body">
        <SectionHeader
            icon={<LightBulbIcon className='ficha-socio-section-body-header-icon'/>}
            title="Aptitudes Personales"
        />
       {/* Tipo de Actividad Deportiva */}
        <div className="ficha-socio-row">
            <div className="ficha-socio-field ficha-socio-checkbox-group">
                <label className="ficha-socio-label">Tipo de Actividad deportiva que practica</label>
                <div className="ficha-socio-checkbox-container">
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Ninguno
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Fútbol
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Básquet
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Vóley
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Tenis
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Atletismo
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Natación
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Ciclismo
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="checkbox" name="actividad-deportiva" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Otros
                    </label>
                </div>
            </div>
        </div>

        {/* Tipo de Club */}
        <div className="ficha-socio-row">
            <div className="ficha-socio-field ficha-socio-checkbox-group">
                <label className="ficha-socio-label">¿Pertenece usted a algún tipo de club?</label>
                <div className="ficha-socio-checkbox-container">
                    <label className="ficha-socio-checkbox">
                        <input type="radio" name="tipo-club" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Ninguno
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="radio" name="tipo-club" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Deportivo
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="radio" name="tipo-club" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Cultural
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="radio" name="tipo-club" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Artístico
                    </label>
                    <label className="ficha-socio-checkbox">
                        <input type="radio" name="tipo-club" className="ficha-socio-checkbox-input" />
                        <span className="ficha-socio-checkbox-circle"></span>
                        Religioso
                    </label>
                </div>
            </div>
        </div>

        {/* Grupo de la Universidad */}
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">¿Le gustaría pertenecer a algún grupo de La Universidad?</label>
            <select className="ficha-socio-select">
                <option>Ninguno</option>
                <option>Deportivo</option>
                <option>Cultural</option>
                <option>Artístico</option>
                <option>Religioso</option>
            </select>
            </div>
        </div>

    </div>
    );
};

export default AptitudesPersonales;