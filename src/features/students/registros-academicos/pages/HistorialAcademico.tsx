import React, { useState, useEffect } from "react";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/HistorialAcademico.css";
import TituloPage from "../../../../components/pages/TituloPage";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading";
import Tablas from "../../../../components/pages/Tablas";
import Card from "../../../../components/pages/Card";

const obtenerFechaHora = () => {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const fechaStr = fecha.toLocaleDateString("es-PE", opciones);
    const horaStr = fecha.toLocaleTimeString("es-PE", { hour12: false });
    return { fechaStr, horaStr };
    };

const HistorialAcademico: React.FC = () => {
    const [historial, setHistorial] = useState([]);
    const [udhData, setUdhData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [nombre, setNombre] = useState("");
    const [ultimaConsulta, setUltimaConsulta] = useState<{ fechaStr: string; horaStr: string }>(obtenerFechaHora());

    const [cicloFiltro, setCicloFiltro] = useState<string>("");
    const [busqueda, setBusqueda] = useState<string>("");

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
        const datos_udh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datos_udh);
        setNombre(
        usuario.apellidos +
            ", " +
            usuario.nombres || ""
        );
    }, []);

    useEffect(() => {
        if (udhData && udhData.codigo) {
            fetchHistorial();
        }
    }, [udhData]);

    const fetchHistorial = async () => {
        if (!udhData || !udhData.codigo) {
        setLoading(false);
        setError(true);
        return;
        }
        try {
        setLoading(true);
        const codigoAlumno = udhData.codigo;
        const data_historial = await ApiService.get(
            `/estudiantes/historial-academico?codalu=${codigoAlumno}`
        );
        if (data_historial.data.data && data_historial.status === "error") {
            setError(true);
            setHistorial([]);
        } else {
            setHistorial(data_historial.data.data);
            setError(false);
            setUltimaConsulta(obtenerFechaHora());
        }
        } catch (error) {
        console.error("Error al cargar el historial:", error);
        setError(true);
        } finally {
        setLoading(false);
        }
    };

    // Obtener ciclos únicos para el filtro
    const ciclosUnicos = Array.from(new Set(historial.map((c) => c.ciclo))).sort(
        (a, b) => a - b
    );

    // Filtrado de historial
    const historialFiltrados = historial.filter((historial_curso) => {
        const coincideCiclo =
        cicloFiltro === "" || String(historial_curso.ciclo) === cicloFiltro;
        const coincideBusqueda =
        busqueda.trim() === "" ||
        historial_curso.nombre_curso.toLowerCase().includes(busqueda.toLowerCase()) ||
        historial_curso.codigo_curso.includes(busqueda) ||
        (historial_curso.especializacion &&
            historial_curso.especializacion.toLowerCase().includes(busqueda.toLowerCase()));
        return coincideCiclo && coincideBusqueda;
    });

    const { fechaStr, horaStr } = obtenerFechaHora();

    // Encabezados de la tabla
    const headers = [
        "CÓDIGO",
        "CURSO",
        "CICLO",
        "NOTA",
        "PREREQ.",
        "PREREQ2.",
        "N° Veces Llevado",
        "Especialización",
    ];
    // Filas de la tabla
    const rows = historialFiltrados.map((historial) => [
        historial.codigo_curso,
        historial.nombre_curso,
        historial.ciclo,
        historial.nota,
        historial.PRERECUR || "-",
        historial.PRERECUR2 || "-",
        historial.nveces,
        historial.especializacion || "-",
    ]);

    return (
        <div className="historial-container">
        <TituloPage titulo="Historial Académico" />
        <Card>
            <div className="historial-barra-superior">
            <div className="historial-filtros-row">
                <div className="historial-nombre-usuario">
                    <label>Apellidos y Nombres:</label>
                    {nombre}
                </div>
                <div className="historial-nombre-usuario">
                    <label htmlFor="busqueda">Buscar:</label>
                    <input
                        id="busqueda"
                        type="text"
                        placeholder="Buscar curso, código..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <label htmlFor="filtro-ciclo">Ciclo:</label>
                    <select
                        id="filtro-ciclo"
                        value={cicloFiltro}
                        onChange={(e) => setCicloFiltro(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {ciclosUnicos.map((ciclo) => (
                        <option key={ciclo} value={ciclo}>
                            {ciclo}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            </div>

            {loading ? (
            <Loading />
            ) : error ? (
            <DatosNoEncontrados />
            ) : (
            <Tablas headers={headers} rows={rows} />
            )}

            <div className="historial-footer">
            <div>
                Oficina de Matrícula {ultimaConsulta.fechaStr}. Hora: {ultimaConsulta.horaStr}
            </div>
            </div>
        </Card>
        </div>
    );
};

export default HistorialAcademico;