import React, { useState } from 'react';
import './DetallePagosPage.css';

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

const mockPagos = [
  {
    id: 'PAG2024-001',
    concepto: 'Matrícula Semestre 2024-I',
    monto: 1200.00,
    fechaVencimiento: '2024-03-15',
    fechaPago: '2024-03-10',
    estado: 'PAGADO',
    metodoPago: 'Transferencia Bancaria',
    comprobante: 'TR-20240310-001'
  },
  {
    id: 'PAG2024-002',
    concepto: 'Matrícula Semestre 2024-II',
    monto: 1200.00,
    fechaVencimiento: '2024-08-15',
    fechaPago: '2024-08-12',
    estado: 'PAGADO',
    metodoPago: 'Efectivo',
    comprobante: 'EF-20240812-045'
  },
  {
    id: 'PAG2025-001',
    concepto: 'Matrícula Semestre 2025-I',
    monto: 1250.00,
    fechaVencimiento: '2025-03-15',
    fechaPago: null,
    estado: 'PENDIENTE',
    metodoPago: null,
    comprobante: null
  },
  {
    id: 'PAG2024-003',
    concepto: 'Laboratorio de Química',
    monto: 150.00,
    fechaVencimiento: '2024-09-30',
    fechaPago: '2024-09-28',
    estado: 'PAGADO',
    metodoPago: 'Tarjeta de Crédito',
    comprobante: 'TC-20240928-123'
  },
  {
    id: 'PAG2024-004',
    concepto: 'Biblioteca Digital',
    monto: 80.00,
    fechaVencimiento: '2024-12-31',
    fechaPago: null,
    estado: 'VENCIDO',
    metodoPago: null,
    comprobante: null
  }
];

const DetallePagos = () => {
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);

  const pagosFiltrados = mockPagos.filter(pago => {
    if (filtroEstado === 'todos') return true;
    return pago.estado.toLowerCase() === filtroEstado.toLowerCase();
  });

  const totalPagado = mockPagos
    .filter(pago => pago.estado === 'PAGADO')
    .reduce((sum, pago) => sum + pago.monto, 0);

  const totalPendiente = mockPagos
    .filter(pago => pago.estado === 'PENDIENTE' || pago.estado === 'VENCIDO')
    .reduce((sum, pago) => sum + pago.monto, 0);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearMonto = (monto) => {
    return `S/ ${monto.toFixed(2)}`;
  };

  return (
    <div className="detalle-pagos">
      {/* Header del estudiante */}
      <div className="header-estudiante">
        <h1 className="titulo-principal">Detalle de Pagos</h1>
        <div className="info-estudiante">
          <div className="info-izquierda">
            <h2 className="nombre-estudiante">
              {mockEstudiante.nombres} {mockEstudiante.apellidos}
            </h2>
            <p className="info-item">
              <strong>Código:</strong> {mockEstudiante.codigo}
            </p>
            <p className="info-item">
              <strong>Programa:</strong> {mockEstudiante.programa}
            </p>
          </div>
          <div className="info-derecha">
            <p className="info-item">
              <strong>Semestre:</strong> {mockEstudiante.semestre}
            </p>
            <p className="info-item">
              <strong>Facultad:</strong> {mockEstudiante.facultad}
            </p>
          </div>
        </div>
      </div>

      {/* Resumen de pagos */}
      <div className="resumen-pagos">
        <div className="tarjeta-resumen pagado">
          <h3 className="titulo-tarjeta">Total Pagado</h3>
          <p className="monto-tarjeta">{formatearMonto(totalPagado)}</p>
        </div>
        <div className="tarjeta-resumen pendiente">
          <h3 className="titulo-tarjeta">Total Pendiente</h3>
          <p className="monto-tarjeta">{formatearMonto(totalPendiente)}</p>
        </div>
        <div className="tarjeta-resumen total">
          <h3 className="titulo-tarjeta">Total Conceptos</h3>
          <p className="monto-tarjeta">{mockPagos.length}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <div className="filtros">
          <span className="filtro-label">Filtrar por estado:</span>
          {['todos', 'pagado', 'pendiente', 'vencido'].map(estado => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`filtro-btn ${filtroEstado === estado ? 'activo' : ''}`}
            >
              {estado === 'todos' ? 'Todos' : estado}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de pagos */}
      <div className="tabla-container">
        <div className="tabla-header">
          <div>ID</div>
          <div>Concepto</div>
          <div>Monto</div>
          <div>F. Vencimiento</div>
          <div>F. Pago</div>
          <div>Método</div>
          <div>Estado</div>
        </div>

        {pagosFiltrados.map((pago, index) => (
          <div
            key={pago.id}
            onClick={() => setPagoSeleccionado(pago)}
            className={`tabla-fila ${pagoSeleccionado?.id === pago.id ? 'seleccionada' : ''}`}
          >
            <div className="celda-id">{pago.id}</div>
            <div className="celda-concepto">{pago.concepto}</div>
            <div className="celda-monto">{formatearMonto(pago.monto)}</div>
            <div className="celda-fecha">{formatearFecha(pago.fechaVencimiento)}</div>
            <div className="celda-fecha">{formatearFecha(pago.fechaPago)}</div>
            <div className="celda-metodo">{pago.metodoPago || 'N/A'}</div>
            <div className="celda-estado">
              <span className={`estado-badge ${pago.estado.toLowerCase()}`}>
                {pago.estado}
              </span>
            </div>
          </div>
        ))}
      </div>

      {pagosFiltrados.length === 0 && (
        <div className="sin-resultados">
          <p>No se encontraron pagos con el filtro seleccionado.</p>
        </div>
      )}

      {/* Modal de detalle */}
      {pagoSeleccionado && (
        <div className="modal-overlay" onClick={() => setPagoSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalle del Pago</h2>
              <button
                onClick={() => setPagoSeleccionado(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p><strong>ID:</strong> {pagoSeleccionado.id}</p>
              <p><strong>Concepto:</strong> {pagoSeleccionado.concepto}</p>
              <p><strong>Monto:</strong> {formatearMonto(pagoSeleccionado.monto)}</p>
              <p><strong>Fecha de Vencimiento:</strong> {formatearFecha(pagoSeleccionado.fechaVencimiento)}</p>
              <p><strong>Fecha de Pago:</strong> {formatearFecha(pagoSeleccionado.fechaPago)}</p>
              <p><strong>Método de Pago:</strong> {pagoSeleccionado.metodoPago || 'N/A'}</p>
              <p><strong>Comprobante:</strong> {pagoSeleccionado.comprobante || 'N/A'}</p>
              <p>
                <strong>Estado:</strong>
                <span className={`estado-badge ${pagoSeleccionado.estado.toLowerCase()}`}>
                  {pagoSeleccionado.estado}
                </span>
              </p>
            </div>

            {pagoSeleccionado.estado === 'PENDIENTE' && (
              <div className="modal-footer">
                <button className="btn-pagar">
                  Realizar Pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallePagos;