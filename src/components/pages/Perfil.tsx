import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import '../css/Perfil.css';
import TituloPage from './TituloPage';
import ButtonPrincipal from './ButtonPrincipal';
import { ArrowUpTrayIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const Perfil = () => {
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
        const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");

        setUserData(usuario);
        setUdhData(datosUdh);

        const foto = usuario?.foto || datosUdh?.foto || null;
        if (foto) setPhoto(foto);

        if (datosUdh && datosUdh.telefono) setPhoneNumber(datosUdh.telefono);
    }, []);

    const navigate = useNavigate();

    if (!userData || !udhData) return <div>Cargando...</div>;

    const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhotoError(null);
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const maxBytes = 2 * 1024 * 1024;
        if (file.size > maxBytes) {
        setPhotoError('El archivo excede el tamaño máximo de 2 MB.');
        setPhotoFile(null);
        setPhotoPreview(null);
        return;
        }

        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowed.includes(file.type)) {
        setPhotoError('Formato no soportado. Usa JPG o PNG.');
        setPhotoFile(null);
        setPhotoPreview(null);
        return;
        }

        const url = URL.createObjectURL(file);
        if (photoPreview) URL.revokeObjectURL(photoPreview);
        setPhotoFile(file);
        setPhotoPreview(url);
    };

    const handlePhoneSubmit = () => {
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

        const datos = { ...(udhData || {}), telefono: cleaned };
        try {
            localStorage.setItem('datos_udh', JSON.stringify(datos));
            setUdhData(datos);
            setSaveMessage('Número actualizado');
            setTimeout(() => setSaveMessage(null), 3000);
        } catch (err) {
            console.error(err);
            setSaveMessage('Error al guardar');
            setTimeout(() => setSaveMessage(null), 3000);
        }
    };

    const [apellido_paterno, apellido_materno] = userData.apellidos.split(' ');

    return (
    <div className="perfil-container">
        <TituloPage titulo="Mi Perfil" />

        <div className="perfil-div">
            <div className="perfil-content">
                <Card>
                    {/* Fila 1: Nombres y Apellido Paterno */}
                    <div className="perfil-row">
                        <div className="perfil-group">
                        <label className="perfil-label">Nombres</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={userData.nombres || ""}
                            readOnly
                        />
                        </div>
                        <div className="perfil-group">
                        <label className="perfil-label">Apellido Paterno</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={apellido_paterno || ""}
                            readOnly
                        />
                        </div>
                    </div>

                    {/* Fila 2: Apellido Materno y DNI */}
                    <div className="perfil-row">
                        <div className="perfil-group">
                        <label className="perfil-label">Apellido Materno</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={apellido_materno || ""}
                            readOnly
                        />
                        </div>
                        <div className="perfil-group">
                        <label className="perfil-label">DNI</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={udhData.documento || ""}
                            readOnly
                        />
                        </div>
                    </div>

                    {/* Fila 3: Facultad y Programa Académico */}
                    <div className="perfil-row">
                        <div className="perfil-group">
                        <label className="perfil-label">Facultad</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={udhData.facultad || ""}
                            readOnly
                        />
                        </div>
                        <div className="perfil-group">
                        <label className="perfil-label">Programa Académico</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={udhData.escuela || ""}
                            readOnly
                        />
                        </div>
                    </div>

                    {/* Fila 4: Código y Correo Institucional */}
                    <div className="perfil-row">
                        <div className="perfil-group">
                        <label className="perfil-label">Código</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={udhData.codigo || ""}
                            readOnly
                        />
                        </div>
                        <div className="perfil-group">
                        <label className="perfil-label">Correo Institucional</label>
                        <input 
                            type="email" 
                            className="perfil-input" 
                            value={userData.email || ""}
                            readOnly
                        />
                        </div>
                    </div>

                    {/* Fila 5: Sede y Número Celular */}
                    <div className="perfil-row">
                        <div className="perfil-group">
                        <label className="perfil-label">Sede</label>
                        <input 
                            type="text" 
                            className="perfil-input" 
                            value={udhData.sedalu ===1 ? "HUÁNUCO" : udhData.sedalu ===2 ? "TINGO MARÍA" : ""}
                            readOnly
                        />
                        </div>
                        <div className="perfil-group">
                        <label className="perfil-label">
                            Número Celular <span className="perfil-required">*</span>
                        </label>
                        <input 
                            type="tel" 
                            className="perfil-input editable" 
                            value={phoneNumber}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                            onBlur={handlePhoneSubmit}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handlePhoneSubmit()}
                        />
                        <div className="perfil-help">
                            Puedes modificar este campo
                        </div>
                        <div className="perfil-save-row">
                            <button className="perfil-save-btn" onClick={handlePhoneSubmit} disabled={phoneNumber === (udhData && udhData.telefono)}> <PencilSquareIcon className='perfil-save-btn-icon'/> Actualizar</button>
                            <div className="perfil-save-note">{saveMessage}</div>
                        </div>
                        </div>
                    </div>
                </Card>

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

                {/* Sección Fotografía */}
                <Card className="perfil-photo-card">
                    <div className="perfil-photo-left">
                        <div className="perfil-photo-icon">📸</div>
                        <div className="perfil-photo-info">
                        <div className="perfil-photo-title">Fotografía de perfil</div>
                        <div className="perfil-photo-sub">Sube una foto recomendada 240x288px, fondo blanco, formato JPG o PNG.</div>
                        </div>
                    </div>
                    <div className="perfil-photo-actions">
                        <ButtonPrincipal
                            icon={<ArrowUpTrayIcon className='perfil-save-btn-icon'/>}
                            text="Subir Fotografía"
                            onClick={() => setPhotoModalOpen(true)}
                        />
                    </div>
                </Card>

                {/* Sección Ficha Socioeconómica */}
                <Card className="perfil-ficha-card">
                    <div className="perfil-ficha-left">
                        <div className="perfil-ficha-icon">📋</div>
                        <div className="perfil-ficha-info">
                        <div className="perfil-ficha-title">Actualiza tu ficha socioeconómica</div>
                        <div className="perfil-ficha-sub">Mantén tus datos al día para acceder a beneficios y trámites.</div>
                        </div>
                    </div>
                    <div className="perfil-ficha-actions">
                        <ButtonPrincipal
                            icon={<PencilSquareIcon className='perfil-save-btn-icon'/>}
                            text="Completar Ficha"
                            onClick={() => navigate('/estudiante/ficha-socioeconomica')}
                        />
                    </div>
                </Card>
            </div>
        </div>
    </div>
    );
};

export default Perfil;