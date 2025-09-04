import React, { useState, useRef } from "react";
import "../css/firma-actas.css";
import { DocumentArrowDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const cursos = [
  "Biología - B",
  "Epidemiología - A",
  "Farmacología I - A",
  "Farmacología I - B",
  "Salud Publica II - C",
];

type Acta = {
  id: number;
  curso: string;
  firma: string;
  estado: "Pendiente" | "Firmado";
};

const inicialActas: Acta[] = cursos.map((curso, idx) => ({
  id: idx + 1,
  curso,
  firma: "",
  estado: "Pendiente",
}));

const FirmaActas: React.FC = () => {
  const [actas, setActas] = useState<Acta[]>(inicialActas);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(cursos[0]);
  const [firmaArchivo, setFirmaArchivo] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null); // <-- referencia al input

  // Subir firma
  const handleSubirFirma = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFirmaArchivo(file ? file.name : "");
  };

  // Firmar acta
  const handleFirmar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firmaArchivo) return;
    setActas(actas =>
      actas.map(acta =>
        acta.curso === cursoSeleccionado
          ? { ...acta, firma: firmaArchivo, estado: "Firmado" }
          : acta
      )
    );
    setFirmaArchivo("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // <-- limpia el input para permitir el mismo archivo
    }
  };

  return (
    <div className="firma-actas-container">
      <h2 className="firma-actas-title">FIRMA DE ACTAS</h2>
      <hr className="firma-actas-divider" />

      <form className="firma-actas-form" onSubmit={handleFirmar}>
        <label className="firma-actas-label">Curso:</label>
        <select
          className="firma-actas-select"
          value={cursoSeleccionado}
          onChange={e => setCursoSeleccionado(e.target.value)}
        >
          {cursos.map(curso => (
            <option key={curso} value={curso}>{curso}</option>
          ))}
        </select>
        <label className="firma-actas-label">Firma:</label>
        <div className="firma-actas-upload-row">
          <input
            type="text"
            className="firma-actas-input"
            value={firmaArchivo}
            readOnly
            placeholder="Sin archivo"
          />
          <input
            id="firma-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleSubirFirma}
            ref={fileInputRef}
          />
          <button
            type="button"
            className="firma-actas-upload-btn"
            onClick={() => document.getElementById("firma-upload")?.click()}
          >
            <DocumentArrowDownIcon style={{ position: "relative", width: 20, height: 20, marginRight: 8 }} />
            Subir Firma
          </button>
        </div>
        <button
          type="submit"
          className="firma-actas-firmar-btn"
          disabled={!firmaArchivo}
        >
          <PencilSquareIcon style={{ position: "relative", width: 20, height: 20, marginRight: 8 }} />
          Firmar
        </button>
      </form>

      <table className="firma-actas-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Curso</th>
            <th>Firma</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {actas.map(acta => (
            <tr key={acta.id}>
              <td>{acta.id}</td>
              <td>{acta.curso}</td>
              <td>{acta.firma}</td>
              <td>
                {acta.estado === "Firmado" ? (
                  <span className="firma-actas-estado firmado">
                    ✔ Firmado
                  </span>
                ) : (
                  <span className="firma-actas-estado pendiente">
                    ○ Pendiente
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirmaActas;