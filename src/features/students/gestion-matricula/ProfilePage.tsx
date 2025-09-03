import { useState } from 'react';
import './ProfilePage.css';
// Datos del usuario (mismos que tienes en mockUser)
const mockUserProfile = {
  nombres: 'BENYAMIN FELIX',
  apellido_paterno: 'ADRIAN', 
  apellido_materno: 'LAZARO',
  dni: '73246971',
  facultad: 'INGENIERÍA',
  programa_academico: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA',
  codigo: '2019110501',
  correo_institucional: '2019110501@udh.edu.pe',
  sede: 'HUÁNUCO',
  numero_celular: '904501160'
};

const ProfilePage = () => {
  const [phoneNumber, setPhoneNumber] = useState(mockUserProfile.numero_celular);

  const handlePhoneSubmit = () => {
    // Aquí puedes agregar lógica para guardar el número
    console.log('Número actualizado:', phoneNumber);
  };

  return (
    <div className="profile-container">


      {/* Contenido principal del perfil */}
      <div className="profile-content">
        <div className="profile-form-container">
          
          {/* Fila 1: Nombres y Apellido Paterno */}
          <div className="profile-form-row">
            <div className="profile-form-group">
              <label className="profile-form-label">Nombres</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.nombres}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Apellido Paterno</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.apellido_paterno}
                readOnly
              />
            </div>
          </div>

          {/* Fila 2: Apellido Materno y DNI */}
          <div className="profile-form-row">
            <div className="profile-form-group">
              <label className="profile-form-label">Apellido Materno</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.apellido_materno}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">DNI</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.dni}
                readOnly
              />
            </div>
          </div>

          {/* Fila 3: Facultad y Programa Académico */}
          <div className="profile-form-row">
            <div className="profile-form-group">
              <label className="profile-form-label">Facultad</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.facultad}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Programa Académico</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.programa_academico}
                readOnly
              />
            </div>
          </div>

          {/* Fila 4: Código y Correo Institucional */}
          <div className="profile-form-row">
            <div className="profile-form-group">
              <label className="profile-form-label">Código</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.codigo}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Correo Institucional</label>
              <input 
                type="email" 
                className="profile-form-input" 
                value={mockUserProfile.correo_institucional}
                readOnly
              />
            </div>
          </div>

          {/* Fila 5: Sede y Número Celular */}
          <div className="profile-form-row">
            <div className="profile-form-group">
              <label className="profile-form-label">Sede</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={mockUserProfile.sede}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">
                Número Celular <span className="required-asterisk">*</span>
              </label>
              <input 
                type="tel" 
                className="profile-form-input editable" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={handlePhoneSubmit}
                onKeyPress={(e) => e.key === 'Enter' && handlePhoneSubmit()}
              />
              <div className="profile-help-text">
                Puedes modificar este campo
              </div>
            </div>
          </div>

          {/* Mensaje de información */}
          <div className="profile-info-message">
            <span className="info-icon">⚠️</span>
            <span className="info-text">
              <strong>¡Importante!</strong> Mantén tu número celular actualizado para recibir notificaciones.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;