import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  UserIcon,
  BookOpenIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import "../css/asignacionDocentes.css";

interface Asignacion {
  id: number;
  docente: string;
  curso: string;
  horas: number;
  fechaAsignacion: Date;
}

const AsignacionDocentes: React.FC = () => {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [formulario, setFormulario] = useState<Partial<Asignacion>>({
    docente: "",
    curso: "",
    horas: 0,
  });
  const [nextId, setNextId] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: name === "horas" ? Number(value) : value,
    }));
  };

  const guardarAsignacion = () => {
    if (!formulario.docente || !formulario.curso || !formulario.horas) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    const nueva: Asignacion = {
      id: nextId,
      docente: formulario.docente!,
      curso: formulario.curso!,
      horas: formulario.horas!,
      fechaAsignacion: new Date(),
    };

    setAsignaciones([...asignaciones, nueva]);
    setNextId(nextId + 1);
    setFormulario({ docente: "", curso: "", horas: 0 });
    setMostrarModal(false);
    Swal.fire("¡Asignado!", "Docente vinculado correctamente", "success");
  };

  const eliminarAsignacion = (id: number) => {
    Swal.fire({
      title: "¿Eliminar asignación?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        setAsignaciones(asignaciones.filter((a) => a.id !== id));
        Swal.fire("¡Eliminado!", "", "success");
      }
    });
  };

  return (
    <div className="asignacion-container">
      <div className="asignacion-header">
        <div className="header-left">
          <h1 className="asignacion-title">
            <UserIcon className="title-icon" />
            Asignación de Docentes
          </h1>
          <p className="asignacion-subtitle">
            Vincula docentes a cursos y revisa su carga horaria
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>
            <PlusIcon className="btn-icon" />
            Nueva Asignación
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="asignacion-table">
          <thead>
            <tr>
              <th>Docente</th>
              <th>Curso</th>
              <th>Horas</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((a) => (
              <tr key={a.id}>
                <td>{a.docente}</td>
                <td>{a.curso}</td>
                <td>{a.horas}</td>
                <td>{a.fechaAsignacion.toLocaleDateString("es-PE")}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn delete"
                    onClick={() => eliminarAsignacion(a.id)}
                  >
                    <TrashIcon className="action-icon" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {asignaciones.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-row">
                  No hay asignaciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Asignar Docente</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Docente:</label>
                  <input
                    type="text"
                    name="docente"
                    value={formulario.docente || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Curso:</label>
                  <input
                    type="text"
                    name="curso"
                    value={formulario.curso || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Horas Asignadas:</label>
                  <input
                    type="number"
                    name="horas"
                    value={formulario.horas || 0}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={guardarAsignacion}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsignacionDocentes;