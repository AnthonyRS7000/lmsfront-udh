import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { cursos } from "./Cursos";
import "../css/subir-silabo.css";
import { DocumentArrowUpIcon, EyeIcon, FolderOpenIcon } from "@heroicons/react/24/outline";

const estudiantes = [
  { id: 1, nombre: "Colapinto Franco Alejandro" },
  { id: 2, nombre: "Escudo de Roble Thorin" },
  { id: 3, nombre: "Hamilton Lewis Carl" },
  { id: 4, nombre: "Russell George William" },
  { id: 5, nombre: "Senna da Silva Ayrton" },
];

function SubirSilabo() {
  const { cursoId } = useParams();
  const curso = cursos.find(c => c.id === Number(cursoId));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [archivoNombre, setArchivoNombre] = useState("");
  const [archivoPDF, setArchivoPDF] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Seleccionar archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoNombre(e.target.files[0].name);
      setArchivoPDF(e.target.files[0]);
    }
  };

  // Abrir selector de archivo
  const handleSubirClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Ver PDF
  const handleVerSilabo = () => {
    if (!archivoPDF) return;
    const url = URL.createObjectURL(archivoPDF);
    window.open(url, "_blank");
  };

  // Guardar Sílabo (simulado)
  const handleGuardarSilabo = () => {
    if (!archivoPDF) {
      setShowModal(true);
      return;
    }
    // Aquí iría la lógica para subir el archivo al backend
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const handleCerrarModal = () => setShowModal(false);

  return (
    <div className="subir-silabo-container">
      <h2 className="title">CURSOS ASIGNADOS</h2>
      <hr className="divider" />
      <h2 className="subir-silabo-title">
        {curso ? `${curso.nombre} - ${curso.grupo}` : "Curso no encontrado"}
      </h2>
      <div className="subir-silabo-header">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="subir-silabo-label">Sílabo:</div>
          <input
            type="text"
            value={archivoNombre}
            readOnly
            className="subir-silabo-input"
            placeholder="Sin archivo"
          />
          <button className="subir-silabo-btn" onClick={handleSubirClick} title="Seleccionar archivo">
            <DocumentArrowUpIcon style={{ width: 20, height: 20 }} />
          </button>
          <button className="subir-silabo-btn" onClick={handleVerSilabo} title="Ver Sílabo">
            <EyeIcon style={{ width: 20, height: 20 }} />
          </button>
        </div>
        <button className="subir-silabo-btn" onClick={handleGuardarSilabo}>
          <FolderOpenIcon style={{ width: 20, height: 20, marginRight: 8 }} />
          Subir Sílabo
        </button>
        <input
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {/* Modal de notificación */}
      {showModal && (
        <div className="subir-silabo-modal-overlay" onClick={handleCerrarModal}>
          <div className="subir-silabo-modal" onClick={e => e.stopPropagation()}>
            <button className="subir-silabo-modal-close" onClick={handleCerrarModal}>✖</button>
            <h3 className="subir-silabo-modal-title">Notificación</h3>
            <div className="subir-silabo-modal-mensaje">
              {archivoPDF
                ? "Sílabo guardado correctamente."
                : "No se ha seleccionado ningún archivo."}
            </div>
          </div>
        </div>
      )}
      <div className="subir-silabo-estudiantes-label">Estudiantes:</div>
      <table className="subir-silabo-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Apellidos y Nombres</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(est => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubirSilabo;