import React, { useState } from "react";
import "../css/gestionHorariosAulas.css";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

interface Horario {
  id: number;
  curso: string;
  aula: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

const GestionHorariosAulas: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([
    {
      id: 1,
      curso: "Matemática II",
      aula: "Aula 201",
      dia: "Lunes",
      horaInicio: "08:00",
      horaFin: "10:00",
    },
  ]);

  const [formulario, setFormulario] = useState<Partial<Horario>>({});
  const [modoEdicion, setModoEdicion] = useState(false);

  const handleGuardar = () => {
    if (
      !formulario.curso ||
      !formulario.aula ||
      !formulario.dia ||
      !formulario.horaInicio ||
      !formulario.horaFin
    ) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (modoEdicion && formulario.id != null) {
      const actualizados = horarios.map((h) =>
        h.id === formulario.id ? (formulario as Horario) : h
      );
      setHorarios(actualizados);
      Swal.fire("Editado", "Horario actualizado correctamente", "success");
    } else {
      const nuevoHorario: Horario = {
        ...(formulario as Horario),
        id: Date.now(),
      };
      setHorarios([...horarios, nuevoHorario]);
      Swal.fire("Guardado", "Horario asignado correctamente", "success");
    }

    setFormulario({});
    setModoEdicion(false);
  };

  const handleEditar = (horario: Horario) => {
    setFormulario(horario);
    setModoEdicion(true);
  };

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el horario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4C7C74",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        const filtrados = horarios.filter((h) => h.id !== id);
        setHorarios(filtrados);
        Swal.fire("Eliminado", "Horario eliminado", "success");
      }
    });
  };

  return (
    <div className="horarios-container">
      <div className="horarios-header">
        <h2 className="horarios-title">
          <PlusIcon className="title-icon" />
          Gestión de Horarios y Aulas
        </h2>
        <p className="horarios-subtitle">
          Asigna horarios por curso y evita conflictos de aula.
        </p>
      </div>

      <div className="formulario-horario">
        <div className="form-grid">
          <div className="form-group">
            <label>Curso</label>
            <input
              type="text"
              className="form-input"
              value={formulario.curso || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, curso: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Aula</label>
            <input
              type="text"
              className="form-input"
              value={formulario.aula || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, aula: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Día</label>
            <select
              className="form-input"
              value={formulario.dia || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, dia: e.target.value })
              }
            >
              <option value="">Seleccione</option>
              <option>Lunes</option>
              <option>Martes</option>
              <option>Miércoles</option>
              <option>Jueves</option>
              <option>Viernes</option>
              <option>Sábado</option>
            </select>
          </div>
          <div className="form-group">
            <label>Hora Inicio</label>
            <input
              type="time"
              className="form-input"
              value={formulario.horaInicio || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, horaInicio: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Hora Fin</label>
            <input
              type="time"
              className="form-input"
              value={formulario.horaFin || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, horaFin: e.target.value })
              }
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleGuardar}>
          {modoEdicion ? "Actualizar Horario" : "Asignar Horario"}
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-horarios">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Aula</th>
              <th>Día</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr key={horario.id}>
                <td>{horario.curso}</td>
                <td>{horario.aula}</td>
                <td>{horario.dia}</td>
                <td>{horario.horaInicio}</td>
                <td>{horario.horaFin}</td>
                <td className="acciones">
                  <button
                    className="btn-icono editar"
                    onClick={() => handleEditar(horario)}
                  >
                    <PencilIcon className="icono" />
                  </button>
                  <button
                    className="btn-icono eliminar"
                    onClick={() => handleEliminar(horario.id)}
                  >
                    <TrashIcon className="icono" />
                  </button>
                </td>
              </tr>
            ))}
            {horarios.length === 0 && (
              <tr>
                <td colSpan={6} className="texto-vacio">
                  No hay horarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionHorariosAulas;