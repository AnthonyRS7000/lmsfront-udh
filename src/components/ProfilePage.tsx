import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  // Obtención de datos
  useEffect(() => {
    if (!code) return;
    fetch(`https://lmsback.sistemasudh.com/api/auth/google/callback?code=${code}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setPhoneNumber(data?.datos_udh?.numero_celular || "");
      })
      .catch(err => {
        console.error("Error al obtener datos:", err);
      });
  }, [code]);

  if (!userData) return <div>Cargando...</div>;

  // Maneja selección de archivo, valida tipo/tamaño y genera preview con URL
  const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Validar tamaño (2MB)
    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      setPhotoError('El archivo excede el tamaño máximo de 2 MB.');
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    // Validar tipo
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes(file.type)) {
      setPhotoError('Formato no soportado. Usa JPG o PNG.');
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    // Generar preview
    const url = URL.createObjectURL(file);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(url);
  };

  const handlePhoneSubmit = () => {
    // Aquí puedes agregar lógica para guardar el número
    console.log('Número actualizado:', phoneNumber);
  };

  return (
    <div className="profile-container">
      <div className="profile-root">
        <h1 className="profile-title">Mi Perfil</h1>
      </div>

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
                value={userData.datos_udh.nombres || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Apellido Paterno</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={userData.datos_udh.apellido_paterno || ""}
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
                value={userData.datos_udh.apellido_materno || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">DNI</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={userData.datos_udh.dni || ""}
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
                value={userData.datos_udh.facultad || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Programa Académico</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={userData.datos_udh.programa || ""}
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
                value={userData.datos_udh.codigo || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Correo Institucional</label>
              <input 
                type="email" 
                className="profile-form-input" 
                value={userData.datos_udh.codigo ? `${userData.datos_udh.codigo}@udh.edu.pe` : ""}
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
                value="HUÁNUCO"
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

          {/* Sección Subir Fotografía */}
          <div className="profile-photo-section">
            <button type="button" className="photo-open-btn" onClick={() => setPhotoModalOpen(true)}>Subir Fotografía</button>
            <div className="photo-instructions">Asegúrate que la foto cumpla las indicaciones: formato .jpg, fondo blanco, tamaño 240x288px.</div>
          </div>

          {photoModalOpen && (
            <div className="modal-overlay" role="dialog" aria-modal="true">
              <div className="photo-modal">
                <div className="photo-modal-header">
                  <h3>Cargar Fotografía</h3>
                  <button className="close-modal" onClick={() => { setPhotoModalOpen(false); setPhotoPreview(null); }}>×</button>
                </div>
                <div className="photo-modal-body">
                  <div className="photo-preview">
                    {photoPreview ? <img src={photoPreview} alt="Preview" /> : <div className="photo-placeholder">Vista previa</div>}
                  </div>
                  <div className="photo-controls">
                    <input type="file" accept="image/*" onChange={onPhotoSelected} />
                    <div className="photo-hint">Selecciona una imagen desde tu dispositivo. Recomendado: 3:4, rostro centrado.</div>
                    {photoError && <div className="photo-error">{photoError}</div>}
                    <div className="photo-actions">
                      <button className="btn-primary" onClick={() => {
                        if (!photoFile) return;
                        // Simular subida
                        console.log('Subiendo foto', photoFile);
                        if (photoPreview) URL.revokeObjectURL(photoPreview);
                        setPhotoPreview(null);
                        setPhotoFile(null);
                        setPhotoModalOpen(false);
                      }} disabled={!photoFile}>Guardar</button>
                      <button className="btn-secondary" onClick={() => { if (photoPreview) URL.revokeObjectURL(photoPreview); setPhotoModalOpen(false); setPhotoPreview(null); setPhotoFile(null); setPhotoError(null); }}>Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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