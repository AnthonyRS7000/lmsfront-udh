import React from "react";
import "../css/roles.css";

const roles = [
  { id: 1, nombre: "Super Admin", permisos: "Todos los permisos" },
  { id: 2, nombre: "Administrador", permisos: "Gestión de usuarios y perfiles" },
  { id: 3, nombre: "Docente", permisos: "Gestión de cursos y calificaciones" },
  { id: 4, nombre: "Estudiante", permisos: "Acceso a cursos y materiales" },
  { id: 5, nombre: "Secretaría", permisos: "Gestión de matrículas y registros" },
];

const Roles: React.FC = () => {
  return (
    <div className="roles-container">
      <h2 className="roles-title">Gestión de Roles</h2>
      <hr className="roles-divider" />
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
              <td>{rol.permisos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;