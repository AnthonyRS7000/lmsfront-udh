import React, { useState, useEffect } from 'react';
import './AccesGrabacionesPage.css';

// Mock data para cursos
const mockCursos = [
  {
    id: 'MAT101',
    nombre: 'MATEMÁTICA BÁSICA',
    codigo: 'MAT101',
    horario: '07:00 - 09:00',
    creditos: 4,
    dias: 'L M V',
    profesor: 'Dr. García López',
    tipo: 'obligatorio',
    prerequisitos: [],
    descripcion: 'Fundamentos de matemática para ingeniería'
  },
  {
    id: 'FIS201',
    nombre: 'FÍSICA GENERAL',
    codigo: 'FIS201',
    horario: '09:00 - 11:00',
    creditos: 3,
    dias: 'M J V',
    profesor: 'Mg. Rodríguez Silva',
    tipo: 'obligatorio',
    prerequisitos: ['MAT101'],
    descripcion: 'Principios básicos de la física aplicada'
  },
  {
    id: 'QUI301',
    nombre: 'QUÍMICA ORGÁNICA',
    codigo: 'QUI301',
    horario: '11:00 - 13:00',
    creditos: 4,
    dias: 'L M J',
    profesor: 'Dr. Martínez Pérez',
    tipo: 'obligatorio',
    prerequisitos: ['QUI201'],
    descripcion: 'Estudio de compuestos orgánicos y sus reacciones'
  },
  {
    id: 'BIO401',
    nombre: 'BIOLOGÍA MOLECULAR',
    codigo: 'BIO401',
    horario: '13:00 - 15:00',
    creditos: 3,
    dias: 'M V S',
    profesor: 'Dra. Flores Vega',
    tipo: 'obligatorio',
    prerequisitos: ['BIO301'],
    descripcion: 'Análisis molecular de procesos biológicos'
  },
  {
    id: 'ELE301',
    nombre: 'PROGRAMACIÓN AVANZADA',
    codigo: 'ELE301',
    horario: '15:00 - 17:00',
    creditos: 2,
    dias: 'L J',
    profesor: 'Ing. Torres Ramos',
    tipo: 'electivo',
    prerequisitos: ['PROG201'],
    descripcion: 'Técnicas avanzadas de programación'
  },
  {
    id: 'ELE601',
    nombre: 'ESTADÍSTICA APLICADA',
    codigo: 'ELE601',
    horario: '17:00 - 19:00',
    creditos: 2,
    dias: 'M V',
    profesor: 'Dr. Mendoza Castro',
    tipo: 'electivo',
    prerequisitos: ['MAT201'],
    descripcion: 'Aplicación de estadística en investigación'
  }
];

// Mock data para el estudiante
const mockEstudiante = {
  nombres: 'BENYAMIN FELIX',
  apellidos: 'ADRIAN LAZARO',
  codigo: '2019110501',
  semestre: '5° SEMESTRE',
  facultad: 'INGENIERÍA',
  programa: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA',
  creditosActuales: 12,
  creditosMaximos: 22,
  cursosAprobados: ['MAT101', 'PROG101', 'QUI201', 'BIO301', 'MAT201', 'PROG201']
};

// Mock data para grabaciones
const mockGrabaciones = {
  'MAT101': [
    { id: 1, titulo: 'Álgebra Lineal - Sesión 1', fecha: '2024-03-15', duracion: '1h 45m', tipo: 'clase' },
    { id: 2, titulo: 'Cálculo Diferencial - Sesión 2', fecha: '2024-03-18', duracion: '2h 10m', tipo: 'clase' },
    { id: 3, titulo: 'Examen Parcial - Revisión', fecha: '2024-03-20', duracion: '1h 30m', tipo: 'examen' }
  ],
  'FIS201': [
    { id: 4, titulo: 'Mecánica Clásica - Introducción', fecha: '2024-03-16', duracion: '2h 00m', tipo: 'clase' },
    { id: 5, titulo: 'Laboratorio de Física 1', fecha: '2024-03-19', duracion: '3h 15m', tipo: 'laboratorio' }
  ],
  'QUI301': [
    { id: 6, titulo: 'Reacciones Orgánicas - Parte 1', fecha: '2024-03-17', duracion: '1h 55m', tipo: 'clase' },
    { id: 7, titulo: 'Síntesis Orgánica - Práctica', fecha: '2024-03-21', duracion: '2h 30m', tipo: 'laboratorio' }
  ],
  'BIO401': [
    { id: 8, titulo: 'ADN y Replicación', fecha: '2024-03-14', duracion: '2h 20m', tipo: 'clase' }
  ],
  'ELE301': [
    { id: 9, titulo: 'Algoritmos Avanzados', fecha: '2024-03-13', duracion: '1h 40m', tipo: 'clase' },
    { id: 10, titulo: 'Proyecto Final - Presentación', fecha: '2024-03-22', duracion: '45m', tipo: 'presentacion' }
  ],
  'ELE601': [
    { id: 11, titulo: 'Análisis Estadístico con R', fecha: '2024-03-12', duracion: '2h 05m', tipo: 'clase' }
  ]
};

const GrabacionesPanel = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const cursosInscritos = mockCursos.filter(curso => 
    mockEstudiante.cursosAprobados.includes(curso.id) || 
    ['MAT101', 'FIS201', 'QUI301', 'BIO401', 'ELE301', 'ELE601'].includes(curso.id)
  );

  const grabacionesFiltradas = cursoSeleccionado 
    ? (mockGrabaciones[cursoSeleccionado.id] || []).filter(grabacion => {
        const matchTipo = filtroTipo === 'todos' || grabacion.tipo === filtroTipo;
        const matchBusqueda = grabacion.titulo.toLowerCase().includes(busqueda.toLowerCase());
        return matchTipo && matchBusqueda;
      })
    : [];

  const getTipoClass = (tipo) => {
    const clases = {
      'clase': 'tipo-clase',
      'examen': 'tipo-examen', 
      'laboratorio': 'tipo-laboratorio',
      'presentacion': 'tipo-presentacion'
    };
    return clases[tipo] || 'tipo-default';
  };

  return (
    <div className="grabaciones-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="main-title">
            <span className="title-icon">▶️</span>
            Acceso a Grabaciones
          </h1>
          
          <div className="student-info">
            <div className="student-name">
              {mockEstudiante.nombres} {mockEstudiante.apellidos}
            </div>
            <div className="student-details">{mockEstudiante.codigo} | {mockEstudiante.semestre}</div>
            <div className="student-program">{mockEstudiante.programa}</div>
          </div>
        </div>
      </div>

      <div className="main-layout">
        {/* Panel de Cursos */}
        <div className="cursos-panel">
          <h2 className="panel-title">
            <span className="panel-icon">📚</span>
            Mis Cursos
          </h2>

          <div className="cursos-list">
            {cursosInscritos.map((curso) => (
              <div
                key={curso.id}
                className={`curso-item ${cursoSeleccionado?.id === curso.id ? 'selected' : ''}`}
                onClick={() => setCursoSeleccionado(curso)}
              >
                <div className="curso-header">
                  <div className="curso-info">
                    <div className="curso-codigo">{curso.codigo}</div>
                    <div className="curso-nombre">{curso.nombre}</div>
                  </div>
                  
                  <span className={`curso-tipo ${curso.tipo === 'obligatorio' ? 'obligatorio' : 'electivo'}`}>
                    {curso.tipo.toUpperCase()}
                  </span>
                </div>

                <div className="curso-meta">
                  <div className="meta-item">
                    <span className="meta-icon">👨‍🏫</span>
                    <span className="meta-text">{curso.profesor}</span>
                  </div>
                </div>

                <div className="curso-schedule">
                  <div className="schedule-item">
                    <span className="schedule-icon">🕐</span>
                    <span className="schedule-text">{curso.horario}</span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-icon">📅</span>
                    <span className="schedule-text">{curso.dias}</span>
                  </div>
                </div>

                {mockGrabaciones[curso.id] && (
                  <div className="grabaciones-count">
                    {mockGrabaciones[curso.id].length} grabación(es) disponible(s)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Panel de Grabaciones */}
        <div className="grabaciones-panel">
          {cursoSeleccionado ? (
            <>
              {/* Header del curso seleccionado */}
              <div className="selected-course-header">
                <h2 className="course-title">
                  Grabaciones - {cursoSeleccionado.nombre}
                </h2>
                <p className="course-description">
                  {cursoSeleccionado.descripcion}
                </p>
              </div>

              {/* Controles de filtros */}
              <div className="filters-container">
                <input
                  type="text"
                  placeholder="Buscar grabaciones..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="search-input"
                />

                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="filter-select"
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="clase">Clases</option>
                  <option value="examen">Exámenes</option>
                  <option value="laboratorio">Laboratorios</option>
                  <option value="presentacion">Presentaciones</option>
                </select>
              </div>

              {/* Lista de grabaciones */}
              <div className="grabaciones-list">
                {grabacionesFiltradas.length > 0 ? (
                  grabacionesFiltradas.map((grabacion) => (
                    <div key={grabacion.id} className="grabacion-item">
                      <div className="grabacion-header">
                        <div className="grabacion-info">
                          <h3 className="grabacion-titulo">{grabacion.titulo}</h3>
                          
                          <div className="grabacion-meta">
                            <div className="meta-item">
                              <span className="meta-icon">📅</span>
                              <span className="meta-text">{grabacion.fecha}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-icon">🕐</span>
                              <span className="meta-text">{grabacion.duracion}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grabacion-actions">
                          <span className={`tipo-badge ${getTipoClass(grabacion.tipo)}`}>
                            {grabacion.tipo.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="action-buttons">
                        <button className="btn-reproducir">
                          <span className="btn-icon">▶️</span>
                          Reproducir
                        </button>

                        <button className="btn-descargar">
                          <span className="btn-icon">⬇️</span>
                          Descargar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">👁️</div>
                    <p className="empty-message">
                      {busqueda || filtroTipo !== 'todos' 
                        ? 'No se encontraron grabaciones con los filtros aplicados'
                        : 'No hay grabaciones disponibles para este curso'
                      }
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-course-selected">
              <div className="no-course-icon">▶️</div>
              <h3 className="no-course-title">Selecciona un curso</h3>
              <p className="no-course-message">
                Elige un curso de la lista para ver las grabaciones disponibles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrabacionesPanel;