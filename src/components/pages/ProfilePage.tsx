import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ProfilePage.css';
import TituloPage from './TituloPage';

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [udhData, setUdhData] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  

  useEffect(() => {
    // Obtener datos del localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");

  setUserData(usuario);
  setUdhData(datosUdh);
  
  // inicializar foto si existe en usuario o datos_udh
  const foto = usuario?.foto || datosUdh?.foto || null;
  if (foto) setPhoto(foto);
  // inicializar número telefónico si existe
  if (datosUdh && datosUdh.telefono) setPhoneNumber(datosUdh.telefono);
  }, []);

  const navigate = useNavigate();
  
  if (!userData || !udhData) return <div>Cargando...</div>;

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
    // Validación simple: mínimo 6 dígitos
    const cleaned = (phoneNumber || '').trim();
    if (!cleaned || cleaned.length < 6) {
      setSaveMessage('Ingrese un número válido');
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    if (udhData && udhData.telefono === cleaned) {
      setSaveMessage('El número ingresado es el mismo que el actual');
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    // Actualizar localStorage (datos_udh) y estado
    const datos = { ...(udhData || {}), telefono: cleaned };
    try {
      localStorage.setItem('datos_udh', JSON.stringify(datos));
      setUdhData(datos);
      setSaveMessage('Número actualizado');
      setTimeout(() => setSaveMessage(null), 3000);
      console.log('Número actualizado:', cleaned);
    } catch (err) {
      console.error(err);
      setSaveMessage('Error al guardar');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };
  const [apellido_paterno, apellido_materno] = userData.apellidos.split(' ');

  return (
    <div className="profile-container">
      <TituloPage titulo="Mi Perfil" />

      {/* Contenido principal del perfil */}
      <div className="profile-content">
        <div className="profile-form-container">
          <div className="profile-card">
          
          {/* Fila 1: Nombres y Apellido Paterno */}
          <div className="profile-form-row">
            <div className="profile-form-group">
              <label className="profile-form-label">Nombres</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={userData.nombres || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Apellido Paterno</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={apellido_paterno || ""}
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
                value={apellido_materno || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">DNI</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={udhData.documento || ""}
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
                value={udhData.facultad || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Programa Académico</label>
              <input 
                type="text" 
                className="profile-form-input" 
                value={udhData.escuela || ""}
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
                value={udhData.codigo || ""}
                readOnly
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-form-label">Correo Institucional</label>
              <input 
                type="email" 
                className="profile-form-input" 
                value={userData.email || ""}
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
                value={udhData.sedalu ===1 ? "HUÁNUCO" : udhData.sedalu ===2 ? "TINGO MARÍA" : ""}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                onBlur={handlePhoneSubmit}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handlePhoneSubmit()}
              />
              <div className="profile-help-text">
                Puedes modificar este campo
              </div>
              <div className="profile-save-row">
                <button className="profile-save-btn" onClick={handlePhoneSubmit} disabled={phoneNumber === (udhData && udhData.telefono)}>Actualizar</button>
                <div className="profile-save-note">{saveMessage}</div>
              </div>
            </div>
          </div>

          {/* Sección Subir Fotografía (integrada más abajo en profile-info-message) */}

          {photoModalOpen && (
            <div className="modal-overlay" role="dialog" aria-modal="true">
              <div className="photo-modal">
                <div className="photo-modal-header">
                  <h3>Cargar Fotografía</h3>
                  <button className="close-modal" onClick={() => { setPhotoModalOpen(false); setPhotoPreview(null); }}>×</button>
                </div>
                <div className="photo-modal-body">
                  <div className="photo-preview">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" />
                    ) : photo ? (
                      <img src={photo} alt="Foto actual" />
                    ) : (
                      <div className="photo-placeholder">Vista previa</div>
                    )}
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

          {/* Tarjeta estilo 'ficha' para Fotografía (misma organización que la invitación de ficha socioeconómica) */}
          <div className="ficha-invite-card">
            <div className="ficha-invite-left">
              <div className="ficha-invite-icon">📸</div>
              <div className="ficha-invite-copy">
                <div className="ficha-invite-title">Fotografía de perfil</div>
                <div className="ficha-invite-sub">Sube una foto recomendada 240x288px, fondo blanco, formato JPG o PNG.</div>
              </div>
            </div>
            <div className="ficha-invite-actions">
              <button
                className="btn-primary ficha-open-btn"
                type="button"
                onClick={() => setPhotoModalOpen(true)}
              >
                Subir Fotografía
              </button>
            </div>
          </div>
          {/* Sección: Invitación a completar ficha socioeconómica */}
          <div className="profile-ficha-invite">
            <div className="ficha-invite-card">
              <div className="ficha-invite-left">
                <div className="ficha-invite-icon">📋</div>
                <div className="ficha-invite-copy">
                  <div className="ficha-invite-title">Actualiza tu ficha socioeconómica</div>
                  <div className="ficha-invite-sub">Mantén tus datos al día para acceder a beneficios y trámites.</div>
                </div>
              </div>
              <div className="ficha-invite-actions">
                <button
                  className="btn-primary ficha-open-btn"
                  onClick={() => {
                    // use client-side navigation to avoid a full page reload (no white flash)
                    navigate('/estudiante/ficha-socioeconomica');
                  }}
                >
                  Completar ficha
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProfilePage;