import React from "react";
import Card from "../../../components/pages/Card";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import { CalendarIcon, CheckCircleIcon, HandRaisedIcon, InformationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import "../../../features/docente/css/SolicitudAdelantoSueldo.css";
import TituloPage from "../../../components/pages/TituloPage";

const SolicitudAdelantoSueldo: React.FC = () => {
    return (
        <div className="solicitud-adelanto-page">
            <TituloPage titulo="Solicitud de Adelanto de Sueldo" />

            <div className="solicitud-adelanto-contenido">
                {/* Formulario principal */}
                <Card className="solicitud-adelanto-formulario">
                <div className="solicitud-adelanto-form-group">
                    <label className="solicitud-adelanto-form-label">Monto a solicitar (S/.)</label>
                    <input
                    type="number"
                    className="solicitud-adelanto-form-input"
                    placeholder="S/ 0.00"
                    />
                </div>

                <div className="solicitud-adelanto-form-group">
                    <label className="solicitud-adelanto-form-label">Mes de adelanto</label>
                    <div className="solicitud-adelanto-form-input-wrap">
                    <input
                        type="text"
                        className="solicitud-adelanto-form-input"
                        placeholder="October 2025"
                    />
                    <CalendarIcon className="solicitud-adelanto-form-input-icon" />
                    </div>
                </div>

                <div className="solicitud-adelanto-form-condiciones">
                    <h4>Condiciones a considerar</h4>
                    <ul>
                    <li>Los adelantos se deben solicitar dentro de los primeros 10 días del mes.</li>
                    <li>El monto permitido varía entre S/. 50.00 a S/. 350.00, y debe ser menor al 50% del sueldo bruto menos los descuentos.</li>
                    <li>Solo se permite un adelanto por mes.</li>
                    </ul>
                </div>

                <div className="solicitud-adelanto-form-acciones">
                    <ButtonPrincipal 
                        icon={<HandRaisedIcon className="solicitud-adelanto-btn-icon" />}
                        text="Cancelar" 
                        className="solicitud-adelanto-btn-cancelar" 
                    />
                    <ButtonPrincipal 
                        icon={<PaperAirplaneIcon className="solicitud-adelanto-btn-icon" />}
                        text="Enviar Solicitud" 
                        className="solicitud-adelanto-btn-enviar" 
                    />
                </div>

                <a href="#" className="solicitud-adelanto-form-link">Ver estado de mi última solicitud</a>
                </Card>
                <div className="solicitud-adelanto-separador">
                    {/* Detalles del solicitante */}
                    <Card className="solicitud-adelanto-detalles">
                        <h4>Detalles del Solicitante</h4>
                        <p><strong>Nombre:</strong> JUAN CARLOS RIVERA ROSEL</p>
                        <p><strong>DNI:</strong> N°40149677</p>
                        <p><strong>Condición Laboral:</strong> ADM.CONT.</p>
                        <p><strong>Área:</strong> ADMIN. RED INFORMÁTICA</p>
                    </Card>
                    <Card className="solicitud-adelanto-detalles">
                        <h4>Proceso de Aprobación</h4>
                        <div className="solicitud-adelanto-proceso-aprobacion">
                            <div className="solicitud-adelanto-proceso-paso">
                            <CheckCircleIcon className="solicitud-adelanto-proceso-icon aprobado" />
                            <div>
                                <strong>Paso 1: Validación</strong>
                                <p>Jefe de Adm. de Personal valida la solicitud.</p>
                            </div>
                            </div>
                            <div className="solicitud-adelanto-proceso-paso">
                            <InformationCircleIcon className="solicitud-adelanto-proceso-icon pendiente" />
                            <div>
                                <strong>Paso 2: Autorización</strong>
                                <p>Director General de Administración autoriza.</p>
                            </div>
                            </div>
                            <div className="solicitud-adelanto-proceso-paso">
                            <InformationCircleIcon className="solicitud-adelanto-proceso-icon pendiente" />
                            <div>
                                <strong>Paso 3: Depósito</strong>
                                <p>El monto solicitado es depositado en su cuenta.</p>
                            </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SolicitudAdelantoSueldo;