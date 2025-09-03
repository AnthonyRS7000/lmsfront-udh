import React, { useState, useEffect } from 'react';
import './ClasesVivoPage.css';

const mockClasesEnVivo = [
  {
    id: 'MAT101-001',
    curso: 'MATEMÁTICA BÁSICA',
    codigo: 'MAT101',
    profesor: 'Dr. García López',
    tema: 'Derivadas e Integrales',
    horaInicio: '09:00',
    horaFin: '11:00',
    duracion: 120,
    participantes: 45,
    maxParticipantes: 50,
    estado: 'en-vivo',
    enlaceReunion: 'https://meet.university.edu/mat101-001',
    color: '#FF6B6B'
  },
  {
    id: 'FIS201-002',
    curso: 'FÍSICA GENERAL',
    codigo: 'FIS201',
    profesor: 'Mg. Rodríguez Silva',
    tema: 'Mecánica Cuántica Básica',
    horaInicio: '11:00',
    horaFin: '13:00',
    duracion: 120,
    participantes: 32,
    maxParticipantes: 40,
    estado: 'programada',
    enlaceReunion: 'https://meet.university.edu/fis201-002',
    color: '#4ECDC4'
  },
  {
    id: 'QUI301-003',
    curso: 'QUÍMICA ORGÁNICA',
    codigo: 'QUI301',
    profesor: 'Dr. Martínez Pérez',
    tema: 'Reacciones de Sustitución',
    horaInicio: '07:00',
    horaFin: '09:00',
    duracion: 120,
    participantes: 28,
    maxParticipantes: 35,
    estado: 'finalizada',
    enlaceReunion: 'https://meet.university.edu/qui301-003',
    color: '#45B7D1'
  },
  {
    id: 'BIO401-004',
    curso: 'BIOLOGÍA MOLECULAR',
    codigo: 'BIO401',
    profesor: 'Dra. Flores Vega',
    tema: 'ADN y Replicación Celular',
    horaInicio: '14:00',
    horaFin: '16:00',
    duracion: 120,
    participantes: 0,
    maxParticipantes: 30,
    estado: 'programada',
    enlaceReunion: 'https://meet.university.edu/bio401-004',
    color: '#96CEB4'
  },
  {
    id: 'ELE301-005',
    curso: 'PROGRAMACIÓN AVANZADA',
    codigo: 'ELE301',
    profesor: 'Ing. Torres Ramos',
    tema: 'Algoritmos de Ordenamiento',
    horaInicio: '16:00',
    horaFin: '18:00',
    duracion: 120,
    participantes: 25,
    maxParticipantes: 25,
    estado: 'en-vivo',
    enlaceReunion: 'https://meet.university.edu/ele301-005',
    color: '#FECA57'
  }
];

const mockEstudiante = {
  nombres: 'BENYAMIN FELIX',
  apellidos: 'ADRIAN LAZARO',
  codigo: '2019110501',
  clasesAtendidas: 12,
  clasesTotales: 15,
  tiempoConexion: 145 // minutos
};

const ClasesEnVivoPanel = () => {
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [tiempoActual, setTiempoActual] = useState(new Date());

  // Actualizar tiempo cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoActual(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const clasesFiltradas = mockClasesEnVivo.filter(clase => {
    const cumpleFiltro = filtroEstado === 'todos' || clase.estado === filtroEstado;
    const cumpleBusqueda = clase.curso.toLowerCase().includes(busqueda.toLowerCase()) ||
                          clase.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          clase.profesor.toLowerCase().includes(busqueda.toLowerCase()) ||
                          clase.tema.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  const obtenerIconoEstado = (estado) => {
    switch (estado) {
      case 'en-vivo': return '🔴';
      case 'programada': return '⏰';
      case 'finalizada': return '✅';
      default: return '📅';
    }
  };

  const calcularPorcentajeOcupacion = (participantes, max) => {
    return (participantes / max) * 100;
  };

  const obtenerClaseOcupacion = (participantes, max) => {
    const porcentaje = calcularPorcentajeOcupacion(participantes, max);
    if (participantes >= max) return 'ocupacion-completa';
    if (porcentaje > 80) return 'ocupacion-alta';
    return 'ocupacion-normal';
  };

  const unirseAClase = (clase) => {
    if (clase.estado === 'en-vivo') {
      alert(`Uniéndose a la clase de ${clase.curso}...`);
      window.open(clase.enlaceReunion, '_blank');
    }
  };

  const obtenerColorBoton = (clase) => {
    if (clase.estado === 'en-vivo' && clase.participantes < clase.maxParticipantes) {
      return { backgroundColor: clase.color };
    }
    return { backgroundColor: 'var(--text-light)' };
  };

  const obtenerTextBoton = (clase) => {
    if (clase.estado === 'en-vivo') {
      return clase.participantes >= clase.maxParticipantes ? 'Aula llena' : 'Unirse ahora';
    }
    return clase.estado === 'programada' ? 'Programada' : 'Finalizada';
  };

  return (
    <div className="clases-en-vivo">
      {/* Header */}
      <div className="header">
        <div className="header-container">
          <div className="header-content">
            <div>
              <h1 className="header-title">Clases en Vivo</h1>
              <p className="header-subtitle">
                Participa en tiempo real con tus profesores y compañeros
              </p>
            </div>
            <div className="time-widget">
              <div className="time-display">
                {tiempoActual.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="time-label">Hora actual</div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container">
        {/* Estadísticas del Estudiante */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">
              {Math.round((mockEstudiante.clasesAtendidas / mockEstudiante.clasesTotales) * 100)}%
            </div>
            <div className="stat-label">
              Asistencia ({mockEstudiante.clasesAtendidas}/{mockEstudiante.clasesTotales})
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">
              {Math.floor(mockEstudiante.tiempoConexion / 60)}h {mockEstudiante.tiempoConexion % 60}m
            </div>
            <div className="stat-label">Tiempo en clases</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-value">
              {mockClasesEnVivo.filter(c => c.estado === 'en-vivo').length}
            </div>
            <div className="stat-label">Clases activas</div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="filters-container">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar clases..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todas las clases</option>
            <option value="en-vivo">En vivo</option>
            <option value="programada">Programadas</option>
            <option value="finalizada">Finalizadas</option>
          </select>
        </div>

        {/* Lista de Clases */}
        <div className="clases-grid">
          {clasesFiltradas.map((clase) => (
            <div
              key={clase.id}
              className={`clase-card ${clase.estado === 'en-vivo' ? 'en-vivo' : ''}`}
              style={{ borderLeftColor: clase.color }}
            >
              <div className="clase-header">
                <div className="clase-info">
                  <div className="estado-container">
                    <span className="estado-icon">{obtenerIconoEstado(clase.estado)}</span>
                    <span className={`estado-badge estado-${clase.estado}`}>
                      {clase.estado.replace('-', ' ')}
                    </span>
                    {clase.estado === 'en-vivo' && <div className="pulse-indicator" />}
                  </div>
                  <h3 className="clase-title">{clase.curso}</h3>
                  <p className="clase-tema">{clase.tema}</p>
                </div>
                <div className="time-info">
                  <div className="time-range">
                    {clase.horaInicio} - {clase.horaFin}
                  </div>
                  <div className="duration">{clase.duracion} min</div>
                </div>
              </div>

              <div className="clase-details">
                <div className="detail-item">
                  <span className="detail-icon">👨‍🏫</span>
                  <span className="detail-text">{clase.profesor}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📚</span>
                  <span className="detail-text">{clase.codigo}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">👥</span>
                  <span className="detail-text">
                    {clase.participantes}/{clase.maxParticipantes} participantes
                  </span>
                </div>
              </div>

              {/* Barra de ocupación */}
              <div className="ocupacion-container">
                <div className="ocupacion-header">
                  <span className="ocupacion-label">Ocupación</span>
                  <span className="ocupacion-percentage">
                    {Math.round(calcularPorcentajeOcupacion(clase.participantes, clase.maxParticipantes))}%
                  </span>
                </div>
                <div className="ocupacion-bar">
                  <div 
                    className={`ocupacion-fill ${obtenerClaseOcupacion(clase.participantes, clase.maxParticipantes)}`}
                    style={{ width: `${calcularPorcentajeOcupacion(clase.participantes, clase.maxParticipantes)}%` }}
                  />
                </div>
              </div>

              {/* Acciones */}
              <div className="actions-container">
                <button
                  onClick={() => unirseAClase(clase)}
                  disabled={clase.estado !== 'en-vivo' || clase.participantes >= clase.maxParticipantes}
                  className="btn btn-primary"
                  style={obtenerColorBoton(clase)}
                >
                  <span>🎥</span>
                  {obtenerTextBoton(clase)}
                </button>
                
                <button className="btn btn-secondary">
                  📋 Detalles
                </button>
                
                {clase.estado === 'finalizada' && (
                  <button className="btn btn-warning">
                    📺 Ver grabación
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {clasesFiltradas.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <p className="empty-message">
              No hay clases que coincidan con tu búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClasesEnVivoPanel;