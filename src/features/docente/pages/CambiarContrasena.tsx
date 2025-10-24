import React, { useState } from "react";
import Card from "../../../components/pages/Card";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import ButtonSecundario from "../../../components/pages/ButtonSecundario";
import "../../../features/docente/css/CambiarContrasena.css";
import { EyeIcon, EyeSlashIcon, InformationCircleIcon, PaperAirplaneIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

const CambiarContrasena: React.FC = () => {
    const [mostrarContrasenaActual, setMostrarContrasenaActual] = useState(false);
    const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false);

    return (
        <div className="cambio-contrasena-page">
        <h1 className="cambio-contrasena-titulo">Cambiar Contraseña</h1>
        <p className="cambio-contrasena-subtitulo">
            Para proteger su cuenta, elija una contraseña segura.
        </p>

        <Card className="cambio-contrasena-card">
            <div className="cambio-contrasena-form-group">
            <label className="cambio-contrasena-form-label">Contraseña Actual</label>
            <div className="cambio-contrasena-form-input-wrap">
                <input
                type={mostrarContrasenaActual ? "text" : "password"}
                className="cambio-contrasena-form-input"
                placeholder="Ingrese su contraseña actual"
                />
                <button
                type="button"
                className="cambio-contrasena-form-input-icon-btn"
                onClick={() => setMostrarContrasenaActual(!mostrarContrasenaActual)}
                >
                {mostrarContrasenaActual ? (
                    <EyeSlashIcon className="cambio-contrasena-form-input-icon" />
                ) : (
                    <EyeIcon className="cambio-contrasena-form-input-icon" />
                )}
                </button>
            </div>
            </div>

            <div className="cambio-contrasena-form-group">
            <label className="cambio-contrasena-form-label">Nueva Contraseña</label>
            <div className="cambio-contrasena-form-input-wrap">
                <input
                type={mostrarNuevaContrasena ? "text" : "password"}
                className="cambio-contrasena-form-input"
                placeholder="Ingrese su nueva contraseña"
                />
                <button
                type="button"
                className="cambio-contrasena-form-input-icon-btn"
                onClick={() => setMostrarNuevaContrasena(!mostrarNuevaContrasena)}
                >
                {mostrarNuevaContrasena ? (
                    <EyeSlashIcon className="cambio-contrasena-form-input-icon" />
                ) : (
                    <EyeIcon className="cambio-contrasena-form-input-icon" />
                )}
                </button>
            </div>
            <p className="cambio-contrasena-form-hint">
                Use entre 8 y 15 caracteres con una combinación de letras y números.
            </p>
            </div>

            <div className="cambio-contrasena-form-group">
            <label className="cambio-contrasena-form-label">Confirmar Nueva Contraseña</label>
            <input
                type="password"
                className="cambio-contrasena-form-input"
                placeholder="Confirme su nueva contraseña"
            />
            </div>

            <div className="cambio-contrasena-form-acciones">
            <ButtonPrincipal 
                icon={<HandRaisedIcon className="solicitud-adelanto-btn-icon" />}
                text="Cancelar"
            />
            <ButtonPrincipal
                icon={<PaperAirplaneIcon className="solicitud-adelanto-btn-icon" />} 
                text="Guardar Cambios"
            />
            </div>
        </Card>

        <div className="cambio-contrasena-info">
            <InformationCircleIcon className="cambio-contrasena-info-icon" />
            <p>Recuerde cambiar su contraseña periódicamente para evitar accesos indeseados.</p>
        </div>
        </div>
    );
};

export default CambiarContrasena;