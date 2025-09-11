import React from 'react';
import '../css/MiAsistencia.css';

const MiAsistencia: React.FC = () => (
  <div className="mi-asistencia-root">
    {/* Header con datos del estudiante, a la izquierda, y resumen a la derecha */}
    <div className="mi-student-header">
      <div className="mi-student-left">
        <div className="mi-student-name">ESTUDIANTE: ROJAS LUNA, ARMANDO</div>
        <dl>
          <dt>Código:</dt><dd>2020210328</dd>
          <dt>Semestre:</dt><dd>2025-2</dd>
          <dt>Sede:</dt><dd>HUÁNUCO &nbsp; 1</dd>
          <dt>Plan:</dt><dd>2021</dd>
        </dl>
      </div>

      <div className="mi-student-right">
        <div className="stat">CICLO: <span>0</span></div>
        <div className="stat">CREDITOS PERMITIDOS: <span>0</span></div>
        <div className="stat">CREDITO TOTAL: <span>0</span></div>
        <div className="stat">CREDITOS ADICIONALES: <span style={{ color: '#d9534f', fontWeight: 800 }}>0</span></div>
      </div>
    </div>

    <h2 className="mi-asistencia-title">MI HORARIO/ASISTENCIA</h2>

    <div className="mi-asistencia-card">
      <div style={{ padding: 6 }}>
        <div className="mi-warning">Ud. aún no está matriculado en el semestre actual.</div>
        <div className="mi-no-data-box">NO HAY DATOS</div>
      </div>
    </div>
  </div>
);

export default MiAsistencia;
