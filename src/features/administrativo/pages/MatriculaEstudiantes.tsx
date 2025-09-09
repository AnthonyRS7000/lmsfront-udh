import React, { useState } from "react";
import "../css/matriculaEstudiantes.css";
import { UserPlusIcon, UserMinusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

interface Matricula {
  id: number;
  estudiante: string;
  curso: string;
  seccion: string;
}

const MatriculaEstudiantes: React.FC = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([
    {
      id: 1,
      estudiante: "Juan Pérez",
      curso: "Matemática I",
      seccion: "A",
    },
  ]);

  const [formulario, setFormulario] = useState<Partial<Matricula>>({});
  const [modoEdicion, setModoEdicion] = useState(false);

  const handleGuardar = () => {
    if (!formulario.estudiante || !formulario.curso || !formulario.seccion) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (modoEdicion && formulario.id != null) {
      const actualizados = matriculas.map((m) =>
        m.id === formulario.id ? (formulario as Matricula) : m
      );
      setMatriculas(actualizados);
      Swal.fire("Editado", "Matrícula actualizada", "success");
    } else {
      const nueva: Matricula = {
        ...(formulario as Matricula),
        id: Date.now(),
      };
      setMatriculas([...matriculas, nueva]);
      Swal.fire("Guardado", "Estudiante matriculado", "success");
    }

    setFormulario({});
    setModoEdicion(false);
  };

  const handleEditar = (matricula: Matricula) => {
    setFormulario(matricula);
    setModoEdicion(true);
  };

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: "¿Eliminar matrícula?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4C7C74",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setMatriculas(matriculas.filter((m) => m.id !== id));
        Swal.fire("Eliminado", "Matrícula eliminada", "success");
      }
    });
  };

  return (
    <div className="matricula-container">
      <div className="matricula-header">
        <h2 className="matricula-title">
          <UserPlusIcon className="title-icon" />
          Matrícula de Estudiantes
        </h2>
        <p className="matricula-subtitle">
          Administra las inscripciones de estudiantes en cursos y secciones.
        </p>
      </div>

      <div className="formulario-matricula">
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
            <label>Sección</label>
            <input
              type="text"
              className="form-input"
              value={formulario.seccion || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, seccion: e.target.value })
              }
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleGuardar}>
          {modoEdicion ? "Actualizar Matrícula" : "Matricular Estudiante"}
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-matriculas">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Sección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((m) => (
              <tr key={m.id}>
                <td>{m.estudiante}</td>
                <td>{m.curso}</td>
                <td>{m.seccion}</td>
                <td className="acciones">
                  <button
                    className="btn-icono editar"
                    onClick={() => handleEditar(m)}
                  >
                    <PencilIcon className="icono" />
                  </button>
                  <button
                    className="btn-icono eliminar"
                    onClick={() => handleEliminar(m.id)}
                  >
                    <UserMinusIcon className="icono" />
                  </button>
                </td>
              </tr>
            ))}
            {matriculas.length === 0 && (
              <tr>
                <td colSpan={4} className="texto-vacio">
                  No hay estudiantes matriculados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatriculaEstudiantes;