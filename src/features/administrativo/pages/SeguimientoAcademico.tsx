import React, { useState } from "react";
import "../css/seguimientoAcademico.css";
import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Registro {
  id: number;
  estudiante: string;
  notas: string; // Ej. "Parcial: 14, Final: 16"
  asistencia: string; // Ej. "90%"
  cargaAcademica: string; // Ej. "5 cursos"
}

const SeguimientoAcademico: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [registros, setRegistros] = useState<Registro[]>([
    {
      id: 1,
      estudiante: "Juan Pérez",
      notas: "Parcial: 14, Final: 16",
      asistencia: "92%",
      cargaAcademica: "5 cursos"
    },
    {
      id: 2,
      estudiante: "Ana Torres",
      notas: "Parcial: 18, Final: 17",
      asistencia: "95%",
      cargaAcademica: "6 cursos"
    },
  ]);

  const filtrados = registros.filter((r) =>
    r.estudiante.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="seguimiento-container">
      <div className="seguimiento-header">
        <h2 className="seguimiento-title">
          <UserCircleIcon className="icono-titulo" />
          Seguimiento Académico
        </h2>
        <p className="seguimiento-subtitle">
          Visualiza el estado académico por estudiante.
        </p>
      </div>

      <div className="barra-busqueda">
        <MagnifyingGlassIcon className="icono-busqueda" />
        <input
          type="text"
          placeholder="Buscar estudiante..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
      </div>

      <div className="tabla-container">
        <table className="tabla-seguimiento">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Notas</th>
              <th>Asistencia</th>
              <th>Carga Académica</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length > 0 ? (
              filtrados.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.estudiante}</td>
                  <td>{registro.notas}</td>
                  <td>{registro.asistencia}</td>
                  <td>{registro.cargaAcademica}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="texto-vacio">
                  No se encontraron estudiantes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeguimientoAcademico;