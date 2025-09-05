import React, { useState } from "react";
import "../css/usuarios.css";

const roles = ["Administrador", "Docente", "Estudiante", "Secretaría"];
const estados = ["Activo", "Inactivo"];

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: "Armando Rojas", email: "armando@udh.edu.pe", rol: "Administrador", estado: "Activo" },
    { id: 2, nombre: "María García", email: "maria@udh.edu.pe", rol: "Docente", estado: "Activo" },
    { id: 3, nombre: "Luis Pérez", email: "luis@udh.edu.pe", rol: "Estudiante", estado: "Inactivo" },
    { id: 4, nombre: "Ana Torres", email: "ana@udh.edu.pe", rol: "Secretaría", estado: "Activo" },
  ]);

  const [nuevoUsuario, setNuevoUsuario] = useState<Omit<Usuario, "id">>({
    nombre: "",
    email: "",
    rol: "Estudiante",
    estado: "Activo",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleAgregarUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.email) return alert("Completa todos los campos.");
    const nuevo: Usuario = {
      id: usuarios.length + 1,
      ...nuevoUsuario,
    };
    setUsuarios([...usuarios, nuevo]);
    setNuevoUsuario({ nombre: "", email: "", rol: "Estudiante", estado: "Activo" });
  };

  return (
    <div className="usuarios-container">
      <h2 className="usuarios-title">Gestión de Usuarios</h2>
      <hr className="usuarios-divider" />

      {/* 📋 FORMULARIO DE REGISTRO */}
      <div className="usuarios-formulario">
  <h3 className="form-titulo">Registrar nuevo usuario</h3>
  <div className="form-grid">
    <div className="form-grupo">
      <label>Nombre completo:</label>
      <input type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleChange} />
    </div>
    <div className="form-grupo">
      <label>Email institucional:</label>
      <input type="email" name="email" value={nuevoUsuario.email} onChange={handleChange} />
    </div>
    <div className="form-grupo">
      <label>Rol:</label>
      <select name="rol" value={nuevoUsuario.rol} onChange={handleChange}>
        {roles.map((rol) => <option key={rol} value={rol}>{rol}</option>)}
      </select>
    </div>
    <div className="form-grupo">
      <label>Estado:</label>
      <select name="estado" value={nuevoUsuario.estado} onChange={handleChange}>
        {estados.map((e) => <option key={e} value={e}>{e}</option>)}
      </select>
    </div>
  </div>
  <div className="form-btn-wrapper">
    <button onClick={handleAgregarUsuario} className="btn-agregar">Registrar</button>
  </div>
</div>


      {/* 📊 TABLA DE USUARIOS */}
      <div className="usuarios-table-wrapper">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>
                  <span className={`usuario-estado ${usuario.estado === "Activo" ? "activo" : "inactivo"}`}>
                    {usuario.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
