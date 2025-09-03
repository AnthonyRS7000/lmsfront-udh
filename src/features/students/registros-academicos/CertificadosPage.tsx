import { useState } from 'react';
import './CertificadosPage.css';

// Tipos de certificados disponibles
interface Certificado {
  id: string;
  tipo: string;
  nombre: string;
  descripcion: string;
  requisitos: string[];
  precio: number;
  disponible: boolean;
  fechaEmision?: string;
  icon: string;
  categoria: 'academico' | 'estudios' | 'notas' | 'constancia';
}

// Historial de certificados solicitados
interface SolicitudCertificado {
  id: string;
  certificadoId: string;
  fechaSolicitud: string;
  estado: 'pendiente' | 'procesando' | 'listo' | 'entregado' | 'rechazado';
  fechaEstimada?: string;
  observaciones?: string;
  numeroVoucher?: string;
  montoAbonado: number;
}

const CertificadosPage = () => {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [vistaActiva, setVistaActiva] = useState<'disponibles' | 'historial'>('disponibles');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [certificadoSeleccionado, setCertificadoSeleccionado] = useState<Certificado | null>(null);

  // Mock data - Certificados disponibles
  const certificadosDisponibles: Certificado[] = [
    {
      id: 'cert-001',
      tipo: 'Certificado de Estudios',
      nombre: 'Certificado de Estudios Completo',
      descripcion: 'Documento que certifica los estudios realizados con detalle de cursos, créditos y calificaciones.',
      requisitos: ['Matrícula vigente', 'Sin deudas académicas', 'Al menos 1 semestre completo'],
      precio: 25.00,
      disponible: true,
      icon: '📜',
      categoria: 'estudios'
    },
    {
      id: 'cert-002',
      tipo: 'Constancia de Matrícula',
      nombre: 'Constancia de Matrícula Vigente',
      descripcion: 'Documento que certifica que el estudiante se encuentra matriculado en el semestre actual.',
      requisitos: ['Matrícula vigente en semestre actual'],
      precio: 15.00,
      disponible: true,
      icon: '📋',
      categoria: 'constancia'
    },
    {
      id: 'cert-003',
      tipo: 'Constancia de Ingreso',
      nombre: 'Constancia de Ingreso a la Universidad',
      descripcion: 'Documento que certifica la fecha de ingreso del estudiante a la universidad.',
      requisitos: ['Registro como estudiante de la universidad'],
      precio: 15.00,
      disponible: true,
      icon: '🎓',
      categoria: 'constancia'
    },
    {
      id: 'cert-004',
      tipo: 'Certificado de Notas',
      nombre: 'Certificado de Notas por Semestre',
      descripcion: 'Documento oficial con las calificaciones obtenidas en uno o más semestres académicos.',
      requisitos: ['Semestre(s) completo(s)', 'Sin deudas en semestre solicitado'],
      precio: 20.00,
      disponible: true,
      icon: '📊',
      categoria: 'notas'
    },
    {
      id: 'cert-005',
      tipo: 'Constancia de Egresado',
      nombre: 'Constancia de Egresado',
      descripcion: 'Documento que certifica que el estudiante ha completado todos los requisitos académicos.',
      requisitos: ['100% de créditos aprobados', 'Tesis sustentada y aprobada', 'Sin deudas académicas'],
      precio: 30.00,
      disponible: false,
      icon: '🏆',
      categoria: 'academico'
    },
    {
      id: 'cert-006',
      tipo: 'Ranking Estudiantil',
      nombre: 'Constancia de Ranking Académico',
      descripcion: 'Documento que certifica la posición del estudiante en el ranking de su promoción.',
      requisitos: ['Al menos 6 semestres completos', 'Promedio mínimo de 14.0'],
      precio: 25.00,
      disponible: true,
      icon: '🏅',
      categoria: 'academico'
    },
    {
      id: 'cert-007',
      tipo: 'Constancia de Conducta',
      nombre: 'Constancia de Buena Conducta',
      descripcion: 'Documento que certifica que el estudiante no tiene sanciones disciplinarias.',
      requisitos: ['Sin sanciones disciplinarias vigentes'],
      precio: 15.00,
      disponible: true,
      icon: '✅',
      categoria: 'constancia'
    },
    {
      id: 'cert-008',
      tipo: 'Sílabo de Cursos',
      nombre: 'Sílabo de Cursos Llevados',
      descripcion: 'Documento detallado del contenido temático de los cursos realizados.',
      requisitos: ['Curso(s) aprobado(s)', 'Especificar curso(s) solicitado(s)'],
      precio: 10.00,
      disponible: true,
      icon: '📚',
      categoria: 'academico'
    }
  ];

  // Mock data - Historial de solicitudes
  const historialSolicitudes: SolicitudCertificado[] = [
    {
      id: 'sol-001',
      certificadoId: 'cert-002',
      fechaSolicitud: '2025-08-28',
      estado: 'listo',
      fechaEstimada: '2025-09-02',
      observaciones: 'Listo para descarga',
      numeroVoucher: 'VOU-2025-001234',
      montoAbonado: 15.00
    },
    {
      id: 'sol-002',
      certificadoId: 'cert-001',
      fechaSolicitud: '2025-08-25',
      estado: 'procesando',
      fechaEstimada: '2025-09-05',
      observaciones: 'En proceso de verificación académica',
      numeroVoucher: 'VOU-2025-001220',
      montoAbonado: 25.00
    },
    {
      id: 'sol-003',
      certificadoId: 'cert-004',
      fechaSolicitud: '2025-08-20',
      estado: 'entregado',
      fechaEstimada: '2025-08-25',
      observaciones: 'Certificado descargado exitosamente',
      numeroVoucher: 'VOU-2025-001210',
      montoAbonado: 20.00
    },
    {
      id: 'sol-004',
      certificadoId: 'cert-003',
      fechaSolicitud: '2025-08-15',
      estado: 'pendiente',
      fechaEstimada: '2025-09-10',
      observaciones: 'Pendiente de pago',
      numeroVoucher: 'VOU-2025-001200',
      montoAbonado: 0.00
    }
  ];

  // Funciones auxiliares
  const getCertificadoById = (id: string) => {
    return certificadosDisponibles.find(cert => cert.id === id);
  };

  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case 'listo': return 'estado-listo';
      case 'procesando': return 'estado-procesando';
      case 'entregado': return 'estado-entregado';
      case 'pendiente': return 'estado-pendiente';
      case 'rechazado': return 'estado-rechazado';
      default: return 'estado-pendiente';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'listo': return 'Listo para Descarga';
      case 'procesando': return 'En Proceso';
      case 'entregado': return 'Descargado';
      case 'pendiente': return 'Pendiente de Pago';
      case 'rechazado': return 'Rechazado';
      default: return 'Desconocido';
    }
  };

  const getCategoriaTexto = (categoria: string) => {
    switch (categoria) {
      case 'academico': return 'Académico';
      case 'estudios': return 'Estudios';
      case 'notas': return 'Calificaciones';
      case 'constancia': return 'Constancias';
      default: return 'Otros';
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Funciones de acciones
  const solicitarCertificado = (certificado: Certificado) => {
    setCertificadoSeleccionado(certificado);
    setMostrarModal(true);
  };

  const confirmarSolicitud = () => {
    if (certificadoSeleccionado) {
      alert(`Solicitud enviada para: ${certificadoSeleccionado.nombre}\nCosto: S/ ${certificadoSeleccionado.precio.toFixed(2)}\n\nRedirigiendo a pasarela de pagos...`);
      setMostrarModal(false);
      setCertificadoSeleccionado(null);
    }
  };

  const descargarCertificado = (solicitud: SolicitudCertificado) => {
    if (solicitud.estado === 'listo') {
      alert(`Descargando certificado...\nNúmero de voucher: ${solicitud.numeroVoucher}`);
      // Aquí iría la lógica real de descarga
    }
  };

  // Filtrar certificados y solicitudes
  const certificadosFiltrados = certificadosDisponibles.filter(cert => {
    if (filtroCategoria !== 'todos' && cert.categoria !== filtroCategoria) return false;
    return true;
  });

  const solicitudesFiltradas = historialSolicitudes.filter(sol => {
    if (filtroEstado !== 'todos' && sol.estado !== filtroEstado) return false;
    return true;
  });

  return (
    <div className="certificados-container">
      <div className="certificados-card">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">Descarga de Certificados</h1>
          <p className="header-subtitle">
            Solicita y descarga tus certificados y documentos académicos oficiales
          </p>
        </div>

        {/* Navegación de pestañas */}
        <div className="tabs-navigation">
          <button
            onClick={() => setVistaActiva('disponibles')}
            className={`tab-button ${vistaActiva === 'disponibles' ? 'active' : ''}`}
          >
            📋 Certificados Disponibles
          </button>
          <button
            onClick={() => setVistaActiva('historial')}
            className={`tab-button ${vistaActiva === 'historial' ? 'active' : ''}`}
          >
            📜 Mis Solicitudes
          </button>
        </div>

        {/* Vista de Certificados Disponibles */}
        {vistaActiva === 'disponibles' && (
          <div className="certificados-disponibles">
            {/* Filtros */}
            <div className="filtros-container">
              <div className="filtro-group">
                <label htmlFor="filtro-categoria" className="filtro-label">
                  Filtrar por Categoría:
                </label>
                <select
                  id="filtro-categoria"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="filtro-select"
                >
                  <option value="todos">Todas las categorías</option>
                  <option value="academico">Académico</option>
                  <option value="estudios">Estudios</option>
                  <option value="notas">Calificaciones</option>
                  <option value="constancia">Constancias</option>
                </select>
              </div>
            </div>

            {/* Grid de certificados */}
            <div className="certificados-grid">
              {certificadosFiltrados.map((certificado) => (
                <div key={certificado.id} className={`certificado-card ${!certificado.disponible ? 'no-disponible' : ''}`}>
                  <div className="certificado-header">
                    <div className="certificado-icon">{certificado.icon}</div>
                    <div className="certificado-info">
                      <h3 className="certificado-nombre">{certificado.nombre}</h3>
                      <span className="certificado-categoria">
                        {getCategoriaTexto(certificado.categoria)}
                      </span>
                    </div>
                    <div className="certificado-precio">
                      S/ {certificado.precio.toFixed(2)}
                    </div>
                  </div>

                  <div className="certificado-body">
                    <p className="certificado-descripcion">{certificado.descripcion}</p>
                    
                    <div className="requisitos-section">
                      <h4 className="requisitos-titulo">Requisitos:</h4>
                      <ul className="requisitos-lista">
                        {certificado.requisitos.map((requisito, index) => (
                          <li key={index} className="requisito-item">
                            <span className="requisito-bullet">•</span>
                            {requisito}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="certificado-footer">
                    {certificado.disponible ? (
                      <button
                        onClick={() => solicitarCertificado(certificado)}
                        className="btn-solicitar"
                      >
                        💰 Solicitar Certificado
                      </button>
                    ) : (
                      <button className="btn-no-disponible" disabled>
                        ❌ No Disponible
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista de Historial de Solicitudes */}
        {vistaActiva === 'historial' && (
          <div className="historial-solicitudes">
            {/* Filtros */}
            <div className="filtros-container">
              <div className="filtro-group">
                <label htmlFor="filtro-estado" className="filtro-label">
                  Filtrar por Estado:
                </label>
                <select
                  id="filtro-estado"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="filtro-select"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="procesando">En Proceso</option>
                  <option value="listo">Listo</option>
                  <option value="entregado">Descargado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>
            </div>

            {/* Lista de solicitudes */}
            <div className="solicitudes-lista">
              {solicitudesFiltradas.length > 0 ? (
                solicitudesFiltradas.map((solicitud) => {
                  const certificado = getCertificadoById(solicitud.certificadoId);
                  return (
                    <div key={solicitud.id} className="solicitud-card">
                      <div className="solicitud-header">
                        <div className="solicitud-info">
                          <div className="solicitud-certificado">
                            <span className="solicitud-icon">{certificado?.icon}</span>
                            <div>
                              <h3 className="solicitud-nombre">{certificado?.nombre}</h3>
                              <p className="solicitud-tipo">{certificado?.tipo}</p>
                            </div>
                          </div>
                          <div className="solicitud-meta">
                            <span className="solicitud-fecha">
                              Solicitado: {formatearFecha(solicitud.fechaSolicitud)}
                            </span>
                            {solicitud.fechaEstimada && (
                              <span className="solicitud-fecha-estimada">
                                Estimado: {formatearFecha(solicitud.fechaEstimada)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="solicitud-estado-container">
                          <span className={`solicitud-estado ${getEstadoClass(solicitud.estado)}`}>
                            {getEstadoTexto(solicitud.estado)}
                          </span>
                          <span className="solicitud-monto">
                            S/ {solicitud.montoAbonado.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="solicitud-body">
                        <div className="solicitud-detalles">
                          <div className="detalle-item">
                            <span className="detalle-label">Voucher:</span>
                            <span className="detalle-valor">{solicitud.numeroVoucher}</span>
                          </div>
                          {solicitud.observaciones && (
                            <div className="detalle-item">
                              <span className="detalle-label">Observaciones:</span>
                              <span className="detalle-valor">{solicitud.observaciones}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="solicitud-acciones">
                        {solicitud.estado === 'listo' && (
                          <button
                            onClick={() => descargarCertificado(solicitud)}
                            className="btn-descargar"
                          >
                            📥 Descargar Certificado
                          </button>
                        )}
                        {solicitud.estado === 'pendiente' && (
                          <button className="btn-pagar">
                            💳 Realizar Pago
                          </button>
                        )}
                        {solicitud.estado === 'entregado' && (
                          <button className="btn-volver-descargar">
                            🔄 Volver a Descargar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="sin-solicitudes">
                  <div className="sin-solicitudes-icon">📋</div>
                  <h3 className="sin-solicitudes-titulo">No hay solicitudes</h3>
                  <p className="sin-solicitudes-texto">
                    No tienes solicitudes de certificados con los filtros seleccionados.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="info-adicional">
          <div className="info-card">
            <h3 className="info-titulo">💡 Información Importante</h3>
            <ul className="info-lista">
              <li><strong>Tiempo de procesamiento:</strong> Los certificados tardan entre 3 a 5 días hábiles en procesarse.</li>
              <li><strong>Validez:</strong> Todos los certificados emitidos tienen validez oficial.</li>
              <li><strong>Formato:</strong> Los certificados se entregan en formato PDF con firmas digitales.</li>
              <li><strong>Pagos:</strong> Se aceptan tarjetas de débito, crédito y transferencias bancarias.</li>
              <li><strong>Soporte:</strong> Para consultas, contacta a registro académico: registros@universidad.edu.pe</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {mostrarModal && certificadoSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-titulo">Confirmar Solicitud</h3>
              <button
                onClick={() => setMostrarModal(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-certificado">
                <span className="modal-icon">{certificadoSeleccionado.icon}</span>
                <div>
                  <h4 className="modal-certificado-nombre">{certificadoSeleccionado.nombre}</h4>
                  <p className="modal-certificado-descripcion">{certificadoSeleccionado.descripcion}</p>
                </div>
              </div>

              <div className="modal-precio">
                <span className="modal-precio-label">Costo total:</span>
                <span className="modal-precio-valor">S/ {certificadoSeleccionado.precio.toFixed(2)}</span>
              </div>

              <div className="modal-requisitos">
                <h4 className="modal-requisitos-titulo">Requisitos necesarios:</h4>
                <ul className="modal-requisitos-lista">
                  {certificadoSeleccionado.requisitos.map((requisito, index) => (
                    <li key={index} className="modal-requisito">
                      ✓ {requisito}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setMostrarModal(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarSolicitud}
                className="btn-confirmar"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificadosPage;
