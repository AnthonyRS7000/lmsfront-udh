import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  IconProyecto, 
  IconEjecucion, 
  IconInforme
} from './icons/LmsIcons';
import { useTheme } from '../hooks/useTheme';
import FlechaIcon from '../assets/icons/flecha.svg';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

// Función para detectar el rol actual basado en la ruta
const getCurrentRole = (pathname: string): string => {
  if (pathname.startsWith('/estudiante')) return 'estudiante';
  if (pathname.startsWith('/docente')) return 'docente';
  if (pathname.startsWith('/escuela')) return 'escuela';
  if (pathname.startsWith('/facultad')) return 'facultad';
  if (pathname.startsWith('/administrativo')) return 'administrativo';
  return 'dashboard'; // Default para la página principal
};

// Función para obtener datos del usuario según el rol
const getUserDataByRole = (role: string) => {
  const users = {
    estudiante: {
      full_name: 'ARMANDO ROJAS LUNA',
      role: 'Estudiante',
      image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
    },
    docente: {
      full_name: 'DR. MARÍA GARCÍA',
      role: 'Docente',
      image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=10B981&color=fff',
    },
    escuela: {
      full_name: 'ADMIN ESCUELA',
      role: 'Escuela',
      image: 'https://ui-avatars.com/api/?name=Admin+Escuela&background=8B5CF6&color=fff',
    },
    facultad: {
      full_name: 'ADMIN FACULTAD',
      role: 'Facultad',
      image: 'https://ui-avatars.com/api/?name=Admin+Facultad&background=F59E0B&color=fff',
    },
    administrativo: {
      full_name: 'ADMIN SISTEMA',
      role: 'Administrativo',
      image: 'https://ui-avatars.com/api/?name=Admin+Sistema&background=EF4444&color=fff',
    },
    dashboard: {
      full_name: 'USUARIO INVITADO',
      role: 'Seleccionar Rol',
      image: 'https://ui-avatars.com/api/?name=Usuario+Invitado&background=6B7280&color=fff',
    }
  };
  return users[role as keyof typeof users] || users.dashboard;
};

