import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  IconProyecto, 
  IconEjecucion, 
  IconInforme, 
  IconSustentacion 
} from './icons/LmsIcons';
import { useTheme } from '../hooks/useTheme';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

// Mock user data - EXACTO COMO UDH
const mockUser = {
  full_name: 'ARMANDO ROJAS LUNA',
  role: 'Estudiante',
  image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
};

export default function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(['GestionMatricula']);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const { isLoading: themeLoading } = useTheme();

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

  // Secciones de navegación - MÓDULOS REALES DEL SISTEMA
  const sections = [
  
    {
      name: 'GestionMatricula',
      label: 'Gestión de Matrícula',
      icon: IconProyecto,
      submenus: [
        /* { name: 'registrarme-sistema', label: 'Registrarme al sistema', path: '/estudiante/registro' }, */
        { name: 'actualizar-datos', label: 'Actualizar mis datos', path: '/estudiante/perfil' },
        { name: 'gestion-cursos', label: 'Gestión de cursos', path: '/estudiante/cursos' },
        { name: 'ver-cursos-semestre', label: 'Consultar cursos', path: '/estudiante/consultar_cursos' },
        /* { name: 'verificacion-prerequisitos', label: 'Verificación de prerrequisitos', path: '/estudiante/prerequisitos' },
        { name: 'consulta-cupos', label: 'Consulta de cupos disponibles', path: '/estudiante/cupos' },
        { name: 'confirmacion-matricula', label: 'Confirmación digital de matrícula', path: '/estudiante/confirmacion-matricula' }, */
      ],
    },
    {
      name: 'GestionRegistrosAcademicos',
      label: 'Gestión de Registros Académicos',
      icon: IconInforme,
      submenus: [
        { name: 'consulta-calificaciones', label: 'Consulta de calificaciones', path: '/estudiante/calificaciones' },
        { name: 'historial-academico', label: 'Acceso a historial académico', path: '/estudiante/historial' },
        { name: 'descarga-certificados', label: 'Descarga de certificados', path: '/estudiante/certificados' },
        { name: 'solicitudes-virtuales', label: 'Solicitudes virtuales', path: '/estudiante/tramites' },
        { name: 'reportes-academicos', label: 'Reportes académicos', path: '/estudiante/reportes' },
      ],
    },
    {
      name: 'GestionPanelVirtual',
      label: 'Gestión del Panel Virtual',
      icon: IconEjecucion,
      submenus: [
        { name: 'aula-virtual', label: 'Acceso a aulas virtuales', path: '/estudiante/aula-virtual' },
        { name: 'clases-tiempo-real', label: 'Participación en clases en vivo', path: '/estudiante/clases-vivo' },
        { name: 'acceso-grabaciones', label: 'Acceso a grabaciones', path: '/estudiante/grabaciones' },
        { name: 'entrega-tareas', label: 'Entrega de tareas digitales', path: '/estudiante/tareas' },
        { name: 'evaluaciones-automatizadas', label: 'Evaluaciones automatizadas', path: '/estudiante/evaluaciones' },
        { name: 'participacion-foros', label: 'Participación en foros', path: '/estudiante/foros' },
        { name: 'chat-mensajeria', label: 'Chat y mensajería interna', path: '/estudiante/mensajes' },
        { name: 'actividades-interactivas', label: 'Actividades interactivas', path: '/estudiante/actividades' },
      ],
    },
    {
      name: 'GestionBibliotecaVirtual',
      label: 'Gestión de Biblioteca Virtual',
      icon: IconSustentacion,
      submenus: [
        { name: 'busqueda-catalogos', label: 'Búsqueda en catálogos digitales', path: '/estudiante/catalogo' },
        { name: 'bibliotecas-externas', label: 'Acceso a bibliotecas externas', path: '/estudiante/bibliotecas-externas' },
        { name: 'descarga-materiales', label: 'Descarga de materiales', path: '/estudiante/materiales' },
        { name: 'reserva-materiales', label: 'Reserva de materiales digitales', path: '/estudiante/reservas' },
        { name: 'reportes-uso', label: 'Consulta de reportes de uso', path: '/estudiante/reportes-biblioteca' },
      ],
    },
    {
      name: 'GestionPagosVirtuales',
      label: 'Gestión de Pagos Virtuales',
      icon: IconProyecto,
      submenus: [
        { name: 'pagos-linea', label: 'Pagos en línea', path: '/estudiante/pagos', badge: 2 },
        { name: 'metodos-pago', label: 'Métodos de pago diversos', path: '/estudiante/metodos-pago' },
        { name: 'comprobantes-automaticos', label: 'Comprobantes automáticos', path: '/estudiante/comprobantes' },
        { name: 'historial-pagos', label: 'Historial de pagos', path: '/estudiante/historial-pagos' },
        { name: 'alertas-vencimiento', label: 'Alertas de vencimiento', path: '/estudiante/alertas', badge: 1 },
      ],
    },
  ];

  const toggleSection = (sectionName: string) => {
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
                  src={mockUser.image}
                  alt={mockUser.full_name}
                  className="user-avatar-image"
                />
              </div>
              
              {/* Información del usuario */}
              <div className="user-info-text">
                <h2 className="user-name-copiloto">
                  {mockUser.full_name}
                </h2>
                <p className="user-role-copiloto">
                  {mockUser.role}
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
                    onClick={() => toggleSection(section.name)}
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
                            {submenu.badge && (
                              <span className="nav-badge-copiloto">
                                {submenu.badge}
                              </span>
                            )}
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
