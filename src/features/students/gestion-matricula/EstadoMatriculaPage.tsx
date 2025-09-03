import React, { useState } from 'react';
import './EstadoMatriculaPage.css';

const EstadoFinanciero = () => {
  const [expandedSections, setExpandedSections] = useState({
    costos: true,
    pagos: true,
    descuentos: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mock data - Cursos del sistema
  const cursosMatriculados = [
    { codigo: 'MAT101', nombre: 'MATEMÁTICA BÁSICA', creditos: 4 },
    { codigo: 'FIS201', nombre: 'FÍSICA GENERAL', creditos: 3 },
    { codigo: 'QUI301', nombre: 'QUÍMICA ORGÁNICA', creditos: 4 },
    { codigo: 'BIO401', nombre: 'BIOLOGÍA MOLECULAR', creditos: 3 }
  ];

  const cursosElectivos = [
    { codigo: 'ELE301', nombre: 'PROGRAMACIÓN AVANZADA', creditos: 2 },
    { codigo: 'ELE601', nombre: 'ESTADÍSTICA APLICADA', creditos: 2 }
  ];

  // Mock data - Datos financieros
  const costoPorCredito = 120;
  const costoMatricula = 350;
  
  const totalCreditosObligatorios = cursosMatriculados.reduce((sum, curso) => sum + curso.creditos, 0);
  const totalCreditosElectivos = cursosElectivos.reduce((sum, curso) => sum + curso.creditos, 0);
  const totalCreditos = totalCreditosObligatorios + totalCreditosElectivos;
  
  const costoTotal = costoMatricula + (totalCreditos * costoPorCredito);

  const datosFinancieros = {
    costos: {
      matricula: costoMatricula,
      costoPorCredito: costoPorCredito,
      totalCreditos: totalCreditos,
      costoTotal: costoTotal,
      cursosObligatorios: cursosMatriculados,
      cursosElectivos: cursosElectivos,
      cuotas: [
        { mes: 'Marzo', monto: Math.floor(costoTotal * 0.3), vencimiento: '2025-03-15' },
        { mes: 'Abril', monto: Math.floor(costoTotal * 0.25), vencimiento: '2025-04-15' },
        { mes: 'Mayo', monto: Math.floor(costoTotal * 0.25), vencimiento: '2025-05-15' },
        { mes: 'Junio', monto: costoTotal - Math.floor(costoTotal * 0.8), vencimiento: '2025-06-15' }
      ]
    },
    pagos: {
      realizados: [
        { concepto: 'Matrícula 2025', monto: costoMatricula, fecha: '2025-01-15', estado: 'completado' },
        { concepto: 'Cuota Marzo', monto: Math.floor(costoTotal * 0.3), fecha: '2025-03-10', estado: 'completado' }
      ],
      pendientes: [
        { concepto: 'Cuota Abril', monto: Math.floor(costoTotal * 0.25), vencimiento: '2025-04-15', estado: 'pendiente' },
        { concepto: 'Cuota Mayo', monto: Math.floor(costoTotal * 0.25), vencimiento: '2025-05-15', estado: 'pendiente' },
        { concepto: 'Cuota Junio', monto: costoTotal - Math.floor(costoTotal * 0.8), vencimiento: '2025-06-15', estado: 'pendiente' }
      ]
    },
    descuentos: [
      { tipo: 'Beca Académica', descuento: '15%', monto: Math.floor(costoTotal * 0.15), aplicado: true },
      { tipo: 'Descuento por Rendimiento', descuento: '10%', monto: Math.floor(costoTotal * 0.10), aplicado: true },
      { tipo: 'Descuento Pago Anticipado', descuento: '5%', monto: Math.floor(costoTotal * 0.05), aplicado: false }
    ]
  };

  const totalPendiente = datosFinancieros.pagos.pendientes.reduce((sum, pago) => sum + pago.monto, 0);
  const totalDescuentos = datosFinancieros.descuentos
    .filter(desc => desc.aplicado)
    .reduce((sum, desc) => sum + desc.monto, 0);

  return (
    <div className="estado-financiero-container">
      <div className="estado-financiero-card">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">Estado Financiero</h1>
          <p className="header-subtitle">
            Gestión de pagos y costos académicos
          </p>
        </div>

        {/* Resumen rápido */}
        <div className="resumen-container">
          <div className="resumen-grid">
            <div className="resumen-card resumen-card-green">
              <div>
                <p className="resumen-label">Total Pagado</p>
                <p className="resumen-value resumen-value-green">
                  S/ {datosFinancieros.pagos.realizados.reduce((sum, pago) => sum + pago.monto, 0)}
                </p>
              </div>
            </div>
            
            <div className="resumen-card resumen-card-orange">
              <div>
                <p className="resumen-label">Total Pendiente</p>
                <p className="resumen-value resumen-value-orange">
                  S/ {totalPendiente}
                </p>
              </div>
            </div>
            
            <div className="resumen-card resumen-card-purple">
              <div>
                <p className="resumen-label">Descuentos Aplicados</p>
                <p className="resumen-value resumen-value-purple">
                  S/ {totalDescuentos}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Costos de Matrícula */}
        <div className="section">
          <button
            onClick={() => toggleSection('costos')}
            className="section-header"
          >
            <h2 className="section-title">Costos de Matrícula Actual</h2>
            <span className="section-arrow">
              {expandedSections.costos ? '▲' : '▼'}
            </span>
          </button>
          
          {expandedSections.costos && (
            <div className="section-content">
              {/* Resumen de costos */}
              <div className="costos-grid">
                <div className="costo-item">
                  <div className="costo-item-content">
                    <span className="costo-item-label">Matrícula 2025</span>
                    <span className="costo-item-value">
                      S/ {datosFinancieros.costos.matricula}
                    </span>
                  </div>
                </div>
                <div className="costo-item">
                  <div className="costo-item-content">
                    <span className="costo-item-label">Costo por Crédito</span>
                    <span className="costo-item-value">
                      S/ {datosFinancieros.costos.costoPorCredito}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cursos obligatorios */}
              <div className="cursos-section">
                <h3 className="cursos-title">Cursos Obligatorios Matriculados</h3>
                <div className="cursos-list">
                  {datosFinancieros.costos.cursosObligatorios.map((curso, index) => (
                    <div key={index} className="curso-card curso-obligatorio">
                      <div>
                        <span className="curso-codigo">{curso.codigo}</span>
                        <p className="curso-nombre">{curso.nombre}</p>
                      </div>
                      <div className="curso-info">
                        <span className="curso-creditos">{curso.creditos} créditos</span>
                        <p className="curso-costo">
                          S/ {curso.creditos * datosFinancieros.costos.costoPorCredito}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cursos electivos */}
              <div className="cursos-section">
                <h3 className="cursos-title">Cursos Electivos Matriculados</h3>
                <div className="cursos-list">
                  {datosFinancieros.costos.cursosElectivos.map((curso, index) => (
                    <div key={index} className="curso-card curso-electivo">
                      <div>
                        <span className="curso-codigo">{curso.codigo}</span>
                        <p className="curso-nombre curso-electivo-nombre">
                          {curso.nombre} (Electivo)
                        </p>
                      </div>
                      <div className="curso-info">
                        <span className="curso-creditos">{curso.creditos} créditos</span>
                        <p className="curso-costo">
                          S/ {curso.creditos * datosFinancieros.costos.costoPorCredito}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="total-section">
                <div className="total-content">
                  <div>
                    <span className="total-label">
                      Total ({datosFinancieros.costos.totalCreditos} créditos)
                    </span>
                    <p className="total-description">Matrícula + Créditos</p>
                  </div>
                  <span className="total-value">
                    S/ {datosFinancieros.costos.costoTotal}
                  </span>
                </div>
              </div>

              {/* Cuotas */}
              <h3 className="cursos-title">Cronograma de Cuotas</h3>
              <div className="cuotas-list">
                {datosFinancieros.costos.cuotas.map((cuota, index) => (
                  <div key={index} className="cuota-card">
                    <div>
                      <span className="cuota-mes">{cuota.mes}</span>
                      <p className="cuota-vencimiento">
                        Vence: {new Date(cuota.vencimiento).toLocaleDateString('es-PE')}
                      </p>
                    </div>
                    <span className="cuota-monto">S/ {cuota.monto}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pagos */}
        <div className="section">
          <button
            onClick={() => toggleSection('pagos')}
            className="section-header"
          >
            <h2 className="section-title">Pagos Realizados/Pendientes</h2>
            <span className="section-arrow">
              {expandedSections.pagos ? '▲' : '▼'}
            </span>
          </button>
          
          {expandedSections.pagos && (
            <div className="section-content">
              {/* Pagos realizados */}
              <div className="pagos-section">
                <h3 className="pagos-title">Pagos Realizados</h3>
                <div className="pagos-list">
                  {datosFinancieros.pagos.realizados.map((pago, index) => (
                    <div key={index} className="pago-card pago-realizado">
                      <div>
                        <span className="pago-concepto">{pago.concepto}</span>
                        <p className="pago-fecha">
                          Pagado: {new Date(pago.fecha).toLocaleDateString('es-PE')}
                        </p>
                      </div>
                      <div className="pago-info">
                        <span className="pago-monto pago-monto-green">S/ {pago.monto}</span>
                        <span className="pago-estado pago-estado-green">Completado</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagos pendientes */}
              <div className="pagos-section">
                <h3 className="pagos-title">Pagos Pendientes</h3>
                <div className="pagos-list">
                  {datosFinancieros.pagos.pendientes.map((pago, index) => (
                    <div key={index} className="pago-card pago-pendiente">
                      <div>
                        <span className="pago-concepto">{pago.concepto}</span>
                        <p className="pago-fecha">
                          Vence: {new Date(pago.vencimiento).toLocaleDateString('es-PE')}
                        </p>
                      </div>
                      <div className="pago-info">
                        <span className="pago-monto pago-monto-orange">S/ {pago.monto}</span>
                        <span className="pago-estado pago-estado-orange">Pendiente</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Descuentos */}
        <div className="section">
          <button
            onClick={() => toggleSection('descuentos')}
            className="section-header"
          >
            <h2 className="section-title">Aplicación de Descuentos y Becas</h2>
            <span className="section-arrow">
              {expandedSections.descuentos ? '▲' : '▼'}
            </span>
          </button>
          
          {expandedSections.descuentos && (
            <div className="section-content">
              <div className="descuentos-list">
                {datosFinancieros.descuentos.map((descuento, index) => (
                  <div 
                    key={index} 
                    className={`descuento-card ${descuento.aplicado ? 'descuento-aplicado' : 'descuento-no-aplicado'}`}
                  >
                    <div className="descuento-content">
                      <div>
                        <span className="descuento-tipo">{descuento.tipo}</span>
                        <p className="descuento-porcentaje">
                          Descuento: {descuento.descuento}
                        </p>
                      </div>
                      <div className="descuento-info">
                        <span className={`descuento-monto ${descuento.aplicado ? 'descuento-monto-purple' : 'descuento-monto-gray'}`}>
                          S/ {descuento.monto}
                        </span>
                        <span className={`descuento-estado ${descuento.aplicado ? 'descuento-estado-purple' : 'descuento-estado-gray'}`}>
                          {descuento.aplicado ? 'Aplicado' : 'No Aplicado'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstadoFinanciero;