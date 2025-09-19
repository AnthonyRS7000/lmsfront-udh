import React, { useState } from 'react';
import '../css/InscripcionIdiomaExtranjero.css';

const InscripcionIdiomaExtranjero: React.FC = () => {
  const [programaSeleccionado, setProgramaSeleccionado] = useState('');
  // Datos de ejemplo (simulan respuesta API)
  const estudiante = {
    codigo: '2020210328',
    nombre: 'ROJAS LUNA, ARMANDO',
    programa: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA',
    semestre: '2025-2'
  };

  return (
    <div className="tramites-root inscripcion-idioma-root">
      <h1 className="tramites-title">SELECCIONE EL PROGRAMA:</h1>

      <div className="tramites-card inscripcion-idioma-card">
        <div className="tramites-card-header">
          <h2>Seleccione el programa</h2>
        </div>
        <div className="tramites-card-body inscripcion-idioma-body">
          <div style={{ maxWidth: '100%', marginBottom: 12 }}>
            <select className="carnet-select" value={programaSeleccionado} onChange={(e) => setProgramaSeleccionado(e.target.value)}>
              <option value="">Seleccione...</option>
              <option value="ingles-basico">INGLÉS BÁSICO PARA PREGRADO</option>
              <option value="curso-nivelacion">CURSO ESPECIAL DE NIVELACION DE INGLÉS(III y IV)</option>
            </select>
          </div>

          <hr />

          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 8, marginTop: 12 }}>
            <div style={{ fontWeight: 700 }}>Código:</div>
            <div>{estudiante.codigo}</div>

            <div style={{ fontWeight: 700 }}>Apellidos y Nombres:</div>
            <div>{estudiante.nombre}</div>

            <div style={{ fontWeight: 700 }}>Programa Académico:</div>
            <div>{programaSeleccionado ? (programaSeleccionado === 'ingles-basico' ? 'INGLÉS BÁSICO PARA PREGRADO' : 'CURSO ESPECIAL DE NIVELACION DE INGLÉS(III y IV)') : estudiante.programa}</div>

            <div style={{ fontWeight: 700 }}>Semestre:</div>
            <div>{estudiante.semestre}</div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button className="btn-primary" disabled={!programaSeleccionado}>Terminar</button>
          </div>

          <hr style={{ marginTop: 26 }} />

          <div style={{ marginTop: 8 }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>SELECCIONE SU HORARIO :</h3>
            <select className="carnet-select" defaultValue="">
              <option value="">- no hay registros -</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InscripcionIdiomaExtranjero;
