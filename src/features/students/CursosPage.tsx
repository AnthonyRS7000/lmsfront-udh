import React, { useState } from 'react';
import './CursosPage.css';

// Mock data para los cursos
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

const ProfilePage: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (courseId: string) => {
    const curso = mockCursos.find(c => c.id === courseId);
    if (!curso || !canSelectCourse(curso)) return;

    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const getTotalCredits = (): number => {
    return selectedCourses.reduce((total, courseId) => {
      const curso = mockCursos.find(c => c.id === courseId);
      return total + (curso?.creditos || 0);
    }, 0);
  };

  const canSelectCourse = (curso: typeof mockCursos[0]): boolean => {
    return curso.prerequisitos.every(prereq => 
      mockEstudiante.cursosAprobados.includes(prereq)
    );
  };

  const handleContinue = () => {
    if (selectedCourses.length > 0) {
      const selectedData = mockCursos.filter(curso => selectedCourses.includes(curso.id));
      console.log('Cursos seleccionados:', selectedData);
      alert(`Procesando ${selectedCourses.length} cursos seleccionados para matrícula...`);
    }
  };

  const getTotalCreditsWithCurrent = () => mockEstudiante.creditosActuales + getTotalCredits();
  const getProgressPercentage = () => (getTotalCreditsWithCurrent() / mockEstudiante.creditosMaximos) * 100;

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="semester-badge">
          <span className="semester-text">{mockEstudiante.semestre}</span>
        </div>
        <h1 className="title">SELECCIÓN DE CURSOS</h1>
        <p className="subtitle">Seleccione los cursos que desea llevar este semestre</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Courses Section */}
        <div className="courses-section">
          <div className="courses-grid">
            {mockCursos.map((curso, index) => {
              const isSelected = selectedCourses.includes(curso.id);
              const canSelect = canSelectCourse(curso);
              const isElectivo = curso.tipo === 'electivo';
              
              const cardClasses = [
                'course-card',
                isSelected ? 'selected' : '',
                !canSelect ? 'disabled' : ''
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={curso.id}
                  className={cardClasses}
                  onClick={() => toggleCourse(curso.id)}
                >
                  {/* Course Header */}
                  <div className="course-header">
                    <h3 className="course-title">
                      {isElectivo ? `ELECTIVO ${index - 3}` : `CURSO ${index + 1}`}
                    </h3>
                    <p className="course-name">{curso.nombre}</p>
                  </div>

                  {/* Schedule Display */}
                  <div className="schedule-box">
                    <div className="days-container">
                      {curso.dias.split(' ').map((dia, diaIndex) => (
                        <span key={diaIndex} className="day-badge">
                          {dia}
                        </span>
                      ))}
                    </div>
                    <div className="time-text">{curso.horario}</div>
                  </div>

                  {/* Credits */}
                  <div className="credits-text">Créditos: {curso.creditos}</div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="check-icon">✓</div>
                  )}

                  {/* Prerequisites warning */}
                  {!canSelect && (
                    <div className="warning-overlay">
                      Requisitos no cumplidos
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Student Info */}
          <div className="student-info">
            <h3>Información del Estudiante</h3>
            <div className="info-item">
              <div className="info-label">Estudiante</div>
              <div className="info-value">
                {mockEstudiante.nombres} {mockEstudiante.apellidos}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Código</div>
              <div className="info-value">{mockEstudiante.codigo}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Programa</div>
              <div className="info-value">{mockEstudiante.programa}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{selectedCourses.length}</div>
                <div className="stat-label">Seleccionados</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{getTotalCredits()}</div>
                <div className="stat-label">Créditos</div>
              </div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(getProgressPercentage(), 100)}%` }}
              />
            </div>
            <div className="progress-text">
              <span>{getTotalCreditsWithCurrent()}</span> / <span>{mockEstudiante.creditosMaximos}</span> créditos totales
            </div>
          </div>

          {/* Selected Courses */}
          <div className="selected-courses">
            <h4>Cursos Seleccionados</h4>
            <div className="selected-courses-list">
              {selectedCourses.length === 0 ? (
                <div className="no-courses-selected">
                  No hay cursos seleccionados
                </div>
              ) : (
                selectedCourses.map(courseId => {
                  const curso = mockCursos.find(c => c.id === courseId);
                  return (
                    <div key={courseId} className="selected-course-item">
                      {curso?.codigo} - {curso?.creditos} créditos
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Continue Button */}
          <button 
            className={`continue-button ${
              selectedCourses.length > 0 && getTotalCreditsWithCurrent() <= mockEstudiante.creditosMaximos
                ? 'active' 
                : 'disabled'
            }`}
            onClick={handleContinue}
            disabled={selectedCourses.length === 0 || getTotalCreditsWithCurrent() > mockEstudiante.creditosMaximos}
          >
            Continuar con la matrícula
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;