export default function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const { isLoading: themeLoading } = useTheme();

  // Detectar rol actual basado en la ruta
  const currentRole = getCurrentRole(location.pathname);
  const currentUser = getUserDataByRole(currentRole);

  // Detectar cambios de tema directamente en el DOM para respuesta inmediata
  useEffect(() => {
    const detectTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    };

    // Detectar tema inicial
    detectTheme();

    // Usar MutationObserver para detectar cambios en la clase 'dark' inmediatamente
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Inicialización del sidebar
  useEffect(() => {
    // Esperar a que el tema se haya cargado
    if (!themeLoading) {
      setIsInitialized(true);
    }
  }, [themeLoading]);


  // Función para obtener secciones según el rol
  const getSectionsByRole = (role: string) => {
    switch (role) {
      case 'estudiante':
        return [
          {
            name: 'GestionMatricula',
            label: 'Gestión de Matrícula',
            icon: IconProyecto,
            submenus: [
              { name: 'matricula', label: 'Matrícula', path: '/estudiante/matricula' },
              { name: 'ver-horario', label: 'Ver Horario', path: '/estudiante/ver-horario' },
              { name: 'tramite-documentario', label: 'Trámite Documentario', path: '/estudiante/tramite-documentario' },
              { name: 'tramite-grados', label: 'Trámite Grados y Títulos', path: '/estudiante/tramite-grados' },
              { name: 'tramite-seguimiento', label: 'Trámite Seguimiento', path: '/estudiante/tramite-seguimiento' },
              { name: 'reglamento', label: 'Reglamento del estudiante', path: '/estudiante/reglamento' },
            ],
          },
          {
            name: 'ModuloAcademico',
            label: 'Módulo Académico',
            icon: IconInforme,
            submenus: [
              { name: 'cursos-llevados', label: 'Cursos llevados', path: '/estudiante/cursos-llevados' },
              { name: 'mi-asistencia', label: 'Mi Asistencia', path: '/estudiante/mi-asistencia' },
              { name: 'notas-parciales', label: 'Notas Parciales', path: '/estudiante/notas-parciales' },
              { name: 'evaluacion-diaria', label: 'Evaluación Diaria', path: '/estudiante/evaluacion-diaria' },
              { name: 'historial-academico', label: 'Historial Académico', path: '/estudiante/historial-academico' },
              { name: 'plan-de-estudios', label: 'Plan de Estudios', path: '/estudiante/plan-de-estudios' },
              { name: 'malla-curricular', label: 'Malla curricular', path: '/estudiante/malla-curricular' },
              { name: 'rendimiento-academico', label: 'Rendimiento académico', path: '/estudiante/rendimiento-academico' },
              ],
          },
          {
            name: 'TitulacionGrados',
            label: 'Titulación y Grados',
            icon: IconEjecucion,
            submenus: [
              { name: 'consulta-grados', label: 'Consulta Reg. Grados y Títulos', path: '/estudiante/titulacion/consulta-grados' },
              { name: 'ficha-inscripcion', label: 'Ficha Inscripción Titulación', path: '/estudiante/titulacion/ficha-inscripcion' },
              { name: 'inscripcion-taller', label: 'Inscripción Taller Trab. Inv.', path: '/estudiante/titulacion/inscripcion-taller' },
              { name: 'tramite-grados-titulos', label: 'Trámite Grados y Títulos', path: '/estudiante/titulacion/tramite-grados' },
            ],
          },
          {
            name: 'ServiciosUniversitarios',
            label: 'Servicios Universitarios',
            icon: IconProyecto,
            submenus: [
              { name: 'carnet-sunedu', label: 'Carnet Universitario SUNEDU', path: '/estudiante/servicios/carnet-sunedu' },
              { name: 'tarjeta-virtual', label: 'Tarjeta de Identificación Virtual', path: '/estudiante/servicios/tarjeta-virtual' },
              { name: 'subir-fotografia', label: 'Subir Fotografía', path: '/estudiante/servicios/subir-fotografia' },
              { name: 'bolsa-trabajo', label: 'Bolsa de Trabajo UDH', path: '/estudiante/servicios/bolsa-trabajo' },
              { name: 'inscripcion-idioma', label: 'Inscripción Idioma Extranjero', path: '/estudiante/servicios/inscripcion-idioma' },
              { name: 'educacion-distancia', label: 'Educación a Distancia', path: '/estudiante/servicios/educacion-distancia' },
            ],
          },
          {
            name: 'SoporteDefensoria',
            label: 'Soporte y Defensoría',
            icon: IconEjecucion,
            submenus: [
              { name: 'consultas-quejas', label: 'Consultas y Quejas', path: '/estudiante/soporte/consultas-quejas' },
              { name: 'consentimiento-informado', label: 'Consentimiento Informado', path: '/estudiante/soporte/consentimiento-informado' },
              { name: 'congresos-otros', label: 'Congresos y Otros', path: '/estudiante/soporte/congresos-otros' },
            ],
          },
          // Soporte y Defensoría (removido según preferencia del usuario)
          // Panel Virtual removido
        ];

      case 'docente':
        return [
          {
            name: 'GestionDocente',
            label: 'Gestión Docente',
            icon: IconProyecto,
            submenus: [
              { name: 'docente', label: 'Principal', path: '/docente' },
              { name: 'asignacion-cursos', label: 'Asignación de cursos', path: '/docente/asignacion-cursos' },
              { name: 'gestion-horarios', label: 'Gestión de horarios', path: '/docente/gestion-horarios' },
              { name: 'reportes-actividad', label: 'Reportes de actividad', path: '/docente/reportes-actividad' },
            ],
          },
          {
            name: 'RegistroAcademico',
            label: 'Registro Académico',
            icon: IconInforme,
            submenus: [
              { name: 'registro-calificaciones', label: 'Registro de calificaciones', path: '/docente/registro-calificaciones' },
              { name: 'firma-actas', label: 'Firma de Actas', path: '/docente/firma-actas' },
            ],
          },
          {
            name: 'AprendizajeVirtual',
            label: 'Aprendizaje Virtual',
            icon: IconEjecucion,
            submenus: [
              { name: 'gestion-cursos', label: 'Gestión de cursos', path: '/docente/gestion-cursos' },
              { name: 'evaluaciones', label: 'Evaluaciones', path: '/docente/evaluaciones' },
              { name: 'seguimiento-estudiantes', label: 'Seguimiento de estudiantes', path: '/docente/seguimiento-estudiantes' },
            ],
          },
        ];

      case 'escuela':
        return [
          {
            name: 'GestionMatricula',
            label: 'Gestión de Matrícula',
            icon: IconProyecto,
            submenus: [
              { name: 'registrarme-sistema', label: 'Registrarme al sistema', path: '/escuela/registro' },
              { name: 'actualizar-datos', label: 'Actualizar mis datos', path: '/escuela/actualizar-datos' },
              { name: 'gestion-cursos', label: 'Gestión de cursos', path: '/escuela/cursos' },
              { name: 'inscripcion', label: 'Inscripción', path: '/escuela/inscripcion' },
            ],
          },
          {
            name: 'GestionRegistrosAcademicos',
            label: 'Gestión de Registros Académicos',
            icon: IconInforme,
            submenus: [
              { name: 'consulta-academica', label: 'Consulta académica', path: '/escuela/consulta-academica' },
              { name: 'documentos', label: 'Documentos', path: '/escuela/documentos' },
              { name: 'tramites', label: 'Trámites', path: '/escuela/tramites' },
              { name: 'reportes', label: 'Reportes', path: '/escuela/reportes' },
            ],
          },
          // Panel Virtual removido
          {
            name: 'GestionBibliotecaVirtual',
            label: 'Gestión de Biblioteca Virtual',
            icon: IconInforme,
            submenus: [
              { name: 'busqueda', label: 'Búsqueda', path: '/escuela/busqueda' },
              { name: 'recursos', label: 'Recursos', path: '/escuela/recursos' },
              { name: 'reportes-biblioteca', label: 'Reportes', path: '/escuela/reportes-biblioteca' },
            ],
          },
          // Gestión de Pagos removida
        ];

      case 'facultad':
        return [
          {
            name: 'GestionDocente',
            label: 'Gestión Docente',
            icon: IconProyecto,
            submenus: [
              { name: 'monitoreo-academico', label: 'Monitoreo académico', path: '/facultad/monitoreo-academico' },
              { name: 'seguimiento-academico', label: 'Seguimiento académico', path: '/facultad/seguimiento-academico' },
            ],
          },
          {
            name: 'Matricula',
            label: 'Matrícula',
            icon: IconInforme,
            submenus: [
              { name: 'control-matricula', label: 'Control de matrícula', path: '/facultad/control-matricula' },
            ],
          },
          {
            name: 'RegistroAcademico',
            label: 'Registro Académico',
            icon: IconEjecucion,
            submenus: [
              { name: 'generacion-documentos', label: 'Generación de documentos', path: '/facultad/generacion-documentos' },
              { name: 'validacion-academica', label: 'Validación académica', path: '/facultad/validacion-academica' },
            ],
          },
        ];

      case 'administrativo':
        return [
          {
            name: 'GestiónAdministrativa',
            label: 'Gestión Administrativa',
            icon: IconProyecto,
            submenus: [
              { name: 'registro-usuarios', label: 'Registro de usuarios', path: '/administrativo/usuarios' },
              { name: 'gestion-perfiles', label: 'Gestión de perfiles', path: '/administrativo/perfiles' },
              { name: 'asignacion-roles', label: 'Asignación de roles', path: '/administrativo/roles' },
              { name: 'monitoreo-actividad', label: 'Monitoreo de actividad', path: '/administrativo/monitoreo' },
            ],
          },
          {
            name: 'GestiónAcadémica',
            label: 'Gestión Académica',
            icon: IconProyecto,
            submenus: [
              { name: 'planificacion-cursos', label: 'Planificación de cursos', path: '/administrativo/planificacion-cursos' },
              { name: 'asignacion-docentes', label: 'Asignación de docentes', path: '/administrativo/asignacion-docentes' },
              { name: 'gestion-horarios-aulas', label: 'Gestión de horarios y aulas', path: '/administrativo/gestion-horarios-aulas' },
              { name: 'matricula-estudiantes', label: 'Matrícula de estudiantes', path: '/administrativo/matricula-estudiantes' },
              { name: 'control-notas', label: 'Control de notas', path: '/administrativo/control-notas' },
              { name: 'seguimiento-academico', label: 'Seguimiento académico', path: '/administrativo/seguimiento-academico' },
              { name: 'evaluacion-docente', label: 'Evaluación docente', path: '/administrativo/evaluacion-docente' },
            ],
          },
          {
            name: 'GestionSistema',
            label: 'Gestión del Sistema',
            icon: IconInforme,
            submenus: [
              { name: 'configuracion-sistema', label: 'Configuración del sistema', path: '/administrativo/configuracion' },
              { name: 'backup-seguridad', label: 'Backup y seguridad', path: '/administrativo/backup' },
              { name: 'actualizaciones', label: 'Actualizaciones', path: '/administrativo/actualizaciones' },
              { name: 'logs-auditoria', label: 'Logs y auditoría', path: '/administrativo/logs' },
            ],
          },
          {
            name: 'ReportesAnalisis',
            label: 'Reportes y Análisis',
            icon: IconEjecucion,
            submenus: [
              { name: 'reportes-academicos', label: 'Reportes académicos', path: '/administrativo/reportes-academicos' },
              { name: 'reportes-institucionales', label: 'Reportes institucionales', path: '/administrativo/reportes' },
              { name: 'analisis-uso', label: 'Análisis de uso', path: '/administrativo/analisis' },
              { name: 'estadisticas', label: 'Estadísticas generales', path: '/administrativo/estadisticas' },
              { name: 'dashboard-admin', label: 'Dashboard administrativo', path: '/administrativo/dashboard' },
            ],
          },
        ];

      default:
        return [
          {
            name: 'SeleccionarRol',
            label: 'Seleccionar Rol',
            icon: IconProyecto,
            submenus: [
              { name: 'dashboard', label: 'Ir al Dashboard', path: '/dashboard' },
            ],
          },
        ];
    }
  };
  
  // Obtener secciones dinámicas según el rol actual
  const sections = getSectionsByRole(currentRole);

  const toggleSubmenu = (sectionName: string) => {
    setOpenSections(prev => 
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isSectionActive = (section: any) => 
    section.submenus.some((submenu: any) => isActive(submenu.path));

  // Determinar la clase del sidebar según el tamaño de pantalla y tema
  const sidebarClass = `${isDesktop ? 'admin-sidebar-desktop' : 'admin-sidebar'} ${currentTheme === 'dark' ? 'theme-dark' : 'theme-light'}`;

  return (
    <>
      {/* Backdrop para móviles */}
      {!isDesktop && (
        <div 
          className={`admin-sidebar-backdrop ${isOpen ? '' : 'hidden'}`}
          onClick={onClose}
        />
      )}

      {/* Botón de colapsar - Con transiciones inteligentes */}
      <button
        onClick={() => onToggle?.()}
        className={`sidebar-collapse-button ${isOpen ? 'appearing' : 'disappearing'}`}
        title="Colapsar sidebar"
      >
        <img 
          src={FlechaIcon} 
          alt="Flecha" 
          className="sidebar-collapse-arrow"
          style={{ width: '22px', height: '22px' }}
        />
      </button>

      {/* Sidebar */}
      <div className={`${sidebarClass} ${isOpen ? '' : 'closed'}`}>
        {/* Mostrar skeleton/loading si no está inicializado */}
        {!isInitialized ? (
          <div className="sidebar-loading">
            {/* Skeleton para avatar */}
            <div className="skeleton-user-info">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-text">
                <div className="skeleton-line skeleton-line-name"></div>
                <div className="skeleton-line skeleton-line-role"></div>
              </div>
            </div>
            {/* Skeleton para navegación */}
            <div className="skeleton-nav">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-nav-item">
                  <div className="skeleton-icon"></div>
                  <div className="skeleton-line skeleton-line-nav"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Información del usuario - DISEÑO COPILOTO */}
            <div className="user-info-copiloto" style={{ 
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}>
              {/* Avatar circular grande con sombra */}
              <div className="user-avatar-copiloto">
                <img
                  src={currentUser.image}
                  alt={currentUser.full_name}
                  className="user-avatar-image"
                />
              </div>
              
              {/* Información del usuario */}
              <div className="user-info-text">
                <h2 className="user-name-copiloto">
                  {currentUser.full_name}
                </h2>
                <p className="user-role-copiloto">
                  {currentUser.role}
                </p>
              </div>
            </div>

            {/* Navegación - DISEÑO COPILOTO */}
            <nav className="nav-container-copiloto" style={{ 
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}>
              {sections.map((section, index) => (
                <div 
                  key={section.name} 
                  className="nav-section-copiloto"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-40px)',
                    transition: `all 0.5s ease-out ${index * 0.1}s`
                  }}
                >
                  {/* Header de la sección - ESTILO COPILOTO */}
                  <button
                    onClick={() => toggleSubmenu(section.name)}
                    className={`nav-section-header-copiloto group ${isSectionActive(section) ? 'active' : ''}`}
                  >
                    <div className="nav-section-content-copiloto">
                      <section.icon className="nav-section-icon-copiloto group-hover:translate-x-2 transition-transform duration-300" />
                      <span className="nav-section-label-copiloto group-hover:translate-x-2 transition-transform duration-300">
                        {section.label}
                      </span>
                    </div>
                    {section.submenus.length > 0 && (
                      openSections.includes(section.name) ? (
                        <ChevronDownIcon className="nav-chevron-copiloto rotate-180 transition-transform duration-300" />
                      ) : (
                        <ChevronRightIcon className="nav-chevron-copiloto transition-transform duration-300" />
                      )
                    )}
                  </button>

                  {/* Submenús - ANIMACIÓN COPILOTO */}
                  <div 
                    className={`nav-submenu-copiloto ${openSections.includes(section.name) ? 'open' : 'closed'}`}
                  >
                    <ul className="nav-submenu-list">
                      {section.submenus.map((submenu, smIndex) => (
                        <li
                          key={submenu.name}
                          className="nav-submenu-item-wrapper"
                          style={{
                            opacity: openSections.includes(section.name) ? 1 : 0,
                            transform: openSections.includes(section.name) ? 'translateY(0)' : 'translateY(-10px)',
                            transition: `all 0.3s ease-out ${smIndex * 0.05}s`
                          }}
                        >
                          <Link
                            to={submenu.path}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className={`nav-submenu-link-copiloto ${isActive(submenu.path) ? 'active' : ''}`}
                          >
                            <span className="nav-submenu-text">{submenu.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </nav>
          </>
        )}
      </div>
    </>
  );
}
