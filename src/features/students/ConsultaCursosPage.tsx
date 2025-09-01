import React, { useState } from 'react';
import './ConsultaCursosPage.css';

// Mock data basado en tu código original
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
    descripcion: 'Aplicación de estadística en investigación'
  }
];

const mockEstudiante = {
  nombres: 'BENYAMIN FELIX',
  apellidos: 'ADRIAN LAZARO',
  codigo: '2019110501',
  semestre: '5° SEMESTRE',
  facultad: 'INGENIERÍA',
  programa: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA'
};

const ScheduleDistribution: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(['MAT101', 'FIS201', 'QUI301']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Configuración de días y horarios
  const dias = [
    { key: 'L', name: 'LUNES', full: 'Lunes' },
    { key: 'M', name: 'MARTES', full: 'Martes' },
    { key: 'J', name: 'MIÉRCOLES', full: 'Miércoles' },
    { key: 'V', name: 'JUEVES', full: 'Jueves' },
    { key: 'S', name: 'VIERNES', full: 'Viernes' },
    { key: 'D', name: 'SÁBADO', full: 'Sábado' }
  ];

  const horarios = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  // Función para convertir horario a horas
  const parseTime = (timeStr: string) => {
    const [start, end] = timeStr.split(' - ');
    return {
      start: parseInt(start.split(':')[0]),
      end: parseInt(end.split(':')[0])
    };
  };

  // Función para obtener cursos seleccionados
  const getSelectedCourses = () => {
    return mockCursos.filter(curso => selectedCourses.includes(curso.id));
  };

  // Función para obtener curso en una celda específica
  const getCourseAtSlot = (dia: string, hora: number) => {
    const selectedCoursesData = getSelectedCourses();
    
    return selectedCoursesData.find(curso => {
      const courseDays = curso.dias.split(' ');
      const timeSlot = parseTime(curso.horario);
      
      return courseDays.includes(dia) && 
             hora >= timeSlot.start && 
             hora < timeSlot.end;
    });
  };

  // Toggle selección de curso
  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  // Obtener clase CSS para cada curso
  const getCourseClass = (courseId: string) => {
    const classes = {
      'MAT101': 'course-blue',
      'FIS201': 'course-green',
      'QUI301': 'course-purple',
      'BIO401': 'course-orange',
      'ELE301': 'course-teal',
      'ELE601': 'course-pink'
    };
    return classes[courseId as keyof typeof classes] || 'course-gray';
  };

  const totalCreditos = getSelectedCourses().reduce((sum, curso) => sum + curso.creditos, 0);

  return (
    <div className="schedule-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="header-title">Distribución de Horarios</h1>
            <p className="header-subtitle">
              {mockEstudiante.nombres} {mockEstudiante.apellidos} - {mockEstudiante.semestre}
            </p>
          </div>
          <div className="header-actions">
            <div className="credits-display">
              <div className="credits-number">{totalCreditos}</div>
              <div className="credits-label">Créditos totales</div>
            </div>
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
              >
                Vista Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`}
              >
                Vista Lista
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="main-layout">
        {/* Horarios Grid/List */}
        <div className="schedule-content">
          {viewMode === 'grid' ? (
            <div className="schedule-grid">
              <div className="grid-header">
                <h2 className="grid-title">Horario Semanal</h2>
              </div>
              
              <div className="table-container">
                <table className="schedule-table">
                  <thead>
                    <tr className="table-header">
                      <th className="time-header">Hora</th>
                      {dias.map(dia => (
                        <th key={dia.key} className="day-header">
                          {dia.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {horarios.map(hora => (
                      <tr key={hora} className="table-row">
                        <td className="time-cell">
                          {hora}:00
                        </td>
                        {dias.map(dia => {
                          const curso = getCourseAtSlot(dia.key, parseInt(hora));
                          return (
                            <td key={`${dia.key}-${hora}`} className="schedule-cell">
                              {curso && (
                                <div className={`course-block ${getCourseClass(curso.id)}`}>
                                  <div className="course-code">{curso.codigo}</div>
                                  <div className="course-name">{curso.nombre}</div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="schedule-list">
              <div className="list-header">
                <h2 className="list-title">Lista de Horarios</h2>
              </div>
              <div className="list-content">
                {getSelectedCourses().map(curso => (
                  <div key={curso.id} className={`course-item ${getCourseClass(curso.id)}`}>
                    <div className="course-item-content">
                      <div className="course-details">
                        <h3 className="course-full-name">{curso.codigo} - {curso.nombre}</h3>
                        <p className="course-professor">Profesor: {curso.profesor}</p>
                        <p className="course-description">Descripción: {curso.descripcion}</p>
                      </div>
                      <div className="course-schedule">
                        <div className="schedule-time">{curso.horario}</div>
                        <div className="schedule-days">{curso.dias}</div>
                        <div className="schedule-credits">Créditos: {curso.creditos}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Cursos disponibles */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Cursos Disponibles</h3>
            <div className="courses-list">
              {mockCursos.map(curso => (
                <div
                  key={curso.id}
                  onClick={() => toggleCourse(curso.id)}
                  className={`available-course ${
                    selectedCourses.includes(curso.id) ? getCourseClass(curso.id) : 'course-unselected'
                  }`}
                >
                  <div className="available-course-content">
                    <div className="available-course-info">
                      <div className="available-course-code">{curso.codigo}</div>
                      <div className="available-course-name">{curso.nombre}</div>
                    </div>
                    <div className="selection-indicator">
                      {selectedCourses.includes(curso.id) ? '✓' : '+'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Resumen</h3>
            <div className="summary-content">
              <div className="summary-item">
                <span>Cursos seleccionados:</span>
                <span className="summary-value">{selectedCourses.length}</span>
              </div>
              <div className="summary-item">
                <span>Total de créditos:</span>
                <span className="summary-value">{totalCreditos}</span>
              </div>
              <div className="summary-item">
                <span>Tipo obligatorios:</span>
                <span className="summary-value">
                  {getSelectedCourses().filter(c => c.tipo === 'obligatorio').length}
                </span>
              </div>
              <div className="summary-item">
                <span>Tipo electivos:</span>
                <span className="summary-value">
                  {getSelectedCourses().filter(c => c.tipo === 'electivo').length}
                </span>
              </div>
            </div>
          </div>

          {/* Leyenda */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Leyenda</h3>
            <div className="legend-content">
              {getSelectedCourses().map(curso => (
                <div key={curso.id} className="legend-item">
                  <div className={`legend-color ${getCourseClass(curso.id)}`}></div>
                  <span className="legend-text">{curso.codigo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDistribution;