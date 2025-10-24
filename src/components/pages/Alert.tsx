import React from "react";
import "../css/Alert.css";

type AlertType = "info" | "success" | "error";

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export default function Alert({ type = "info", title, message, onClose, actionLabel, onAction }: AlertProps) {
  return (
    <div className="alert-overlay" role="dialog" aria-modal="true">
      <div className={`alert-box alert-${type}`}>
        <div className="alert-header">
          <div className="alert-title">{title || (type === "error" ? "Error" : type === "success" ? "Éxito" : "Información")}</div>
          <button className="alert-close" onClick={onClose} aria-label="Cerrar">&times;</button>
        </div>
        <div className="alert-body">
          <p>{message}</p>
        </div>
        <div className="alert-actions">
          {actionLabel && onAction && (
            <button className="alert-action" onClick={() => { onAction(); onClose(); }}>{actionLabel}</button>
          )}
          <button className="alert-ok" onClick={onClose}>Aceptar</button>
        </div>
      </div>
    </div>
  );
}