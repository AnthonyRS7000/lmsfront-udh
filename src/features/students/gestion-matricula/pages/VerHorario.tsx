import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/VerHorario.css";

const VerHorario: React.FC = () => {
  const [ciclo, setCiclo] = useState("1");
  const navigate = useNavigate();

  // Datos simulados
  const horariosSimulados = [
    {
      codigo: "062101011",
      curso: "LENGUAJE I",
      docente: "Juan Pérez",
      seccion: "A",
      ciclo: "1",
      lunes: "08:00-10:00 P6-506 Presencial",
      martes: "",
      miercoles: "10:00-12:00 P6-506 Presencial",
      jueves: "",
      viernes: "08:00-10:00 P6-506 Presencial",
      sabado: "",
      domingo: "",
    },
    {
      codigo: "062101021",
      curso: "MATEMÁTICA BÁSICA I",
      docente: "María López",
      seccion: "A",
      ciclo: "1",
      lunes: "",
      martes: "08:00-10:00 P6-506 Presencial",
      miercoles: "",
      jueves: "10:00-12:00 P6-506 Presencial",
      viernes: "",
      sabado: "08:00-10:00 P6-506 Presencial",
      domingo: "",
    },
    {
      codigo: "062101031",
      curso: "MÉTODOS Y TÉCNICAS DE ESTUDIO",
      docente: "Carlos García",
      seccion: "A",
      ciclo: "1",
      lunes: "10:00-12:00 P6-506 Presencial",
      martes: "",
      miercoles: "",
      jueves: "08:00-10:00 P6-506 Presencial",
      viernes: "",
      sabado: "",
      domingo: "",
    },
  ];

  // Filtrar horarios por ciclo
  const horariosFiltrados = horariosSimulados.filter(
    (horario) => horario.ciclo === ciclo
  );

  return (
    <div className="ver-horario-container">
      {/* Usar estilos de TituloPage */}
      <div className="titulo-page-container">
        <h1 className="titulo-page">Ver Horarios</h1>
      </div>
      
      <div className="ver-horario-card">
        <div className="ver-horario-filters">
          <div className="filter-group">
            <label htmlFor="ciclo-select">Filtrar por Ciclo:</label>
            <select
              id="ciclo-select"
              value={ciclo}
              onChange={(e) => setCiclo(e.target.value)}
              className="ver-horario-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button
            className="ver-horario-button"
            onClick={() => navigate("/estudiante/mi-horario")}
          >
            Ver mi Horario
          </button>
        </div>
        <div className="mi-horario-table-container">
          <table className="ver-horario-table">
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>CURSO</th>
                <th>SECCIÓN</th>
                <th>CICLO</th>
                <th>LUNES</th>
                <th>MARTES</th>
                <th>MIÉRCOLES</th>
                <th>JUEVES</th>
                <th>VIERNES</th>
                <th>SÁBADO</th>
                <th>DOMINGO</th>
              </tr>
            </thead>
            <tbody>
              {horariosFiltrados.map((horario, index) => (
                <tr
                  key={horario.codigo}
                  className={index % 2 === 0 ? "row-par" : "row-impar"}
                >
                  <td>{horario.codigo}</td>
                  <td>{horario.curso}</td>
                  <td>{horario.seccion}</td>
                  <td>{horario.ciclo}</td>
                  <td>{horario.lunes}</td>
                  <td>{horario.martes}</td>
                  <td>{horario.miercoles}</td>
                  <td>{horario.jueves}</td>
                  <td>{horario.viernes}</td>
                  <td>{horario.sabado}</td>
                  <td>{horario.domingo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerHorario;