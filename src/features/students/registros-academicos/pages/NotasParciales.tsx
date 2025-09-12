import React, { useEffect, useState, useRef } from "react";
import "../css/NotasParciales.css";
import { ClipboardIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

<<<<<<< HEAD
// Funciones utilitarias para colores e iconos
const getPromedioIcon = (promedio: number) => {
    if (promedio < 11) return "😞"; // triste
    if (promedio === 11) return "😌"; // alivio
    return "😊"; // feliz
};
=======
const NotasParciales: React.FC = () => (
  <div className="notas-parciales-root">
    <div className="notas-parciales-container">
      <h2 className="notas-parciales-title">NOTAS PARCIALES</h2>
      <div className="notas-parciales-header">
        <div className="notas-header-row first-row">
          <div className="notas-student-name"><strong>APELLIDOS Y NOMBRES:</strong>&nbsp; ROJAS LUNA, ARMANDO</div>
          <div className="notas-student-semestre"><strong>SEMESTRE:</strong>&nbsp; 2025-1</div>
        </div>

        <div className="notas-header-row second-row">
          <div className="notas-controls-left">
            <button className="btn-ver-notas">Ver Notas</button>
            <label style={{ marginLeft: 8 }}>Ingrese el Semestre: <input className="semestre-input" defaultValue="2025-1" /></label>
          </div>
        </div>
      </div>

      <div className="notas-card">
        <table className="notas-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Descripción</th>
              <th>SEC.</th>
              <th>TA1</th>
              <th>TA2</th>
              <th>TA3</th>
              <th>TA4</th>
              <th>PTA</th>
              <th>EMC</th>
              <th>EFC</th>
              <th>SUS</th>
              <th>Promedio (Letras)</th>
              <th>Inasistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>062110013</td>
              <td>DERECHO INFORMÁTICO Y ÉTICA PROFESIONAL</td>
              <td>A</td>
              <td>9</td>
              <td>12</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>9</td>
              <td>11</td>
              <td>12</td>
              <td>11 Once</td>
              <td>31.25%</td>
            </tr>
            <tr>
              <td>062110023</td>
              <td>AUDITORIA DE SISTEMAS E INFORMÁTICA</td>
              <td>A</td>
              <td>14</td>
              <td>14</td>
              <td>15</td>
              <td>13</td>
              <td>14</td>
              <td>11</td>
              <td>10</td>
              <td>0</td>
              <td>12 Doce</td>
              <td>33.33%</td>
            </tr>
          </tbody>
        </table>

        <div className="notas-footnote">* Si es estudiante de semipresencial y no puede ver sus notas, haga clic aquí.</div>

        <div className="info-panel">
          <div className="info-panel-header">ESTIMADO ESTUDIANTE CUMPLIMOS CON INFORMAR LO SIGUIENTE:</div>
          <div className="info-panel-body">
            <p><strong>ART.102 DE LA LEY UNIVERSITARIA 30220:</strong> Matrícula condicionada por rendimiento académico.</p>
            <p>La desaprobación de una misma materia por tres veces da lugar a que el estudiante sea separado temporalmente por un año de la universidad.</p>
            <p>NOTA APROBATORIA: <strong>11.00</strong></p>
            <button className="btn-imprimir">Imprimir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
>>>>>>> fernando

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

type Nota = {
    codigo: string;
    descripcion: string;
    seccion: string;
    ta1: number;
    ta2: number;
    ta3: number;
    ta4: number;
    pta: number;
    emc: number;
    efc: number;
    sus: number;
    promedio: number;
    promedioLetras: string;
    inasistencia: string;
    vecesLlevado?: number; // NUEVO: para simular el número de veces que llevó el curso
};

const SEMESTRES = ["2025-1", "2024-2", "2024-1"];

const NotasParciales: React.FC = () => {
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState(SEMESTRES[0]);
    const [notas, setNotas] = useState<Nota[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalInasistencia, setShowModalInasistencia] = useState(false);

    // Referencia para hacer scroll al card de advertencia
    const advertenciaRef = useRef<HTMLDivElement>(null);

    // Simulación de llamada a API
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setNombre("CALDERON SOBRADO, JAHIR WALTHER");
            setNotas([
                {
                    codigo: "062110043",
                    descripcion: "FORMULACIÓN Y EVALUACIÓN DE PROYECTOS DE INVERSIÓN",
                    seccion: "A",
                    ta1: 13,
                    ta2: 12,
                    ta3: 13,
                    ta4: 13,
                    pta: 13,
                    emc: 10,
                    efc: 12,
                    sus: 0,
                    promedio: 12,
                    promedioLetras: "Doce",
                    inasistencia: "22.58%",
                    vecesLlevado: 2,
                },
                {
                    codigo: "062110052",
                    descripcion: "SEMINARIO DE TESIS III",
                    seccion: "A",
                    ta1: 15,
                    ta2: 15,
                    ta3: 15,
                    ta4: 18,
                    pta: 8,
                    emc: 10,
                    efc: 16,
                    sus: 0,
                    promedio: 14,
                    promedioLetras: "Catorce",
                    inasistencia: "2.58%",
                    vecesLlevado: 3, // Este curso activa el modal de advertencia
                },
                {
                    codigo: "062110072",
                    descripcion: "TRABAJO DE INVESTIGACIÓN",
                    seccion: "A",
                    ta1: 10,
                    ta2: 12,
                    ta3: 16,
                    ta4: 14,
                    pta: 13,
                    emc: 9,
                    efc: 12,
                    sus: 0,
                    promedio: 11,
                    promedioLetras: "Once",
                    inasistencia: "21.13%", // Este curso activa el modal de inasistencia
                    vecesLlevado: 1,
                },
                {
                    codigo: "062110072",
                    descripcion: "TRABAJO DE INVESTIGACIÓN",
                    seccion: "A",
                    ta1: 10,
                    ta2: 12,
                    ta3: 16,
                    ta4: 14,
                    pta: 13,
                    emc: 9,
                    efc: 12,
                    sus: 0,
                    promedio: 9,
                    promedioLetras: "Nueve",
                    inasistencia: "16.13%",
                    vecesLlevado: 1,
                },
            ]);
            setLoading(false);
        }, 1000);
    }, [semestre]);

    // Mostrar los modales según condiciones
    useEffect(() => {
        if (!loading && notas.length > 0) {
            // Modal de advertencia por veces llevado
            const hayTresVeces = notas.some(n => n.vecesLlevado === 3);
            setShowModal(hayTresVeces);

            // Modal de advertencia por inasistencia
            const hayInasistencia = notas.some(n => parseFloat(n.inasistencia.replace("%", "")) > 20);
            setShowModalInasistencia(hayInasistencia);
        }
    }, [notas, loading]);

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
                        <select
                            id="semestre"
                            value={semestre}
                            onChange={e => setSemestre(e.target.value)}
                            className="notas-select-semestre"
                        >
                            {SEMESTRES.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tabla */}
                <div className="notas-tabla-wrapper">
                    <table className="notas-tabla-notas">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>SEC.</th>
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
                            {loading ? (
                                <tr>
                                    <td colSpan={13} style={{ textAlign: "center" }}>
                                        Cargando...
                                    </td>
                                </tr>
                            ) : (
                                notas.map((nota) => (
                                    <tr key={nota.codigo + nota.promedio + nota.inasistencia}>
                                        <td>{nota.codigo}</td>
                                        <td className="notas-descripcion">{nota.descripcion}</td>
                                        <td>{nota.seccion}</td>
                                        <td>{nota.ta1}</td>
                                        <td>{nota.ta2}</td>
                                        <td>{nota.ta3}</td>
                                        <td>{nota.ta4}</td>
                                        <td>{nota.pta}</td>
                                        <td>{nota.emc}</td>
                                        <td>{nota.efc}</td>
                                        <td>{nota.sus}</td>
                                        <td
                                            className="notas-promedio"
                                            style={{
                                                color: getPromedioColor(nota.promedio),
                                                fontWeight: 700,
                                                gap: 4,
                                            }}
                                        >
                                            {nota.promedio}
                                            <span style={{ color: getPromedioColor(nota.promedio), marginLeft: 4 }}>
                                                {nota.promedioLetras}
                                            </span>
                                            <span style={{ fontSize: 18 }}>{getPromedioIcon(nota.promedio)}</span>
                                        </td>
                                        <td
                                            style={{
                                                color: getInasistenciaColor(nota.inasistencia),
                                                fontWeight: 700,
                                            }}
                                        >
                                            {nota.inasistencia}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
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