import React, { useState } from 'react';
import './CalificacionesPage.css';

const CalificacionesPage: React.FC = () => {
  const [vistaActiva, setVistaActiva] = useState<'materias' | 'historial'>('materias');
  const [filtroMateria, setFiltroMateria] = useState<string>('');

  // Mock data para el semestre actual
  const semestreActual = {
    codigo: '2024-I',
    programa: 'Ingeniería de Sistemas',
    estudiante: 'Juan Carlos Pérez',
    estado: 'En Curso',
    promedioGeneral: 4.2,
    creditosInscritos: 18,
    creditosAprobados: 15,
    porcentajeAsistencia: 92
  };

  const materias = [
    {
      id: 1,
      nombre: 'Programación Orientada a Objetos',
      codigo: 'POO-101',
      creditos: 4,
      docente: 'Dr. Ana García',
      horario: 'Lun-Mie-Vie 8:00-10:00',
      promedio: 4.5,
      evaluaciones: [
        {
          tipo: 'Quiz 1',
          nota: 4.8,
          peso: 10,
          fecha: '2024-02-15',
          estado: 'Calificado'
        },
        {
          tipo: 'Parcial 1',
          nota: 4.2,
          peso: 25,
          fecha: '2024-03-01',
          estado: 'Calificado'
        },
        {
          tipo: 'Proyecto',
          nota: 4.7,
          peso: 30,
          fecha: '2024-03-15',
          estado: 'Calificado'
        },
        {
          tipo: 'Parcial 2',
          nota: 0,
          peso: 25,
          fecha: '2024-04-15',
          estado: 'Pendiente'
        },
        {
          tipo: 'Taller Final',
          nota: 0,
          peso: 10,
          fecha: '2024-04-30',
          estado: 'No Evaluado'
        }
      ],
      asistencia: {
        clasesTotales: 32,
        clasesAsistidas: 30,
        faltas: 2,
        faltasJustificadas: 1,
        porcentaje: 94
      },
      observaciones: 'Excelente desempeño en proyectos prácticos. Se recomienda reforzar conceptos teóricos.'
    },
    {
      id: 2,
      nombre: 'Base de Datos',
      codigo: 'BD-201',
      creditos: 3,
      docente: 'Mg. Carlos Ruiz',
      horario: 'Mar-Jue 10:00-12:00',
      promedio: 3.8,
      evaluaciones: [
        {
          tipo: 'Quiz 1',
          nota: 4.0,
          peso: 15,
          fecha: '2024-02-20',
          estado: 'Calificado'
        },
        {
          tipo: 'Laboratorio 1',
          nota: 4.2,
          peso: 20,
          fecha: '2024-03-05',
          estado: 'Calificado'
        },
        {
          tipo: 'Parcial 1',
          nota: 3.5,
          peso: 30,
          fecha: '2024-03-18',
          estado: 'Calificado'
        },
        {
          tipo: 'Proyecto BD',
          nota: 0,
          peso: 35,
          fecha: '2024-04-20',
          estado: 'En Progreso'
        }
      ],
      asistencia: {
        clasesTotales: 24,
        clasesAsistidas: 22,
        faltas: 2,
        faltasJustificadas: 0,
        porcentaje: 92
      },
      observaciones: 'Buen manejo de consultas SQL. Necesita mejorar en diseño de bases de datos.'
    },
    {
      id: 3,
      nombre: 'Estructuras de Datos',
      codigo: 'ED-102',
      creditos: 4,
      docente: 'Dr. María López',
      horario: 'Lun-Mie 14:00-16:00',
      promedio: 4.0,
      evaluaciones: [
        {
          tipo: 'Quiz 1',
          nota: 3.8,
          peso: 10,
          fecha: '2024-02-12',
          estado: 'Calificado'
        },
        {
          tipo: 'Quiz 2',
          nota: 4.5,
          peso: 10,
          fecha: '2024-02-26',
          estado: 'Calificado'
        },
        {
          tipo: 'Parcial 1',
          nota: 4.0,
          peso: 30,
          fecha: '2024-03-12',
          estado: 'Calificado'
        },
        {
          tipo: 'Laboratorio',
          nota: 4.2,
          peso: 25,
          fecha: '2024-03-25',
          estado: 'Calificado'
        },
        {
          tipo: 'Parcial Final',
          nota: 0,
          peso: 25,
          fecha: '2024-04-25',
          estado: 'Programado'
        }
      ],
      asistencia: {
        clasesTotales: 28,
        clasesAsistidas: 25,
        faltas: 3,
        faltasJustificadas: 2,
        porcentaje: 89
      },
      observaciones: 'Progreso constante. Excelente en implementaciones prácticas.'
    }
  ];

  const historialReciente = [
    {
      semestre: '2023-II',
      promedio: 4.1,
      creditos: 16,
      materias: 5,
      estado: 'Completado'
    },
    {
      semestre: '2023-I',
      promedio: 3.9,
      creditos: 18,
      materias: 6,
      estado: 'Completado'
    },
    {
      semestre: '2022-II',
      promedio: 4.3,
      creditos: 15,
      materias: 5,
      estado: 'Completado'
    }
  ];

  const obtenerColorEvaluacion = (estado: string) => {
    switch (estado) {
      case 'Calificado':
        return { background: '#dcfce7', color: '#166534' };
      case 'Pendiente':
        return { background: '#fef3c7', color: '#92400e' };
      case 'En Progreso':
        return { background: '#dbeafe', color: '#1d4ed8' };
      case 'Programado':
        return { background: '#f3e8ff', color: '#7c3aed' };
      default:
        return { background: '#f1f5f9', color: '#475569' };
    }
  };

  const filtrarMaterias = () => {
    if (!filtroMateria) return materias;
    return materias.filter(materia => 
      materia.nombre.toLowerCase().includes(filtroMateria.toLowerCase()) ||
      materia.codigo.toLowerCase().includes(filtroMateria.toLowerCase())
    );
  };

  const calcularProgresoSemestre = () => {
    const totalEvaluaciones = materias.reduce((acc, materia) => 
      acc + materia.evaluaciones.length, 0
    );
    const evaluacionesCompletas = materias.reduce((acc, materia) => 
      acc + materia.evaluaciones.filter(ev => ev.estado === 'Calificado').length, 0
    );
    return Math.round((evaluacionesCompletas / totalEvaluaciones) * 100);
  };

  return (
    <div className="calificaciones-container">
      <div className="calificaciones-card">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">📊 Consulta de Calificaciones</h1>
          <p className="header-subtitle">Semestre {semestreActual.codigo} - {semestreActual.estudiante}</p>
          <p className="header-programa">{semestreActual.programa}</p>
        </div>

        {/* Resumen del Semestre */}
        <div className="resumen-container">
          <div className="resumen-header">
            <h2>Resumen del Semestre Actual</h2>
            <div className="semestre-progreso">
              <span>Progreso de Evaluaciones:</span>
              <div className="progreso-bar">
                <div 
                  className="progreso-fill" 
                  style={{width: `${calcularProgresoSemestre()}%`}}
                ></div>
              </div>
              <span>{calcularProgresoSemestre()}%</span>
            </div>
          </div>

          <div className="estadisticas-grid">
            <div className="stat-card promedio">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-number">{semestreActual.promedioGeneral}</div>
                <div className="stat-label">Promedio General</div>
              </div>
            </div>

            <div className="stat-card creditos">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <div className="stat-number">{semestreActual.creditosAprobados}/{semestreActual.creditosInscritos}</div>
                <div className="stat-label">Créditos Aprobados</div>
              </div>
            </div>

            <div className="stat-card asistencia">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">{semestreActual.porcentajeAsistencia}%</div>
                <div className="stat-label">Asistencia General</div>
              </div>
            </div>

            <div className="stat-card pendientes">
              <div className="stat-icon">⏰</div>
              <div className="stat-content">
                <div className="stat-number">
                  {materias.reduce((acc, materia) => 
                    acc + materia.evaluaciones.filter(ev => ev.estado !== 'Calificado').length, 0
                  )}
                </div>
                <div className="stat-label">Evaluaciones Pendientes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Navegación */}
        <div className="tabs-container">
          <div className="tabs-header">
            <button 
              className={`tab-button ${vistaActiva === 'materias' ? 'active' : ''}`}
              onClick={() => setVistaActiva('materias')}
            >
              📋 Materias del Semestre
            </button>
            <button 
              className={`tab-button ${vistaActiva === 'historial' ? 'active' : ''}`}
              onClick={() => setVistaActiva('historial')}
            >
              📊 Historial Reciente
            </button>
          </div>

          <div className="vista-content">
            {vistaActiva === 'materias' && (
              <div className="materias-vista">
                {/* Filtros */}
                <div className="filtros-container">
                  <div className="filtro-group">
                    <label>Buscar Materia:</label>
                    <input
                      type="text"
                      className="filtro-select"
                      placeholder="Nombre o código de la materia..."
                      value={filtroMateria}
                      onChange={(e) => setFiltroMateria(e.target.value)}
                    />
                  </div>
                </div>

                {/* Lista de Materias */}
                <div className="materias-container">
                  {filtrarMaterias().map(materia => (
                    <div key={materia.id} className="materia-card">
                      <div className="materia-header">
                        <div className="materia-info">
                          <h3>{materia.nombre}</h3>
                          <div className="materia-meta">
                            <span>📝 {materia.codigo}</span>
                            <span>⭐ {materia.creditos} créditos</span>
                            <span>👨‍🏫 {materia.docente}</span>
                            <span>🕐 {materia.horario}</span>
                          </div>
                        </div>
                        <div className="promedio-actual">
                          <div className="promedio-numero">{materia.promedio}</div>
                          <div className="promedio-label">Promedio</div>
                        </div>
                      </div>

                      <div className="materia-body">
                        {/* Evaluaciones */}
                        <div className="evaluaciones-section">
                          <h4>📝 Evaluaciones</h4>
                          <div className="evaluaciones-grid">
                            {materia.evaluaciones.map((evaluacion, index) => (
                              <div key={index} className="evaluacion-item">
                                <div className="evaluacion-header">
                                  <span className="evaluacion-tipo">{evaluacion.tipo}</span>
                                  <span 
                                    className="evaluacion-estado"
                                    style={obtenerColorEvaluacion(evaluacion.estado)}
                                  >
                                    {evaluacion.estado}
                                  </span>
                                </div>
                                <div className="evaluacion-details">
                                  <div className="evaluacion-nota">
                                    <span className="nota-valor">
                                      {evaluacion.nota > 0 ? evaluacion.nota : '--'}
                                    </span>
                                    <span className="nota-peso">({evaluacion.peso}%)</span>
                                  </div>
                                  <div className="evaluacion-fecha">{evaluacion.fecha}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Asistencia */}
                        <div className="asistencias-section">
                          <h4>📅 Control de Asistencia</h4>
                          <div className="asistencias-grid">
                            <div className="asistencia-item">
                              <span className="asistencia-label">Clases Totales:</span>
                              <span className="asistencia-valor">{materia.asistencia.clasesTotales}</span>
                            </div>
                            <div className="asistencia-item">
                              <span className="asistencia-label">Asistidas:</span>
                              <span className="asistencia-valor">{materia.asistencia.clasesAsistidas}</span>
                            </div>
                            <div className="asistencia-item">
                              <span className="asistencia-label">Faltas:</span>
                              <span className="asistencia-valor">{materia.asistencia.faltas}</span>
                            </div>
                            <div className="asistencia-item">
                              <span className="asistencia-label">Porcentaje:</span>
                              <span className="asistencia-valor">{materia.asistencia.porcentaje}%</span>
                            </div>
                          </div>
                          {materia.asistencia.porcentaje < 80 && (
                            <div className="alerta-faltas">
                              ⚠️ Atención: Su porcentaje de asistencia está por debajo del mínimo requerido (80%)
                            </div>
                          )}
                        </div>

                        {/* Observaciones */}
                        <div className="observaciones-section">
                          <h4>💬 Observaciones del Docente</h4>
                          <p className="observacion-texto">{materia.observaciones}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vistaActiva === 'historial' && (
              <div className="historial-reciente-container">
                <h3>📊 Comparación con Semestres Anteriores</h3>
                
                <div className="semestres-comparacion">
                  {historialReciente.map((semestre, index) => (
                    <div key={index} className="semestre-resumen-card">
                      <div className="semestre-resumen-header">
                        <h4>{semestre.semestre}</h4>
                        <span className={`estado-badge ${semestre.estado.toLowerCase()}`}>
                          {semestre.estado}
                        </span>
                      </div>
                      <div className="semestre-resumen-stats">
                        <div className="stat-item">
                          <span className="stat-value">{semestre.promedio}</span>
                          <span className="stat-label">Promedio</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{semestre.creditos}</span>
                          <span className="stat-label">Créditos</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{semestre.materias}</span>
                          <span className="stat-label">Materias</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tendencia-container">
                  <h4>📈 Tendencia Académica</h4>
                  <div className="tendencia-grafico">
                    {[...historialReciente].reverse().concat([{
                      semestre: semestreActual.codigo,
                      promedio: semestreActual.promedioGeneral,
                      creditos: semestreActual.creditosInscritos,
                      materias: materias.length,
                      estado: 'En Curso'
                    }]).map((semestre, index) => (
                      <div key={index} className="tendencia-punto">
                        <div 
                          className="punto"
                          style={{
                            height: `${(semestre.promedio / 5) * 100}%`,
                            background: index === 3 ? 
                              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                              'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)'
                          }}
                        ></div>
                        <div className="punto-valor">{semestre.promedio}</div>
                        <div className="punto-label">{semestre.semestre}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalificacionesPage;
