import React, { useState, useRef } from 'react';
import { EyeIcon, PrinterIcon } from '@heroicons/react/24/outline';
import '../css/MiAsistencia.css';

// Datos de ejemplo (simulan respuesta de API)
const estudianteEjemplo = {
  nombre: 'CALDERON SOBRADO, JAHIR WALTHER',
  codigo: '2018110403',
  semestre: '2025-1',
  sede: 'HUÁNUCO',
  plan: '2021',
};

const cursosEjemplo = [
  {
    codigo: '062110043',
    curso: 'FORMULACIÓN Y EVALUACIÓN DE PROYECTOS DE INVERSIÓN\nDocente\n--',
    ciclo: '10',
    creditos: '3',
    seccion: 'A',
    horario: [
      'Lunes: 09:30-11:00->P2-301 Presencial',
      'Martes 08:00-09:30->P2-205 Presencial',
    ],
  },
  {
    codigo: '062110052',
    curso: 'SEMINARIO DE TESIS III\nDocente\n--',
    ciclo: '10',
    creditos: '3',
    seccion: 'A',
    horario: [
      'Lunes: 19:15-21:30->P2-301 Presencial',
      'Miércoles: 17:45-19:15->P2-301 Presencial',
    ],
  },
  {
    codigo: '062110072',
    curso: 'TRABAJO DE INVESTIGACIÓN\nDocente\n--',
    ciclo: '10',
    creditos: '3',
    seccion: 'A',
    horario: [
      'Lunes: 17:00-19:15->P2-301 Presencial',
      'Martes 17:45-19:15->P2-301 Presencial',
    ],
  },
];

const asistenciaEjemplo = {
  resumen: {
    total: 25,
    asistencias: 0,
    inasistencias: 25,
    porcentajeInasist: 100,
    curso: 'INGENIERÍA INVERSA',
  },
  detalle: [
    { fecha: '3/01/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: true },
    { fecha: '8/01/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '10/01/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '15/01/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '17/01/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '22/01/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '24/01/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '29/01/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '31/01/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '5/02/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '7/02/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '12/02/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '14/02/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '19/02/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '21/02/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '26/02/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '28/02/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '4/03/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '6/03/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '11/03/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '13/03/2024', dia: 'Miércoles', entrada: '08:00', salida: '11:00', asistio: false },
    { fecha: '18/03/2024', dia: 'Lunes', entrada: '08:00', salida: '11:00', asistio: false },
  ],
};

const MiAsistencia: React.FC = () => {
  const [semestre, setSemestre] = useState('2025-1');
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string | null>(null);
  const [asistencia, setAsistencia] = useState<any>(null);

  //Esto es sin api
  const cardCursosRef = useRef<HTMLDivElement>(null);
  const cardAsistenciaRef = useRef<HTMLDivElement>(null);

  // Simulación de llamada a API al presionar "Mostrar"
  const handleMostrar = () => {
    setMostrarTabla(true);
    setCursoSeleccionado(null);
    setAsistencia(null); // Aquí iría la llamada real a la API
    setTimeout(() => {
      cardCursosRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Espera a que el card se renderice
  };

  // Simulación de llamada a API al presionar "Ver" asistencia
  const handleVerAsistencia = (codigo: string) => {
    setCursoSeleccionado(codigo);
    setAsistencia(asistenciaEjemplo); // Aquí iría la llamada real a la API
    setTimeout(() => {
    cardAsistenciaRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="asistencia-container asistencia-print">
        <h2 className="malla-title">Mi Asistencia</h2>
        {/* Card de datos del estudiante */}
        <div className="asistencia-card asistencia-card-estudiante">
            <div className="asistencia-estudiante-header">
                <div className="asistencia-nombre-estudiante">{estudianteEjemplo.nombre}</div>
            </div>
            <div className="asistencia-estudiante-info">
                <div><b>CÓDIGO:</b> {estudianteEjemplo.codigo}</div>
                <div><b>SEDE:</b> {estudianteEjemplo.sede}</div>
                <div><b>PLAN:</b> {estudianteEjemplo.plan}</div>
            </div>
            <div className="asistencia-estudiante-semestre">
                <b>SEMESTRE:</b>
                <input
                type="text"
                value={semestre}
                onChange={e => setSemestre(e.target.value)}
                className="asistencia-input-semestre"
                style={{ width: 80, marginLeft: 8, marginRight: 8 }}
                />
                <button className="asistencia-btn-mostrar" onClick={handleMostrar}>Mostrar</button>
            </div>
        </div>

        {/* Card de tabla de cursos */}
        {mostrarTabla && (
            <div className="asistencia-card asistencia-card-cursos" ref={cardCursosRef}>
            <h3 className="asistencia-titulo-cursos">MI HORARIO/ASISTENCIA</h3>
            <table className="asistencia-tabla-cursos">
                <thead>
                <tr>
                    <th>CÓDIGO</th>
                    <th>CURSO</th>
                    <th>CICLO</th>
                    <th>CRÉD.</th>
                    <th>SEC.</th>
                    <th>ASISTENCIA</th>
                </tr>
                </thead>
                <tbody>
                {cursosEjemplo.map(curso => (
                    <tr key={curso.codigo} className={curso.codigo === cursoSeleccionado ? 'asistencia-selected' : ''}>
                    <td>{curso.codigo}</td>
                    <td>
                        <div style={{ fontWeight: 600, color: '#ecc138' }}>
                        {curso.curso.split('\n')[0]}
                        </div>
                        {/*<div style={{ fontWeight: 700, color: '#000' }}>
                        {curso.curso.split('\n')[1]}
                        </div>
                        <div style={{ color: '#333', fontSize: '0.95em' }}>
                        {curso.curso.split('\n')[2]}
                        </div>*/}
                        <div style={{ color: '#3d3c3b', fontSize: '0.95em', marginTop: 4 }}>
                        {curso.horario.map((h, i) => (
                            <div key={i}>{h}</div>
                        ))}
                        </div>
                    </td>
                    <td>{curso.ciclo}</td>
                    <td>{curso.creditos}</td>
                    <td>{curso.seccion}</td>
                    <td>
                        <button className="asistencia-btn-ver" onClick={() => handleVerAsistencia(curso.codigo)}>
                        <EyeIcon className="asistencia-icono-ojo" />
                        Ver
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}

        {/* Card de asistencia */}
        {cursoSeleccionado && asistencia && (
            <div className="asistencia-card asistencia-card-asistencia" ref={cardAsistenciaRef}>
            <h3 className="asistencia-titulo-asistencia">REPORTE DE ASISTENCIA</h3>
            <table className="asistencia-tabla-asistencia">
                <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Día</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>¿Asistió?</th>
                </tr>
                </thead>
                <tbody>
                {asistencia.detalle.map((item: any, idx: number) => (
                    <tr key={idx}>
                    <td>{item.fecha}</td>
                    <td>{item.dia}</td>
                    <td>{item.entrada}</td>
                    <td>{item.salida}</td>
                    <td>
                        <input type="checkbox" checked={item.asistio} readOnly />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="asistencia-resumen-asistencia">
                <span>
                TOTAL: {asistencia.resumen.total} | Asistencias: {asistencia.resumen.asistencias} | Inasistencias: {asistencia.resumen.inasistencias} | % Inasist.: {asistencia.resumen.porcentajeInasist.toFixed(2)}
                </span>
                <div style={{ textAlign: 'center', fontWeight: 500, marginTop: 4 }}>
                {asistencia.resumen.curso}
                </div>
                <button className="asistencia-btn-imprimir" onClick={handleImprimir}>
                Imprimir
                <PrinterIcon className="asistencia-icono-impresora" />
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default MiAsistencia;