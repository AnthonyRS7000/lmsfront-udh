import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/NotasParciales.css";
import { ClipboardIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Homero from "../../../../assets/homero-pensando.png";

const NotasParciales: React.FC = () => {
    const [notas, setNotas] = useState([]); // Inicializar como un array vacío
    const [udhData, setUdhData] = useState<any>(null);
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); // Estado para manejar errores
    const [semestre, setSemestre] = useState("2025-2");

    const [showModal, setShowModal] = useState(false);
    const [showModalInasistencia, setShowModalInasistencia] = useState(false);

    // Referencia para hacer scroll al card de advertencia
    const advertenciaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datosUdh);
        setNombre(datosUdh.apellido_paterno+" "+datosUdh.apellido_materno+", "+datosUdh.nombres || "");
    }, []);

    useEffect(() => {
        if (udhData && udhData.codigo) {
        fetchNotas(); // Llamar a la función de consulta
        }
    }, [udhData]);
        
    const fetchNotas = async () => {
        if (!udhData || !udhData.codigo) {
        setLoading(false);
        setError(true);
        return;
        }
        try {
        setLoading(true); // Mostrar el spinner mientras se realiza la consulta
        const codigoAlumno = udhData.codigo;
        const data_notas = await ApiService.get(`/estudiantes/notas?codalu=${codigoAlumno}&semsem=${semestre}`);
        if (data_notas.data && data_notas.data.status === "error") {
            // Si la API devuelve un error en la propiedad "data"
            setError(true);
            setNotas([]); // Asegurarse de que las notas estén vacías
        } else {
            // Si la API devuelve datos válidos
            setNotas(data_notas.data);
            setError(false);
        }
        } catch (error) {
        console.error("Error al cargar las notas:", error);
        setError(true);
        } finally {
        setLoading(false);
        }
    };

    // Mostrar los modales según condiciones
    useEffect(() => {
        if (!loading && notas.length > 0) {
            // Modal de advertencia por veces llevado
            const hayTresVeces = notas.some(n => n.vecesLlevado === 3);
            setShowModal(hayTresVeces);

            // Modal de advertencia por inasistencia
            const hayInasistencia = notas.some(n => parseFloat(n.PorcInasis.replace("%", "")) > 20);
            setShowModalInasistencia(hayInasistencia);
        }
    }, [notas, loading]);
    
    // Funciones utilitarias para colores e iconos
    const getPromedioIcon = (promedio: number) => {
        if (promedio < 11) return "😞"; // triste
        if (promedio === 11) return "😌"; // alivio
        return "😊"; // feliz
    };

    const getPromedioColor = (promedio: number) => {
        if (promedio < 11) return "#d32f2f"; // rojo
        if (promedio === 11) return "#e6b800"; // amarillo
        return "#388e3c"; // verde
    };

    const getInasistenciaColor = (inasistencia: string) => {
        const valor = parseFloat(inasistencia.replace("%", ""));
        if (valor < 10) return "#388e3c"; // verde
        if (valor < 20) return "#e6b800"; // amarillo
        return "#d32f2f"; // rojo
    };
    
    return (
        <div className="notas-container">
            <h2 className="notas-titulo">Notas Parciales</h2>

            {/* Modal de advertencia por veces llevado */}
            {showModal && (
                <div className="notas-modal-overlay">
                    <div className="notas-modal" onClick={e => e.stopPropagation()}>
                        <button
                            className="notas-modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                        </button>
                        <h3>⚠️ Atención</h3>
                        <p>
                            Según el <strong>Art. 102 de la Ley Universitaria 30220</strong>, la matrícula puede ser condicionada por rendimiento académico si desaprueba una <strong style={{ color: "#dc2626" }}>materia tres veces.</strong>
                        </p>
                        <button
                            className="notas-modal-saber-mas"
                            onClick={() => {
                                setShowModal(false);
                                setTimeout(() => {
                                    document.querySelector('.notas-card.notas-info-extra')?.scrollIntoView({ behavior: "smooth" });
                                }, 200);
                            }}
                        >
                            Saber más
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de advertencia por inasistencia */}
            {showModalInasistencia && (
                <div className="notas-modal-overlay">
                    <div className="notas-modal" onClick={e => e.stopPropagation()}>
                        <button
                            className="notas-modal-close"
                            onClick={() => setShowModalInasistencia(false)}
                        >
                            <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                        </button>
                        <h3>⚠️ Atención</h3>
                        <p>
                            <strong>ART.73 REGLAMENTO GENERAL DE ESTUDIOS PREGRADO SEMIPRESENCIAL. Asistencia de los estudiantes.</strong><br />
                            El alumno, que tiene más de <span style={{ color: "#dc2626", fontWeight: 600 }}>30 por ciento</span> de inasistencias, sobre el total de horas programadas para una asignatura, estará impedido de rendir las evaluaciones.
                        </p>
                    </div>
                </div>
            )}

            {/* Card */}
            <div className="notas-card notas-header">
                <div className="notas-datos-row">
                    <div className="notas-info">
                        <label className="notas-codigo-label">Apellidos y Nombres:</label>
                        <input
                        type="text"
                        value={nombre}
                        disabled
                        className="notas-input-nombre"
                        size={Math.max(30, nombre.length + 2)}
                        />
                    </div>
                    <div className="notas-selector">
                        <label htmlFor="semestre" className="notas-label-semestre">Semestre:</label>
                        <div className="filter-group">
                        <input
                            id="semestre-input"
                            type="text"
                            value={semestre}
                            onChange={(e) => setSemestre(e.target.value)}
                            className="notas-input-semestre"
                            placeholder="2025-2"
                        />
                        <button
                            className="notas-button"
                            onClick={fetchNotas} // Llamar a la función de consulta al presionar el botón
                        >
                            Ver
                        </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                <div className="spinner-container">
                    <div className="spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                ) : error ? (
                <div className="error-container">
                    <img
                    src={Homero}
                    alt="homero-pensando"
                    className="error-image"
                    />
                    <p className="error-message">
                    Datos no encontrados o no te encuentras registrado en el presente ciclo
                    </p>
                </div>
                ) : (
                /* Tabla */
                <div className="notas-tabla-wrapper">
                    <table className="notas-tabla-notas">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Curso</th>
                            <th>Sec.</th>
                            <th>TA1</th>
                            <th>TA2</th>
                            <th>TA3</th>
                            <th>TA4</th>
                            <th>PTA</th>
                            <th>EMC</th>
                            <th>EFC</th>
                            <th>SUS</th>
                            <th>Promedio<br />(Letras)</th>
                            <th>Inasistencia</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(notas) && notas.map((nota, index) => (
                            <tr key={nota.codigo_curso}
                            className={index % 2 === 0 ? "row-par" : "row-impar"}
                            >
                                <td>{nota.codigo_curso}</td>
                                <td className="notas-descripcion">{nota.nombre_curso}</td>
                                <td>{nota.seccion}</td>
                                <td>{nota.TA1}</td>
                                <td>{nota.TA2}</td>
                                <td>{nota.TA3}</td>
                                <td>{nota.TA4}</td>
                                <td>{nota.PTA}</td>
                                <td>{nota.EMC}</td>
                                <td>{nota.EFC}</td>
                                <td>{nota.SUS}</td>
                                <td>
                                <div className="promedio-container" style={{ color: getPromedioColor(nota.pfin) }}>
                                    <span>{nota.pfin}</span>
                                    <span>({nota.pfinL.trim()})</span>
                                    <span>{getPromedioIcon(nota.pfin)}</span>
                                </div>
                                </td>
                                <td style={{ color: getInasistenciaColor(nota.PorcInasis) }}>{nota.PorcInasis}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
            {/* Card info advertencia */}
            <div className="notas-card notas-info-extra">
                <div className="notas-info-extra-header">
                    <InformationCircleIcon style={{ marginRight: 8, width: 30, height: 30}} /> ESTIMADO ESTUDIANTE CUMPLIMOS CON INFORMAR LO SIGUIENTE
                </div>
                <div className="notas-info-extra-body">
                    <div>
                        <b>ART.102 DE LA LEY UNIVERSITARIA 30220:</b> <span style={{ fontWeight: 500 }}>Matrícula condicionada por rendimiento académico.</span>
                        <br />
                        La desaprobación de una misma materia por <span style={{ color: "#dc2626", fontWeight: 600 }}>tres veces</span> da lugar a que el estudiante sea separado temporalmente por un año de la universidad. Al término de este plazo, el estudiante solo se podrá matricular en la materia que desaprobó anteriormente, para retornar de manera regular a sus estudios en el ciclo siguiente. Si desaprueba por <span style={{ color: "#dc2626", fontWeight: 600 }}>cuarta vez</span> procede su retiro definitivo.
                        <br />
                        <span style={{ color: "#444" }}>
                            (El presente Art. entrará en vigencia a partir del 2016-2 con la aplicación del nuevo Reglamento General de Estudios. Es decir, los cursos desaprobados se contabilizarán a partir del 2016-2.)
                        </span>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <b>ART.75 REGLAMENTO GENERAL DE ESTUDIOS PREGRADO PRESENCIAL. Asistencia de los estudiantes.</b><br />
                        <b>ART.73 REGLAMENTO GENERAL DE ESTUDIOS PREGRADO SEMIPRESENCIAL. Asistencia de los estudiantes.</b><br />
                        El alumno, que tiene más de <span style={{ color: "#dc2626", fontWeight: 600 }}>30 por ciento</span> de inasistencias, sobre el total de horas programadas para una asignatura, estará impedido de rendir las evaluaciones.
                    </div>
                </div>
            </div>

            {/* Card de info evaluacion*/}
            <div className="notas-card notas-advertencia" ref={advertenciaRef}>
                <div className="notas-advertencia-header">
                   <ClipboardIcon style={{ marginRight: 8, width: 24, height: 24, textAlign: "center" }} /> SISTEMA DE EVALUACIÓN PARA PRESENCIAL - SEMIPRESENCIAL
                </div>
                <div className="notas-advertencia-body">
                    <div>
                        <b>Tareas Académicas:</b> TA (TA1, TA2, TA3, TA4)
                    </div>
                    <div>
                        <b>Examen de Medio Curso:</b> EMC
                    </div>
                    <div>
                        <b>Examen de Fin de Curso:</b> EFC
                    </div>
                    <div>
                        <b>Examen Sustitutorio:</b> SUS <span style={{ color: "#444" }}>(Sustituye a la nota más baja del EMC o EFC)</span>
                    </div>
                    <div>
                        <b>PTA = (TA1+TA2+TA3+TA4) / 4</b> <span style={{ color: "#444" }}>(Promedio de Tareas Académicas)</span>
                    </div>
                    <div style={{ margin: "10px 0" }}>
                        <b>Promedio Final :</b> = (PTA + EMC + EFC) / 3
                    </div>
                    <div style={{ margin: "10px 0" }}>
                        <b>Para el caso de Odontología (ciclo 1-8)</b><br />
                        Promedio Final: = (PTA*0.40) + (EMC*0.30) + (EFC*0.30)
                    </div>
                    <div style={{ margin: "10px 0" }}>
                        <b>Para el caso de Odontología (ciclo 9 y 10) plan 2015</b><br />
                        Promedio Final: = (PTA*0.60) + (EMC*0.20) + (EFC*0.20)
                    </div>
                    <div style={{ marginTop: "10px", fontWeight: "bold", textAlign: "right" }}>
                        NOTA APROBATORIA: <span style={{ fontSize: "1.2em" }}>11.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotasParciales;