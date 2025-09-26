import React, { useState, useRef, useEffect } from 'react';
import { ApiService } from "../../../../components/pages/ApiService";
import '../css/HistorialAcademico.css';
import { PrinterIcon } from '@heroicons/react/24/outline';
import Homero from "../../../../assets/homero-pensando.png";

const obtenerFechaHora = () => {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaStr = fecha.toLocaleDateString('es-PE', opciones);
    const horaStr = fecha.toLocaleTimeString('es-PE', { hour12: false });
    return { fechaStr, horaStr };
};

const HistorialAcademico: React.FC = () => {
    const [cursos, setCursos] = useState([]); 
    const [udhData, setUdhData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [codigo, setCodigo] = useState('2025110403');
    const [nombre, setNombre] = useState('ARMANDO ROJAS LUNA');
    
    const [cicloFiltro, setCicloFiltro] = useState<string>('');
    const [busqueda, setBusqueda] = useState<string>('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datosUdh);
    }, []);

    // Referencia para scroll al card de resultados
    const resultadosRef = useRef<HTMLDivElement>(null);

    // Obtener ciclos únicos para el filtro
    const ciclosUnicos = Array.from(new Set(cursos.map(c => c.ciclo))).sort((a, b) => a - b);

    // Filtrado de cursos
    const cursosFiltrados = cursos.filter(curso => {
        const coincideCiclo = cicloFiltro === '' || String(curso.ciclo) === cicloFiltro;
        const coincideBusqueda =
            busqueda.trim() === '' ||
            curso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            curso.codigo.includes(busqueda) ||
            (curso.especializacion && curso.especializacion.toLowerCase().includes(busqueda.toLowerCase()));
        return coincideCiclo && coincideBusqueda;
    });

    const handleImprimir = () => {
        window.print();
    };

    const { fechaStr, horaStr } = obtenerFechaHora();

    return (
        <div className="container historial-print">
            <h2 className="historial-title">Cursos Llevados</h2>

            {/* Card de resultados */}
            <div className={`historial-card ${darkMode ? 'dark' : ''} historial-card-resultados`} ref={resultadosRef}>
                <div className="historial-barra-superior">
                    <div className="historial-nombre-usuario">
                        <label className="historial-codigo-label">Apellidos y Nombres:</label>
                        <input
                            type="text"
                            value={nombre}
                            disabled
                            className="historial-input-disabled historial-input-nombre-auto"
                            size={Math.max(20, nombre.length + 2)}
                            style={{ minWidth: '220px', maxWidth: '100%' }}
                        />
                    </div>
                    <div className="historial-filtros-row">
                        <div>
                            <label htmlFor="busqueda">Buscar:</label>
                            <input
                                id="busqueda"
                                type="text"
                                placeholder="Buscar curso, código..."
                                value={busqueda}
                                onChange={e => setBusqueda(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="filtro-ciclo">Ciclo:</label>
                            <select
                                id="filtro-ciclo"
                                value={cicloFiltro}
                                onChange={e => setCicloFiltro(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {ciclosUnicos.map(ciclo => (
                                    <option key={ciclo} value={ciclo}>{ciclo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="historial-tabla-container">
                    <table className="historial-tabla-cursos">
                        <thead>
                            <tr>
                                <th>CÓDIGO</th>
                                <th>CURSO</th>
                                <th>CICLO</th>
                                <th>NOTA</th>
                                <th>PREREQ.</th>
                                <th>PREREQ2.</th>
                                <th>Nro Veces Llevado</th>
                                <th>Especialización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando ? (
                                <tr>
                                    <td colSpan={8} className="center">Cargando...</td>
                                </tr>
                            ) : cursosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="center">No hay datos para mostrar.</td>
                                </tr>
                            ) : (
                                cursosFiltrados.map((curso, idx) => (
                                    <tr key={curso.codigo} className={idx % 2 ? 'row-par' : ''}>
                                        <td>{curso.codigo}</td>
                                        <td>{curso.nombre}</td>
                                        <td>{curso.ciclo}</td>
                                        <td>{curso.nota}</td>
                                        <td>{curso.prereq || '-'}</td>
                                        <td>{curso.prereq2 || '-'}</td>
                                        <td>{curso.nroVecesLlevado}</td>
                                        <td>{curso.especializacion || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Mensaje y botón de imprimir */}
                <div className="historial-mensaje-imprimir">
                    <div className="historial-mensaje-electivo">
                        <b>
                            *Recuerde que también debe llevar cursos electivos para poder culminar su carrera a excepción de derecho.
                        </b>
                    </div>
                    <div className="historial-footer">
                        <div>
                            Oficina de Matrícula {fechaStr}. Hora: {horaStr}
                        </div>
                        <button className="historial-btn-imprimir" onClick={handleImprimir}>
                            <PrinterIcon className="historial-icono-impresora" />
                            Imprimir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistorialAcademico;