import React from "react";
import "../css/monitoreo.css";
import { ChartBarIcon, ServerIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const stats = [
  {
    label: "Incidentes reportados",
    value: 3,
    icon: <ExclamationTriangleIcon className="monitoreo-icon icon-warning" />,
    color: "warning"
  },
  {
    label: "Sistemas activos",
    value: 12,
    icon: <ServerIcon className="monitoreo-icon icon-success" />,
    color: "success"
  },
  {
    label: "Reportes generados",
    value: 27,
    icon: <ChartBarIcon className="monitoreo-icon icon-info" />,
    color: "info"
  }
];

const logs = [
  { fecha: "2025-09-04 10:15", evento: "Usuario admin actualizó roles", estado: "Éxito" },
  { fecha: "2025-09-04 09:50", evento: "Fallo de conexión a servidor secundario", estado: "Error" },
  { fecha: "2025-09-03 18:22", evento: "Nuevo usuario registrado", estado: "Éxito" },
];

const Monitoreo: React.FC = () => {
  return (
    <div className="monitoreo-container">
      <h2 className="monitoreo-title">Monitoreo del Sistema</h2>
      <hr className="monitoreo-divider" />

      <div className="monitoreo-stats">
        {stats.map((stat, idx) => (
          <div key={idx} className={`monitoreo-card ${stat.color}`}>
            <div className="monitoreo-card-icon">{stat.icon}</div>
            <div className="monitoreo-card-info">
              <div className="monitoreo-card-value">{stat.value}</div>
              <div className="monitoreo-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="monitoreo-logs">
        <h3 className="monitoreo-logs-title">Logs recientes</h3>
        <table className="monitoreo-logs-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Evento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx}>
                <td>{log.fecha}</td>
                <td>{log.evento}</td>
                <td>
                  <span className={`monitoreo-log-status ${log.estado === "Éxito" ? "success" : "error"}`}>
                    {log.estado}
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

export default Monitoreo;