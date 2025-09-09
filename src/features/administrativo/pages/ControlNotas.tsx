import React, { useState } from "react";
import "../css/controlNotas.css";
import { ClipboardDocumentCheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

interface Nota {
  id: number;
  estudiante: string;
  curso: string;
  unidad: string; // Ej: Parcial 1, Final, etc.
  calificacion: number;
}

const ControlNotas: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [formulario, setFormulario] = useState<Partial<Nota>>({});
  const [modoEdicion, setModoEdicion] = useState(false);

  const handleGuardar = () => {
    if (
      !formulario.estudiante ||
      !formulario.curso ||
      !formulario.unidad ||
      formulario.calificacion === undefined
    ) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (modoEdicion && formulario.id != null) {
      const actualizados = notas.map((n) =>
        n.id === formulario.id ? (formulario as Nota) : n
      );
      setNotas(actualizados);
      Swal.fire("Editado", "Nota actualizada", "success");
    } else {
      const nueva: Nota = {
        ...(formulario as Nota),
        id: Date.now(),
      };
      setNotas([...notas, nueva]);
      Swal.fire("Guardado", "Nota registrada", "success");
    }

    setFormulario({});
    setModoEdicion(false);
  };

  const handleEditar = (nota: Nota) => {
    setFormulario(nota);
    setModoEdicion(true);
  };

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: "¿Eliminar nota?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4C7C74",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setNotas(notas.filter((n) => n.id !== id));
        Swal.fire("Eliminado", "Nota eliminada", "success");
      }
    });
  };

  return (
    <div className="notas-container">
      <div className="notas-header">
        <h2 className="notas-title">
          <ClipboardDocumentCheckIcon className="title-icon" />
          Control de Notas
        </h2>
        <p className="notas-subtitle">
          Registra y revisa las calificaciones por unidad académica.
        </p>
      </div>

      <div className="formulario-notas">
        <div className="form-grid">
          <div className="form-group">
            <label>Estudiante</label>
            <input
              type="text"
              className="form-input"
              value={formulario.estudiante || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, estudiante: e.target.value })
              }
            />
          </div>
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
            <label>Unidad Académica</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ej. Parcial 1, Final"
              value={formulario.unidad || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, unidad: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Calificación</label>
            <input
              type="number"
              className="form-input"
              min={0}
              max={20}
              value={formulario.calificacion ?? ""}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  calificacion: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleGuardar}>
          {modoEdicion ? "Actualizar Nota" : "Registrar Nota"}
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-notas">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Unidad</th>
              <th>Nota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota) => (
              <tr key={nota.id}>
                <td>{nota.estudiante}</td>
                <td>{nota.curso}</td>
                <td>{nota.unidad}</td>
                <td>{nota.calificacion}</td>
                <td className="acciones">
                  <button
                    className="btn-icono editar"
                    onClick={() => handleEditar(nota)}
                  >
                    <PencilIcon className="icono" />
                  </button>
                  <button
                    className="btn-icono eliminar"
                    onClick={() => handleEliminar(nota.id)}
                  >
                    <TrashIcon className="icono" />
                  </button>
                </td>
              </tr>
            ))}
            {notas.length === 0 && (
              <tr>
                <td colSpan={5} className="texto-vacio">
                  No hay notas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlNotas;