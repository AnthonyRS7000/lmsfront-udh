import React, { useState, useEffect } from "react";
import { cache } from "../../../../components/pages/Cache";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/MiHorario.css";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading"
import Tablas from "../../../../components/pages/Tablas";
import Titulo from "../../../../components/pages/TituloPage";
import Card from "../../../../components/pages/Card";
import { CursorArrowRaysIcon, EyeIcon } from "@heroicons/react/24/outline";
import ButtonSecundario from "../../../../components/pages/ButtonSecundario";
import ButtonPrincipal from "../../../../components/pages/ButtonPrincipal";

const calcularSemestre = (): string => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son 0-indexados

    if (mes >= 1 && mes <= 3) {
        return `${año}-0`;
    } else if (mes >= 4 && mes <= 7) {
        return `${año}-1`;
    } else if (mes >= 8 && mes <= 11) {
        return `${año}-2`;
    } else {
        return `${año}-2`;
    }
};

const MiHorario: React.FC = () => {
    const [miHorario, setMiHorario] = useState([]);
    const [udhData, setUdhData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [semestre, setSemestre] = useState(calcularSemestre());
    const [isHorarioFetched, setIsHorarioFetched] = useState(false);
    const [modo, setModo] = useState(1);

    const CACHE_KEY = `miHorario_${semestre}`;
    const CACHE_EXPIRATION_MINUTES = 30;

    useEffect(() => {
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datosUdh);
    }, []);

    useEffect(() => {
    if (udhData && udhData.codigo && !isHorarioFetched) {
        setIsHorarioFetched(true);
        const cachedData = cache.get(CACHE_KEY); // Verificar si hay datos en caché
        if (cachedData) {
            setMiHorario(cachedData); // Cargar datos desde el caché
            setError(false);
        } else {
            fetchHorario(); // Consumir la API si no hay datos en caché
        }
    }
    }, [udhData, isHorarioFetched]);

    const fetchHorario = async () => {
        if (!udhData || !udhData.codigo || !semestre) {
        setError(true);
        return;
        }

        try {
        setLoading(true);
        const codigoAlumno = udhData.codigo;
        const data = await ApiService.get(`/horario?codalu=${codigoAlumno}&semsem=${semestre}`);
        if (!data.horario || data.status === "error" || data.horario.length === 0 ) {
            setError(true);
            setMiHorario([]);
        } else {
            setMiHorario(data.horario);
            setError(false);
            cache.set(CACHE_KEY, data.horario, CACHE_EXPIRATION_MINUTES);
        }
        } catch (error) {
        console.error("Error al cargar mi horario:", error);
        setError(true);
        } finally {
        setLoading(false);
        }
    };

    const handleVerClick = () => {
        const cachedData = cache.get(CACHE_KEY); // Verificar si hay datos en caché
        if (cachedData) {
        setMiHorario(cachedData); // Cargar datos desde el caché
        setError(false);
        } else {
        fetchHorario(); // Consumir la API si no hay datos en caché
        }
    };

     // Función para formatear el contenido del horario
    const formatHorario = (dia: string): JSX.Element | string => {
        if (!dia || typeof dia !== "string") return ""; // Si no hay contenido, devolver vacío

        const texto = dia.trim();
        if (texto === "") return "";

        // Intentar separar por '->' (hora -> detalles)
        const partes = texto.split("->");
        if (partes.length < 2) return ""; // Formato inesperado

        // extraer la parte izquierda donde está la hora (p. ej. "Lunes: 09:30-11:00" o "09:30-11:00")
        const izquierda = partes[0].trim();
        // Buscar patrón de hora "HH:MM-HH:MM"
        const horaMatch = izquierda.match(/(\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2})/);
        const hora = horaMatch ? horaMatch[1].replace(/\s+/g, "") : izquierda.replace(/^[A-Za-zÁÉÍÓÚáéíóúÑñ:\s]*/g, "").trim();

        // detalles (ubicación y modalidad) pueden venir con espacios múltiples
        const detalles = partes[1].trim();
        const tokens = detalles.split(/\s+/).filter(Boolean);
        const ubicacion = tokens.length > 0 ? tokens[0] : "";
        const modalidad = tokens.length > 1 ? tokens.slice(1).join(" ") : "";

        return (
            <div className="mi-horario-datos-celda">
                <label>{hora}</label>
                <br />
                <label>{ubicacion}</label>
                <br />
                <label>{modalidad}</label>
            </div>
        );
    };

    // Encabezados de la tabla
    const headersModo1 = ["CÓDIGO", "CURSO", "SEC.", "CICLO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];

    const rowsModo1 = miHorario.map((horario) => [
        horario.codigo_curso,
        horario.nombre_curso,
        horario.seccion,
        horario.ciclo,
        formatHorario(horario.lunes),
        formatHorario(horario.martes),
        formatHorario(horario.miercoles),
        formatHorario(horario.jueves),
        formatHorario(horario.viernes),
        formatHorario(horario.sabado),
        formatHorario(horario.domingo),
    ]);

    const headersModo2 = ["HORA", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];

    // Filas de la tabla
     // Generar las filas de horas
    const horas: any[] = [];
    let horaInicio = new Date(0, 0, 0, 6, 30); // Hora inicial: 6:30
    for (let i = 0; i < 21; i++) { // Generar hasta las 22:15
        const horaFin = new Date(horaInicio.getTime() + 45 * 60000); // Incrementar 45 minutos
        horas.push(
            `${horaInicio.getHours().toString().padStart(2, "0")}:${horaInicio.getMinutes().toString().padStart(2, "0")} a ${horaFin.getHours().toString().padStart(2, "0")}:${horaFin.getMinutes().toString().padStart(2, "0")}`
        );
        horaInicio = horaFin;
    }

    // Función para obtener un color único para cada curso
    const getColor = (codigoCurso: string): string => {
        const colors = [
            "#7FA8C9", // Azul
            "#7CBFA3", // Verde
            "#F4E1A1", // Amarillo
            "#BCA7D8", // Lila
            "#F5BFA0", // Naranja
            "#D4DAD7", // Gris verdoso
            "#F3C5C0", // Rosa durazno
            "#A8CFE5", // Celeste
            "#C6E3B8", // Verde lima
            "#D7C4E0", // Lavanda grisácea
            "#9ED1C8", // Turquesa claro
            "#D7B7A8", // Marrón rosado
            "#F8E8C8", // Crema
            "#F7B8A3", // Coral pastel
            "#B8D3C9", // Verde menta grisáceo
            "#E7A7B7", // Rojo/Rosa
            "#D9CEC4" // Gris cálido
        ];
        const index = Array.from(codigoCurso.trim()).reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length; // Generar índice único basado en el código del curso
    return colors[index];
    };

    // Generar las filas de la tabla
    const rowsModo2 = horas.map((hora, index) => {
        const fila = [hora]; // Primera columna: hora
        ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].forEach((dia) => {
            const curso = miHorario.find((horario) => {
                const horarioDia = horario[dia];
                if (horarioDia) {
                    const [horaInicio, horaFin] = horarioDia.split(" ")[1].split("->")[0].split("-");
                    return hora >= horaInicio && hora < horaFin;
                }
                return false;
            });
            if (curso) {
                const infoDia = curso[dia]?.split("->")[1]; // Obtener solo "P2-301 Presencial"
                const ubicacion = infoDia?.split(" ")[0]|| "";  // Obtener solo "P2-301"
                const modalidad = infoDia?.split("  ")[1]|| ""; // Obtener solo "Presencial"
                const [horaInicio, horaFin] = curso[dia]?.split(" ")[1].split("->")[0].split("-");
                const horasCurso = horas.filter((h) => h >= horaInicio && h < horaFin); // Obtener las horas que ocupa el curso

                // Modificar el nombre del curso para mostrar solo las dos primeras palabras y tres letras de la tercera
                const nombreCursoModificado = curso.nombre_curso
                    .split(" ")
                    .map((palabra, index) => {
                        if (index === 0 || index === 1) return palabra; // Mostrar las dos primeras palabras completas
                        if (index === 2) return palabra.slice(0, 3) + "."; // Mostrar las primeras tres letras de la tercera palabra
                        return ""; // Ignorar palabras adicionales
                    })
                    .filter((palabra) => palabra !== "") // Filtrar palabras vacías
                    .join(" "); // Unir las palabras con un espacio

                if (horasCurso.length === 1) {
                    // Si el curso ocupa solo una hora
                    fila.push(
                        <div className="mi-horario-curso-celda" style={{ backgroundColor: getColor(curso.codigo_curso) }}>
                            {`${nombreCursoModificado}`}
                            <br />
                            {ubicacion}
                            <br />
                            {modalidad}
                        </div>
                    );
                } else if (horasCurso.length === 2) {
                    // Si el curso ocupa dos horas seguidas
                    if (index === horas.indexOf(horasCurso[0])) {
                        fila.push(
                            <div className="mi-horario-curso-celda tipo-A" style={{ backgroundColor: getColor(curso.codigo_curso) }}>
                                {`${nombreCursoModificado}`}
                            </div>
                        );
                    } else if (index === horas.indexOf(horasCurso[1])) {
                        fila.push(
                            <div className="mi-horario-curso-celda tipo-B" style={{ backgroundColor: getColor(curso.codigo_curso) }}>
                                {ubicacion}
                                <br />
                                {modalidad}
                            </div>
                        );
                    } else {
                        fila.push(""); // Celda vacía
                    }
                } else {
                    // Si el curso ocupa tres o más horas seguidas
                    const middleIndex = Math.floor(horasCurso.length / 2); // Índice central
                    if (index === horas.indexOf(horasCurso[0])) {
                        fila.push(
                            <div className="mi-horario-curso-celda tipo-A" style={{ backgroundColor: getColor(curso.codigo_curso) }}>
                                {`${nombreCursoModificado}`}
                            </div>
                        );
                    } else if (index === horas.indexOf(horasCurso[middleIndex])) {
                        fila.push(
                            <div className="mi-horario-curso-celda" style={{ backgroundColor: getColor(curso.codigo_curso) }}>
                                {ubicacion}
                            </div>
                        );
                    } else if (index === horas.indexOf(horasCurso[horasCurso.length - 1])) {
                        fila.push(
                            <div className="mi-horario-curso-celda tipo-B" style={{ backgroundColor: getColor(curso.codigo_curso) }}>
                                {modalidad}
                            </div>
                        );
                    } else {
                        fila.push(
                            <div className="mi-horario-curso-celda tipo-3" style={{ backgroundColor: getColor(curso.codigo_curso) }}>
                                {/* Celda vacía con fondo */}
                            </div>
                        );
                    }
                }
            } else {
                fila.push(""); // Celda vacía si no hay curso
            }
        });
        return fila;
    });

    return (
        <div className="mi-horario-container">
            <Titulo titulo="Mi Horario" />
            <Card>
                <div className="mi-horario-filters">
                    <div className="filter-group">
                        <label htmlFor="ciclo-input">Ciclo:</label>
                        <input
                        id="ciclo-input"
                        type="text"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        className="mi-horario-input"
                        placeholder="2025-2"
                        />
                        <ButtonSecundario
                            icon={<EyeIcon />}
                            text="Ver"
                            onClick={handleVerClick}
                        />
                    </div>
                    <div className="mi-horario-botones">
                        <ButtonPrincipal
                            icon={<CursorArrowRaysIcon />}
                            text="Modo 1"
                            onClick={() => setModo(1)}
                            className={`mi-horario-boton-modo ${modo === 1 ? "activo" : ""}`}
                        />
                        <ButtonPrincipal
                            icon={<CursorArrowRaysIcon />}
                            text="Modo 2"
                            onClick={() => setModo(2)}
                            className={`mi-horario-boton-modo ${modo === 2 ? "activo" : ""}`}
                        />
                    </div>
                </div>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <DatosNoEncontrados />
                ) : modo === 1 ? (
                    <Tablas headers={headersModo1} rows={rowsModo1} />
                ) : (
                    <Tablas headers={headersModo2} rows={rowsModo2} className="mi-horario-tabla" />
                )}
            </Card>
        </div>
    );
};

export default MiHorario;