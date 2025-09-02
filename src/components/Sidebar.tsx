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
              { name: 'registrarme', label: 'Registrarme al sistema', path: '/estudiante/registrarme' },
              { name: 'actualizar-datos', label: 'Actualizar mis datos', path: '/estudiante/actualizar-datos' },
              { name: 'cursos', label: 'Gestión de cursos', path: '/estudiante/cursos' },
              { name: 'inscripcion', label: 'Inscripción', path: '/estudiante/inscripcion' },
            ],
          },
          {
            name: 'GestionRegistros',
            label: 'Gestión de Registros Académicos',
            icon: IconInforme,
            submenus: [
              { name: 'consulta-academica', label: 'Consulta académica', path: '/estudiante/consulta-academica' },
              { name: 'documentos', label: 'Documentos', path: '/estudiante/documentos' },
              { name: 'tramites', label: 'Trámites', path: '/estudiante/tramites' },
              { name: 'reportes', label: 'Reportes', path: '/estudiante/reportes' },
            ],
          },
          {
            name: 'GestionPanelVirtual',
            label: 'Gestión del Panel Virtual',
            icon: IconEjecucion,
            submenus: [
              { name: 'aula-virtual-1', label: 'Aula virtual', path: '/estudiante/aula-virtual' },
              { name: 'clases-tiempo-real', label: 'Clases en tiempo real', path: '/estudiante/clases-tiempo-real' },
              { name: 'aula-virtual-2', label: 'Aula virtual', path: '/estudiante/aula-virtual-2' },
              { name: 'actividades-1', label: 'Actividades', path: '/estudiante/actividades' },
              { name: 'comunicacion', label: 'Comunicación', path: '/estudiante/comunicacion' },
              { name: 'actividades-2', label: 'Actividades', path: '/estudiante/actividades-2' },
            ],
          },
          {
            name: 'GestionBiblioteca',
            label: 'Gestión de Biblioteca Virtual',
            icon: IconInforme,
            submenus: [
              { name: 'busqueda', label: 'Búsqueda', path: '/estudiante/busqueda' },
              { name: 'recursos', label: 'Recursos', path: '/estudiante/recursos' },
              { name: 'reportes-biblioteca', label: 'Reportes', path: '/estudiante/reportes-biblioteca' },
            ],
          },
          {
            name: 'GestionPagos',
            label: 'Gestión de Pagos Virtuales',
            icon: IconProyecto,
            submenus: [
              { name: 'pagos', label: 'Pagos', path: '/estudiante/pagos' },
              { name: 'comprobantes', label: 'Comprobantes', path: '/estudiante/comprobantes' },
              { name: 'notificaciones', label: 'Notificaciones', path: '/estudiante/notificaciones' },
            ],
          },
        ];

      case 'docente':
        return [
          {
            name: 'GestionDocente',
            label: 'Gestión Docente',
            icon: IconProyecto,
            submenus: [
              { name: 'registro-perfil', label: 'Registro y actualización de perfil', path: '/docente/registro-perfil' },
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
              { name: 'administracion-historial', label: 'Administración del historial académico', path: '/docente/administracion-historial' },
              { name: 'generacion-actas', label: 'Generación automática de actas y certificados en formato electrónico', path: '/docente/generacion-actas' },
            ],
          },
          {
            name: 'AprendizajeVirtual',
            label: 'Aprendizaje Virtual',
            icon: IconEjecucion,
            submenus: [
              { name: 'gestion-cursos', label: 'Gestión de cursos', path: '/docente/gestion-cursos' },
              { name: 'gestion-contenidos', label: 'Gestión de contenidos', path: '/docente/gestion-contenidos' },
              { name: 'evaluaciones', label: 'Evaluaciones', path: '/docente/evaluaciones' },
              { name: 'seguimiento-estudiantes', label: 'Seguimiento de estudiantes', path: '/docente/seguimiento-estudiantes' },
              { name: 'retroalimentacion', label: 'Retroalimentación', path: '/docente/retroalimentacion' },
              { name: 'herramientas-innovacion', label: 'Herramientas de innovación', path: '/docente/herramientas-innovacion' },
              { name: 'comunicacion-academica', label: 'Comunicación académica', path: '/docente/comunicacion-academica' },
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
              { name: 'registrarme', label: 'Registrarme al sistema', path: '/escuela/registrarme' },
              { name: 'actualizar-datos', label: 'Actualizar mis datos', path: '/escuela/actualizar-datos' },
              { name: 'cursos', label: 'Gestión de cursos', path: '/escuela/cursos' },
              { name: 'inscripcion', label: 'Inscripción', path: '/escuela/inscripcion' },
            ],
          },
          {
            name: 'GestionRegistros',
            label: 'Gestión de Registros Académicos',
            icon: IconInforme,
            submenus: [
              { name: 'consulta-academica', label: 'Consulta académica', path: '/escuela/consulta-academica' },
              { name: 'documentos', label: 'Documentos', path: '/escuela/documentos' },
              { name: 'tramites', label: 'Trámites', path: '/escuela/tramites' },
              { name: 'reportes', label: 'Reportes', path: '/escuela/reportes' },
            ],
          },
          {
            name: 'GestionPanelVirtual',
            label: 'Gestión del Panel Virtual',
            icon: IconEjecucion,
            submenus: [
              { name: 'aula-virtual-1', label: 'Aula virtual', path: '/escuela/aula-virtual' },
              { name: 'clases-tiempo-real', label: 'Clases en tiempo real', path: '/escuela/clases-tiempo-real' },
              { name: 'aula-virtual-2', label: 'Aula virtual', path: '/escuela/aula-virtual-2' },
              { name: 'actividades-1', label: 'Actividades', path: '/escuela/actividades' },
              { name: 'comunicacion', label: 'Comunicación', path: '/escuela/comunicacion' },
              { name: 'actividades-2', label: 'Actividades', path: '/escuela/actividades-2' },
            ],
          },
          {
            name: 'GestionBiblioteca',
            label: 'Gestión de Biblioteca Virtual',
            icon: IconInforme,
            submenus: [
              { name: 'busqueda', label: 'Búsqueda', path: '/escuela/busqueda' },
              { name: 'recursos', label: 'Recursos', path: '/escuela/recursos' },
              { name: 'reportes-biblioteca', label: 'Reportes', path: '/escuela/reportes-biblioteca' },
            ],
          },
          {
            name: 'GestionPagos',
            label: 'Gestión de Pagos Virtuales',
            icon: IconProyecto,
            submenus: [
              { name: 'pagos', label: 'Pagos', path: '/escuela/pagos' },
              { name: 'comprobantes', label: 'Comprobantes', path: '/escuela/comprobantes' },
              { name: 'notificaciones', label: 'Notificaciones', path: '/escuela/notificaciones' },
            ],
          },
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
              { name: 'evaluacion-docentes', label: 'Evaluación de docentes', path: '/facultad/evaluacion-docentes' },
              { name: 'asignacion-carga', label: 'Asignación de carga académica', path: '/facultad/asignacion-carga' },
            ],
          },
          {
            name: 'GestionMatricula',
            label: 'Gestión de Matrícula',
            icon: IconEjecucion,
            submenus: [
              { name: 'control-matricula', label: 'Control de matrícula', path: '/facultad/control-matricula' },
              { name: 'supervision-inscripciones', label: 'Supervisión de inscripciones', path: '/facultad/supervision-inscripciones' },
              { name: 'estadisticas-matricula', label: 'Estadísticas de matrícula', path: '/facultad/estadisticas-matricula' },
              { name: 'reportes-matricula', label: 'Reportes de matrícula', path: '/facultad/reportes-matricula' },
            ],
          },
          {
            name: 'RegistroAcademico',
            label: 'Registro Académico',
            icon: IconInforme,
            submenus: [
              { name: 'generacion-documentos', label: 'Generación de documentos', path: '/facultad/generacion-documentos' },
              { name: 'validacion-academica', label: 'Validación académica', path: '/facultad/validacion-academica' },
              { name: 'certificaciones', label: 'Certificaciones y títulos', path: '/facultad/certificaciones' },
              { name: 'historial-academico', label: 'Historial académico institucional', path: '/facultad/historial-academico' },
            ],
          },
          {
            name: 'GestionEscuelas',
            label: 'Gestión de Escuelas',
            icon: IconProyecto,
            submenus: [
              { name: 'supervision-escuelas', label: 'Supervisión de escuelas', path: '/facultad/supervision-escuelas' },
              { name: 'coordinacion-programas', label: 'Coordinación de programas', path: '/facultad/coordinacion-programas' },
              { name: 'recursos-escuelas', label: 'Asignación de recursos', path: '/facultad/recursos-escuelas' },
              { name: 'evaluacion-programas', label: 'Evaluación de programas académicos', path: '/facultad/evaluacion-programas' },
            ],
          },
          {
            name: 'ReportesAnalisis',
            label: 'Reportes y Análisis',
            icon: IconInforme,
            submenus: [
              { name: 'reportes-institucionales', label: 'Reportes institucionales', path: '/facultad/reportes-institucionales' },
              { name: 'analisis-rendimiento', label: 'Análisis de rendimiento académico', path: '/facultad/analisis-rendimiento' },
              { name: 'estadisticas-facultad', label: 'Estadísticas de facultad', path: '/facultad/estadisticas-facultad' },
              { name: 'indicadores-calidad', label: 'Indicadores de calidad', path: '/facultad/indicadores-calidad' },
            ],
          },
          {
            name: 'AdministracionGeneral',
            label: 'Administración General',
            icon: IconEjecucion,
            submenus: [
              { name: 'planificacion-academica', label: 'Planificación académica', path: '/facultad/planificacion-academica' },
              { name: 'gestion-calendario', label: 'Gestión de calendario académico', path: '/facultad/gestion-calendario' },
              { name: 'configuracion-facultad', label: 'Configuración de facultad', path: '/facultad/configuracion-facultad' },
              { name: 'comunicacion-institucional', label: 'Comunicación institucional', path: '/facultad/comunicacion-institucional' },
            ],
          },
        ];

      case 'administrativo':
        return [
          {
            name: 'GestionUsuarios',
            label: 'Gestión de Usuarios',
            icon: IconProyecto,
            submenus: [
              { name: 'creacion-administracion', label: 'Creación y administración de cuentas (docentes, estudiantes, administrativos)', path: '/administrativo/creacion-administracion' },
              { name: 'perfiles-permisos', label: 'Gestión de perfiles y permisos', path: '/administrativo/perfiles-permisos' },
              { name: 'activacion-suspension', label: 'Activación y suspensión de cuentas', path: '/administrativo/activacion-suspension' },
              { name: 'auditoria-usuarios', label: 'Auditoría de usuarios', path: '/administrativo/auditoria-usuarios' },
            ],
          },
          {
            name: 'GestionMatricula',
            label: 'Gestión de Matrícula',
            icon: IconEjecucion,
            submenus: [
              { name: 'supervisar-validar', label: 'Supervisar y validar procesos de inscripción', path: '/administrativo/supervisar-validar' },
              { name: 'configuracion-periodos', label: 'Configuración de períodos académicos', path: '/administrativo/configuracion-periodos' },
              { name: 'gestion-cupos', label: 'Gestión de cupos y capacidad', path: '/administrativo/gestion-cupos' },
              { name: 'reportes-matricula', label: 'Reportes de matrícula consolidados', path: '/administrativo/reportes-matricula' },
            ],
          },
          {
            name: 'GestionAcademica',
            label: 'Gestión Académica',
            icon: IconInforme,
            submenus: [
              { name: 'supervisar-carga', label: 'Supervisar carga académica y horarios', path: '/administrativo/supervisar-carga' },
              { name: 'gestion-planes', label: 'Gestión de planes de estudio', path: '/administrativo/gestion-planes' },
              { name: 'coordinacion-facultades', label: 'Coordinación entre facultades', path: '/administrativo/coordinacion-facultades' },
              { name: 'evaluacion-institucional', label: 'Evaluación institucional', path: '/administrativo/evaluacion-institucional' },
            ],
          },
          {
            name: 'DocumentosyCertificados',
            label: 'Documentos y Certificados',
            icon: IconInforme,
            submenus: [
              { name: 'validar-emitir', label: 'Validar y emitir documentos oficiales (constancias, certificados)', path: '/administrativo/validar-emitir' },
              { name: 'plantillas-documentos', label: 'Gestión de plantillas de documentos', path: '/administrativo/plantillas-documentos' },
              { name: 'firmas-digitales', label: 'Gestión de firmas digitales', path: '/administrativo/firmas-digitales' },
              { name: 'archivo-documental', label: 'Archivo documental', path: '/administrativo/archivo-documental' },
            ],
          },
          {
            name: 'GestionFinanciera',
            label: 'Gestión Financiera',
            icon: IconProyecto,
            submenus: [
              { name: 'control-pagos', label: 'Control de pagos de matrícula y cuotas', path: '/administrativo/control-pagos' },
              { name: 'configuracion-aranceles', label: 'Configuración de aranceles', path: '/administrativo/configuracion-aranceles' },
              { name: 'reportes-financieros', label: 'Reportes financieros', path: '/administrativo/reportes-financieros' },
              { name: 'becas-descuentos', label: 'Gestión de becas y descuentos', path: '/administrativo/becas-descuentos' },
            ],
          },
          {
            name: 'ReportesInstitucionales',
            label: 'Reportes Institucionales',
            icon: IconInforme,
            submenus: [
              { name: 'generar-reportes', label: 'Generar reportes académicos, administrativos y financieros', path: '/administrativo/generar-reportes' },
              { name: 'dashboard-ejecutivo', label: 'Dashboard ejecutivo', path: '/administrativo/dashboard-ejecutivo' },
              { name: 'indicadores-institucionales', label: 'Indicadores institucionales', path: '/administrativo/indicadores-institucionales' },
              { name: 'reportes-ministeriales', label: 'Reportes ministeriales', path: '/administrativo/reportes-ministeriales' },
            ],
          },
          {
            name: 'Comunicaciones',
            label: 'Comunicaciones',
            icon: IconEjecucion,
            submenus: [
              { name: 'enviar-avisos', label: 'Enviar avisos institucionales a estudiantes y docentes', path: '/administrativo/enviar-avisos' },
              { name: 'gestion-notificaciones', label: 'Gestión de notificaciones masivas', path: '/administrativo/gestion-notificaciones' },
              { name: 'comunicacion-externa', label: 'Comunicación externa', path: '/administrativo/comunicacion-externa' },
              { name: 'archivo-comunicaciones', label: 'Archivo de comunicaciones', path: '/administrativo/archivo-comunicaciones' },
            ],
          },
          {
            name: 'SoporteyMesaAyuda',
            label: 'Soporte y Mesa de Ayuda',
            icon: IconProyecto,
            submenus: [
              { name: 'gestionar-incidencias', label: 'Gestionar incidencias de usuarios', path: '/administrativo/gestionar-incidencias' },
              { name: 'tickets-soporte', label: 'Sistema de tickets de soporte', path: '/administrativo/tickets-soporte' },
              { name: 'base-conocimientos', label: 'Base de conocimientos', path: '/administrativo/base-conocimientos' },
              { name: 'capacitacion-usuarios', label: 'Capacitación de usuarios', path: '/administrativo/capacitacion-usuarios' },
            ],
          },
          {
            name: 'EvaluacionInstitucional',
            label: 'Evaluación Institucional',
            icon: IconInforme,
            submenus: [
              { name: 'aplicar-encuestas', label: 'Aplicar encuestas de satisfacción (docentes, estudiantes)', path: '/administrativo/aplicar-encuestas' },
              { name: 'analisis-satisfaccion', label: 'Análisis de satisfacción', path: '/administrativo/analisis-satisfaccion' },
              { name: 'evaluacion-docente', label: 'Evaluación docente institucional', path: '/administrativo/evaluacion-docente' },
              { name: 'mejora-continua', label: 'Planes de mejora continua', path: '/administrativo/mejora-continua' },
            ],
          },
          {
            name: 'SeguridadyControl',
            label: 'Seguridad y Control',
            icon: IconEjecucion,
            submenus: [
              { name: 'monitoreo-accesos', label: 'Monitoreo de accesos y actividad de usuarios', path: '/administrativo/monitoreo-accesos' },
              { name: 'configuracion-seguridad', label: 'Configuración de seguridad', path: '/administrativo/configuracion-seguridad' },
              { name: 'backup-sistema', label: 'Backup y recuperación del sistema', path: '/administrativo/backup-sistema' },
              { name: 'logs-auditoria', label: 'Logs y auditoría del sistema', path: '/administrativo/logs-auditoria' },
            ],
          },
          {
            name: 'ConfiguracionSistema',
            label: 'Configuración del Sistema',
            icon: IconProyecto,
            submenus: [
              { name: 'parametros-globales', label: 'Parámetros globales del sistema', path: '/administrativo/parametros-globales' },
              { name: 'integraciones', label: 'Gestión de integraciones', path: '/administrativo/integraciones' },
              { name: 'mantenimiento-sistema', label: 'Mantenimiento del sistema', path: '/administrativo/mantenimiento-sistema' },
              { name: 'actualizaciones', label: 'Gestión de actualizaciones', path: '/administrativo/actualizaciones' },
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
