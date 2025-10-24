import React, { useState } from "react";
import Card from "../../../components/pages/Card";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import ButtonSecundario from "../../../components/pages/ButtonSecundario";
import Table from "../../../components/pages/Tablas";
import "../css/HistorialAsistenciaLaboral.css";
import { DocumentTextIcon, EyeIcon, CalendarIcon, CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import TituloPage from "../../../components/pages/TituloPage";

const obtenerFechaActual = (): string => {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

const obtenerFechaInicio = (): string => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - 7); // Restar 7 días
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

const historial = [
    { fecha: "2025/10/26", detalle: "Permanencia", estado: "Presente", observaciones: "", detalles: { dia: "Miércoles", fecha: "22/10/2025", horarios: ["08:00", "13:00", "16:00", "19:00", " ", " ", " ", " "], marcaciones: ["07:56", "13:04", "16:16", "19:04", " ", " ", " ", " "], notas: "No hay notas o justificaciones para esta asistencia." } },
    { fecha: "2025/10/25", detalle: "Clases", estado: "Ausente", observaciones: "", detalles: null },
    { fecha: "2025/10/24", detalle: "Clases", estado: "Justificado", observaciones: "Justificante médico", detalles: null },
    { fecha: "2025/10/23", detalle: "Clases", estado: "Presente", observaciones: "", detalles: null },
    { fecha: "2025/10/20", detalle: "Clases", estado: "Presente", observaciones: "", detalles: null },
];

const HistorialAsistenciaLaboral: React.FC = () => {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [detalleSeleccionado, setDetalleSeleccionado] = useState<any>(null);
    const [fechaInicio, setFechaInicio] = useState(obtenerFechaInicio());
    const [fechaFin, setFechaFin] = useState(obtenerFechaActual());
    const [detalleFiltro, setDetalleFiltro] = useState("");
    const [datosFiltrados, setDatosFiltrados] = useState(historial);

    const handleVerDetalles = (detalle: any) => {
        setDetalleSeleccionado(detalle);
        setMostrarDetalles(true);
    };

    const handleFiltrar = () => {
        const datosFiltrados = historial.filter((item) => {
        const fechaItem = new Date(item.fecha.replace(/\//g, "-")); // Convertir fecha al formato Date
        const fechaInicioDate = new Date(fechaInicio.split("/").reverse().join("-"));
        const fechaFinDate = new Date(fechaFin.split("/").reverse().join("-"));

        const cumpleFecha =
            fechaItem >= fechaInicioDate && fechaItem <= fechaFinDate;
        const cumpleDetalle =
            detalleFiltro === "" || item.detalle.toLowerCase() === detalleFiltro.toLowerCase();

        return cumpleFecha && cumpleDetalle;
        });
        setDatosFiltrados(datosFiltrados);
    };

    return (
        <div className="historial-asistencia-page">
            <TituloPage titulo="Historial de Asistencia" />

        <Card className="historial-asistencia-card">
            <div className="historial-asistencia-filtros">
            <div className="historial-asistencia-filtro">
                <label className="historial-asistencia-label">Fecha de inicio</label>
                <div className="historial-asistencia-input-wrap">
                <input
                    type="date"
                    value={fechaInicio.split("/").reverse().join("-")}
                    onChange={(e) => setFechaInicio(e.target.value.split("-").reverse().join("/"))}
                    className="historial-asistencia-input"
                    placeholder="Fecha de inicio"
                />
                {/*<CalendarIcon className="historial-asistencia-icon" />*/}
                </div>
            </div>
            <div className="historial-asistencia-filtro">
                <label className="historial-asistencia-label">Fecha de fin</label>
                <div className="historial-asistencia-input-wrap">
                <input
                    type="date"
                    value={fechaFin.split("/").reverse().join("-")}
                    onChange={(e) => setFechaFin(e.target.value.split("-").reverse().join("/"))}
                    className="historial-asistencia-input"
                    placeholder="Fecha de fin"
                />
                </div>
            </div>
            <div className="historial-asistencia-filtro">
                <label className="historial-asistencia-label">Detalle</label>
                <select
                    className="historial-asistencia-select"
                    value={detalleFiltro}
                    onChange={(e) => setDetalleFiltro(e.target.value)}
                >
                    <option value="">Todos los detalles</option>
                    <option value="Permanencia">Permanencia</option>
                    <option value="Clases">Clases</option>
                </select>
            </div>
            <div className="historial-asistencia-filtro">
                <ButtonPrincipal
                    icon={<EyeIcon />}
                    text="Ver"
                    className="historial-asistencia-btn-ver"
                    onClick={handleFiltrar}
                />
            </div>
            </div>

            <Table
            headers={["FECHA", "DETALLE", "ESTADO", "OBSERVACIONES", "ACCIONES"]}
            rows={datosFiltrados.map((item) => [
                item.fecha,
                item.detalle,
                <div className={`estado estado-${item.estado.toLowerCase()}`}>
                    {item.estado === "Presente" && <CheckCircleIcon className="estado-icon" />}
                    {item.estado === "Ausente" && <XCircleIcon className="estado-icon" />}
                    {item.estado === "Justificado" && <ExclamationCircleIcon className="estado-icon" />}
                    <span>{item.estado}</span>
                </div>,
                item.observaciones || "-",
                <div className="historial-asistencia-btn-detalles-wrap">
                    <ButtonSecundario
                        icon={<DocumentTextIcon />}
                        text="Detalles"
                        onClick={() => handleVerDetalles(item.detalles)}
                        /*disabled={!item.detalle}*/
                        className="historial-asistencia-btn-detalles"
                    />
                </div>,
            ])}
            />
        </Card>

        {mostrarDetalles && detalleSeleccionado && (
            <Card className="historial-detalles-card">
            <h3 className="historial-detalles-titulo">Detalles de Asistencia</h3>
            <Table
                headers={["DÍA", "FECHA", "HE1", "HS1", "HE2", "HS2", "HE3", "HS3", "HE4", "HS4", "DETALLE"]}
                rows={[
                [
                    detalleSeleccionado.dia,
                    detalleSeleccionado.fecha,
                    ...detalleSeleccionado.horarios,
                    " ",
                ],
                [
                    " ",
                    detalleSeleccionado.fecha,
                    ...detalleSeleccionado.marcaciones,
                    "Marcación",
                ],
                ]}
            />
            <div className="historial-detalles-notas">
                <h4>Justificación/Notas</h4>
                <p>{detalleSeleccionado.notas}</p>
            </div>
            </Card>
        )}
        </div>
    );
};

export default HistorialAsistenciaLaboral;