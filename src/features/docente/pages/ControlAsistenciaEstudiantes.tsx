import React, { useState } from "react";
import "../css/ControlAsistenciaEstudiantes.css";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import Tablas from "../../../components/pages/Tablas";
import Card from "../../../components/pages/Card";
import { CalendarIcon, DocumentArrowDownIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const ControlAsistenciaEstudiantes: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Estado para los datos de la tabla

  const headers = ["Nombres", "Apellidos", "Asistencia"]; // Encabezados de la tabla

  const rows = data.map((student) => [
    student.firstName,
    student.lastName,
    <input type="checkbox" />,
  ]); // Filas de la tabla

  return (
    <Card className="control-asistencia-container">
      {/* Título principal */}
      <h1 className="control-asistencia-title">Control de Asistencia de Estudiantes</h1>

      {/* Filtros */}
      <div className="control-asistencia-filters">
        <div className="control-asistencia-filter-group">
          <label htmlFor="asignatura-select">Asignaturas</label>
          <select id="asignatura-select" className="control-asistencia-select">
            <option>- Seleccione una asignatura -</option>
            <option>Matemáticas</option>
            <option>Física</option>
            <option>Química</option>
          </select>
        </div>
        <div className="control-asistencia-filter-group">
          <label htmlFor="fecha-input">Fecha</label>
          <div className="control-asistencia-date">
            <input
              id="fecha-input"
              type="text"
              className="control-asistencia-input"
              placeholder="17/10/2025"
            />
            <CalendarIcon className="control-asistencia-icon" />
          </div>
        </div>
      </div>

      {/* Botón para grabar asistencia */}
      <div className="control-asistencia-actions">
        <ButtonPrincipal
          icon={<CheckCircleIcon />}
          text="Grabar Asistencia"
          onClick={() => alert("Asistencia grabada")}
        />
      </div>

      {/* Mensaje o tabla */}
      <div className="control-asistencia-info">
        {data.length === 0 ? (
          <>
            <p>No hay información para mostrar.</p>
            <p>Seleccione una asignatura y fecha para ver los datos.</p>
          </>
        ) : (
          <Tablas headers={headers} rows={rows} />
        )}
      </div>

      {/* Botón para exportar */}
      <div className="control-asistencia-export">
        <ButtonPrincipal
          icon={<DocumentArrowDownIcon />}
          text="Exportar a Excel - Turnitin"
          onClick={() => alert("Exportando a Excel")}
        />
      </div>

      {/* Footer */}
      <footer className="control-asistencia-footer">
        <p>2025-2 III</p>
      </footer>
    </Card>
  );
};

export default ControlAsistenciaEstudiantes;