import React, { useState, useRef } from 'react';
import '../css/HistorialAcademico.css';
import { EyeIcon, PrinterIcon } from '@heroicons/react/24/outline';

interface Curso {
    codigo: string;
    nombre: string;
    ciclo: number;
    nota: number;
    prereq?: string;
    prereq2?: string;
    nroVecesLlevado: string;
    especializacion?: string;
}

const obtenerFechaHora = () => {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaStr = fecha.toLocaleDateString('es-PE', opciones);
    const horaStr = fecha.toLocaleTimeString('es-PE', { hour12: false });
    return { fechaStr, horaStr };
};

const cursosEjemplo: Curso[] = [
    { codigo: "062101011", nombre: "LENGUAJE I(04 cred.)", ciclo: 1, nota: 11, nroVecesLlevado: "01" },
    { codigo: "062101021", nombre: "MATEMÁTICA BÁSICA I(04 cred.)", ciclo: 1, nota: 16, nroVecesLlevado: "01" },
    { codigo: "062101031", nombre: "MÉTODOS Y TÉCNICAS DE ESTUDIO(03 cred.)", ciclo: 1, nota: 12, nroVecesLlevado: "01" },
    { codigo: "062101041", nombre: "ÉTICA Y LIDERAZGO(03 cred.)", ciclo: 1, nota: 14, nroVecesLlevado: "01" },
    { codigo: "062101051", nombre: "PSICOLOGÍA GENERAL(03 cred.)", ciclo: 1, nota: 14, nroVecesLlevado: "01" },
    { codigo: "062101061", nombre: "INTRODUCCIÓN A LA INGENIERÍA DE SISTEMAS E INFORMÁTICA(03 cred.)", ciclo: 1, nota: 12, nroVecesLlevado: "01" },
    { codigo: "062102011", nombre: "LENGUAJE II(04 cred.)", ciclo: 2, nota: 12, prereq: "062101011", nroVecesLlevado: "01" },
    { codigo: "062102021", nombre: "MATEMÁTICA BÁSICA II(04 cred.)", ciclo: 2, nota: 16, prereq: "062101021", nroVecesLlevado: "01" },
    { codigo: "062102031", nombre: "ECOLOGÍA Y PROTECCIÓN DEL MEDIO AMBIENTE(03 cred.)", ciclo: 2, nota: 12, prereq: "062101031", nroVecesLlevado: "01" },
    { codigo: "062102041", nombre: "SOCIOLOGÍA GENERAL(03 cred.)", ciclo: 2, nota: 14, prereq: "062101051", nroVecesLlevado: "01" },
    { codigo: "062102051", nombre: "TECNOLOGÍA INFORMÁTICA(02 cred.)", ciclo: 2, nota: 16, prereq: "062101061", nroVecesLlevado: "01" },
    { codigo: "062102062", nombre: "DESARROLLO PERSONAL(03 cred.)", ciclo: 2, nota: 13, prereq: "062101041", nroVecesLlevado: "01" },
];

const HistorialAcademico: React.FC = () => {
    const [codigo, setCodigo] = useState('2025110403');
    const [nombre, setNombre] = useState('ARMANDO ROJAS LUNA');
    const [cargando, setCargando] = useState(false);
    const [cursos, setCursos] = useState<Curso[]>(cursosEjemplo);
    const [buscado, setBuscado] = useState(false);
    const [cicloFiltro, setCicloFiltro] = useState<string>('');
    const [busqueda, setBusqueda] = useState<string>('');

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

    const handleBuscar = async () => {
        setCargando(true);
        setBuscado(true);
        // Simulación de llamada a API
        setTimeout(() => {
            setCargando(false);
            resultadosRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        // Aquí iría la llamada real a la API
        // try {
        //     const response = await fetch(`/api/historial-academico?codigo=${codigo}`);
        //     const data = await response.json();
        //     setNombre(data.nombreCompleto);
        //     setCursos(data.cursos);
        // } catch (error) {
        //     setCursos([]);
        //     setNombre('');
        // }
    };

    const handleImprimir = () => {
        window.print();
    };

    const { fechaStr, horaStr } = obtenerFechaHora();

    return (
        <div className="container historial-print">
            <h2 className="historial-title">Historial Académico</h2>

            {/* Card de código */}
            <div className="historial-card historial-card-codigo">
                <div className="historial-codigo-row">
                    <label className="historial-codigo-label">Código:</label>
                    <input
                        type="text"
                        value={codigo}
                        onChange={e => setCodigo(e.target.value.replace(/\D/,''))}
                        placeholder="Ingrese código"
                        inputMode="numeric"
                        className="historial-input-codigo"
                    />
                    <button className="historial-btn-ver" onClick={handleBuscar} disabled={cargando}>
                        <EyeIcon className="historial-icono-ojo" />
                        {cargando ? 'Cargando...' : 'VER'}
                    </button>
                </div>
            </div>

            {/* Card de resultados */}
            {buscado && (
            <div className="historial-card historial-card-resultados" ref={resultadosRef}>
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
            )}
        </div>
    );
};

export default HistorialAcademico;