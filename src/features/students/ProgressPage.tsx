import React, { useState } from 'react';
import './ProgressPage.css';

// Mock data del plan de estudios
const planEstudios = {
  totalCreditos: 200,
  totalSemestres: 10,
  semestres: [
    {
      numero: 1,
      materias: [
        { codigo: 'MAT101', nombre: 'MATEMÁTICA BÁSICA', creditos: 4, estado: 'aprobado', nota: 16 },
        { codigo: 'FIS101', nombre: 'FÍSICA I', creditos: 4, estado: 'aprobado', nota: 15 },
        { codigo: 'QUI101', nombre: 'QUÍMICA GENERAL', creditos: 3, estado: 'aprobado', nota: 17 },
        { codigo: 'PROG101', nombre: 'PROGRAMACIÓN I', creditos: 3, estado: 'aprobado', nota: 18 },
        { codigo: 'COM101', nombre: 'COMUNICACIÓN', creditos: 2, estado: 'aprobado', nota: 14 }
      ]
    },
    {
      numero: 2,
      materias: [
        { codigo: 'MAT201', nombre: 'CÁLCULO DIFERENCIAL', creditos: 4, estado: 'aprobado', nota: 17 },
        { codigo: 'FIS201', nombre: 'FÍSICA II', creditos: 4, estado: 'aprobado', nota: 16 },
        { codigo: 'QUI201', nombre: 'QUÍMICA ORGÁNICA', creditos: 3, estado: 'aprobado', nota: 15 },
        { codigo: 'PROG201', nombre: 'PROGRAMACIÓN II', creditos: 3, estado: 'aprobado', nota: 19 },
        { codigo: 'EST101', nombre: 'ESTADÍSTICA I', creditos: 3, estado: 'aprobado', nota: 16 }
      ]
    },
    {
      numero: 3,
      materias: [
        { codigo: 'MAT301', nombre: 'CÁLCULO INTEGRAL', creditos: 4, estado: 'aprobado', nota: 18 },
        { codigo: 'FIS301', nombre: 'FÍSICA III', creditos: 4, estado: 'aprobado', nota: 17 },
        { codigo: 'BIO301', nombre: 'BIOLOGÍA GENERAL', creditos: 3, estado: 'aprobado', nota: 16 },
        { codigo: 'PROG301', nombre: 'ESTRUCTURAS DE DATOS', creditos: 4, estado: 'aprobado', nota: 18 },
        { codigo: 'ING101', nombre: 'INGLÉS I', creditos: 2, estado: 'aprobado', nota: 15 }
      ]
    },
    {
      numero: 4,
      materias: [
        { codigo: 'MAT401', nombre: 'ECUACIONES DIFERENCIALES', creditos: 4, estado: 'aprobado', nota: 16 },
        { codigo: 'ELE401', nombre: 'CIRCUITOS ELÉCTRICOS', creditos: 4, estado: 'aprobado', nota: 17 },
        { codigo: 'BIO401', nombre: 'BIOLOGÍA MOLECULAR', creditos: 3, estado: 'aprobado', nota: 18 },
        { codigo: 'PROG401', nombre: 'ALGORITMOS AVANZADOS', creditos: 4, estado: 'aprobado', nota: 19 },
        { codigo: 'ING201', nombre: 'INGLÉS II', creditos: 2, estado: 'aprobado', nota: 16 }
      ]
    },
    {
      numero: 5,
      materias: [
        { codigo: 'MAT501', nombre: 'MÉTODOS NUMÉRICOS', creditos: 4, estado: 'cursando', nota: null },
        { codigo: 'SIS501', nombre: 'SISTEMAS OPERATIVOS', creditos: 4, estado: 'cursando', nota: null },
        { codigo: 'BD501', nombre: 'BASE DE DATOS I', creditos: 4, estado: 'cursando', nota: null },
        { codigo: 'WEB501', nombre: 'DESARROLLO WEB I', creditos: 3, estado: 'cursando', nota: null },
        { codigo: 'GER501', nombre: 'GERENCIA I', creditos: 2, estado: 'cursando', nota: null }
      ]
    },
    {
      numero: 6,
      materias: [
        { codigo: 'IA601', nombre: 'INTELIGENCIA ARTIFICIAL', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'RED601', nombre: 'REDES DE COMPUTADORAS', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'BD601', nombre: 'BASE DE DATOS II', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'WEB601', nombre: 'DESARROLLO WEB II', creditos: 3, estado: 'pendiente', nota: null },
        { codigo: 'GER601', nombre: 'GERENCIA II', creditos: 2, estado: 'pendiente', nota: null }
      ]
    },
    {
      numero: 7,
      materias: [
        { codigo: 'SW701', nombre: 'INGENIERÍA DE SOFTWARE I', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'SEG701', nombre: 'SEGURIDAD INFORMÁTICA', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'MOV701', nombre: 'DESARROLLO MÓVIL', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'ELE701', nombre: 'ELECTIVO I', creditos: 3, estado: 'pendiente', nota: null },
        { codigo: 'TIC701', nombre: 'ÉTICA EN TIC', creditos: 2, estado: 'pendiente', nota: null }
      ]
    },
    {
      numero: 8,
      materias: [
        { codigo: 'SW801', nombre: 'INGENIERÍA DE SOFTWARE II', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'CLOUD801', nombre: 'COMPUTACIÓN EN LA NUBE', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'IOT801', nombre: 'INTERNET DE LAS COSAS', creditos: 4, estado: 'pendiente', nota: null },
        { codigo: 'ELE801', nombre: 'ELECTIVO II', creditos: 3, estado: 'pendiente', nota: null },
        { codigo: 'INV801', nombre: 'METODOLOGÍA DE INVESTIGACIÓN', creditos: 2, estado: 'pendiente', nota: null }
      ]
    },
    {
      numero: 9,
      materias: [
        { codigo: 'TESIS901', nombre: 'TESIS I', creditos: 6, estado: 'pendiente', nota: null },
        { codigo: 'EMP901', nombre: 'EMPRENDIMIENTO', creditos: 3, estado: 'pendiente', nota: null },
        { codigo: 'ELE901', nombre: 'ELECTIVO III', creditos: 3, estado: 'pendiente', nota: null },
        { codigo: 'PRAC901', nombre: 'PRÁCTICAS PRE-PROFESIONALES I', creditos: 4, estado: 'pendiente', nota: null }
      ]
    },
    {
      numero: 10,
      materias: [
        { codigo: 'TESIS1001', nombre: 'TESIS II', creditos: 8, estado: 'pendiente', nota: null },
        { codigo: 'ELE1001', nombre: 'ELECTIVO IV', creditos: 3, estado: 'pendiente', nota: null },
        { codigo: 'PRAC1001', nombre: 'PRÁCTICAS PRE-PROFESIONALES II', creditos: 5, estado: 'pendiente', nota: null }
      ]
    }
  ]
};

// Mock data del estudiante
const estudiante = {
  nombres: 'BENYAMIN FELIX',
  apellidos: 'ADRIAN LAZARO',
  codigo: '2019110501',
  programa: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA',
  semestreActual: 5,
  fechaIngreso: '2019-03',
  promedioGeneral: 16.8
};

const ProgresoAcademico = () => {
  const [vistaActiva, setVistaActiva] = useState('resumen');
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(null);

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    let creditosAprobados = 0;
    let creditosCursando = 0;
    let creditosPendientes = 0;
    let materiasAprobadas = 0;
    let materiasCursando = 0;
    let materiasPendientes = 0;

    planEstudios.semestres.forEach(semestre => {
      semestre.materias.forEach(materia => {
        if (materia.estado === 'aprobado') {
          creditosAprobados += materia.creditos;
          materiasAprobadas++;
        } else if (materia.estado === 'cursando') {
          creditosCursando += materia.creditos;
          materiasCursando++;
        } else {
          creditosPendientes += materia.creditos;
          materiasPendientes++;
        }
      });
    });

    const porcentajeCreditos = (creditosAprobados / planEstudios.totalCreditos) * 100;
    const totalMaterias = materiasAprobadas + materiasCursando + materiasPendientes;

    return {
      creditosAprobados,
      creditosCursando,
      creditosPendientes,
      materiasAprobadas,
      materiasCursando,
      materiasPendientes,
      porcentajeCreditos,
      totalMaterias
    };
  };

  const estadisticas = calcularEstadisticas();

  // Calcular proyección de graduación
  const calcularProyeccion = () => {
    const creditosPorSemestre = 17;
    const creditosRestantes = estadisticas.creditosPendientes + estadisticas.creditosCursando;
    const semestresRestantes = Math.ceil(creditosRestantes / creditosPorSemestre);
    
    const fechaActual = new Date();
    const añoGraduacion = fechaActual.getFullYear() + Math.floor(semestresRestantes / 2);
    const mesGraduacion = (fechaActual.getMonth() + (semestresRestantes % 2) * 6) % 12;
    
    return {
      semestresRestantes,
      fechaEstimada: `${añoGraduacion}-${String(mesGraduacion + 1).padStart(2, '0')}`,
      añoGraduacion,
      mesGraduacion: mesGraduacion + 1
    };
  };

  const proyeccion = calcularProyeccion();

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'aprobado': return '#28a745';
      case 'cursando': return '#007bff';
      case 'pendiente': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'aprobado': return 'Aprobado';
      case 'cursando': return 'Cursando';
      case 'pendiente': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="progreso-container">
      {/* Header */}
      <div className="progreso-header">
        <h1>Progreso Académico</h1>
        <p>
          {estudiante.nombres} {estudiante.apellidos} - {estudiante.codigo}
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs-header">
          {['resumen', 'semestres', 'proyeccion'].map(tab => (
            <button
              key={tab}
              onClick={() => setVistaActiva(tab)}
              className={`tab-button ${vistaActiva === tab ? 'active' : ''}`}
            >
              {tab === 'resumen' && 'RESUMEN GENERAL'}
              {tab === 'semestres' && 'SEMESTRES'}
              {tab === 'proyeccion' && 'PROYECCION'}
            </button>
          ))}
        </div>

        {/* Vista Resumen */}
        {vistaActiva === 'resumen' && (
          <div className="resumen-content">
            {/* Estadísticas principales */}
            <div className="estadisticas-principales">
              <div className="estadistica-card avance">
                <h3>Avance General</h3>
                <div className="estadistica-valor">
                  {estadisticas.porcentajeCreditos.toFixed(1)}%
                </div>
                <p>
                  {estadisticas.creditosAprobados} de {planEstudios.totalCreditos} créditos
                </p>
              </div>

              <div className="estadistica-card semestre">
                <h3>Semestre Actual</h3>
                <div className="estadistica-valor">
                  {estudiante.semestreActual}°
                </div>
                <p>
                  {estadisticas.materiasCursando} materias cursando
                </p>
              </div>

              <div className="estadistica-card promedio">
                <h3>Promedio General</h3>
                <div className="estadistica-valor">
                  {estudiante.promedioGeneral}
                </div>
                <p>Escala de 0-20</p>
              </div>
            </div>

            {/* Barra de progreso visual */}
            <div className="progreso-section">
              <h3>Progreso de Créditos</h3>
              <div className="barra-progreso">
                <div 
                  className="barra-progreso-fill"
                  style={{ width: `${estadisticas.porcentajeCreditos}%` }}
                >
                  {estadisticas.porcentajeCreditos > 10 && `${estadisticas.porcentajeCreditos.toFixed(1)}%`}
                </div>
              </div>
              <div className="progreso-labels">
                <span>0 créditos</span>
                <span>{planEstudios.totalCreditos} créditos</span>
              </div>
            </div>

            {/* Distribución de materias */}
            <div className="distribucion-materias">
              <div className="materia-card aprobadas">
                <div className="materia-numero">
                  {estadisticas.materiasAprobadas}
                </div>
                <div className="materia-texto">Materias Aprobadas</div>
              </div>

              <div className="materia-card cursando">
                <div className="materia-numero">
                  {estadisticas.materiasCursando}
                </div>
                <div className="materia-texto">Materias Cursando</div>
              </div>

              <div className="materia-card pendientes">
                <div className="materia-numero">
                  {estadisticas.materiasPendientes}
                </div>
                <div className="materia-texto">Materias Pendientes</div>
              </div>
            </div>
          </div>
        )}

        {/* Vista por Semestres */}
        {vistaActiva === 'semestres' && (
          <div className="semestres-content">
            <div className="semestres-grid">
              {planEstudios.semestres.map(semestre => {
                const creditosSemestre = semestre.materias.reduce((sum, m) => sum + m.creditos, 0);
                const materiasAprobadas = semestre.materias.filter(m => m.estado === 'aprobado').length;
                const totalMaterias = semestre.materias.length;
                const promedioSemestre = semestre.materias
                  .filter(m => m.nota)
                  .reduce((sum, m, _, arr) => sum + m.nota / arr.length, 0);

                return (
                  <div 
                    key={semestre.numero} 
                    className={`semestre-card ${semestre.numero === estudiante.semestreActual ? 'actual' : ''}`}
                  >
                    <div className={`semestre-header ${semestre.numero === estudiante.semestreActual ? 'actual' : ''}`}>
                      <h3>
                        {semestre.numero}° Semestre
                        {semestre.numero === estudiante.semestreActual && ' (Actual)'}
                      </h3>
                      <div className="semestre-info">
                        {creditosSemestre} créditos • {materiasAprobadas}/{totalMaterias} aprobadas
                        {promedioSemestre > 0 && ` • Promedio: ${promedioSemestre.toFixed(1)}`}
                      </div>
                    </div>
                    
                    <div className="semestre-materias">
                      {semestre.materias.map(materia => (
                        <div 
                          key={materia.codigo} 
                          className="materia-item"
                          style={{ borderLeftColor: getEstadoColor(materia.estado) }}
                        >
                          <div className="materia-info">
                            <div className="materia-codigo">
                              {materia.codigo}
                            </div>
                            <div className="materia-detalle">
                              {materia.nombre} • {materia.creditos} créditos
                            </div>
                          </div>
                          <div className="materia-estado-container">
                            <div 
                              className="estado-badge"
                              style={{ backgroundColor: getEstadoColor(materia.estado) }}
                            >
                              {getEstadoTexto(materia.estado)}
                            </div>
                            {materia.nota && (
                              <div className="materia-nota">
                                {materia.nota}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Vista Proyección */}
        {vistaActiva === 'proyeccion' && (
          <div className="proyeccion-content">
            <div className="proyeccion-grid">
              {/* Proyección de graduación */}
              <div className="graduacion-card">
                <h2> Fecha Estimada de Graduación</h2>
                <div className="año-graduacion">
                  {proyeccion.añoGraduacion}
                </div>
                <div className="semestre-graduacion">
                  {proyeccion.mesGraduacion <= 6 ? 'Primer Semestre' : 'Segundo Semestre'}
                </div>
                <div className="semestres-restantes">
                  Faltan aproximadamente {proyeccion.semestresRestantes} semestres
                </div>
              </div>

              {/* Estadísticas de progreso */}
              <div className="progreso-stats-card">
                <h3> Tu Progreso</h3>
                
                <div className="progreso-item">
                  <div className="progreso-item-header">
                    <span>Tiempo transcurrido:</span>
                    <strong>{estudiante.semestreActual - 1} semestres</strong>
                  </div>
                  <div className="progreso-bar">
                    <div 
                      className="progreso-bar-fill tiempo"
                      style={{ width: `${((estudiante.semestreActual - 1) / planEstudios.totalSemestres) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="progreso-item">
                  <div className="progreso-item-header">
                    <span>Créditos completados:</span>
                    <strong>{estadisticas.creditosAprobados}/{planEstudios.totalCreditos}</strong>
                  </div>
                  <div className="progreso-bar">
                    <div 
                      className="progreso-bar-fill creditos"
                      style={{ width: `${estadisticas.porcentajeCreditos}%` }}
                    ></div>
                  </div>
                </div>

                <div className="progreso-grid">
                  <div className="progreso-mini-card">
                    <div className="progreso-mini-valor completado">
                      {Math.round((estadisticas.creditosAprobados / planEstudios.totalCreditos) * 100)}%
                    </div>
                    <div className="progreso-mini-texto">Completado</div>
                  </div>
                  <div className="progreso-mini-card">
                    <div className="progreso-mini-valor pendiente">
                      {Math.round(((estadisticas.creditosPendientes + estadisticas.creditosCursando) / planEstudios.totalCreditos) * 100)}%
                    </div>
                    <div className="progreso-mini-texto">Por completar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline de graduación */}
            <div className="timeline-card">
              <h3>Timeline hacia la Graduación</h3>
              
              <div className="timeline-container">
                {/* Línea timeline */}
                <div className="timeline-line"></div>

                {/* Hitos del timeline */}
                <div className="timeline-content">
                  {[
                    { fecha: '2019-03', titulo: 'Inicio de carrera', estado: 'completado' },
                    { fecha: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`, titulo: `${estudiante.semestreActual}° Semestre (Actual)`, estado: 'actual' },
                    { fecha: proyeccion.fechaEstimada, titulo: 'Graduación estimada', estado: 'futuro' }
                  ].map((hito, index) => (
                    <div key={index} className="timeline-item">
                      {/* Círculo del timeline */}
                      <div className={`timeline-circle ${hito.estado}`}></div>

                      <div className="timeline-item-content">
                        <div className={`timeline-titulo ${hito.estado}`}>
                          {hito.titulo}
                        </div>
                        <div className="timeline-fecha">
                          {hito.fecha}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="recomendaciones-card">
              <h3>💡 Recomendaciones para tu Graduación</h3>
              <div className="recomendaciones-lista">
                <div className="recomendacion-item">
                  <span className="recomendacion-bullet normal">•</span>
                  <span className="recomendacion-texto">
                    Mantén un promedio de {Math.ceil((estadisticas.creditosPendientes + estadisticas.creditosCursando) / proyeccion.semestresRestantes)} créditos por semestre para graduarte a tiempo.
                  </span>
                </div>
                <div className="recomendacion-item">
                  <span className="recomendacion-bullet normal">•</span>
                  <span className="recomendacion-texto">
                    Considera tomar cursos de verano para acelerar tu graduación.
                  </span>
                </div>
                <div className="recomendacion-item">
                  <span className="recomendacion-bullet normal">•</span>
                  <span className="recomendacion-texto">
                    Planifica tu tesis desde el 8° semestre para evitar retrasos.
                  </span>
                </div>
                {estudiante.promedioGeneral < 14 && (
                  <div className="recomendacion-item">
                    <span className="recomendacion-bullet alerta">⚠</span>
                    <span className="recomendacion-texto alerta">
                      Tu promedio actual requiere atención. Considera tutorías académicas.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Métricas comparativas */}
            <div className="metricas-grid">
              <div className="metrica-card">
                <div className="metrica-valor tiempo">
                  {Math.round(((estudiante.semestreActual - 1) / planEstudios.totalSemestres) * 100)}%
                </div>
                <div className="metrica-texto">Tiempo transcurrido</div>
              </div>

              <div className="metrica-card">
                <div className="metrica-valor creditos">
                  {Math.round(estadisticas.porcentajeCreditos)}%
                </div>
                <div className="metrica-texto">Créditos completados</div>
              </div>

              <div className="metrica-card">
                <div className="metrica-valor eficiencia">
                  {(estadisticas.porcentajeCreditos / ((estudiante.semestreActual - 1) / planEstudios.totalSemestres * 100) * 100).toFixed(0)}%
                </div>
                <div className="metrica-texto">Eficiencia académica</div>
              </div>

              <div className="metrica-card">
                <div className="metrica-valor restantes">
                  {proyeccion.semestresRestantes}
                </div>
                <div className="metrica-texto">Semestres restantes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgresoAcademico;