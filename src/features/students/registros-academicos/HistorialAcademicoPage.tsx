import { useState } from 'react';
import './HistorialAcademicoPage.css';

type SemesterKey = '2025-1' | '2024-2' | '2024-1' | '2023-2' | '2023-1' | '2022-2';

const HistorialAcademicoPage = () => {
  const [expandedSemesters, setExpandedSemesters] = useState<Record<SemesterKey, boolean>>({
    '2025-1': true,
    '2024-2': false,
    '2024-1': false,
    '2023-2': false,
    '2023-1': false,
    '2022-2': false
  });

  const [filtroSemestre, setFiltroSemestre] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const toggleSemester = (semester: SemesterKey) => {
    setExpandedSemesters(prev => ({
      ...prev,
      [semester]: !prev[semester]
    }));
  };

  // Mock data - Historial académico completo
  const historialAcademico = {
    '2025-1': {
      periodo: '2025-1',
      nombre: 'Primer Semestre 2025',
      estado: 'En Curso',
      promedioSemestre: 16.8,
      creditosAprobados: 0,
      creditosTotal: 18,
      cursos: [
        { 
          codigo: 'MAT101', 
          nombre: 'MATEMÁTICA BÁSICA', 
          creditos: 4, 
          tipo: 'Obligatorio',
          calificacionFinal: null,
          estado: 'En Curso',
          observaciones: 'Cursando actualmente',
          prerrequisitos: ['MAT000'],
          docente: 'Dr. Carlos Mendoza'
        },
        { 
          codigo: 'FIS201', 
          nombre: 'FÍSICA GENERAL', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: null,
          estado: 'En Curso',
          observaciones: 'Cursando actualmente',
          prerrequisitos: ['MAT000', 'FIS101'],
          docente: 'Mg. Ana García'
        },
        { 
          codigo: 'QUI301', 
          nombre: 'QUÍMICA ORGÁNICA', 
          creditos: 4, 
          tipo: 'Obligatorio',
          calificacionFinal: null,
          estado: 'En Curso',
          observaciones: 'Cursando actualmente',
          prerrequisitos: ['QUI101'],
          docente: 'Dr. Luis Rodríguez'
        },
        { 
          codigo: 'BIO401', 
          nombre: 'BIOLOGÍA MOLECULAR', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: null,
          estado: 'En Curso',
          observaciones: 'Cursando actualmente',
          prerrequisitos: ['BIO101', 'QUI101'],
          docente: 'Dra. María Flores'
        },
        { 
          codigo: 'ELE301', 
          nombre: 'PROGRAMACIÓN AVANZADA', 
          creditos: 2, 
          tipo: 'Electivo',
          calificacionFinal: null,
          estado: 'En Curso',
          observaciones: 'Cursando actualmente',
          prerrequisitos: ['PROG101'],
          docente: 'Ing. José Santos'
        },
        { 
          codigo: 'ELE601', 
          nombre: 'ESTADÍSTICA APLICADA', 
          creditos: 2, 
          tipo: 'Electivo',
          calificacionFinal: null,
          estado: 'En Curso',
          observaciones: 'Cursando actualmente',
          prerrequisitos: ['MAT001'],
          docente: 'Mg. Patricia López'
        }
      ]
    },
    '2024-2': {
      periodo: '2024-2',
      nombre: 'Segundo Semestre 2024',
      estado: 'Completado',
      promedioSemestre: 15.2,
      creditosAprobados: 17,
      creditosTotal: 17,
      cursos: [
        { 
          codigo: 'MAT001', 
          nombre: 'CÁLCULO I', 
          creditos: 4, 
          tipo: 'Obligatorio',
          calificacionFinal: 15.0,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: ['MAT000'],
          docente: 'Dr. Roberto Silva'
        },
        { 
          codigo: 'FIS101', 
          nombre: 'FÍSICA BÁSICA', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 16.3,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: ['MAT000'],
          docente: 'Mg. Carmen Vega'
        },
        { 
          codigo: 'QUI101', 
          nombre: 'QUÍMICA GENERAL', 
          creditos: 4, 
          tipo: 'Obligatorio',
          calificacionFinal: 14.3,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Dr. Miguel Torres'
        },
        { 
          codigo: 'BIO101', 
          nombre: 'BIOLOGÍA GENERAL', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 17.3,
          estado: 'Aprobado',
          observaciones: 'Aprobado con distinción',
          prerrequisitos: [],
          docente: 'Dra. Elena Morales'
        },
        { 
          codigo: 'ING101', 
          nombre: 'INGLÉS TÉCNICO', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 13.3,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Mg. David Johnson'
        }
      ]
    },
    '2024-1': {
      periodo: '2024-1',
      nombre: 'Primer Semestre 2024',
      estado: 'Completado',
      promedioSemestre: 14.8,
      creditosAprobados: 15,
      creditosTotal: 18,
      cursos: [
        { 
          codigo: 'MAT000', 
          nombre: 'MATEMÁTICA BÁSICA', 
          creditos: 3, 
          tipo: 'Nivelación',
          calificacionFinal: 15.3,
          estado: 'Aprobado',
          observaciones: 'Curso de nivelación aprobado',
          prerrequisitos: [],
          docente: 'Mg. Pedro Ramírez'
        },
        { 
          codigo: 'LEN101', 
          nombre: 'LENGUAJE Y COMUNICACIÓN', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 16.3,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Dra. Rosa Herrera'
        },
        { 
          codigo: 'FIL101', 
          nombre: 'FILOSOFÍA', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 13.7,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Dr. Antonio Castillo'
        },
        { 
          codigo: 'HIS101', 
          nombre: 'HISTORIA DEL PERÚ', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 14.7,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Mg. Julia Mendoza'
        },
        { 
          codigo: 'PSI101', 
          nombre: 'PSICOLOGÍA GENERAL', 
          creditos: 3, 
          tipo: 'Electivo',
          calificacionFinal: 12.0,
          estado: 'Desaprobado',
          observaciones: 'Desaprobado por inasistencias. Debe recursar.',
          prerrequisitos: [],
          docente: 'Mg. Sandra Villareal'
        },
        { 
          codigo: 'SOC101', 
          nombre: 'SOCIOLOGÍA', 
          creditos: 3, 
          tipo: 'Electivo',
          calificacionFinal: 13.3,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Dr. Fernando Castro'
        }
      ]
    },
    '2023-2': {
      periodo: '2023-2',
      nombre: 'Segundo Semestre 2023',
      estado: 'Completado',
      promedioSemestre: 14.5,
      creditosAprobados: 12,
      creditosTotal: 15,
      cursos: [
        { 
          codigo: 'PROG101', 
          nombre: 'INTRODUCCIÓN A LA PROGRAMACIÓN', 
          creditos: 4, 
          tipo: 'Obligatorio',
          calificacionFinal: 16.0,
          estado: 'Aprobado',
          observaciones: 'Aprobado con buena nota',
          prerrequisitos: [],
          docente: 'Ing. Marco Gonzales'
        },
        { 
          codigo: 'EST101', 
          nombre: 'ESTADÍSTICA BÁSICA', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 14.5,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: ['MAT000'],
          docente: 'Mg. Teresa Aguirre'
        },
        { 
          codigo: 'MET101', 
          nombre: 'METODOLOGÍA DE LA INVESTIGACIÓN', 
          creditos: 3, 
          tipo: 'Obligatorio',
          calificacionFinal: 13.8,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Dr. Alberto Ruiz'
        },
        { 
          codigo: 'ECO101', 
          nombre: 'ECONOMÍA GENERAL', 
          creditos: 3, 
          tipo: 'Electivo',
          calificacionFinal: 10.5,
          estado: 'Desaprobado',
          observaciones: 'Desaprobado. Debe recursar.',
          prerrequisitos: [],
          docente: 'Mg. Carmen Delgado'
        },
        { 
          codigo: 'ART101', 
          nombre: 'APRECIACIÓN ARTÍSTICA', 
          creditos: 2, 
          tipo: 'Electivo',
          calificacionFinal: 15.2,
          estado: 'Aprobado',
          observaciones: 'Aprobado en primera matrícula',
          prerrequisitos: [],
          docente: 'Prof. María Salazar'
        }
      ]
    }
  };

  // Calcular estadísticas generales
  const calcularEstadisticas = () => {
    let totalCursos = 0;
    let cursosAprobados = 0;
    let cursosDesaprobados = 0;
    let creditosAprobados = 0;
    let creditosTotal = 0;
    let sumaPromedios = 0;
    let contadorPromedios = 0;

    Object.values(historialAcademico).forEach(semestre => {
      semestre.cursos.forEach(curso => {
        totalCursos++;
        creditosTotal += curso.creditos;
        
        if (curso.estado === 'Aprobado') {
          cursosAprobados++;
          creditosAprobados += curso.creditos;
        } else if (curso.estado === 'Desaprobado') {
          cursosDesaprobados++;
        }
        
        if (curso.calificacionFinal !== null) {
          sumaPromedios += curso.calificacionFinal;
          contadorPromedios++;
        }
      });
    });

    const promedioGeneral = contadorPromedios > 0 ? sumaPromedios / contadorPromedios : 0;
    const porcentajeAvance = creditosTotal > 0 ? (creditosAprobados / 200) * 100 : 0; // Asumiendo 200 créditos totales de carrera

    return {
      totalCursos,
      cursosAprobados,
      cursosDesaprobados,
      creditosAprobados,
      creditosTotal,
      promedioGeneral: Math.round(promedioGeneral * 10) / 10,
      porcentajeAvance: Math.round(porcentajeAvance)
    };
  };

  const estadisticas = calcularEstadisticas();

  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
        return 'estado-aprobado';
      case 'Desaprobado':
        return 'estado-desaprobado';
      case 'En Curso':
        return 'estado-en-curso';
      default:
        return '';
    }
  };

  const getCalificacionClass = (calificacion: number | null) => {
    if (calificacion === null) return 'calificacion-pendiente';
    if (calificacion >= 17) return 'calificacion-excelente';
    if (calificacion >= 14) return 'calificacion-buena';
    if (calificacion >= 11) return 'calificacion-regular';
    return 'calificacion-mala';
  };

  return (
    <div className="historial-academico-container">
      <div className="historial-academico-card">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">Historial Académico</h1>
          <p className="header-subtitle">
            Registro completo de tu trayectoria académica universitaria
          </p>
        </div>

        {/* Resumen estadístico */}
        <div className="resumen-container">
          <div className="resumen-grid">
            <div className="resumen-card promedio-general">
              <div className="resumen-icon">📊</div>
              <div className="resumen-content">
                <div className="resumen-number">{estadisticas.promedioGeneral}</div>
                <div className="resumen-label">Promedio Acumulado</div>
              </div>
            </div>
            
            <div className="resumen-card cursos-aprobados">
              <div className="resumen-icon">✅</div>
              <div className="resumen-content">
                <div className="resumen-number">{estadisticas.cursosAprobados}</div>
                <div className="resumen-label">Cursos Aprobados</div>
              </div>
            </div>
            
            <div className="resumen-card creditos-acumulados">
              <div className="resumen-icon">🎓</div>
              <div className="resumen-content">
                <div className="resumen-number">{estadisticas.creditosAprobados}</div>
                <div className="resumen-label">Créditos Acumulados</div>
              </div>
            </div>
            
            <div className="resumen-card porcentaje-avance">
              <div className="resumen-icon">📈</div>
              <div className="resumen-content">
                <div className="resumen-number">{estadisticas.porcentajeAvance}%</div>
                <div className="resumen-label">Avance de Carrera</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-container">
          <div className="filtros-grid">
            <div className="filtro-group">
              <label htmlFor="filtro-semestre" className="filtro-label">
                Filtrar por Semestre:
              </label>
              <select 
                id="filtro-semestre"
                value={filtroSemestre} 
                onChange={(e) => setFiltroSemestre(e.target.value)}
                className="filtro-select"
              >
                <option value="todos">Todos los semestres</option>
                <option value="2025-1">2025-1</option>
                <option value="2024-2">2024-2</option>
                <option value="2024-1">2024-1</option>
                <option value="2023-2">2023-2</option>
              </select>
            </div>
            
            <div className="filtro-group">
              <label htmlFor="filtro-estado" className="filtro-label">
                Filtrar por Estado:
              </label>
              <select 
                id="filtro-estado"
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="filtro-select"
              >
                <option value="todos">Todos los estados</option>
                <option value="Aprobado">Aprobados</option>
                <option value="Desaprobado">Desaprobados</option>
                <option value="En Curso">En Curso</option>
              </select>
            </div>

            <div className="filtro-group">
              <label htmlFor="filtro-tipo" className="filtro-label">
                Filtrar por Tipo:
              </label>
              <select 
                id="filtro-tipo"
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="filtro-select"
              >
                <option value="todos">Todos los tipos</option>
                <option value="Obligatorio">Obligatorios</option>
                <option value="Electivo">Electivos</option>
                <option value="Nivelación">Nivelación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de semestres */}
        <div className="semestres-container">
          {Object.entries(historialAcademico)
            .filter(([periodo]) => filtroSemestre === 'todos' || periodo === filtroSemestre)
            .map(([periodo, semestre]) => (
            <div key={periodo} className="semestre-card">
              <div 
                className="semestre-header"
                onClick={() => toggleSemester(periodo as SemesterKey)}
              >
                <div className="semestre-info">
                  <h3 className="semestre-titulo">{semestre.nombre}</h3>
                  <div className="semestre-meta">
                    <span className={`semestre-estado estado-${semestre.estado.toLowerCase().replace(' ', '-')}`}>
                      {semestre.estado}
                    </span>
                    <span className="semestre-promedio">
                      Promedio: <strong>{semestre.promedioSemestre}</strong>
                    </span>
                    <span className="semestre-creditos">
                      Créditos: {semestre.creditosAprobados}/{semestre.creditosTotal}
                    </span>
                  </div>
                </div>
                <div className={`expand-icon ${expandedSemesters[periodo as SemesterKey] ? 'expanded' : ''}`}>
                  ▼
                </div>
              </div>

              {expandedSemesters[periodo as SemesterKey] && (
                <div className="cursos-container">
                  <div className="cursos-table">
                    <div className="table-header">
                      <div className="th codigo">Código</div>
                      <div className="th curso">Curso</div>
                      <div className="th creditos">Créditos</div>
                      <div className="th tipo">Tipo</div>
                      <div className="th calificacion">Calificación</div>
                      <div className="th estado">Estado</div>
                      <div className="th docente">Docente</div>
                      <div className="th observaciones">Observaciones</div>
                    </div>

                    {semestre.cursos
                      .filter(curso => filtroEstado === 'todos' || curso.estado === filtroEstado)
                      .filter(curso => filtroTipo === 'todos' || curso.tipo === filtroTipo)
                      .map((curso, index) => (
                      <div key={index} className="table-row">
                        <div className="td codigo">{curso.codigo}</div>
                        <div className="td curso">
                          <div className="curso-info">
                            <div className="curso-nombre">{curso.nombre}</div>
                            {curso.prerrequisitos.length > 0 && (
                              <div className="prerrequisitos">
                                <span className="prerreq-label">Prereq:</span>
                                {curso.prerrequisitos.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="td creditos">{curso.creditos}</div>
                        <div className="td tipo">
                          <span className={`tipo-badge tipo-${curso.tipo.toLowerCase()}`}>
                            {curso.tipo}
                          </span>
                        </div>
                        <div className="td calificacion">
                          <span className={`calificacion-valor ${getCalificacionClass(curso.calificacionFinal)}`}>
                            {curso.calificacionFinal || 'En curso'}
                          </span>
                        </div>
                        <div className="td estado">
                          <span className={`estado-badge ${getEstadoClass(curso.estado)}`}>
                            {curso.estado}
                          </span>
                        </div>
                        <div className="td docente">{curso.docente}</div>
                        <div className="td observaciones">
                          <span className="observaciones-text">{curso.observaciones}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="info-adicional">
          <div className="info-card">
            <h3 className="info-titulo">📋 Información del Historial</h3>
            <ul className="info-lista">
              <li><strong>Total de cursos matriculados:</strong> {estadisticas.totalCursos}</li>
              <li><strong>Cursos aprobados:</strong> {estadisticas.cursosAprobados}</li>
              <li><strong>Cursos desaprobados:</strong> {estadisticas.cursosDesaprobados}</li>
              <li><strong>Promedio acumulado:</strong> {estadisticas.promedioGeneral}</li>
              <li><strong>Porcentaje de avance:</strong> {estadisticas.porcentajeAvance}%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialAcademicoPage;
