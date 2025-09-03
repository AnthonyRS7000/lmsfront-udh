import React, { useState } from 'react';
import './HistorialMatriculaPage.css';
const HistorialMatriculas = () => {
  const [expandedSemesters, setExpandedSemesters] = useState({
    '2025-1': true,
    '2024-2': false,
    '2024-1': false,
    '2023-2': false
  });

  const [expandedChanges, setExpandedChanges] = useState({
    '2025-1': true,
    '2024-2': false,
    '2024-1': false,
    '2023-2': false
  });

  const toggleSemester = (semester) => {
    setExpandedSemesters(prev => ({
      ...prev,
      [semester]: !prev[semester]
    }));
  };

  const toggleChanges = (semester) => {
    setExpandedChanges(prev => ({
      ...prev,
      [semester]: !prev[semester]
    }));
  };

  // Mock data - Historial de matrículas
  const historialMatriculas = {
    '2025-1': {
      periodo: '2025-1',
      nombre: 'Primer Semestre 2025',
      estado: 'Activo',
      fechaMatricula: '2025-01-15',
      creditosTotal: 18,
      cursosMatriculados: [
        { codigo: 'MAT101', nombre: 'MATEMÁTICA BÁSICA', creditos: 4, tipo: 'Obligatorio', estado: 'Matriculado' },
        { codigo: 'FIS201', nombre: 'FÍSICA GENERAL', creditos: 3, tipo: 'Obligatorio', estado: 'Matriculado' },
        { codigo: 'QUI301', nombre: 'QUÍMICA ORGÁNICA', creditos: 4, tipo: 'Obligatorio', estado: 'Matriculado' },
        { codigo: 'BIO401', nombre: 'BIOLOGÍA MOLECULAR', creditos: 3, tipo: 'Obligatorio', estado: 'Matriculado' },
        { codigo: 'ELE301', nombre: 'PROGRAMACIÓN AVANZADA', creditos: 2, tipo: 'Electivo', estado: 'Matriculado' },
        { codigo: 'ELE601', nombre: 'ESTADÍSTICA APLICADA', creditos: 2, tipo: 'Electivo', estado: 'Matriculado' }
      ],
      cambios: [
        { 
          tipo: 'Adición', 
          curso: 'ELE601 - ESTADÍSTICA APLICADA', 
          fecha: '2025-01-20', 
          motivo: 'Solicitud del estudiante',
          creditos: 2
        },
        { 
          tipo: 'Retiro', 
          curso: 'ING401 - INGENIERÍA DE SISTEMAS', 
          fecha: '2025-01-18', 
          motivo: 'Conflicto de horario',
          creditos: -3
        }
      ]
    },
    '2024-2': {
      periodo: '2024-2',
      nombre: 'Segundo Semestre 2024',
      estado: 'Completado',
      fechaMatricula: '2024-08-15',
      creditosTotal: 16,
      cursosMatriculados: [
        { codigo: 'MAT201', nombre: 'CÁLCULO DIFERENCIAL', creditos: 4, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'FIS101', nombre: 'FÍSICA BÁSICA', creditos: 3, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'QUI201', nombre: 'QUÍMICA GENERAL', creditos: 4, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'BIO301', nombre: 'BIOLOGÍA CELULAR', creditos: 3, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'ELE201', nombre: 'METODOLOGÍA DE INVESTIGACIÓN', creditos: 2, tipo: 'Electivo', estado: 'Aprobado' }
      ],
      cambios: [
        { 
          tipo: 'Retiro', 
          curso: 'MAT301 - ÁLGEBRA LINEAL', 
          fecha: '2024-09-10', 
          motivo: 'Bajo rendimiento académico',
          creditos: -4
        },
        { 
          tipo: 'Adición', 
          curso: 'ELE201 - METODOLOGÍA DE INVESTIGACIÓN', 
          fecha: '2024-08-25', 
          motivo: 'Completar créditos electivos',
          creditos: 2
        }
      ]
    },
    '2024-1': {
      periodo: '2024-1',
      nombre: 'Primer Semestre 2024',
      estado: 'Completado',
      fechaMatricula: '2024-03-10',
      creditosTotal: 15,
      cursosMatriculados: [
        { codigo: 'MAT001', nombre: 'MATEMÁTICA PREUNIVERSITARIA', creditos: 3, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'LEN001', nombre: 'COMUNICACIÓN INTEGRAL', creditos: 3, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'HIS001', nombre: 'REALIDAD NACIONAL', creditos: 2, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'QUI001', nombre: 'QUÍMICA BÁSICA', creditos: 3, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'BIO001', nombre: 'BIOLOGÍA GENERAL', creditos: 4, tipo: 'Obligatorio', estado: 'Aprobado' }
      ],
      cambios: [
        { 
          tipo: 'Adición', 
          curso: 'BIO001 - BIOLOGÍA GENERAL', 
          fecha: '2024-03-15', 
          motivo: 'Requisito de carrera',
          creditos: 4
        }
      ]
    },
    '2023-2': {
      periodo: '2023-2',
      nombre: 'Segundo Semestre 2023',
      estado: 'Completado',
      fechaMatricula: '2023-08-20',
      creditosTotal: 12,
      cursosMatriculados: [
        { codigo: 'INT001', nombre: 'INTRODUCCIÓN A LA UNIVERSIDAD', creditos: 2, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'MAT000', nombre: 'NIVELACIÓN MATEMÁTICA', creditos: 3, tipo: 'Nivelación', estado: 'Aprobado' },
        { codigo: 'LEN000', nombre: 'NIVELACIÓN LENGUAJE', creditos: 3, tipo: 'Nivelación', estado: 'Aprobado' },
        { codigo: 'INF001', nombre: 'INFORMÁTICA BÁSICA', creditos: 2, tipo: 'Obligatorio', estado: 'Aprobado' },
        { codigo: 'PSI001', nombre: 'PSICOLOGÍA GENERAL', creditos: 2, tipo: 'Electivo', estado: 'Aprobado' }
      ],
      cambios: [
        { 
          tipo: 'Retiro', 
          curso: 'FIL001 - FILOSOFÍA GENERAL', 
          fecha: '2023-09-05', 
          motivo: 'Carga académica excesiva',
          creditos: -2
        }
      ]
    }
  };

  // Calcular estadísticas generales
  const totalSemestres = Object.keys(historialMatriculas).length;
  const totalCreditos = Object.values(historialMatriculas).reduce((sum, sem) => sum + sem.creditosTotal, 0);
  const totalCambios = Object.values(historialMatriculas).reduce((sum, sem) => sum + sem.cambios.length, 0);
  const semestresCompletados = Object.values(historialMatriculas).filter(sem => sem.estado === 'Completado').length;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo': return 'estado-activo';
      case 'Completado': return 'estado-completado';
      case 'Retirado': return 'estado-retirado';
      default: return 'estado-default';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Obligatorio': return 'tipo-obligatorio';
      case 'Electivo': return 'tipo-electivo';
      case 'Nivelación': return 'tipo-nivelacion';
      default: return 'tipo-default';
    }
  };

  const getCambioColor = (tipo) => {
    switch (tipo) {
      case 'Adición': return 'cambio-adicion';
      case 'Retiro': return 'cambio-retiro';
      default: return 'cambio-default';
    }
  };

  return (
    <div className="historial-container">
      <div className="historial-card">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">Historial de Matrículas</h1>
          <p className="header-subtitle">
            Registro completo de matrículas y cambios académicos
          </p>
        </div>

        {/* Resumen estadístico */}
        <div className="resumen-container">
          <div className="resumen-grid">
            <div className="resumen-card resumen-card-blue">
              <div>
                <p className="resumen-label">Total Semestres</p>
                <p className="resumen-value resumen-value-blue">{totalSemestres}</p>
              </div>
            </div>
            
            <div className="resumen-card resumen-card-green">
              <div>
                <p className="resumen-label">Semestres Completados</p>
                <p className="resumen-value resumen-value-green">{semestresCompletados}</p>
              </div>
            </div>
            
            <div className="resumen-card resumen-card-purple">
              <div>
                <p className="resumen-label">Total Créditos</p>
                <p className="resumen-value resumen-value-purple">{totalCreditos}</p>
              </div>
            </div>
            
            <div className="resumen-card resumen-card-orange">
              <div>
                <p className="resumen-label">Total Cambios</p>
                <p className="resumen-value resumen-value-orange">{totalCambios}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Historial por semestre */}
        {Object.entries(historialMatriculas)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([periodo, data]) => (
          <div key={periodo} className="semestre-section">
            {/* Header del semestre */}
            <div className="semestre-header">
              <div className="semestre-info">
                <h2 className="semestre-titulo">{data.nombre}</h2>
                <div className="semestre-meta">
                  <span className={`semestre-estado ${getEstadoColor(data.estado)}`}>
                    {data.estado}
                  </span>
                  <span className="semestre-fecha">
                    Matriculado: {new Date(data.fechaMatricula).toLocaleDateString('es-PE')}
                  </span>
                  <span className="semestre-creditos">
                    {data.creditosTotal} créditos
                  </span>
                </div>
              </div>
            </div>

            {/* Cursos matriculados */}
            <div className="subseccion">
              <button
                onClick={() => toggleSemester(periodo)}
                className="subseccion-header"
              >
                <h3 className="subseccion-titulo">
                  Cursos Matriculados ({data.cursosMatriculados.length})
                </h3>
                <span className="subseccion-arrow">
                  {expandedSemesters[periodo] ? '▲' : '▼'}
                </span>
              </button>

              {expandedSemesters[periodo] && (
                <div className="subseccion-content">
                  <div className="cursos-grid">
                    {data.cursosMatriculados.map((curso, index) => (
                      <div key={index} className="curso-item">
                        <div className="curso-info">
                          <div className="curso-header">
                            <span className="curso-codigo">{curso.codigo}</span>
                            <span className={`curso-tipo ${getTipoColor(curso.tipo)}`}>
                              {curso.tipo}
                            </span>
                          </div>
                          <p className="curso-nombre">{curso.nombre}</p>
                          <div className="curso-footer">
                            <span className="curso-creditos">{curso.creditos} créditos</span>
                            <span className={`curso-estado ${curso.estado === 'Aprobado' ? 'estado-aprobado' : 'estado-matriculado'}`}>
                              {curso.estado}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cambios realizados */}
            <div className="subseccion">
              <button
                onClick={() => toggleChanges(periodo)}
                className="subseccion-header"
              >
                <h3 className="subseccion-titulo">
                  Cambios Realizados ({data.cambios.length})
                </h3>
                <span className="subseccion-arrow">
                  {expandedChanges[periodo] ? '▲' : '▼'}
                </span>
              </button>

              {expandedChanges[periodo] && (
                <div className="subseccion-content">
                  {data.cambios.length > 0 ? (
                    <div className="cambios-list">
                      {data.cambios.map((cambio, index) => (
                        <div key={index} className="cambio-item">
                          <div className="cambio-header">
                            <span className={`cambio-tipo ${getCambioColor(cambio.tipo)}`}>
                              {cambio.tipo}
                            </span>
                            <span className="cambio-fecha">
                              {new Date(cambio.fecha).toLocaleDateString('es-PE')}
                            </span>
                          </div>
                          <p className="cambio-curso">{cambio.curso}</p>
                          <p className="cambio-motivo">Motivo: {cambio.motivo}</p>
                          <div className="cambio-creditos">
                            <span className={cambio.creditos > 0 ? 'creditos-positivos' : 'creditos-negativos'}>
                              {cambio.creditos > 0 ? '+' : ''}{cambio.creditos} créditos
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-cambios">
                      <p>No se realizaron cambios en este semestre</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialMatriculas;