import { useState, useRef } from "react";
import "../css/gestion-horarios.css";
import { FolderOpenIcon, XMarkIcon, ClockIcon, ChevronDownIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const DIAS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const TIPOS = ["Tutorias", "Clases"];
const HORAS = [
  "06:30", "07:15", "08:00", "08:45", "09:30", "10:15", "11:00", "11:45", "12:30", "13:15",
  "14:00", "14:45", "15:30", "16:15", "17:00", "17:45", "18:30", "19:15", "20:00", "20:45"
];

function GestionHorarios() {
  const [horaInicio, setHoraInicio] = useState("15:30");
  const [horaFin, setHoraFin] = useState("16:15");
  const [tipoHorario, setTipoHorario] = useState("Tutorias");
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>(["Lunes"]);
  const [horarios, setHorarios] = useState<any[]>([
    { id: 1, dia: "Martes", inicio: "08:00", fin: "09:30", tipo: "Tutorias", color: "#ECC138" },
    { id: 2, dia: "Lunes", inicio: "09:30", fin: "11:00", tipo: "Clases", color: "#4CAF91" },
    { id: 3, dia: "Viernes", inicio: "17:00", fin: "18:30", tipo: "Clases", color: "#4CAF91" },
    { id: 4, dia: "Martes", inicio: "17:00", fin: "18:30", tipo: "Clases", color: "#4CAF91" },
    { id: 5, dia: "Miercoles", inicio: "18:30", fin: "20:00", tipo: "Tutorias", color: "#ECC138" },
    { id: 6, dia: "Viernes", inicio: "20:00", fin: "21:30", tipo: "Tutorias", color: "#ECC138" },
  ]);
  const [editId, setEditId] = useState<number | null>(null);
  const [modal, setModal] = useState<{ show: boolean, title: string, message: string }>(
    { show: false, title: "", message: "" }
  );
  const modalRef = useRef<HTMLDivElement>(null);

  // Colores por tipo
  const tipoColor: any = {
    "Tutorias": "#ECC138",
    "Clases": "#4CAF91",
  };

  // Validar choque de horarios (corregido para solo comparar el mismo día)
  const hayChoque = () => {
    for (const dia of diasSeleccionados) {
      for (const h of horarios) {
        if (h.dia === dia && h.id !== editId) {
          if (
            (horaInicio < h.fin && horaFin > h.inicio)
          ) {
            return { ...h, dia };
          }
        }
      }
    }
    return null;
  };

  // Guardar horario
  const handleGuardar = () => {
    const choque = hayChoque();
    if (choque) {
      setModal({
        show: true,
        title: "¡ Choque de horario !",
        message: `¡Choque de horario! Ya existe "${choque.tipo}" en ${choque.dia} de ${choque.inicio} a ${choque.fin}.`
      });
      return;
    }
    const nuevos = diasSeleccionados.map(dia => ({
      id: editId || Date.now() + Math.random(),
      dia,
      inicio: horaInicio,
      fin: horaFin,
      tipo: tipoHorario,
      color: tipoColor[tipoHorario]
    }));
    if (editId) {
      setHorarios(horarios
        .filter(h => !(h.id === editId && diasSeleccionados.includes(h.dia)))
        .concat(nuevos));
      setEditId(null);
    } else {
      setHorarios([...horarios, ...nuevos]);
    }
    setModal({ show: true, title: "Guardado", message: "Horario guardado correctamente." });
  };

  // Editar horario
  const handleEditar = (h: any) => {
    setHoraInicio(h.inicio);
    setHoraFin(h.fin);
    setTipoHorario(h.tipo);
    setDiasSeleccionados([h.dia]);
    setEditId(h.id);
  };

  // Eliminar horario
  const handleEliminar = (id: number) => {
    setHorarios(horarios.filter(h => h.id !== id));
    setEditId(null);
  };

  // Confirmar todos los horarios
  const handleConfirmar = () => {
    setModal({ show: true, title: "Confirmación", message: "¡Horarios confirmados y guardados!" });
    // Aquí puedes enviar los horarios al backend
  };

  // Cerrar modal
  const closeModal = () => setModal({ show: false, title: "", message: "" });

  // Cerrar modal al hacer click fuera
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) closeModal();
  };

  // Renderizar la tabla de horarios estilo Google Calendar
  const renderTabla = () => (
    <div className="calendar-wrapper">
      <table className="horario-table calendar-table">
        <thead>
          <tr>
            <th className="calendar-hour-header">Hora</th>
            {DIAS.map(dia => <th key={dia} className="calendar-day-header">{dia}</th>)}
          </tr>
        </thead>
        <tbody>
          {HORAS.map((hora, i) => (
            <tr key={hora}>
              <td className="calendar-hour-cell">{hora} - {HORAS[i + 1] || "21:30"}</td>
              {DIAS.map(dia => {
                // Buscar si hay un horario en este bloque
                const h = horarios.find(
                  x => x.dia === dia &&
                    hora >= x.inicio &&
                    hora < x.fin
                );
                return (
                  <td
                    key={dia + hora}
                    className={`calendar-cell${h ? " calendar-event" : ""}`}
                    style={{
                      background: h ? h.color : undefined,
                      cursor: h ? "pointer" : "default",
                      color: h ? "#222" : undefined,
                      fontWeight: h ? 500 : undefined,
                      border: h ? "2px solid #fff" : undefined,
                      position: "relative",
                      width: "110px",
                      minWidth: "110px",
                      maxWidth: "110px",
                      verticalAlign: "middle",
                      wordBreak: "break-word"
                    }}
                    onClick={() => h && handleEditar(h)}
                  >
                    {h && (
                      <div className="calendar-event-content">
                        <span>{h.tipo}</span>
                        <button
                          type="button"
                          className="horario-eliminar-btn"
                          onClick={e => { e.stopPropagation(); handleEliminar(h.id); }}
                          title="Eliminar"
                        >
                          <XMarkIcon style={{ width: 20, height: 20  }} />
                        </button>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="gestion-horarios-container">
      <h2 className="gestion-horarios-title">GESTION DE HORARIOS</h2>
      <hr className="gestion-horarios-divider" />
      <h3 className="gestion-horarios-subtitle">HORARIOS DISPONIBLES</h3>
      <form className="gestion-horarios-form" onSubmit={e => { e.preventDefault(); handleGuardar(); }}>
        <div className="gestion-horarios-row">
          <div className="gestion-horarios-field hora-field">
            <label>Hora de Inicio:</label>
            <div className="input-icon-wrapper">
              <select
                value={horaInicio}
                onChange={e => setHoraInicio(e.target.value)}
                className="custom-select"
                required
              >
                {HORAS.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <ClockIcon className="input-icon" />
            </div>
          </div>
          <div className="gestion-horarios-field hora-field">
            <label>Hora Final:</label>
            <div className="input-icon-wrapper">
              <select
                value={horaFin}
                onChange={e => setHoraFin(e.target.value)}
                className="custom-select"
                required
              >
                {HORAS.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
                <option value="21:30">21:30</option>
              </select>
              <ClockIcon className="input-icon" />
            </div>
          </div>
          <div className="gestion-horarios-field tipo-field">
            <label>Tipo Horario:</label>
            <div className="input-icon-wrapper">
              <select
                value={tipoHorario}
                onChange={e => setTipoHorario(e.target.value)}
                className="custom-select"
              >
                {TIPOS.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              <ChevronDownIcon className="input-icon" />
            </div>
          </div>
        </div>
        <div className="gestion-horarios-dias">
          <label style={{ marginRight: "12px" }}>Seleccione los Días:</label>
          <div className="gestion-horarios-dias-list">
            {DIAS.map(dia => (
              <button
                key={dia}
                type="button"
                className={`gestion-horarios-dia-btn${diasSeleccionados.includes(dia) ? " selected" : ""}`}
                onClick={() =>
                  setDiasSeleccionados(diasSeleccionados.includes(dia)
                    ? diasSeleccionados.filter(d => d !== dia)
                    : [...diasSeleccionados, dia]
                  )
                }
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
        <div className="center-row">
          <button type="submit" className="gestion-horarios-btn center-btn">
            <FolderOpenIcon style={{ width: 20, height: 20, marginRight: 8 }} />
            Guardar
          </button>
        </div>
      </form>
      <div className="confirmar-top-right">
        <button className="gestion-horarios-confirmar-btn" onClick={handleConfirmar}>
          ✓ Confirmar
        </button>
      </div>
      <div className="gestion-horarios-tabla">
        {renderTabla()}
      </div>
      {/* Modal de notificación */}
      {modal.show && (
        <div className="modal-overlay" ref={modalRef} onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close-btn" onClick={closeModal}>
              <XMarkIcon style={{ width: 22, height: 22 }} />
            </button>
            <h3 className="modal-title">{modal.title}</h3>
            <div className="modal-message">{modal.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionHorarios;