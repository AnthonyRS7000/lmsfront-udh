import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "../css/crear-evaluaciones.css"; // Asegúrate de importar el CSS

const grupos = ["A", "B", "C", "D", "E", "F"];
const tiposEvaluacion = ["Práctica", "Examen", "Quiz", "Otro"];

const CrearEvaluaciones = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el curso desde la navegación (VerCursoGestionCursos debe enviarlo por state)
  const curso = location.state?.curso || "Curso";

  const [titulo, setTitulo] = useState("");
  const [grupo, setGrupo] = useState(grupos[0]);
  const [tipo, setTipo] = useState(tiposEvaluacion[0]);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [archivos, setArchivos] = useState<any[]>([]);
  const [nuevoLink, setNuevoLink] = useState("");

  // Añadir archivo local
  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setArchivos([
      ...archivos,
      ...files.map((f) => ({
        tipo: "archivo",
        nombre: f.name,
        url: URL.createObjectURL(f),
        icono: "📄",
        desc: f.type.includes("pdf")
          ? "PDF"
          : f.type.includes("presentation")
          ? "PowerPoint"
          : "Archivo",
      })),
    ]);
    e.target.value = "";
  };

  // Añadir link (por ejemplo, Google Forms)
  const handleAddLink = () => {
    if (nuevoLink.trim()) {
      setArchivos([
        ...archivos,
        {
          tipo: "link",
          nombre: nuevoLink,
          url: nuevoLink,
          icono: (
            <img
              src="https://ssl.gstatic.com/docs/doclist/images/icon_11_forms_list_1x.png"
              alt="Google Forms"
              style={{ width: 24, height: 24, verticalAlign: "middle" }}
            />
          ),
          desc: "Google Forms",
        },
      ]);
      setNuevoLink("");
    }
  };

  // Eliminar archivo/link
  const eliminarArchivo = (i: number) => {
    setArchivos(archivos.filter((_, idx) => idx !== i));
  };

  // Crear evaluación
  const handleCrear = () => {
    if (
      !titulo.trim() ||
      !grupo.trim() ||
      !tipo.trim() ||
      !horaInicio ||
      !horaFin
    )
      return;

    // Simulación: guardar en localStorage o enviar a backend
    const nuevaEvaluacion = {
      id: Date.now(),
      titulo,
      grupo,
      tipo,
      horaInicio,
      horaFin,
      curso,
      archivos,
      fechaCreacion: new Date().toISOString(),
    };

    // Guardar en localStorage para simular persistencia
    const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones") || "[]");
    evaluaciones.push(nuevaEvaluacion);
    localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));

    // Navegar a VerCursoGestionCursos y pasar el curso por state
    navigate(-1, { state: { nuevaEvaluacion } });
  };

  return (
    <div className="container">
      <h2 className="ceva-title">NUEVA EVALUACION</h2>
      <hr className="ceva-divider" />
      <div className="ceva-main">
        <div className="ceva-modal">
          <div className="ceva-form-grid">
            <div>
              <label>Título:</label>
              <input
                className="ceva-input"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Práctica N°1"
              />
            </div>
            <div>
              <label>Grupo:</label>
              <select
                className="ceva-input"
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
              >
                {grupos.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Tipo de Evaluación:</label>
              <select
                className="ceva-input"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                {tiposEvaluacion.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Hora de Inicio:</label>
              <div className="ceva-input-time">
                <input
                  className="ceva-input"
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />
                <span role="img" aria-label="clock">
                  🕒
                </span>
              </div>
            </div>
            <div>
              <label>Hora Final:</label>
              <div className="ceva-input-time">
                <input
                  className="ceva-input"
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                />
                <span role="img" aria-label="clock">
                  🕒
                </span>
              </div>
            </div>
            <div>
              <label>Curso:</label>
              <input
                className="ceva-input"
                value={curso}
                disabled
              />
            </div>
          </div>
          <div className="ceva-archivos">
            <label>Archivo:</label>
            <input
              type="file"
              multiple
              className="ceva-input-file"
              onChange={handleArchivo}
            />
            <div className="ceva-link-row">
              <input
                type="text"
                className="ceva-input ceva-input-link"
                placeholder="Agregar link (ej: Google Forms)"
                value={nuevoLink}
                onChange={(e) => setNuevoLink(e.target.value)}
              />
              <button
                type="button"
                className="ceva-btn-add"
                onClick={handleAddLink}
              >
                +
              </button>
            </div>
          </div>
          {/* Listado de archivos/links */}
          {archivos.length > 0 && (
            <div className="ceva-archivos-lista">
              {archivos.map((archivo, i) => (
                <div className="ceva-archivo-card" key={i}>
                  <span className="ceva-archivo-icono">
                    {archivo.icono || <PaperClipIcon style={{ width: 24, height: 24 }} />}
                  </span>
                  <div className="ceva-archivo-info">
                    <a
                      href={archivo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ceva-archivo-nombre"
                    >
                      {archivo.nombre}
                    </a>
                    <div className="ceva-archivo-desc">{archivo.desc}</div>
                  </div>
                  <button
                    className="ceva-archivo-eliminar"
                    onClick={() => eliminarArchivo(i)}
                  >
                    <XMarkIcon style={{ width: 22, height: 22 }} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="ceva-modal-actions">
            <button
              className="ceva-btn-cancelar"
              onClick={() => navigate(-1)}
            >
              <span style={{ fontSize: 20 }}>✖</span> Cancelar
            </button>
            <button
              className="ceva-btn-crear"
              onClick={handleCrear}
            >
              <span style={{ fontSize: 20 }}>✔</span> Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEvaluaciones;