import React, { useState, Suspense } from 'react';
import './TramitePage.css';

const ProcessMatricula = React.lazy(() => import('./ProcessMatricula'));

const TramitesPage: React.FC = () => {
  const [reciboGenerado, setReciboGenerado] = useState<boolean>(false);
  const [aceptoHonor, setAceptoHonor] = useState<boolean>(false);
  const [aceptoReglamento, setAceptoReglamento] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  const generarRecibo = () => {
    setReciboGenerado(true);
  };

  const aceptarHonor = () => {
    setAceptoHonor(true);
    setActiveTab(2);
  };

  const aceptarReglamento = () => {
    setAceptoReglamento(true);
    setActiveTab(3);
  };

  return (
    <div className="tramites-root">
      <h1 className="tramites-title">Trámites de Matrícula</h1>

      <section className="tramites-card">
        <div className="tramites-card-header">
          <h2>1. Generar recibo de matrícula</h2>
        </div>
        <div className="tramites-card-body">
          <p>Para poder continuar con el proceso debes generar el recibo de matrícula.</p>
          <button
            className={`btn ${reciboGenerado ? 'btn-disabled' : 'btn-primary'}`}
            onClick={generarRecibo}
            disabled={reciboGenerado}
          >
            {reciboGenerado ? 'Recibo generado' : 'Generar recibo de matrícula'}
          </button>
        </div>
      </section>

      <section className="tramites-card">
        <div className="tramites-card-header">
          <h2>2. Bienvenido al proceso de matrícula</h2>
        </div>
        <div className="tramites-card-body">
          {!reciboGenerado ? (
            <div className="aviso" role="status" aria-live="polite">⚠️ Aviso: debes generar el recibo de matrícula antes de continuar.</div>
          ) : (
            <div>
              {/* Barra de 3 secciones */}
              <div className="steps-bar" role="tablist" aria-label="Pasos de matrícula">
                <button
                  className={`step ${aceptoHonor ? 'step-done' : ''} ${activeTab === 1 ? 'step-active' : ''}`}
                  onClick={() => setActiveTab(1)}
                  disabled={!reciboGenerado}
                >
                  1. Compromiso de Honor
                </button>

                <button
                  className={`step ${aceptoReglamento ? 'step-done' : ''} ${activeTab === 2 ? 'step-active' : ''}`}
                  onClick={() => setActiveTab(2)}
                  disabled={!aceptoHonor}
                >
                  2. Reglamento de Estudios
                </button>

                <button
                  className={`step ${activeTab === 3 ? 'step-active' : ''}`}
                  onClick={() => setActiveTab(3)}
                  disabled={!aceptoHonor || !aceptoReglamento}
                >
                  3. Proceso de Matrícula
                </button>
              </div>

              <div className="steps-content">
                {activeTab === 1 && (
                  <div className="doc-view">
                    <p className="doc-title">COMPROMISO DE HONOR</p>
                    <p className="doc-body">Por favor lee y acepta el compromiso de honor para continuar.</p>
                    <button className={`btn ${aceptoHonor ? 'btn-disabled' : 'btn-primary'}`} onClick={aceptarHonor} disabled={aceptoHonor}>Acepto el Compromiso de Honor</button>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="doc-view">
                    <p className="doc-title">REGLAMENTO DE ESTUDIOS</p>
                    <p className="doc-body">Lee y acepta el reglamento para desbloquear el proceso de matrícula.</p>
                    <button className={`btn ${aceptoReglamento ? 'btn-disabled' : 'btn-primary'}`} onClick={aceptarReglamento} disabled={aceptoReglamento}>Acepto el Reglamento</button>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="doc-view">
                    <Suspense fallback={<div>Cargando proceso de matrícula...</div>}>
                      <ProcessMatricula />
                    </Suspense>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TramitesPage;