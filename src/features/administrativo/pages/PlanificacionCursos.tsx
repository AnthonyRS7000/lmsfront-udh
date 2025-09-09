import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "../css/planificacionCursos.css";
import 'jspdf-autotable';
import {
  BookOpenIcon, PlusIcon, PencilIcon, TrashIcon, ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  modalidad: "Presencial" | "Virtual" | "Híbrido";
  ciclo: string;
  fechaRegistro: Date;
}

const PlanificacionCursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [formulario, setFormulario] = useState<Partial<Curso>>({
    codigo: "",
    nombre: "",
    creditos: 0,
    modalidad: "Presencial",
    ciclo: ""
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cursoEditandoId, setCursoEditandoId] = useState<number | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [nextId, setNextId] = useState(1);

  // -------- FUNCIONES PRINCIPALES --------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if (!formulario.codigo || !formulario.nombre || !formulario.ciclo || !formulario.modalidad) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    if (modoEdicion && cursoEditandoId !== null) {
      const actualizados = cursos.map(c =>
        c.id === cursoEditandoId ? { ...c, ...formulario } as Curso : c
      );
      setCursos(actualizados);
      Swal.fire("¡Actualizado!", "Curso actualizado correctamente", "success");
    } else {
      const nuevoCurso: Curso = {
        id: nextId,
        codigo: formulario.codigo!,
        nombre: formulario.nombre!,
        creditos: Number(formulario.creditos),
        modalidad: formulario.modalidad as Curso["modalidad"],
        ciclo: formulario.ciclo!,
        fechaRegistro: new Date()
      };
      setCursos([...cursos, nuevoCurso]);
      setNextId(nextId + 1);
      Swal.fire("¡Guardado!", "Curso registrado correctamente", "success");
    }

    setFormulario({ codigo: "", nombre: "", creditos: 0, modalidad: "Presencial", ciclo: "" });
    setModoEdicion(false);
    setCursoEditandoId(null);
    setMostrarModal(false);
  };

  const handleEditar = (curso: Curso) => {
    setFormulario(curso);
    setModoEdicion(true);
    setCursoEditandoId(curso.id);
    setMostrarModal(true);
  };

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: "¿Eliminar curso?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        setCursos(cursos.filter(c => c.id !== id));
        Swal.fire("¡Eliminado!", "El curso fue eliminado correctamente", "success");
      }
    });
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Planificación de Cursos - LMS UDH", 20, 20);

    const tableData = cursos.map(c => [
      c.codigo,
      c.nombre,
      c.creditos,
      c.modalidad,
      c.ciclo,
      c.fechaRegistro.toLocaleDateString('es-PE')
    ]);

    (doc as any).autoTable({
      head: [["Código", "Nombre", "Créditos", "Modalidad", "Ciclo", "Fecha"]],
      body: tableData,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("planificacion-cursos.pdf");
    Swal.fire("¡Exportado!", "El reporte ha sido generado", "success");
  };

  // -------- UI PRINCIPAL --------
  return (
    <div className="perfiles-container">
      <div className="perfiles-header">
        <div className="header-title-section">
          <h1 className="perfiles-title">
            <BookOpenIcon className="title-icon" />
            Planificación de Cursos
          </h1>
          <p className="perfiles-subtitle">
            Crea, edita y elimina cursos del sistema académico
          </p>
        </div>

        <div className="header-actions">
          <button className="btn btn-export" onClick={exportarPDF}>
            <ArrowDownTrayIcon className="btn-icon" />
            Exportar PDF
          </button>
          <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>
            <PlusIcon className="btn-icon" />
            Nuevo Curso
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="perfiles-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Créditos</th>
              <th>Modalidad</th>
              <th>Ciclo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map(curso => (
              <tr key={curso.id}>
                <td>{curso.codigo}</td>
                <td>{curso.nombre}</td>
                <td>{curso.creditos}</td>
                <td>{curso.modalidad}</td>
                <td>{curso.ciclo}</td>
                <td>{curso.fechaRegistro.toLocaleDateString('es-PE')}</td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleEditar(curso)}>
                    <PencilIcon className="action-icon" />
                    Editar
                  </button>
                  <button className="action-btn delete" onClick={() => handleEliminar(curso.id)}>
                    <TrashIcon className="action-icon" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modoEdicion ? "Editar Curso" : "Nuevo Curso"}</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Código:</label>
                  <input name="codigo" value={formulario.codigo || ""} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input name="nombre" value={formulario.nombre || ""} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label>Créditos:</label>
                  <input name="creditos" type="number" value={formulario.creditos || 0} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label>Modalidad:</label>
                  <select name="modalidad" value={formulario.modalidad || "Presencial"} onChange={handleChange} className="form-input">
                    <option value="Presencial">Presencial</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ciclo:</label>
                  <input name="ciclo" value={formulario.ciclo || ""} onChange={handleChange} className="form-input" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleGuardar}>
                {modoEdicion ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanificacionCursos;