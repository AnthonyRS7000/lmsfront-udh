import React, { useState } from 'react';
import '../css/CarnetSunedu.css';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const CarnetSunedu: React.FC = () => {
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 500) {
      setDescription(event.target.value);
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="carnet-container">
      <h1 className="carnet-titulo">Carnet Universitario 2025-2 <br></br>(SUNEDU)</h1>
      <div className="carnet-card">
        <div className="carnet-form-group">
          <label htmlFor="description" className="carnet-label">Descripción:</label>
          <textarea
            id="description"
            className="carnet-input"
            value={description}
            onChange={handleInputChange}
            placeholder="Escriba una pequeña descripción del motivo por el que está solicitando el trámite. (Máximo 500 caracteres)"
          ></textarea>
        </div>
        <div className="carnet-cost">
          <label className="carnet-label">Costo del trámite:</label>
          <p>S/. 27.00</p>
        </div>
        <p className="carnet-warning">SR. ALUMNO RECUERDE QUE SE TRAMITARÁ EL CARNET CON SU FOTOGRAFÍA ACTUAL.</p>
        <div className="carnet-button-container">
          <button className="carnet-submit-button" onClick={handleSubmit}>
            <CheckCircleIcon className="carnet-icon" />
            Solicitar
          </button>
        </div>

        {showModal && (
          <div className="carnet-modal">
            <div className="carnet-modal-content">
              <p>Trámite generado</p>
              <button onClick={closeModal} className="carnet-modal-close-button">Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarnetSunedu;