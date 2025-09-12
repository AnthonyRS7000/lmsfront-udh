import React from 'react';
import '../css/NotasParciales.css';

const NotasParciales: React.FC = () => (
  <div className="notas-parciales-root">
    <div className="notas-parciales-container">
      <h2 className="notas-parciales-title">NOTAS PARCIALES</h2>
      <div className="notas-parciales-header">
        <div className="notas-header-row first-row">
          <div className="notas-student-name"><strong>APELLIDOS Y NOMBRES:</strong>&nbsp; ROJAS LUNA, ARMANDO</div>
          <div className="notas-student-semestre"><strong>SEMESTRE:</strong>&nbsp; 2025-1</div>
        </div>

        <div className="notas-header-row second-row">
          <div className="notas-controls-left">
            <button className="btn-ver-notas">Ver Notas</button>
            <label style={{ marginLeft: 8 }}>Ingrese el Semestre: <input className="semestre-input" defaultValue="2025-1" /></label>
          </div>
        </div>
      </div>

      <div className="notas-card">
        <table className="notas-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Descripción</th>
              <th>SEC.</th>
              <th>TA1</th>
              <th>TA2</th>
              <th>TA3</th>
              <th>TA4</th>
              <th>PTA</th>
              <th>EMC</th>
              <th>EFC</th>
              <th>SUS</th>
              <th>Promedio (Letras)</th>
              <th>Inasistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>062110013</td>
              <td>DERECHO INFORMÁTICO Y ÉTICA PROFESIONAL</td>
              <td>A</td>
              <td>9</td>
              <td>12</td>
              <td>11</td>
              <td>11</td>
              <td>11</td>
              <td>9</td>
              <td>11</td>
              <td>12</td>
              <td>11 Once</td>
              <td>31.25%</td>
            </tr>
            <tr>
              <td>062110023</td>
              <td>AUDITORIA DE SISTEMAS E INFORMÁTICA</td>
              <td>A</td>
              <td>14</td>
              <td>14</td>
              <td>15</td>
              <td>13</td>
              <td>14</td>
              <td>11</td>
              <td>10</td>
              <td>0</td>
              <td>12 Doce</td>
              <td>33.33%</td>
            </tr>
          </tbody>
        </table>

        <div className="notas-footnote">* Si es estudiante de semipresencial y no puede ver sus notas, haga clic aquí.</div>

        <div className="info-panel">
          <div className="info-panel-header">ESTIMADO ESTUDIANTE CUMPLIMOS CON INFORMAR LO SIGUIENTE:</div>
          <div className="info-panel-body">
            <p><strong>ART.102 DE LA LEY UNIVERSITARIA 30220:</strong> Matrícula condicionada por rendimiento académico.</p>
            <p>La desaprobación de una misma materia por tres veces da lugar a que el estudiante sea separado temporalmente por un año de la universidad.</p>
            <p>NOTA APROBATORIA: <strong>11.00</strong></p>
            <button className="btn-imprimir">Imprimir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotasParciales;
