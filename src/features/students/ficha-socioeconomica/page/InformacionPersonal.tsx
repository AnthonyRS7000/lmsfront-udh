import React from 'react';
import SectionHeader from '../../../../components/pages/SectionHeader';
import '../css/InformacionPersonal.css';
import { UserIcon, HomeIcon, InboxIcon, IdentificationIcon, ExclamationTriangleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const InfromacionPersonal: React.FC = () => {
    return (
    <div className="ficha-socio-section-body">
        <SectionHeader
            icon={<UserIcon className='ficha-socio-section-body-header-icon'/>}
            title="Datos Personales"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Ciclo</label>
                <select className="ficha-socio-select">
                    <option>I</option>
                    <option>II</option>
                    <option>X</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Fecha de Nacimiento</label>
                <input
                    type="date"
                    className="ficha-socio-input"
                />
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Edad</label>
                <input
                    type="text"
                    className="ficha-socio-input ficha-socio-input-disabled"
                    placeholder="21"
                    disabled
                />
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Departamento de Nacimiento</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Huánuco</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Provincia de Nacimiento</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Huánuco</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Distrito de Nacimiento</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Huánuco</option>
                </select>
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Sexo</label>
                <select className="ficha-socio-select">
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Estado Civil</label>
                <select className="ficha-socio-select">
                    <option>Soltero</option>
                    <option>Casado</option>
                    <option>Divorciado</option>
                </select>
            </div>
            
        </div>
        <div className="ficha-socio-divider"></div>

        {/* Sub-section: Información de Contacto */}
        <SectionHeader
            icon={<InboxIcon className="ficha-socio-section-body-header-icon" />}
            title="Información de Contacto"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Correo Electrónico</label>
            <input
                type="text"
                className="ficha-socio-input"
                placeholder="email@ejemplo.com"
            />
            </div>
            <div className="ficha-socio-field">
            <label className="ficha-socio-label">Teléfono Personal</label>
            <input
                type="text"
                className="ficha-socio-input"
                placeholder="987654321"
            />
            </div>
        </div>
        <div className="ficha-socio-divider"></div>

        {/* Sub-section: Información de Residencia */}
        <SectionHeader
            icon={<HomeIcon className="ficha-socio-section-body-header-icon" />}
            title="Información de Residencia"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Dirección</label>
                <div className="ficha-socio-direccion">
                    <select className="ficha-socio-select">
                        <option>Jiron</option>
                        <option>Avenida</option>
                        <option>Urbanizacion</option>
                    </select>
                    <input
                        type="text"
                        className="ficha-socio-input"
                        placeholder="Universitaria #123"
                    />
                </div>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Tiempo que Radica en esta Ciudad</label>
                <div className="ficha-socio-direccion">
                    <input
                        type="text"
                        className="ficha-socio-input"
                        placeholder="5"
                    />
                    <select className="ficha-socio-select">
                        <option>Dias</option>
                        <option>Meses</option>
                        <option>Años</option>
                    </select>
            </div>
            </div>
        </div>
        <div className="ficha-socio-divider"></div>

        <SectionHeader
            icon={<IdentificationIcon className="ficha-socio-section-body-header-icon" />}
            title="Documento de Identificación"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Tipo de Documento</label>
                <select className="ficha-socio-select">
                    <option>DNI</option>
                    <option>Pasaporte</option>
                    <option>Otro</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Ubigeo DNI</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder="987654321"
                />
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">N° de Documento</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder="87654321"
                />
            </div>
        </div>
        <div className="ficha-socio-divider"></div>

        <SectionHeader
            icon={<ExclamationTriangleIcon className="ficha-socio-section-body-header-icon" />}
            title="Contacto de Emergencia"
        />
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Nombre de Contacto de Emergencia</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder="Juan Pérez"
                />
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Telefono (emergencia)</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder="987654321"
                />
            </div>
        </div>
        <div className="ficha-socio-divider"></div>

        <SectionHeader
            icon={<PlusCircleIcon className="ficha-socio-section-body-header-icon" />}
            title="Información Adicional"
        />

        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">¿Usted es madre?</label>
                <select className="ficha-socio-select">
                    <option>Si</option>
                    <option>No</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">¿Cuantos hijos tiene?</label>
                <input
                    type="text"
                    className="ficha-socio-input"
                    placeholder="987654321"
                />
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Fecha de Nacimiento de su Menor Hijo/a</label>
                <input
                    type="date"
                    className="ficha-socio-input"
                />
            </div>
        </div>
        <div className="ficha-socio-row">
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">¿Tiene alguna discapacidad?</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>Sordo</option>
                </select>
            </div>
            <div className="ficha-socio-field">
                <label className="ficha-socio-label">Seguro Hos.</label>
                <select className="ficha-socio-select">
                    <option>Ninguno</option>
                    <option>CCI</option>
                </select>
            </div>
        </div>

    </div>
    );
};

export default InfromacionPersonal;