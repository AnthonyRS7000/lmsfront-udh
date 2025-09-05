import React, { useState } from "react";
import Swal from "sweetalert2";
import "../css/perfiles.css";

interface Perfil {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

const opcionesPerfil: Omit<Perfil, "id" | "activo">[] = [
  { nombre: "Administrador", descripcion: "Acceso total al sistema" },
  { nombre: "Docente", descripcion: "Gestión de cursos y calificaciones" },
  { nombre: "Estudiante", descripcion: "Acceso a cursos y materiales" },
  { nombre: "Secretaría", descripcion: "Gestión de matrículas y registros" },
];

const Perfiles: React.FC = () => {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [nuevoPerfil, setNuevoPerfil] = useState<Omit<Perfil, "id" | "activo">>({
    nombre: "",
    descripcion: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [perfilEditandoId, setPerfilEditandoId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const seleccionado = opcionesPerfil.find(p => p.nombre === value);
    if (seleccionado) {
      setNuevoPerfil({
        nombre: seleccionado.nombre,
        descripcion: seleccionado.descripcion,
      });
    }
  };

  const handleAgregarPerfil = () => {
    if (!nuevoPerfil.nombre || !nuevoPerfil.descripcion) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    const existe = perfiles.some(p => p.nombre === nuevoPerfil.nombre);
    if (existe && !modoEdicion) {
      Swal.fire("Ya existe un perfil con ese nombre", "", "error");
      return;
    }

    if (modoEdicion && perfilEditandoId !== null) {
      const actualizados = perfiles.map(p =>
        p.id === perfilEditandoId ? { ...p, ...nuevoPerfil } : p
      );
      setPerfiles(actualizados);
      setModoEdicion(false);
      setPerfilEditandoId(null);
    } else {
      const nuevo: Perfil = {
        id: Date.now(),
        ...nuevoPerfil,
        activo: true,
      };
      setPerfiles([...perfiles, nuevo]);
    }

    setNuevoPerfil({ nombre: "", descripcion: "" });
  };

  const handleEditar = (id: number) => {
    const perfil = perfiles.find(p => p.id === id);
    if (!perfil) return;
    setNuevoPerfil({ nombre: perfil.nombre, descripcion: perfil.descripcion });
    setModoEdicion(true);
    setPerfilEditandoId(id);
  };

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: "¿Eliminar este perfil?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setPerfiles(perfiles.filter(p => p.id !== id));
        Swal.fire("Eliminado", "El perfil ha sido eliminado", "success");
      }
    });
  };

  return (
    <div className="perfiles-container">
      <h2 className="perfiles-title">Gestión de Perfiles</h2>
      <hr className="perfiles-divider" />

      {/* FORMULARIO */}
      <div className="perfiles-formulario">
        <h3 className="form-titulo">{modoEdicion ? "Editar perfil" : "Registrar nuevo perfil"}</h3>
        <div className="form-grid">
          <div className="form-grupo">
            <label>Nombre del perfil:</label>
            <select name="nombre" value={nuevoPerfil.nombre} onChange={handleChange}>
              <option value="">Selecciona un perfil</option>
              {opcionesPerfil.map((op, idx) => (
                <option key={idx} value={op.nombre}>
                  {op.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-grupo">
            <label>Descripción:</label>
            <textarea name="descripcion" value={nuevoPerfil.descripcion} readOnly />
          </div>
        </div>
        <div className="form-btn-wrapper">
          <button onClick={handleAgregarPerfil} className="btn-agregar">
            {modoEdicion ? "Guardar cambios" : "Registrar"}
          </button>
        </div>
      </div>

      {/* TABLA */}
      <table className="perfiles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perfiles.map((perfil) => (
            <tr key={perfil.id}>
              <td>{perfil.id}</td>
              <td>{perfil.nombre}</td>
              <td>{perfil.descripcion}</td>
              <td>
                <button onClick={() => handleEditar(perfil.id)} className="btn-editar">✏️</button>
                <button onClick={() => handleEliminar(perfil.id)} className="btn-eliminar">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Perfiles;
