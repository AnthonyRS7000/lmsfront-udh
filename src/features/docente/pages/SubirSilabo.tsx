import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { cursos } from "./Cursos";
import "../css/subir-silabo.css"; 
import { DocumentArrowUpIcon, EyeIcon } from "@heroicons/react/24/outline";

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
  const [archivoNombre, setArchivoNombre] = useState("Epidemiologia_silabus.pdf");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoNombre(e.target.files[0].name);
      // Aquí puedes manejar el archivo seleccionado (subirlo, etc.)
    }
  };

  const handleSubirClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="subir-silabo-container">
        <h2 className="title">CURSOS ASIGNADOS</h2>
        <hr className="divider" />
        <h2 className="subir-silabo-title">
            {curso ? `${curso.nombre} - ${curso.grupo}` : "Curso no encontrado"}
        </h2>
        <div className="subir-silabo-header">
            <div>
            <div className="subir-silabo-label">Sílabo:</div>
            <input
                type="text"
                value="Epidemiologia_silabus.pdf"
                readOnly
                className="subir-silabo-input"
            />
            <button className="subir-silabo-btn">
                <EyeIcon style={{ width: 20, height: 20, marginRight: 8 }} /> 
                Ver Sílabo
            </button>
            </div>
            <button className="subir-silabo-btn" onClick={handleSubirClick}>
                <DocumentArrowUpIcon style={{ width: 20, height: 20, marginRight: 8 }} />
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