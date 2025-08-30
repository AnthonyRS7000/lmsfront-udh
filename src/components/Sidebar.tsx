import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  IconProyecto, 
  IconEjecucion, 
  IconInforme
} from './icons/LmsIcons';
import { useTheme } from '../hooks/useTheme';

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
              { name: 'cursos', label: 'Mis Cursos', path: '/estudiante/cursos' },
              { name: 'matricula', label: 'Proceso de Matrícula', path: '/estudiante/matricula' },
            ],
          },
          {
            name: 'GestionRegistros',
            label: 'Registros Académicos',
            icon: IconInforme,
            submenus: [
              { name: 'calificaciones', label: 'Mis Calificaciones', path: '/estudiante/calificaciones' },
              { name: 'historial', label: 'Historial Académico', path: '/estudiante/historial' },
            ],
          },
        ];

      case 'docente':
        return [
          {/*
            name: 'GestionCursos',
            label: 'Gestión de Cursos',
            icon: IconProyecto,
            submenus: [
              { name: 'mis-cursos', label: 'Mis Cursos', path: '/docente/cursos' },
              { name: 'asistencia', label: 'Control de Asistencia', path: '/docente/asistencia' },
            ],
          },
          {
            name: 'GestionHorarios',
            label: 'Gestión de Horarios',
            icon: IconInforme,
            submenus: [
              { name: 'ver-horarios', label: 'Ver Horarios', path: '/docente/horarios' },
              { name: 'horarios-disponibles', label: 'Asignar Mis Horas Disponibles', path: '/docente/horarios-disponibles' },
            ],
          },
          {
            name: 'Evaluaciones',
            label: 'Evaluaciones',
            icon: IconEjecucion,
            submenus: [
              { name: 'calificar', label: 'Calificar Estudiantes', path: '/docente/calificar' },
              { name: 'reportes', label: 'Reportes de Evaluación', path: '/docente/reportes' },
            ],
          */
            name: 'PerfilDocente',
            label: 'Perfil Docente',
            icon: IconProyecto,
            submenus: [
              { name: 'mi-perfil', label: 'Mi Perfil', path: '/docente/perfil' },
            ],
          },
          {
            name: 'GestionDocente',
            label: 'Gestión Docente',
            icon: IconProyecto,
            submenus: [
              { name: 'horas-disponible', label: 'Horas Disponibles', path: '/docente/horas_disponibles' },
              { name: 'mis-cursos', label: 'Mis Cursos', path: '/docente/cursos' },
              { name: 'mis-silabos', label: 'Mis Silabos', path: '/docente/silabos' },
              { name: 'mi-horario', label: 'Mi Horario', path: '/docente/horario' },
              { name: 'mi-desempeno', label: 'Mi Desempeño', path: '/docente/desenpeno' },
              { name: 'reportes-acividad', label: 'Reportes de Actividad', path: '/docente/reportes' },
            ],
          },
          {
            name: 'RegistroAcademico',
            label: 'Registro Academico',
            icon: IconProyecto,
            submenus: [
              { name: 'registrar-notas', label: 'Registrar Mis Notas', path: '/docente/registrar-notas' },
              { name: 'carpeta-pedagogica', label: 'Carpeta Pedagogica', path: '/docente/carpeta' },
              { name: 'firma-actas', label: 'Firmar Actas', path: '/docente/firmar-actas' },
            ],
          },
          {
            name: 'AprendizajeVirtual',
            label: 'Aprendizaje Virtual',
            icon: IconProyecto,
            submenus: [
              { name: 'crear-meet', label: 'Crear Meet', path: '/docente/meet' },
              { name: 'asistencia', label: 'Control de Asistencia', path: '/docente/asistencia' },
              { name: 'evaluaciones', label: 'Mis Evaluaciones', path: '/docente/evaluaciones' },
              { name: 'seguimiento-estudiante', label: 'Seguimiento de Estudiantes', path: '/docente/seguimientos' },
              { name: 'evaluaciones', label: 'Mis Evaluaciones', path: '/docente/evaluaciones' },
            ],
          },
        ];

      case 'escuela':
        return [
          {
            name: 'GestionEscuela',
            label: 'Gestión de Escuela',
            icon: IconProyecto,
            submenus: [
              { name: 'programas', label: 'Gestión de Programas', path: '/escuela/programas' },
            ],
          },
        ];

      case 'facultad':
        return [
          {
            name: 'GestionFacultad',
            label: 'Gestión de Facultad',
            icon: IconProyecto,
            submenus: [
              { name: 'escuelas', label: 'Gestión de Escuelas', path: '/facultad/escuelas' },
            ],
          },
        ];

      case 'administrativo':
        return [
          {
            name: 'GestionSistema',
            label: 'Gestión del Sistema',
            icon: IconProyecto,
            submenus: [
              { name: 'usuarios', label: 'Gestión de Usuarios', path: '/administrativo/usuarios' },
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
              { name: 'dashboard', label: 'Ir al Dashboard', path: '/' },
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

      {/* Botón de colapsar - POSICIONADO FUERA DEL SIDEBAR */}
      {isOpen && (
        <button
          onClick={() => onToggle?.()}
          className="sidebar-collapse-button"
          title="Colapsar sidebar"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      )}

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
