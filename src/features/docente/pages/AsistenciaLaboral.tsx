import React, { useEffect, useState } from "react";
import Card from "../../../components/pages/Card";
import TituloPage from "../../../components/pages/TituloPage";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import ButtonSecundario from "../../../components/pages/ButtonSecundario";
import "../css/AsistenciaLaboral.css";
import { FingerPrintIcon, IdentificationIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const AsistenciaLaboral: React.FC = () => {
    const [hora, setHora] = useState<string>("");
    const [fechaTexto, setFechaTexto] = useState<string>("");
    const [dni, setDni] = useState<string>("");
    const [acepta, setAcepta] = useState<boolean>(false);

    useEffect(() => {
        const actualizar = () => {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        setHora(`${hh}:${mm}:${ss}`);

        const opciones: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        setFechaTexto(now.toLocaleDateString("es-PE", opciones));
        };

        actualizar();
        const id = setInterval(actualizar, 1000);
        return () => clearInterval(id);
    }, []);

    const handleMarcar = () => {
        if (!acepta) {
        alert("Debe aceptar los Términos y Condiciones antes de marcar asistencia.");
        return;
        }
        console.log("Marcar asistencia DNI:", dni);
    };

    const handleConsultar = () => {
        console.log("Consultar asistencia DNI:", dni);
    };

    return (
        <div className="asistencia-laboral-page">
        <Card className="asistencia-laboral-card">
            <div className="asistencia-laboral-header">
            <h2 className="asistencia-laboral-universidad">UNIVERSIDAD DE<br />HUÁNUCO</h2>
            <p className="asistencia-laboral-subtitulo">Control de Asistencia</p>
            </div>

            <div className="asistencia-laboral-reloj-wrap">
            <div className="asistencia-laboral-reloj">{hora}</div>
            </div>

            <div className="asistencia-laboral-fecha">{fechaTexto}</div>

            <div className="asistencia-laboral-form">
            <label className="asistencia-laboral-label">Digite su DNI:</label>
            <div className="asistencia-laboral-input-wrap">
                <div className="asistencia-laboral-input-container">
                    <IdentificationIcon className="asistencia-laboral-input-icon"/>
                    <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="Ingrese su número de DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="asistencia-laboral-input"
                    aria-label="DNI"
                    />
                </div>
            </div>

            <div className="asistencia-laboral-terminos">
                <label>
                <input
                    type="checkbox"
                    checked={acepta}
                    onChange={(e) => setAcepta(e.target.checked)}
                />{" "}
                Comisiones de Servicios y Otros
                </label>
            </div>

            <div className="asistencia-laboral-acciones">
                <ButtonPrincipal
                    icon={<FingerPrintIcon />}
                    onClick={handleMarcar}
                    text="Marcar"
                    className="asistencia-laboral-btn marcar"
                />
                <ButtonPrincipal
                    icon={<MagnifyingGlassIcon />}
                    onClick={handleConsultar}
                    text="Consultar"
                    className="asistencia-laboral-btn consultar"
                />
            </div>
            </div>
        </Card>
        </div>
    );
};

export default AsistenciaLaboral;