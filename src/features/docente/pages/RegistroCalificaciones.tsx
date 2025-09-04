import React, { useState, useEffect } from "react";
import "../css/registro-calificaciones.css";
import { BookmarkIcon, CheckIcon, ClockIcon, DocumentArrowDownIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const cursos = [
  "Epidemiología - A",
  "Epidemiología - B",
  "Química - A",
  "Biología - A",
];

const fechaLimite = "2025-09-30T20:00";
const rol = "docente";

const alumnosInicial = [
  {
    id: 1,
    nombre: "Colapinto Franco Alejandro",
    notas: { T1: 15, T2: 15, T3: 15, T4: 15, T5: 0, EMC: 15, EFC: 0, ES: 0 },
  },
  {
    id: 2,
    nombre: "Escudo de Roble Thorin",
    notas: { T1: 10, T2: 10, T3: 10, T4: 10, T5: 0, EMC: 10, EFC: 0, ES: 0 },
  },
  {
    id: 3,
    nombre: "Hamilton Lewis Carl",
    notas: { T1: 13, T2: 13, T3: 13, T4: 13, T5: 0, EMC: 13, EFC: 0, ES: 0 },
  },
  {
    id: 4,
    nombre: "Russell George William",
    notas: { T1: 10, T2: 10, T3: 10, T4: 10, T5: 0, EMC: 9, EFC: 0, ES: 0 },
  },
  {
    id: 5,
    nombre: "Senna da Silva Ayrton",
    notas: { T1: 18, T2: 18, T3: 18, T4: 18, T5: 0, EMC: 18, EFC: 0, ES: 0 },
  },
];

const notasEditables = ["T3", "T4"];

function calcularEstado(notas: Record<string, number>) {
  const PT = (notas.T1 + notas.T2 + notas.T3 + notas.T4 + notas.T5) / 5;
  const promedioFinal = Math.round((PT + notas.EMC + notas.EFC) / 3);
  if (promedioFinal >= 12) return { label: "Aprobado", color: "green" };
  if (promedioFinal === 11) return { label: "Aprobado", color: "yellow" };
  return { label: "Desaprobado", color: "red" };
}

function esEditable(fechaLimite: string) {
  const ahora = new Date();
  const limite = new Date(fechaLimite);
  return ahora <= limite;
}

const RegistroCalificaciones: React.FC = () => {
  const [curso, setCurso] = useState(cursos[0]);
  const [alumnos, setAlumnos] = useState(alumnosInicial);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState(fechaLimite);

  // Modales de notificación
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  // Importar notas desde archivo
  const handleImportar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotification({ show: true, message: "Archivo importado: " + file.name });
  };

  // Guardar notas
  const handleSalvar = () => {
    setNotification({ show: true, message: "Notas guardadas correctamente." });
  };

  // Confirmar notas
  const handleConfirmar = () => {
    setNotification({ show: true, message: "Notas confirmadas y enviadas al sistema." });
  };

  // Modal de aplazamiento
  const handleSolicitarAplazamiento = () => setShowModal(true);
  const handleEnviarAplazamiento = () => {
    setShowModal(false);
    setShowConfirmModal(true);
  };
  const handleCerrarModal = () => setShowModal(false);
  const handleCerrarConfirmModal = () => setShowConfirmModal(false);

  // Cierre automático del modal de confirmación y notificaciones
  useEffect(() => {
    if (showConfirmModal) {
      const timer = setTimeout(() => setShowConfirmModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmModal]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification({ show: false, message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const editable = esEditable(fecha) && rol === "docente";

  return (
    <div className="registro-calificaciones-container">
      <h2 className="registro-calificaciones-title">REGISTRO DE CALIFICACIONES</h2>
      <hr className="registro-calificaciones-divider" />
      <div className="registro-calificaciones-header">
        <div>
          <label>Curso:</label>
          <select
            className="registro-select"
            value={curso}
            onChange={e => setCurso(e.target.value)}
          >
            {cursos.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Subir Notas Hasta:</label>
          <input
            type="datetime-local"
            className="registro-fecha"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            disabled
          />
        </div>
        <div>
          <label htmlFor="importar-notas" style={{ display: "none" }}>Importar Notas</label>
          <input
            id="importar-notas"
            type="file"
            accept=".csv,.xlsx"
            style={{ display: "none" }}
            onChange={handleImportar}
          />
          <button
            className="registro-importar-btn"
            onClick={() => document.getElementById("importar-notas")?.click()}
          >
            <DocumentArrowDownIcon style={{ position: "relative",width: 20, height: 20, marginRight: 8 }} />
            Importar Notas
          </button>
        </div>
      </div>
      <table className="registro-calificaciones-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Apellidos y Nombres</th>
            <th>T1</th>
            <th>T2</th>
            <th>T3</th>
            <th>T4</th>
            <th>T5</th>
            <th>EMC</th>
            <th>EFC</th>
            <th>ES</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((al, idx) => {
            const notas = al.notas;
            const estado = calcularEstado(notas);
            return (
              <tr key={al.id}>
                <td>{idx + 1}</td>
                <td>{al.nombre}</td>
                {["T1", "T2", "T3", "T4", "T5", "EMC", "EFC", "ES"].map((campo, i) => (
                  <td key={campo}>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={notas[campo as keyof typeof notas]}
                      onChange={e => {
                        const valor = Math.max(0, Math.min(20, Number(e.target.value)));
                        setAlumnos(alumnos =>
                          alumnos.map(a =>
                            a.id === al.id
                              ? { ...a, notas: { ...a.notas, [campo]: valor } }
                              : a
                          )
                        );
                      }}
                      disabled={
                        !editable ||
                        !notasEditables.includes(campo)
                      }
                      className="registro-nota-input"
                    />
                  </td>
                ))}
                <td>
                  <span
                    className={`registro-estado registro-estado-${estado.color}`}
                  >
                    {estado.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="registro-calificaciones-actions">
        <button className="registro-salvar-btn" onClick={handleSalvar} disabled={!editable}>
          <BookmarkIcon style={{ position: "relative",width: 20, height: 20, marginRight: 8 }} />
          Salvar
        </button>
        <button className="registro-confirmar-btn" onClick={handleConfirmar} disabled={!editable}>
          <CheckIcon style={{ position: "relative",width: 20, height: 20, marginRight: 8 }} />
          Confirmar Notas
        </button>
        <button className="registro-aplazamiento-btn" onClick={handleSolicitarAplazamiento}>
          <ClockIcon style={{ position: "relative",width: 20, height: 20, marginRight: 8 }} />
          Solicitar Aplazamiento
        </button>
      </div>

      {/* Modal de Solicitud de Aplazamiento */}
      {showModal && (
        <div className="registro-modal-overlay" onClick={handleCerrarModal}>
          <div className="registro-modal" onClick={e => e.stopPropagation()}>
            <button className="registro-modal-close" onClick={handleCerrarModal}>✖</button>
            <h3 className="registro-modal-title">Solicitud de aplazamiento para subir notas</h3>
            <label htmlFor="motivo-aplazamiento" className="registro-modal-label">Motivo</label>
            <div className="registro-modal-input-container">
              <textarea
                id="motivo-aplazamiento"
                className="registro-modal-textarea"
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                placeholder="Escribe el motivo..."
                rows={4}
              />
            </div>
            <button
              className="registro-modal-btn"
              onClick={handleEnviarAplazamiento}
              disabled={!motivo.trim()}
            >
              <PaperAirplaneIcon style={{ position: "relative",width: 20, height: 20, marginRight: 8 }} />
              Enviar Solicitud
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de solicitud */}
      {showConfirmModal && (
        <div className="registro-modal-overlay" onClick={handleCerrarConfirmModal}>
          <div className="registro-modal" onClick={e => e.stopPropagation()}>
            <button className="registro-modal-close" onClick={handleCerrarConfirmModal}>✖</button>
            <h3 className="registro-modal-title">Solicitud enviada</h3>
            <div className="registro-modal-mensaje">Tu solicitud de aplazamiento ha sido enviada correctamente.</div>
          </div>
        </div>
      )}

      {/* Modal de notificación para salvar/confirmar/importar */}
      {notification.show && (
        <div className="registro-modal-overlay" onClick={() => setNotification({ show: false, message: "" })}>
          <div className="registro-modal" onClick={e => e.stopPropagation()}>
            <button className="registro-modal-close" onClick={() => setNotification({ show: false, message: "" })}>✖</button>
            <h3 className="registro-modal-title">Notificación</h3>
            <div className="registro-modal-mensaje">{notification.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroCalificaciones;