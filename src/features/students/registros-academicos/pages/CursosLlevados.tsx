import React, { useState, useEffect } from "react";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/CursosLlevados.css";
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

const CursosLlevados: React.FC = () => {
    const [cursos, setCursos] = useState([]);
    const [udhData, setUdhData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [nombre, setNombre] = useState("");

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
        fetchCursos(); // Llamar a la función de consulta
        }
    }, [udhData]);

    const fetchCursos = async () => {
        if (!udhData || !udhData.codigo) {
        setLoading(false);
        setError(true);
        return;
        }
        try {
        setLoading(true); // Mostrar el spinner mientras se realiza la consulta
        const codigoAlumno = udhData.codigo;
        const data_cursos = await ApiService.get(
            `/estudiantes/cursos-llevados?codalu=${codigoAlumno}`
        );
        if (data_cursos.data && data_cursos.status === "error") {
            // Si la API devuelve un error en la propiedad "data"
            setError(true);
            setCursos([]); // Asegurarse de que los cursos estén vacíos
        } else {
            // Si la API devuelve datos válidos
            setCursos(data_cursos.data);
            setError(false);
        }
        } catch (error) {
        console.error("Error al cargar los cursos:", error);
        setError(true);
        } finally {
        setLoading(false);
        }
    };

    // Obtener ciclos únicos para el filtro
    const ciclosUnicos = Array.from(new Set(cursos.map((c) => c.ciclo))).sort(
        (a, b) => a - b
    );

    // Filtrado de cursos
    const cursosFiltrados = cursos.filter((curso) => {
        // Convertir ciclo a cadena para comparación
        const coincideCiclo =
        cicloFiltro === "" || String(curso.ciclo) === cicloFiltro;

        // Convertir búsqueda a minúsculas y comparar con nombre y código
        const coincideBusqueda =
        busqueda.trim() === "" ||
        curso.nombre_curso.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.codigo_curso.includes(busqueda.toLowerCase()) ||
        curso.SEMSEM.toLowerCase().includes(busqueda.toLowerCase());

        return coincideCiclo && coincideBusqueda;
    });

    const { fechaStr, horaStr } = obtenerFechaHora();

    // Encabezados de la tabla
    const headers = [
        "N°",
        "CÓDIGO",
        "CURSO",
        "CRÉD.",
        "CICLO",
        "NOTA",
        "SEMESTRE",
        "FEC.EXA.",
    ];
    // Filas de la tabla
    const rows = cursosFiltrados.map((curso) => [
        curso.Num,
        curso.codigo_curso,
        curso.nombre_curso,
        curso.cretcur,
        curso.ciclo,
        curso.NOTSEM,
        curso.SEMSEM,
        curso.feexsem,
    ]);

    return (
        <div className="cursos-llevados-container">
            <TituloPage titulo="Cursos Llevados" />
            <Card>
                <div className="cursos-llevados-barra-superior">
                    <div className="cursos-llevados-filtros-row">
                        <div>
                            <label>
                                Apellidos y Nombres:
                            </label>
                            {nombre}
                        </div>
                        <div>
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

                <div className="cursos-llevados-footer">
                    <div>
                        Oficina de Matrícula {fechaStr}. Hora: {horaStr}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CursosLlevados;