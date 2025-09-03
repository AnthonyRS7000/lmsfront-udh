import React, { useState } from 'react';
import './TramitePage.css'; 

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
    descripcion: 'Fundamentos de matemática para ingeniería',
    secciones: [
      { id: 'A', horario: '07:00 - 09:00', dias: 'L M V', profesor: 'Dr. García López', cupos: 5 },
      { id: 'B', horario: '14:00 - 16:00', dias: 'L M V', profesor: 'Mg. Silva Rojas', cupos: 12 }
    ]
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
    secciones: [
      { id: 'A', horario: '09:00 - 11:00', dias: 'M J V', profesor: 'Mg. Rodríguez Silva', cupos: 8 },
      { id: 'C', horario: '16:00 - 18:00', dias: 'M J V', profesor: 'Dr. Campos Vera', cupos: 3 }
    ]
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
    secciones: [
      { id: 'A', horario: '11:00 - 13:00', dias: 'L M J', profesor: 'Dr. Martínez Pérez', cupos: 0 },
      { id: 'B', horario: '19:00 - 21:00', dias: 'L M J', profesor: 'Dra. López Santos', cupos: 15 }
    ]
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
    secciones: [
      { id: 'A', horario: '13:00 - 15:00', dias: 'M V S', profesor: 'Dra. Flores Vega', cupos: 7 }
    ]
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
    secciones: [
      { id: 'A', horario: '15:00 - 17:00', dias: 'L J', profesor: 'Ing. Torres Ramos', cupos: 10 },
      { id: 'B', horario: '08:00 - 10:00', dias: 'M V', profesor: 'Ing. Morales Cruz', cupos: 6 }
    ]
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
    secciones: [
      { id: 'A', horario: '17:00 - 19:00', dias: 'M V', profesor: 'Dr. Mendoza Castro', cupos: 4 }
    ]
  },
  {
    id: 'ING401',
    nombre: 'INGENIERÍA DE SOFTWARE',
    codigo: 'ING401',
    horario: '08:00 - 10:00',
    creditos: 3,
    dias: 'L M J',
    profesor: 'Mg. Vargas Luna',
    tipo: 'obligatorio',
    prerequisitos: ['PROG201'],
    descripcion: 'Metodologías de desarrollo de software',
    secciones: [
      { id: 'A', horario: '08:00 - 10:00', dias: 'L M J', profesor: 'Mg. Vargas Luna', cupos: 12 },
      { id: 'B', horario: '20:00 - 22:00', dias: 'L M J', profesor: 'Dr. Herrera Vila', cupos: 8 }
    ]
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

const ModificarMatricula = () => {
  // Inicializar estados con datos mock
  const [cursosMatriculados, setCursosMatriculados] = useState(() => {
    return mockCursos.filter(curso => 
      ['FIS201', 'QUI301', 'BIO401', 'ELE301'].includes(curso.id)
    ).map(curso => ({
      ...curso,
      seccionActual: 'A'
    }));
  });

  const [cursosDisponibles, setCursosDisponibles] = useState(() => {
    return mockCursos.filter(curso => 
      !['FIS201', 'QUI301', 'BIO401', 'ELE301'].includes(curso.id) &&
      curso.prerequisitos.every(prereq => mockEstudiante.cursosAprobados.includes(prereq))
    );
  });

  const [tabActiva, setTabActiva] = useState('retiro');
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalTipo, setModalTipo] = useState('');
  const [periodoAdicion, setPeriodoAdicion] = useState(true);

  const calcularCreditosActuales = () => {
    return cursosMatriculados.reduce((total, curso) => total + curso.creditos, 0);
  };

  const handleRetirarCurso = (cursoId) => {
    setCursosMatriculados(prev => prev.filter(curso => curso.id !== cursoId));
    setMostrarModal(false);
  };

  const handleAgregarCurso = (curso) => {
    if (!seccionSeleccionada) {
      alert('Por favor selecciona una sección');
      return;
    }

    const seccion = curso.secciones.find(s => s.id === seccionSeleccionada);
    if (seccion.cupos === 0) {
      alert('No hay cupos disponibles en esta sección');
      return;
    }

    const creditosNuevos = calcularCreditosActuales() + curso.creditos;
    if (creditosNuevos > mockEstudiante.creditosMaximos) {
      alert('Excedes el límite de créditos permitidos');
      return;
    }

    setCursosMatriculados(prev => [...prev, { ...curso, seccionActual: seccionSeleccionada }]);
    setCursosDisponibles(prev => prev.filter(c => c.id !== curso.id));
    setMostrarModal(false);
    setCursoSeleccionado(null);
    setSeccionSeleccionada('');
  };

  const handleCambiarSeccion = (curso) => {
    if (!seccionSeleccionada) {
      alert('Por favor selecciona una nueva sección');
      return;
    }

    const seccion = curso.secciones.find(s => s.id === seccionSeleccionada);
    if (seccion.cupos === 0) {
      alert('No hay cupos disponibles en esta sección');
      return;
    }

    setCursosMatriculados(prev => 
      prev.map(c => 
        c.id === curso.id 
          ? { ...c, seccionActual: seccionSeleccionada, horario: seccion.horario, dias: seccion.dias, profesor: seccion.profesor }
          : c
      )
    );
    setMostrarModal(false);
    setCursoSeleccionado(null);
    setSeccionSeleccionada('');
  };

  const abrirModal = (tipo, curso = null) => {
    setModalTipo(tipo);
    setCursoSeleccionado(curso);
    setSeccionSeleccionada(curso?.seccionActual || '');
    setMostrarModal(true);
  };

  return (
    <div className="matricula-container">
      {/* Header */}
      <div className="header">
        <h1 className="header-title">Modificar Matrícula</h1>
        <p className="header-subtitle">
          {mockEstudiante.nombres} {mockEstudiante.apellidos} - {mockEstudiante.codigo}
        </p>
      </div>

      <div className="content-wrapper">
        {/* Información del estudiante */}
        <div className="info-card">
          <h2 className="info-title">Información Académica</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Programa:</strong> {mockEstudiante.programa}
            </div>
            <div className="info-item">
              <strong>Semestre:</strong> {mockEstudiante.semestre}
            </div>
            <div className="info-item">
              <strong>Créditos actuales:</strong> 
              <span className={`creditos ${calcularCreditosActuales() > mockEstudiante.creditosMaximos * 0.8 ? 'creditos-alto' : 'creditos-normal'}`}>
                {calcularCreditosActuales()}/{mockEstudiante.creditosMaximos}
              </span>
            </div>
            <div className="info-item">
              <strong>Período de adición:</strong> 
              <span className={`periodo ${periodoAdicion ? 'periodo-activo' : 'periodo-cerrado'}`}>
                {periodoAdicion ? 'Activo' : 'Cerrado'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-button ${tabActiva === 'retiro' ? 'tab-active' : ''}`}
              onClick={() => setTabActiva('retiro')}
            >
               Retiro de Materias
            </button>
            <button
              className={`tab-button ${tabActiva === 'adicion' ? 'tab-active' : ''}`}
              onClick={() => setTabActiva('adicion')}
            >
               Adición de Materias
            </button>
            <button
              className={`tab-button ${tabActiva === 'cambio' ? 'tab-active' : ''}`}
              onClick={() => setTabActiva('cambio')}
            >
               Cambio de Sección
            </button>
          </div>

          <div className="tab-content">
            {/* Tab: Retiro de Materias */}
            {tabActiva === 'retiro' && (
              <div>
                <h3 className="section-title">
                  Materias Matriculadas ({cursosMatriculados.length})
                </h3>
                {cursosMatriculados.length === 0 ? (
                  <p className="empty-message">No tienes materias matriculadas</p>
                ) : (
                  <div className="cursos-grid">
                    {cursosMatriculados.map(curso => (
                      <div key={curso.id} className="curso-card">
                        <div className="curso-info">
                          <h4 className="curso-nombre">
                            {curso.codigo} - {curso.nombre}
                          </h4>
                          <p className="curso-detalles">
                            {curso.horario} | {curso.dias} | {curso.creditos} créditos | Sección {curso.seccionActual}
                          </p>
                          <p className="curso-profesor">{curso.profesor}</p>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={() => abrirModal('retiro', curso)}
                        >
                          Retirar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Adición de Materias */}
            {tabActiva === 'adicion' && (
              <div>
                <div className="section-header">
                  <h3 className="section-title">
                    Materias Disponibles ({cursosDisponibles.length})
                  </h3>
                  {!periodoAdicion && (
                    <div className="warning-banner">
                      ⚠️ El período de adición de materias está cerrado
                    </div>
                  )}
                </div>
                
                {cursosDisponibles.length === 0 ? (
                  <p className="empty-message">No hay materias disponibles para matricular</p>
                ) : (
                  <div className="cursos-grid">
                    {cursosDisponibles.map(curso => (
                      <div key={curso.id} className="curso-card-disponible">
                        <div className="curso-info">
                          <h4 className="curso-nombre">
                            {curso.codigo} - {curso.nombre}
                            <span className={`tipo-badge ${curso.tipo === 'obligatorio' ? 'tipo-obligatorio' : 'tipo-electivo'}`}>
                              {curso.tipo}
                            </span>
                          </h4>
                          <p className="curso-descripcion">{curso.descripcion}</p>
                          <p className="curso-creditos">{curso.creditos} créditos</p>
                        </div>
                        <button
                          className={`btn ${periodoAdicion ? 'btn-success' : 'btn-disabled'}`}
                          onClick={() => abrirModal('adicion', curso)}
                          disabled={!periodoAdicion}
                        >
                          Agregar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Cambio de Sección */}
            {tabActiva === 'cambio' && (
              <div>
                <h3 className="section-title">Cambiar Sección/Horario</h3>
                {cursosMatriculados.length === 0 ? (
                  <p className="empty-message">No tienes materias matriculadas para cambiar</p>
                ) : (
                  <div className="cursos-grid">
                    {cursosMatriculados.map(curso => (
                      <div key={curso.id} className="curso-card-cambio">
                        <div className="curso-info">
                          <h4 className="curso-nombre">
                            {curso.codigo} - {curso.nombre}
                          </h4>
                          <p className="curso-detalles">
                            Sección actual: <strong>{curso.seccionActual}</strong> | {curso.horario} | {curso.dias}
                          </p>
                          <p className="curso-profesor">{curso.profesor}</p>
                        </div>
                        <button
                          className={`btn ${curso.secciones?.length > 1 ? 'btn-primary' : 'btn-disabled'}`}
                          onClick={() => abrirModal('cambio', curso)}
                          disabled={curso.secciones?.length <= 1}
                        >
                          {curso.secciones?.length > 1 ? 'Cambiar' : 'Sin opciones'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalTipo === 'retiro' && (
              <div>
                <h3 className="modal-title modal-title-danger">Confirmar Retiro de Materia</h3>
                <div className="curso-retiro-info">
                  <h4 className="curso-retiro-nombre">
                    {cursoSeleccionado?.codigo} - {cursoSeleccionado?.nombre}
                  </h4>
                  <p className="curso-retiro-detalles">
                    Sección {cursoSeleccionado?.seccionActual} | {cursoSeleccionado?.creditos} créditos
                  </p>
                </div>
                <p className="modal-message">
                  ¿Estás seguro que deseas retirar esta materia? Esta acción no se puede deshacer.
                </p>
                <div className="modal-buttons">
                  <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={() => handleRetirarCurso(cursoSeleccionado.id)}>
                    Confirmar Retiro
                  </button>
                </div>
              </div>
            )}

            {modalTipo === 'adicion' && (
              <div>
                <h3 className="modal-title modal-title-success">Agregar Materia</h3>
                <div className="curso-modal-info">
                  <h4 className="curso-modal-nombre">
                    {cursoSeleccionado?.codigo} - {cursoSeleccionado?.nombre}
                  </h4>
                  <p className="curso-modal-descripcion">{cursoSeleccionado?.descripcion}</p>
                  <p className="curso-modal-creditos">
                    <strong>Créditos:</strong> {cursoSeleccionado?.creditos}
                  </p>
                </div>

                <div className="secciones-container">
                  <h4 className="secciones-title">Selecciona una sección:</h4>
                  {cursoSeleccionado?.secciones?.map(seccion => (
                    <label key={seccion.id} className={`seccion-option ${seccionSeleccionada === seccion.id ? 'seccion-selected' : ''} ${seccion.cupos === 0 ? 'seccion-disabled' : ''}`}>
                      <input
                        type="radio"
                        name="seccion"
                        value={seccion.id}
                        checked={seccionSeleccionada === seccion.id}
                        onChange={(e) => setSeccionSeleccionada(e.target.value)}
                        disabled={seccion.cupos === 0}
                        className="seccion-radio"
                      />
                      <div className="seccion-info">
                        <strong>Sección {seccion.id}</strong>
                        <div className="seccion-detalles">
                          {seccion.horario} | {seccion.dias}<br />
                          {seccion.profesor}<br />
                          <span className={`cupos-info ${seccion.cupos === 0 ? 'cupos-sin' : 'cupos-con'}`}>
                            {seccion.cupos === 0 ? 'Sin cupos' : `${seccion.cupos} cupos disponibles`}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="modal-buttons">
                  <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={() => handleAgregarCurso(cursoSeleccionado)}>
                    Agregar Materia
                  </button>
                </div>
              </div>
            )}

            {modalTipo === 'cambio' && (
              <div>
                <h3 className="modal-title modal-title-primary">Cambiar Sección/Horario</h3>
                <div className="curso-modal-info">
                  <h4 className="curso-modal-nombre">
                    {cursoSeleccionado?.codigo} - {cursoSeleccionado?.nombre}
                  </h4>
                  <div className="seccion-actual">
                    <strong>Sección actual:</strong> {cursoSeleccionado?.seccionActual}<br />
                    <span className="seccion-actual-detalles">
                      {cursoSeleccionado?.horario} | {cursoSeleccionado?.dias} | {cursoSeleccionado?.profesor}
                    </span>
                  </div>
                </div>

                <div className="secciones-container">
                  <h4 className="secciones-title">Selecciona nueva sección:</h4>
                  {cursoSeleccionado?.secciones?.map(seccion => (
                    <label key={seccion.id} className={`seccion-option ${seccionSeleccionada === seccion.id ? 'seccion-selected' : ''} ${seccion.cupos === 0 || seccion.id === cursoSeleccionado.seccionActual ? 'seccion-disabled' : ''}`}>
                      <input
                        type="radio"
                        name="seccion"
                        value={seccion.id}
                        checked={seccionSeleccionada === seccion.id}
                        onChange={(e) => setSeccionSeleccionada(e.target.value)}
                        disabled={seccion.cupos === 0 || seccion.id === cursoSeleccionado.seccionActual}
                        className="seccion-radio"
                      />
                      <div className="seccion-info">
                        <strong>Sección {seccion.id}</strong>
                        {seccion.id === cursoSeleccionado.seccionActual && (
                          <span className="badge-actual">Actual</span>
                        )}
                        <div className="seccion-detalles">
                          {seccion.horario} | {seccion.dias}<br />
                          {seccion.profesor}<br />
                          <span className={`cupos-info ${seccion.cupos === 0 ? 'cupos-sin' : 'cupos-con'}`}>
                            {seccion.cupos === 0 ? 'Sin cupos' : `${seccion.cupos} cupos disponibles`}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="modal-buttons">
                  <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={() => handleCambiarSeccion(cursoSeleccionado)}>
                    Confirmar Cambio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModificarMatricula;