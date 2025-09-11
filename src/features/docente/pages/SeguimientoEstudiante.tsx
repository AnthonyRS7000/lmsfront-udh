import { useState } from "react";
import "../css/seguimiento-estudiante.css";

const cursos = ["Epidemiología", "Farmacología"];
const grupos = ["A", "B", "C"];

const estudiantes = [
  {
    nombre: "Colapinto Franco Alejandro",
    PT: 5,
    EMC: 5,
    EFC: 0,
    asistencia: 24,
    total: 25,
  },
  {
    nombre: "Escudo de Roble Thorin",
    PT: 10,
    EMC: 11,
    EFC: 11,
    asistencia: 16,
    total: 25,
  },
  {
    nombre: "Hamilton Lewis Carl",
    PT: 13,
    EMC: 13,
    EFC: 13,
    asistencia: 21,
    total: 25,
  },
  {
    nombre: "Russell George William",
    PT: 10,
    EMC: 8,
    EFC: 9,
    asistencia: 21,
    total: 25,
  },
  {
    nombre: "Senna da Silva Ayrton",
    PT: 18,
    EMC: 18,
    EFC: 18,
    asistencia: 24,
    total: 25,
  },
];

function calcularPromedio(est: any) {
  const notas = [est.PT, est.EMC, est.EFC].filter(n => n !== undefined && n !== null);
  if (notas.length === 0) return 0;
  const suma = notas.reduce((a, b) => a + b, 0);
  return Math.round((suma / notas.length) * 100) / 100;
}

function getES(prom: number) {
  return prom < 10.5 ? "SI" : "NO";
}

function getRendimiento(prom: number) {
  if (prom > 16) return "Excelente";
  if (prom > 12) return "Bueno";
  if (prom > 9) return "Moderado";
  if (prom > 5) return "Bajo";
  return "Malo";
}

function getRendimientoClass(r: string) {
  if (r === "Excelente") return "rend-excelente";
  if (r === "Bueno") return "rend-bueno";
  if (r === "Moderado") return "rend-moderado";
  if (r === "Bajo") return "rend-bajo";
  return "rend-malo";
}

function getESClass(es: string) {
  return es === "SI" ? "es-si" : "es-no";
}

const SeguimientoEstudiante = () => {
  const [curso, setCurso] = useState(cursos[0]);
  const [grupo, setGrupo] = useState(grupos[0]);

  return (
    <div className="seg-bg">
      <div className="seg-main">
        <h2 className="seg-title">SEGUIMIENTO DE ESTUDIANTES</h2>
        <hr className="seg-divider" />
        <div className="seg-filtros">
          <div>
            <label>Curso:</label>
            <select className="seg-input" value={curso} onChange={e => setCurso(e.target.value)}>
              {cursos.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label>Grupo:</label>
            <select className="seg-input" value={grupo} onChange={e => setGrupo(e.target.value)}>
              {grupos.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div className="seg-table-wrap">
          <table className="seg-table">
            <thead>
              <tr>
                <th>N°</th>
                <th className="seg-nombre">Apellidos y Nombres</th>
                <th>PT</th>
                <th>EMC</th>
                <th>EFC</th>
                <th>ES</th>
                <th>Asistencia</th>
                <th>Rendimiento</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((est, idx) => {
                const prom = calcularPromedio(est);
                const es = getES(prom);
                const rend = getRendimiento(prom);
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td className="seg-nombre">{est.nombre}</td>
                    <td>{est.PT ?? "-"}</td>
                    <td>{est.EMC ?? "-"}</td>
                    <td>{est.EFC ?? "-"}</td>
                    <td>
                      <span className={`seg-es ${getESClass(es)}`}>
                        {es === "SI" ? "😞 SI" : "😊 NO"}
                      </span>
                    </td>
                    <td>
                      {est.asistencia}/{est.total}
                    </td>
                    <td>
                      <span className={`seg-rendimiento ${getRendimientoClass(rend)}`}>
                        {rend}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoEstudiante;