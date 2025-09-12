import React, { useState } from 'react';
import '../css/PlanDeEstudios.css';

const PROGRAMAS = [
  "INGENIERÍA DE SISTEMAS E INFORMÁTICA",
  "INGENIERÍA INDUSTRIAL",
  "ADMINISTRACIÓN",
];

const ANIOS = ["2021", "2020", "2019"];

const DATA = [
  {
    ciclo: 1, codigo: "062101031", curso: "MÉTODOS Y TÉCNICAS DE ESTUDIO", cred: 3, ht: 2, hp: 2, th: 4, prereq: ""
  },
  {
    ciclo: 1, codigo: "062101021", curso: "MATEMÁTICA BÁSICA I", cred: 4, ht: 2, hp: 4, th: 6, prereq: ""
  },
  {
    ciclo: 1, codigo: "062101011", curso: "LENGUAJE I", cred: 4, ht: 3, hp: 2, th: 5, prereq: ""
  },
  {
    ciclo: 1, codigo: "062101051", curso: "PSICOLOGÍA GENERAL", cred: 3, ht: 3, hp: 0, th: 3, prereq: ""
  },
  {
    ciclo: 1, codigo: "062101061", curso: "INTRODUCCIÓN A LA INGENIERÍA DE SISTEMAS E INFORMÁTICA", cred: 3, ht: 3, hp: 0, th: 3, prereq: ""
  },
  {
    ciclo: 1, codigo: "062101041", curso: "ÉTICA Y LIDERAZGO", cred: 3, ht: 3, hp: 0, th: 3, prereq: ""
  },
  {
    ciclo: 2, codigo: "062102031", curso: "ECOLOGÍA Y PROTECCIÓN DEL MEDIO AMBIENTE", cred: 3, ht: 2, hp: 2, th: 4, prereq: "062101031"
  },
  {
    ciclo: 2, codigo: "062102021", curso: "MATEMÁTICA BÁSICA II", cred: 4, ht: 2, hp: 4, th: 6, prereq: "062101021"
  },
  {
    ciclo: 2, codigo: "062102051", curso: "TECNOLOGÍA INFORMÁTICA", cred: 2, ht: 0, hp: 4, th: 4, prereq: "062101061"
  },
  {
    ciclo: 2, codigo: "062102062", curso: "DESARROLLO PERSONAL", cred: 3, ht: 2, hp: 2, th: 4, prereq: "062101041"
  },
  {
    ciclo: 2, codigo: "062102011", curso: "LENGUAJE II", cred: 4, ht: 3, hp: 2, th: 5, prereq: "062101011"
  },
  {
    ciclo: 2, codigo: "062102041", curso: "SOCIOLOGÍA GENERAL", cred: 3, ht: 3, hp: 0, th: 3, prereq: "062101051"
  },
  {
    ciclo: 2, codigo: "062103023", curso: "ALGORÍTMICA", cred: 3, ht: 2, hp: 2, th: 4, prereq: "062102051"
  },
  {
    ciclo: 2, codigo: "062103022", curso: "FUNDAMENTOS DE NEGOCIOS", cred: 3, ht: 3, hp: 0, th: 3, prereq: ""
  },
  {
    ciclo: 2, codigo: "062103021", curso: "CÁLCULO I", cred: 5, ht: 4, hp: 2, th: 6, prereq: "062102021"
  },
];

const PlanDeEstudios: React.FC = () => {
  const [programa, setPrograma] = useState(PROGRAMAS[0]);
  const [anio, setAnio] = useState(ANIOS[0]);
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="plan-estudios-root">
      <h2 className="plan-estudios-title">Plan de Estudios</h2>
      <div className="plan-estudios-card">
        <div className="plan-estudios-filtros">
          <label htmlFor="programa" className="plan-estudios-label">Programa:</label>
          <select
            id="programa"
            className="plan-estudios-select"
            value={programa}
            onChange={e => setPrograma(e.target.value)}
          >
            {PROGRAMAS.map(p => <option key={p}>{p}</option>)}
          </select>
          <label htmlFor="anio" className="plan-estudios-label">Año:</label>
          <select
            id="anio"
            className="plan-estudios-select"
            value={anio}
            onChange={e => setAnio(e.target.value)}
          >
            {ANIOS.map(a => <option key={a}>{a}</option>)}
          </select>
          <button
            className="plan-estudios-btn"
            onClick={() => setMostrar(true)}
          >
            Mostrar
          </button>
        </div>
        <div className="plan-estudios-link">
          * También puede acceder a la página de <a href="http://www.udh.edu.pe/mallacurricular.aspx" target="_blank" rel="noopener noreferrer">Transparencia Institucional</a> para obtener diseño y malla curricular.
        </div>
      </div>

      {mostrar && (
        <div className="plan-estudios-tabla-card">
          <div className="plan-estudios-tabla-wrapper">
            <table className="plan-estudios-tabla">
              <thead>
                <tr>
                  <th>Ciclo</th>
                  <th>Código</th>
                  <th>Curso</th>
                  <th>Créd.</th>
                  <th>HT</th>
                  <th>HP</th>
                  <th>T.H.</th>
                  <th>PreReq.</th>
                </tr>
              </thead>
              <tbody>
                {DATA.map((row, i) => (
                  <tr key={row.codigo} className={i % 2 === 1 ? "plan-estudios-row-par" : ""}>
                    <td>{row.ciclo}</td>
                    <td>{row.codigo}</td>
                    <td>{row.curso}</td>
                    <td>{row.cred}</td>
                    <td>{row.ht}</td>
                    <td>{row.hp}</td>
                    <td>{row.th}</td>
                    <td>{row.prereq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDeEstudios;