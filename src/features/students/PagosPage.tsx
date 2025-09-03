import React, { useState } from 'react';
import './PagosPage.css';

const PagosCursos = () => {
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

  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pagoCompleto, setPagoCompleto] = useState(false);

  const costoPorCredito = 120; // S/ por crédito

  const toggleCurso = (curso) => {
    setCursosSeleccionados(prev => {
      const existe = prev.find(c => c.id === curso.id);
      if (existe) {
        return prev.filter(c => c.id !== curso.id);
      } else {
        return [...prev, curso];
      }
    });
  };

  const calcularTotal = () => {
    return cursosSeleccionados.reduce((total, curso) => total + (curso.creditos * costoPorCredito), 0);
  };

  const puedeMatricular = (curso) => {
    return curso.prerequisitos.every(prereq => 
      mockEstudiante.cursosAprobados.includes(prereq)
    );
  };

  const procesarPago = () => {
    setPagoCompleto(true);
    setTimeout(() => {
      setPagoCompleto(false);
      setCursosSeleccionados([]);
      setMostrarFormulario(false);
      setMetodoPago('');
    }, 3000);
  };

  if (pagoCompleto) {
    return (
      <div className="pagos-cursos">
        <div className="pago-exitoso">
          <div className="pago-exitoso-icono">✅</div>
          <div className="pago-exitoso-titulo">¡Pago procesado exitosamente!</div>
          <div className="pago-exitoso-subtitulo">
            Tus cursos han sido matriculados correctamente.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pagos-cursos">
      {/* Header */}
      <div className="header-pagos">
        <h1 className="header-titulo">Sistema de Pagos en Línea</h1>
        <p className="header-subtitulo">Matrícula de Cursos - Semestre 2024-II</p>
      </div>

      {/* Información del Estudiante */}
      <div className="info-estudiante-container">
        <h2 className="seccion-titulo">Información del Estudiante</h2>
        <div className="info-grid">
          <div className="info-campo">
            <span className="info-label">Código</span>
            <span className="info-valor">{mockEstudiante.codigo}</span>
          </div>
          <div className="info-campo">
            <span className="info-label">Nombres</span>
            <span className="info-valor">{mockEstudiante.nombres}</span>
          </div>
          <div className="info-campo">
            <span className="info-label">Apellidos</span>
            <span className="info-valor">{mockEstudiante.apellidos}</span>
          </div>
          <div className="info-campo">
            <span className="info-label">Programa</span>
            <span className="info-valor">{mockEstudiante.programa}</span>
          </div>
          <div className="info-campo">
            <span className="info-label">Semestre</span>
            <span className="info-valor">{mockEstudiante.semestre}</span>
          </div>
          <div className="info-campo">
            <span className="info-label">Créditos Actuales</span>
            <span className="info-valor">
              {mockEstudiante.creditosActuales}/{mockEstudiante.creditosMaximos}
            </span>
          </div>
        </div>
      </div>

      <div className="contenido-principal">
        {/* Lista de Cursos */}
        <div className="cursos-container">
          <h2 className="seccion-titulo">Cursos Disponibles</h2>
          {mockCursos.map(curso => {
            const puedeSeleccionar = puedeMatricular(curso);
            const estaSeleccionado = cursosSeleccionados.some(c => c.id === curso.id);
            
            return (
              <div
                key={curso.id}
                className={`curso-card ${estaSeleccionado ? 'seleccionado' : ''} ${!puedeSeleccionar ? 'deshabilitado' : ''}`}
                onClick={() => puedeSeleccionar && toggleCurso(curso)}
              >
                <div className="curso-header">
                  <div className="curso-titulo-container">
                    <input
                      type="checkbox"
                      checked={estaSeleccionado}
                      disabled={!puedeSeleccionar}
                      onChange={() => {}}
                      className="curso-checkbox"
                    />
                    <span className="curso-nombre">{curso.nombre}</span>
                  </div>
                  <span className={`curso-tipo ${curso.tipo}`}>
                    {curso.tipo}
                  </span>
                </div>
                
                <div className="curso-detalles">
                  <div className="detalle-item">
                    <strong>Código:</strong> {curso.codigo}
                  </div>
                  <div className="detalle-item">
                    <strong>Créditos:</strong> {curso.creditos}
                  </div>
                  <div className="detalle-item">
                    <strong>Horario:</strong> {curso.horario}
                  </div>
                  <div className="detalle-item">
                    <strong>Días:</strong> {curso.dias}
                  </div>
                  <div className="detalle-item">
                    <strong>Profesor:</strong> {curso.profesor}
                  </div>
                  <div className="detalle-item">
                    <strong>Costo:</strong> S/ {curso.creditos * costoPorCredito}
                  </div>
                </div>
                
                {curso.prerequisitos.length > 0 && (
                  <div className="curso-prerequisitos">
                    <strong>Prerequisitos:</strong> {curso.prerequisitos.join(', ')}
                  </div>
                )}
                
                {!puedeSeleccionar && (
                  <div className="curso-advertencia">
                    ⚠️ No cumples con los prerequisitos para este curso
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumen de Pago */}
        <div className="resumen-container">
          <h3 className="seccion-titulo">Resumen de Matrícula</h3>
          
          {cursosSeleccionados.length === 0 ? (
            <p className="sin-cursos">No has seleccionado ningún curso</p>
          ) : (
            <>
              <div className="cursos-seleccionados">
                {cursosSeleccionados.map(curso => (
                  <div key={curso.id} className="curso-resumen">
                    <div className="curso-resumen-info">
                      <div className="curso-resumen-codigo">{curso.codigo}</div>
                      <div className="curso-resumen-creditos">{curso.creditos} créditos</div>
                    </div>
                    <div className="curso-resumen-precio">
                      S/ {curso.creditos * costoPorCredito}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="total-container">
                <span>TOTAL A PAGAR:</span>
                <span>S/ {calcularTotal()}</span>
              </div>
              
              <button
                className="btn-proceder"
                onClick={() => setMostrarFormulario(true)}
              >
                Proceder al Pago
              </button>
            </>
          )}
        </div>
      </div>

      {/* Formulario de Pago */}
      {mostrarFormulario && (
        <div className="modal-overlay" onClick={() => setMostrarFormulario(false)}>
          <div className="modal-pago" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-titulo">Completar Pago</h3>
            
            <div className="formulario-pago">
              <div className="campo-container">
                <label className="campo-label">Método de Pago</label>
                <select
                  className="campo-input"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  required
                >
                  <option value="">Seleccionar método</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                  <option value="yape">Yape</option>
                  <option value="plin">Plin</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                </select>
              </div>

              {metodoPago === 'tarjeta' && (
                <>
                  <div className="campo-container">
                    <label className="campo-label">Número de Tarjeta</label>
                    <input
                      type="text"
                      className="campo-input"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="campo-container">
                    <label className="campo-label">Nombre del Titular</label>
                    <input
                      type="text"
                      className="campo-input"
                      placeholder="Como aparece en la tarjeta"
                      required
                    />
                  </div>
                  
                  <div className="campos-inline">
                    <div className="campo-container">
                      <label className="campo-label">Vencimiento</label>
                      <input
                        type="text"
                        className="campo-input"
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div className="campo-container">
                      <label className="campo-label">CVV</label>
                      <input
                        type="text"
                        className="campo-input"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="total-modal">
                <span>Total a pagar:</span>
                <span>S/ {calcularTotal()}</span>
              </div>

              <div className="botones-modal">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn-confirmar"
                  onClick={procesarPago}
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagosCursos;