import React, { useState } from 'react';
import './AulasVirtualesPage.css';

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
    descripcion: 'Fundamentos de matemática para ingeniería',
    color: '#FF6B6B'
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
    descripcion: 'Principios básicos de la física aplicada',
    color: '#4ECDC4'
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
    descripcion: 'Estudio de compuestos orgánicos y sus reacciones',
    color: '#45B7D1'
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
    descripcion: 'Análisis molecular de procesos biológicos',
    color: '#96CEB4'
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
    descripcion: 'Técnicas avanzadas de programación',
    color: '#FECA57'
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
    descripcion: 'Aplicación de estadística en investigación',
    color: '#A55EEA'
  }
];

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

const AulasVirtualesPanel = () => {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const cursosFiltrados = mockCursos.filter(curso => {
    const cumpleFiltro = filtroTipo === 'todos' || curso.tipo === filtroTipo;
    const cumpleBusqueda = curso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          curso.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          curso.profesor.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  const puedeAcceder = (curso) => {
    return curso.prerequisitos.every(prereq => 
      mockEstudiante.cursosAprobados.includes(prereq)
    );
  };

  // Función para navegar a ClasesVivoPage
  const navegarAClasesVivo = (cursoId) => {
    console.log(`Navegando a ClasesVivoPage para el curso: ${cursoId}`);
    alert(`Redirigiendo a ClasesVivoPage - Curso: ${cursoId}`);
  };

  // Función para navegar a TareasPage
  const navegarATareas = (cursoId) => {
    console.log(`Navegando a TareasPage para el curso: ${cursoId}`);
    alert(`Redirigiendo a TareasPage - Curso: ${cursoId}`);
  };

  return (
    <div className="aulas-virtuales-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">
            Aulas Virtuales
          </h1>
          <p className="header-subtitle">
            Accede a tus clases virtuales y contenido académico
          </p>
        </div>
      </div>

      <div className="main-content">
        {/* NUEVA ESTRUCTURA: Content Layout */}
        <div className="content-layout">
          {/* Información del Estudiante */}
          

          {/* Filtros y Búsqueda */}
          <div className="filters-section">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Todos los cursos</option>
              <option value="obligatorio">Obligatorios</option>
              <option value="electivo">Electivos</option>
            </select>
          </div>

          {/* Grid de Cursos */}
          <div className="courses-grid">
            {cursosFiltrados.map((curso) => {
              const accesible = puedeAcceder(curso);
              return (
                <div
                  key={curso.id}
                  className={`course-card ${!accesible ? 'disabled' : ''}`}
                >
                  {/* Header del curso */}
                  <div 
                    className="course-header"
                    style={{
                      background: `linear-gradient(135deg, ${curso.color}, ${curso.color}dd)`
                    }}
                  >
                    <div className="course-header-content">
                      <div className="course-info">
                        <h3 className="course-title">
                          {curso.nombre}
                        </h3>
                        <p className="course-code">
                          {curso.codigo}
                        </p>
                      </div>
                      <div className="course-credits">
                        {curso.creditos} CR
                      </div>
                    </div>
                  </div>

                  {/* Contenido del curso */}
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-detail-item">
                        <span className="course-detail-icon">👥</span>
                        <span className="course-detail-text">{curso.profesor}</span>
                      </div>
                      <div className="course-detail-item">
                        <span className="course-detail-icon">🕐</span>
                        <span className="course-detail-text">{curso.horario} - {curso.dias}</span>
                      </div>
                      <div className="course-detail-item">
                        <span className="course-detail-icon">📚</span>
                        <span className={`course-type ${curso.tipo}`}>
                          {curso.tipo}
                        </span>
                      </div>
                    </div>

                    <p className="course-description">
                      {curso.descripcion}
                    </p>

                    {curso.prerequisitos.length > 0 && (
                      <div className="course-prerequisites">
                        <span className="prerequisites-label">
                          Prerequisitos: 
                        </span>
                        <span className="prerequisites-text">
                          {curso.prerequisitos.join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Botones de acción */}
                    <div className="course-actions">
                      {/* Botón Ingresar al Aula */}
                      <button
                        disabled={!accesible}
                        onClick={() => accesible && navegarAClasesVivo(curso.id)}
                        className="course-button primary"
                        style={{
                          backgroundColor: accesible ? curso.color : undefined
                        }}
                      >
                        <span className="button-icon">🎥</span>
                        {accesible ? 'Ingresar al Aula' : 'Bloqueado'}
                      </button>

                      {/* Botón Tareas */}
                      <button
                        disabled={!accesible}
                        onClick={() => accesible && navegarATareas(curso.id)}
                        className="course-button secondary"
                      >
                        <span className="button-icon">📝</span>
                        {accesible ? 'Tareas' : 'Bloqueado'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {cursosFiltrados.length === 0 && (
              <div className="empty-state">
                <p>
                  No se encontraron cursos que coincidan con tu búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AulasVirtualesPanel;