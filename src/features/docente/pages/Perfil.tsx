import { useState } from "react";
import "../css/perfil.css";

function Perfil() {
  const [celular, setCelular] = useState("987654321");
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
    // Aquí enviar el dato al backend
  };

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">PERFIL</h2>
      <hr className="perfil-divider" />
      <form className="perfil-form" onSubmit={e => { e.preventDefault(); handleGuardar(); }}>
        <div className="perfil-grid">
          <div className="perfil-field">
            <label>Nombres</label>
            <input type="text" value="Marie" disabled />
          </div>
          <div className="perfil-field">
            <label>Apellido Paterno</label>
            <input type="text" value="Curie" disabled />
          </div>
          <div className="perfil-field">
            <label>Apellido Materno</label>
            <input type="text" value="Curie" disabled />
          </div>
          <div className="perfil-field">
            <label>DNI</label>
            <input type="text" value="87654321" disabled />
          </div>
          <div className="perfil-field">
            <label>Facultad</label>
            <input type="text" value="Educación y Humanidades" disabled />
          </div>
          <div className="perfil-field">
            <label>Correo Institucional</label>
            <input type="text" value="mariecurie@udh.edu.pe" disabled />
          </div>
          <div className="perfil-field">
            <label>Sede</label>
            <input type="text" value="Tingo Maria" disabled />
          </div>
          <div className="perfil-field">
            <label>Número de Celular</label>
            <input
              type="text"
              value={celular}
              onChange={e => setCelular(e.target.value)}
              maxLength={9}
            />
          </div>
        </div>
        <button type="submit" className="perfil-btn">
          Guardar cambios
        </button>
        {guardado && <div className="perfil-msg">¡Cambios guardados!</div>}
      </form>
    </div>
  );
}

export default Perfil;