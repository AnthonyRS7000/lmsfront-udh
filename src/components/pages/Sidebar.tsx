import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  IconProyecto, 
  IconEjecucion, 
  IconInforme,
  IconUniversidad,
  IconAcademico,
  IconServicio,
  IconTitulacion,
  IconSoporte,
  IconCarpeta
} from '../icons/LmsIcons';
import { useTheme } from '../../hooks/useTheme';
import FlechaIcon from '../../assets/icons/flecha.svg';
import DocenteSimuladoPhoto from '../../assets/soporte.png';

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
const getUserDataFromLocalStorage = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const foto = localStorage.getItem("foto");
  
  // Si no hay datos de usuario, retornar datos simulados del docente para permitir acceso sin autenticación
  if (!usuario || !usuario.nombres) {
    return {
      nombre: 'Aldo Ramirez',
      apellidos: 'Chaupis',
      role: 'Docente', // Rol por defecto para acceso sin autenticación
      image: DocenteSimuladoPhoto,
    };
  }
  
  const nombre = usuario.nombres.split(' ')[0];

  return {
    nombre: `${nombre}`,
    apellidos: `${usuario.apellidos}`,
    role: usuario.rol,
    image: foto || '',
  };
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
  const currentUser = getUserDataFromLocalStorage();

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
            icon: IconUniversidad,
            submenus: [
              { name: 'matricula', label: 'Matrícula', path: '/estudiante/matricula' },
              { name: 'ver-horario', label: 'Ver Horario', path: '/estudiante/ver-horario' },
              { name: 'mi-horario', label: 'Mi Horario', path: '/estudiante/mi-horario' },
              { name: 'reglamento', label: 'Reglamento del estudiante', path: '/estudiante/reglamento' },
            ],
          },
          {
            name: 'ModuloAcademico',
            label: 'Módulo Académico',
            icon: IconAcademico,
            submenus: [
              { name: 'cursos-llevados', label: 'Cursos llevados', path: '/estudiante/cursos-llevados' },
              { name: 'mi-asistencia', label: 'Mi Asistencia', path: '/estudiante/mi-asistencia' },
              { name: 'notas-parciales', label: 'Notas Parciales', path: '/estudiante/notas-parciales' },
              // { name: 'evaluacion-diaria', label: 'Evaluación Diaria', path: '/estudiante/evaluacion-diaria' },
              { name: 'historial-academico', label: 'Historial Académico', path: '/estudiante/historial-academico' },
              { name: 'plan-de-estudios', label: 'Plan de Estudios', path: '/estudiante/plan-de-estudios' },
              { name: 'malla-curricular', label: 'Malla curricular', path: '/estudiante/malla-curricular' },
              { name: 'rendimiento-academico', label: 'Rendimiento académico', path: '/estudiante/rendimiento-academico' },
              ],
          },
          {
            name: 'ServiciosUniversitarios',
            label: 'Servicios Universitarios',
            icon: IconServicio,
            submenus: [
              { name: 'carnet-sunedu', label: 'Carnet Universitario SUNEDU', path: '/estudiante/servicios/carnet-sunedu' },
              { name: 'tarjeta-virtual', label: 'Tarjeta de Identificación Virtual', path: '/estudiante/servicios/tarjeta-virtual' },
              { name: 'bolsa-trabajo', label: 'Bolsa de Trabajo UDH', path: '/estudiante/servicios/bolsa-trabajo' },
              { name: 'inscripcion-idioma', label: 'Inscripción Idioma Extranjero', path: '/estudiante/servicios/inscripcion-idioma' },
              { name: 'educacion-distancia', label: 'Educación a Distancia', path: '/estudiante/servicios/educacion-distancia' },
              { name: 'congresos-otros', label: 'Congresos y Otros', path: '/estudiante/servicios/congresos-otros' },
            ],
          },
          {
            name: 'TramitesDocumentarios',
            label: 'Trámites Documentarios',
            icon: IconProyecto,
            submenus: [
              { name: 'tramite-generar', label: 'Generar Trámite', path: '/estudiante/tramite/generar' },
              { name: 'tramite-seguimiento', label: 'Seguimiento de Trámite', path: '/estudiante/tramite/seguimiento' },
              
            ],
          },
          {
            name: 'TitulacionGrados',
            label: 'Titulación y Grados',
            icon: IconTitulacion,
            submenus: [
              { name: 'consulta-grados', label: 'Consulta Reg. Grados y Títulos', path: '/estudiante/titulacion/consulta-grados' },
              { name: 'ficha-inscripcion', label: 'Ficha Inscripción Titulación', path: '/estudiante/titulacion/ficha-inscripcion' },
              { name: 'inscripcion-taller', label: 'Inscripción Taller Trab. Inv.', path: '/estudiante/titulacion/inscripcion-taller' },
              { name: 'tramite-grados-titulos', label: 'Trámite Grados y Títulos', path: '/estudiante/titulacion/tramite-grados' },
            ],
          },
          {
            name: 'SoporteDefensoria',
            label: 'Soporte y Defensoría',
            icon: IconSoporte,
            submenus: [
              { name: 'consultas-quejas', label: 'Consultas y Quejas', path: '/estudiante/soporte/consultas-quejas' },
              { name: 'consentimiento-informado', label: 'Consentimiento Informado', path: '/estudiante/soporte/consentimiento-informado' },
            ],
          },
          // Soporte y Defensoría (removido según preferencia del usuario)
          // Panel Virtual removido
        ];

      case 'docente':
        return [
          {
            name: 'Academico',
            label: 'Académico',
            icon: IconTitulacion,
            submenus: [
              { name: 'actividad-docente', label: 'Actividad Docente', path: '/docente/actividad-docente' },
              { name: 'carpetas-digitales', label: 'Carpetas Digitales', path: '/docente/carpetas-digitales' },
              { name: 'control-asistencia-estudiantes', label: 'Control de Asistencia - Estudiantes', path: '/docente/control-asistencia-estudiantes' },
              /*{ name: 'registro-curso-nivelacion', label: 'Registro - Curso de Nivelación', path: '/docente/registro-curso-nivelacion' },*/
              { name: 'registro-electronico', label: 'Registro Electrónico', path: '/docente/registro-electronico' },
            ],
          },
          {
            name: 'Laboral',
            label: 'Laboral',
            icon: IconCarpeta,
            submenus: [
              { name: 'asistencia-laboral', label: 'Asistencia Laboral', path: '/docente/asistencia-laboral' },
              { name: 'historial-asistencia-laboral', label: 'Historial de Asistencia Laboral', path: '/docente/historial-asistencia-laboral' },
              { name: 'horario', label: 'Horario', path: '/docente/horario' },
              { name: 'solicitud-adelanto-sueldo', label: 'Solicitud de Adelanto de Sueldo', path: '/docente/solicitud-adelanto-sueldo' },
            ],
          },
          {
            name: 'Manuales',
            label: 'Manuales',
            icon: IconProyecto,
            submenus: [
              { name: 'manual-adelanto', label: 'Manual de Adelanto', path: '/docente/manual-adelanto' },
              { name: 'manual-docente', label: 'Manual del Docente', path: '/docente/manual-docente' },
            ],
          },
          {
            name: 'Mantenimiento',
            label: 'Mantenimiento',
            icon: IconSoporte,
            submenus: [
              { name: 'cambio-contrasena', label: 'Cambio de contraseña', path: '/docente/cambio-contrasena' },
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
                  alt={currentUser.nombre}
                  className="user-avatar-image"
                />
              </div>
              
              {/* Información del usuario */}
              <div className="user-info-text">
                <h2 className="user-name-copiloto">
                  {currentUser.nombre}
                  <br/>
                  {currentUser.apellidos}
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
                      {section.submenus.length > 0 && (
                        openSections.includes(section.name) ? (
                          <ChevronDownIcon className="nav-chevron-copiloto rotate-180 transition-transform duration-300" />
                        ) : (
                          <ChevronRightIcon className="nav-chevron-copiloto transition-transform duration-300" />
                        )
                      )}
                    </div>
                    
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
