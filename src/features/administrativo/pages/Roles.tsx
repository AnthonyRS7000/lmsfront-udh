import React, { useState } from "react";
import Swal from "sweetalert2";
import "../css/roles.css";

interface Permiso {
  id: number;
  nombre: string; // e.g. "Ver usuarios", "Editar cursos"
}

interface Rol {
  id: number;
  nombre: string;
  permisos: Permiso[];
}

const permisosDisponibles: Permiso[] = [
  { id: 1, nombre: "Ver usuarios" },
  { id: 2, nombre: "Editar usuarios" },
  { id: 3, nombre: "Eliminar usuarios" },
  { id: 4, nombre: "Gestionar cursos" },
  { id: 5, nombre: "Acceder a reportes" },
  { id: 6, nombre: "Matrícula de estudiantes" },
];

const getColor = (nombre: string) => {
  if (nombre.includes("usuarios")) return "#facc15";
  if (nombre.includes("cursos")) return "#34d399";
  if (nombre.includes("reportes")) return "#60a5fa";
  if (nombre.includes("Matrícula")) return "#c084fc";
  return "#e5e7eb";
};

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [nuevoRol, setNuevoRol] = useState<Omit<Rol, "id">>({
    nombre: "",
    permisos: [],
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [rolEditandoId, setRolEditandoId] = useState<number | null>(null);

  const togglePermiso = (permiso: Permiso) => {
    const yaTiene = nuevoRol.permisos.some((p) => p.id === permiso.id);
    const actualizados = yaTiene
      ? nuevoRol.permisos.filter((p) => p.id !== permiso.id)
      : [...nuevoRol.permisos, permiso];

    setNuevoRol({ ...nuevoRol, permisos: actualizados });
  };

  const handleAgregarOActualizarRol = () => {
    if (!nuevoRol.nombre || nuevoRol.permisos.length === 0) {
      Swal.fire("Faltan datos", "Debes poner nombre y al menos un permiso", "warning");
      return;
    }

    if (modoEdicion && rolEditandoId !== null) {
      const actualizados = roles.map((rol) =>
        rol.id === rolEditandoId ? { id: rol.id, ...nuevoRol } : rol
      );
      setRoles(actualizados);
      Swal.fire("Actualizado", "El rol fue actualizado correctamente", "success");
    } else {
      const nuevo: Rol = {
        id: roles.length + 1,
        ...nuevoRol,
      };
      setRoles([...roles, nuevo]);
      Swal.fire("Registrado", "Rol agregado correctamente", "success");
    }

    // Reset
    setNuevoRol({ nombre: "", permisos: [] });
    setModoEdicion(false);
    setRolEditandoId(null);
  };

  const handleEditar = (rol: Rol) => {
    setNuevoRol({ nombre: rol.nombre, permisos: rol.permisos });
    setModoEdicion(true);
    setRolEditandoId(rol.id);
  };

  const handleEliminar = (rolId: number) => {
    Swal.fire({
      title: "¿Eliminar rol?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setRoles(roles.filter((rol) => rol.id !== rolId));
        Swal.fire("Eliminado", "El rol ha sido eliminado", "success");
      }
    });
  };


 return (
    <div className="roles-container">
      <h2 className="roles-title">Gestión de Roles</h2>
      <hr className="roles-divider" />

      {/* FORMULARIO DE NUEVO ROL */}
      <div className="roles-formulario">
        <h3 className="form-titulo">Registrar nuevo rol</h3>
        <div className="form-grupo">
          <label>Nombre del rol:</label>
          <input
            type="text"
            value={nuevoRol.nombre}
            onChange={(e) => setNuevoRol({ ...nuevoRol, nombre: e.target.value })}
          />
        </div>

        <div className="form-grupo">
          <label>Permisos:</label>
          <div className="checkbox-grid">
            {permisosDisponibles.map((permiso) => (
              <label key={permiso.id}>
                <input
                  type="checkbox"
                  checked={nuevoRol.permisos.some((p) => p.id === permiso.id)}
                  onChange={() => togglePermiso(permiso)}
                />
                {permiso.nombre}
              </label>
            ))}
          </div>
        </div>

        <div className="form-btn-wrapper">
          <button onClick={handleAgregarOActualizarRol} className="btn-agregar">
            {modoEdicion ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </div>


      {/* TABLA DE ROLES */}
      <table className="roles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Permisos</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id}>
              <td>{rol.id}</td>
              <td>{rol.nombre}</td>
              <td>
                {rol.permisos.map((permiso) => (
                  <span
                    key={permiso.id}
                    className="permiso-tag"
                    style={{
                      backgroundColor: getColor(permiso.nombre),
                      color: "#000",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      marginRight: "4px",
                      display: "inline-block",
                    }}
                  >
                    {permiso.nombre}
                  </span>
                ))}
              </td>
              <td>
                <button className="btn-editar" onClick={() => handleEditar(rol)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => handleEliminar(rol.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;