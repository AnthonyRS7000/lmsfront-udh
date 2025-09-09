import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline';
import '../css/ver-curso-gestion-cursos.css';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpenIcon, ClipboardDocumentListIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const VerCursoGestionCursos = () => {
    const { id } = useParams();
    const [nombreCurso, setNombreCurso] = useState('');

    useEffect(() => {
        if (id === '1') setNombreCurso('Epidemiología - A');
        else if (id === '2') setNombreCurso('Salud Pública I - C');
        else if (id === '3') setNombreCurso('Farmacología - A');
        else if (id === '4') setNombreCurso('Farmacología - B');
        else if (id) setNombreCurso(`Curso #${id}`);
    }, [id]);

    // Estado para temas (simulación de datos del backend)
    const [temas, setTemas] = useState([
        {
            id: 1,
            titulo: 'Tema 1',
            usuario: {
                nombre: 'Marie Curie',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            },
            fecha: '20 agosto 2025',
            contenido: 'Buenos días alumnos, adjunto la ppt.',
            archivos: [
                { tipo: 'archivo', nombre: 'temario1.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', icono: '📄', desc: 'PDF' },
            ],
        },
        {
            id: 2,
            titulo: 'Tema 2',
            usuario: {
                nombre: 'Isaac Newton',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            fecha: '19 agosto 2025',
            contenido: 'Por favor completar el formulario.',
            archivos: [
                { tipo: 'link', nombre: 'practica_epidemiologia', url: 'https://drive.google.com/file/d/1kYAgbYARPnnODdkPqbho7aDcJ3YWLDBR/view', icono: '🔗', desc: 'Google Forms' },
            ],
        },
    ]);
    const [temaMenuId, setTemaMenuId] = useState<number | null>(null);

    // Refs para el +Nuevo
    const [nuevoMenuOpen, setNuevoMenuOpen] = useState(false);
    const nuevoMenuRef = useRef<HTMLDivElement | null>(null);
    const nuevoBtnRef = useRef<HTMLButtonElement | null>(null);

     // Refs para el botón y el menú
    const menuBtnRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Modal de nuevo/editar tema
    const [tipoModal, setTipoModal] = useState<'tema' | 'tarea' | null>(null);

    const [modalNuevo, setModalNuevo] = useState(false);
    const [editandoTema, setEditandoTema] = useState<any>(null);

    // Navegación
    const navigate = useNavigate();
    // Notificación
    const [notificacion, setNotificacion] = useState('');

    // Modal visor de archivo
    const [modalArchivo, setModalArchivo] = useState<any | null>(null);

    // Formulario tema
    const [formTitulo, setFormTitulo] = useState('');
    const [formContenido, setFormContenido] = useState('');
    const [formArchivos, setFormArchivos] = useState<any[]>([]);

    // Abrir modal para nuevo tema
    const abrirModalNuevo = () => {
        setEditandoTema(null);
        setFormTitulo('');
        setFormContenido('');
        setFormArchivos([]);
        setModalNuevo(true);
    };

    // Abrir modal para editar tema
    const abrirModalEditar = (tema: any) => {
        setEditandoTema(tema);
        setFormTitulo(tema.titulo || '');
        setFormContenido(tema.contenido || '');
        setFormArchivos(tema.archivos || []);
        setModalNuevo(true);
    };

    // Crear o actualizar tema
    const guardarTema = () => {
        if (!formTitulo.trim() || !formContenido.trim()) return;
        if (editandoTema) {
            setTemas(temas.map(t =>
                t.id === editandoTema.id
                    ? { ...t, titulo: formTitulo, contenido: formContenido, archivos: formArchivos }
                    : t
            ));
            setNotificacion('Tema actualizado correctamente');
        } else {
            const nuevoTema = {
                id: Date.now(),
                titulo: formTitulo,
                usuario: {
                    nombre: 'Marie Curie',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                },
                fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
                contenido: formContenido,
                archivos: formArchivos,
            };
            setTemas([nuevoTema, ...temas]);
            setNotificacion('Tema creado correctamente');
        }
        setModalNuevo(false);
        setFormTitulo('');
        setFormContenido('');
        setFormArchivos([]);
        setEditandoTema(null);
        setTimeout(() => setNotificacion(''), 3000);
    };

    // Eliminar tema
    const eliminarTema = (id: number) => {
        setTemas(prevTemas => prevTemas.filter(t => t.id !== id));
        setTemaMenuId(null);
        setNotificacion('Tema eliminado correctamente');
        setTimeout(() => setNotificacion(''), 3000);
    };

    // Mover tema
    const moverTema = (id: number, direccion: 'arriba' | 'abajo') => {
        setTemas(prevTemas => {
            const idx = prevTemas.findIndex(t => t.id === id);
            if (idx === -1) return prevTemas;
            let nuevaLista = [...prevTemas];
            if (direccion === 'arriba' && idx > 0) {
                [nuevaLista[idx - 1], nuevaLista[idx]] = [nuevaLista[idx], nuevaLista[idx - 1]];
            }
            if (direccion === 'abajo' && idx < nuevaLista.length - 1) {
                [nuevaLista[idx + 1], nuevaLista[idx]] = [nuevaLista[idx], nuevaLista[idx + 1]];
            }
            return nuevaLista;
        });
        setTemaMenuId(null);
    };

    // Abrir visor de archivo
    const abrirArchivo = (archivo: any) => {
        setModalArchivo(archivo);
    };

    // Eliminar archivo de la lista previa
    const eliminarArchivoPrevio = (i: number) => {
        setFormArchivos(formArchivos.filter((_, idx) => idx !== i));
    };

    // Cerrar menú de opciones al hacer click fuera o al volver a presionar el botón
    const handleMenuBtnClick = (id: number) => {
        setTemaMenuId(prev => (prev === id ? null : id));
    };

    // Cerrar menú al hacer click fuera del botón o del menú
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                temaMenuId !== null &&
                !menuBtnRef.current?.contains(event.target as Node) &&
                !menuRef.current?.contains(event.target as Node)
            ) {
                setTemaMenuId(null);
            }
        };
        if (temaMenuId !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [temaMenuId]);

    // Cerrar menú al hacer click fuera del botón o Nuevo menú
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                nuevoMenuOpen &&
                !nuevoMenuRef.current?.contains(event.target as Node) &&
                !nuevoBtnRef.current?.contains(event.target as Node)
            ) {
                setNuevoMenuOpen(false);
            }
        };
        if (nuevoMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [nuevoMenuOpen]);

    return (
        <div className='container'>
            <h2 className="vcgc-titulo">{nombreCurso}</h2>
            <hr className="vcgc-linea" />
            <div className="vcgc-container">
                <div className="vcgc-header-curso">
                    <div style={{ position: 'relative', display: 'inline-block'}}>
                        <button
                            className="vcgc-nuevo-btn"
                            ref={nuevoBtnRef}
                            onClick={e => {
                                e.stopPropagation();
                                setNuevoMenuOpen(open => !open);
                            }}
                        >
                            <PlusIcon style={{ width: '20px', height: '20px', color: 'white', marginRight: '6px' }} />
                            Nuevo
                        </button>
                        {nuevoMenuOpen && (
                            <div
                                className="vcgc-tema-menu"
                                ref={nuevoMenuRef}
                                style={{ right: 0, left: 'auto', minWidth: 140, zIndex: 100 }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div
                                    className="vcgc-tema-menu-option"
                                    onClick={() => {
                                        setTipoModal('tema');
                                        setNuevoMenuOpen(false);
                                        abrirModalNuevo();
                                    }}
                                >
                                    <BookOpenIcon style={{ width: '16px', height: '16px', marginRight: 6 }} />
                                    Tema
                                </div>
                                <div
                                    className="vcgc-tema-menu-option"
                                    onClick={() => {
                                        setTipoModal('tarea');
                                        setNuevoMenuOpen(false);
                                        abrirModalNuevo();
                                    }}
                                >
                                    <ClipboardDocumentListIcon style={{ width: '16px', height: '16px', marginRight: 6 }} />
                                    Tarea
                                </div>
                                <div
                                    className="vcgc-tema-menu-option"
                                    onClick={() => {
                                        setNuevoMenuOpen(false);
                                        navigate('/docente/crear-evaluaciones', { state: { curso: nombreCurso, cursoId: id } });
                                    }}
                                >
                                    <PencilSquareIcon style={{ width: '16px', height: '16px', marginRight: 6 }} />
                                    Evaluacion
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cards de temas */}
                <div>
                    {temas.map((tema, idx) => (
                        <div key={tema.id} className="vcgc-tema-card">
                            <div className="vcgc-tema-header">
                                <img className="vcgc-tema-avatar" src={tema.usuario.avatar} alt={tema.usuario.nombre} />
                                <div>
                                    <span className="vcgc-tema-nombre">{tema.usuario.nombre}</span>
                                    <div className="vcgc-tema-fecha" style={{ marginLeft: 0 }}>{tema.fecha}</div>
                                </div>
                            </div>
                            <div className="vcgc-tema-titulo">{tema.titulo}</div>
                            <div className="vcgc-tema-contenido">{tema.contenido}</div>
                            <div className="vcgc-tema-archivos">
                                {tema.archivos.map((archivo, i) => (
                                    <div key={i} className="vcgc-archivo-preview" onClick={() => abrirArchivo(archivo)}>
                                        <span className="vcgc-archivo-icono">{archivo.icono}</span>
                                        <span className="vcgc-archivo-nombre">{archivo.nombre}</span>
                                        <span className="vcgc-archivo-desc">{archivo.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="vcgc-tema-menu-btn"
                                ref={temaMenuId === tema.id ? menuBtnRef : null}
                                onClick={e => {
                                    e.stopPropagation();
                                    handleMenuBtnClick(tema.id);
                                }}
                            >
                                <EllipsisVerticalIcon style={{ width: '24px', height: '24px', color: 'black' }} />
                            </button>
                            {temaMenuId === tema.id && (
                                <div
                                    className="vcgc-tema-menu"
                                    ref={menuRef}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div
                                        className="vcgc-tema-menu-option"
                                        onClick={e => {
                                            e.stopPropagation();
                                            eliminarTema(tema.id);
                                        }}
                                    >
                                        Eliminar
                                    </div>
                                    <div
                                        className="vcgc-tema-menu-option"
                                        onClick={e => {
                                            e.stopPropagation();
                                            abrirModalEditar(tema);
                                            setTemaMenuId(null);
                                        }}
                                    >
                                        Editar
                                    </div>
                                    <div
                                        className="vcgc-tema-menu-option"
                                        onClick={e => {
                                            e.stopPropagation();
                                            moverTema(tema.id, 'arriba');
                                        }}
                                        style={{ color: idx === 0 ? '#ccc' : undefined, cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                                    >
                                        Mover arriba
                                    </div>
                                    <div
                                        className="vcgc-tema-menu-option"
                                        onClick={e => {
                                            e.stopPropagation();
                                            moverTema(tema.id, 'abajo');
                                        }}
                                        style={{ color: idx === temas.length - 1 ? '#ccc' : undefined, cursor: idx === temas.length - 1 ? 'not-allowed' : 'pointer' }}
                                    >
                                        Mover abajo
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Modal de nuevo/editar tema */}
                {modalNuevo && (
                    <div className="vcgc-modal-bg" onClick={() => setModalNuevo(false)}>
                        <div className="vcgc-modal" onClick={e => e.stopPropagation()}>
                            <h3>
                                {editandoTema
                                    ? tipoModal === 'tarea' ? 'ACTUALIZAR TAREA' : 'ACTUALIZAR TEMA'
                                    : tipoModal === 'tarea' ? 'NUEVA TAREA' : 'NUEVO TEMA'}
                            </h3>
                            <input
                                type="text"
                                placeholder="Título"
                                value={formTitulo}
                                onChange={e => setFormTitulo(e.target.value)}
                                className="vcgc-input"
                                required
                            />
                            <textarea
                                placeholder="Contenido"
                                value={formContenido}
                                onChange={e => setFormContenido(e.target.value)}
                                className="vcgc-textarea"
                                required
                            />
                            <input
                                type="file"
                                multiple
                                onChange={e => {
                                    const files = Array.from(e.target.files || []);
                                    setFormArchivos([
                                        ...formArchivos,
                                        ...files.map(f => ({
                                            tipo: 'archivo',
                                            nombre: f.name,
                                            url: URL.createObjectURL(f),
                                            icono: '📄',
                                            desc: f.type.includes('pdf') ? 'PDF' : f.type.includes('presentation') ? 'Microsoft PowerPoint' : 'Archivo',
                                        }))
                                    ]);
                                }}
                                className="vcgc-input-file"
                            />
                            <div className="vcgc-archivos-lista">
                                {formArchivos.map((archivo, i) => (
                                    <div key={i} className="vcgc-archivo-preview">
                                        <span className="vcgc-archivo-icono">{archivo.icono}</span>
                                        <span className="vcgc-archivo-nombre">{archivo.nombre}</span>
                                        <button className="vcgc-archivo-eliminar" onClick={() => eliminarArchivoPrevio(i)}>✕</button>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="vcgc-btn-crear"
                                onClick={guardarTema}
                                disabled={!formTitulo.trim() || !formContenido.trim()}
                            >
                                {editandoTema ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal de notificación */}
                {notificacion && (
                    <div className="vcgc-notificacion-modal">{notificacion}</div>
                )}

                {/* Modal visor de archivo/link tipo Classroom */}
                {modalArchivo && (
                    <div className="vcgc-modal-bg vcgc-modal-bg-full" onClick={() => setModalArchivo(null)}>
                        <div className="vcgc-modal-full" onClick={e => e.stopPropagation()}>
                            <button className="vcgc-modal-close" onClick={() => setModalArchivo(null)}>✕</button>
                            <h3 style={{color:'#fff'}}>{modalArchivo.nombre}</h3>
                            {modalArchivo.tipo === 'archivo' && modalArchivo.nombre.toLowerCase().endsWith('.pdf') ? (
                                <iframe
                                    src={`https://docs.google.com/gview?url=${encodeURIComponent(modalArchivo.url)}&embedded=true`}
                                    className="vcgc-iframe-full"
                                    title={modalArchivo.nombre}
                                    allowFullScreen
                                ></iframe>
                            ) : modalArchivo.tipo === 'archivo' ? (
                                <iframe
                                    src={modalArchivo.url}
                                    className="vcgc-iframe-full"
                                    title={modalArchivo.nombre}
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <a href={modalArchivo.url} target="_blank" rel="noopener noreferrer" className="vcgc-link">Abrir link</a>
                            )}
                        </div>
                    </div>
                )}
                </div>
        </div>
    );
};

export default VerCursoGestionCursos;