import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  IconProyecto, 
  IconEjecucion, 
  IconInforme, 
  IconSustentacion 
} from './icons/LmsIcons';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock user data - EXACTO COMO UDH
const mockUser = {
  full_name: 'ARMANDO ROJAS LUNA',
  role: 'Estudiante',
  image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
};

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(['ProyectoDeTesis']);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Secciones de navegación exactas como UDH
  const sections = [
    {
      name: 'ProyectoDeTesis',
      label: 'Plan de Clases',
      icon: IconProyecto,
      submenus: [
        { name: 'designacion-asesor', label: 'Designación de asesor', path: '/estudiante/designacion-asesor', badge: 3 },
        { name: 'conformidad-asesor', label: 'Conformidad por el asesor', path: '/estudiante/conformidad-asesor' },
        { name: 'designacion-jurados', label: 'Designación de jurados', path: '/estudiante/designacion-jurados' },
        { name: 'conformidad-jurados', label: 'Conformidad por los jurados', path: '/estudiante/conformidad-jurados' },
        { name: 'aprobacion-proyecto', label: 'Aprobación del plan de tesis', path: '/estudiante/aprobacion-proyecto' },
      ],
    },
    {
      name: 'Ejecucion',
      label: 'Ejecución de Clases',
      icon: IconEjecucion,
      submenus: [
        { name: 'designacion-asesor', label: 'Designación de asesor', path: '/estudiante/designacion-asesor', badge: 3 },
        { name: 'conformidad-asesor', label: 'Conformidad por el asesor', path: '/estudiante/conformidad-asesor' },
        { name: 'designacion-jurados', label: 'Designación de jurados', path: '/estudiante/designacion-jurados' },
      ],
    },
    {
      name: 'Ejecucion',
      label: 'Elaboración de Clases',
      icon: IconEjecucion,
      submenus: [
        { name: 'designacion-asesor', label: 'Designación de asesor', path: '/estudiante/designacion-asesor', badge: 3 },
        { name: 'conformidad-asesor', label: 'Conformidad por el asesor', path: '/estudiante/conformidad-asesor' },
        { name: 'designacion-jurados', label: 'Designación de jurados', path: '/estudiante/designacion-jurados' },
      ],
    },
    {
      name: 'Ejecucion',
      label: 'Migracion',
      icon: IconEjecucion,
      submenus: [
        { name: 'designacion-asesor', label: 'Designación de asesor', path: '/estudiante/designacion-asesor', badge: 3 },
        { name: 'conformidad-asesor', label: 'Conformidad por el asesor', path: '/estudiante/conformidad-asesor' },
        { name: 'designacion-jurados', label: 'Designación de jurados', path: '/estudiante/designacion-jurados' },
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

  // Determinar la clase del sidebar según el tamaño de pantalla
  const sidebarClass = isDesktop ? 'admin-sidebar-desktop' : 'admin-sidebar';

  return (
    <>
      {/* Backdrop para móviles */}
      {!isDesktop && (
        <div 
          className={`admin-sidebar-backdrop ${isOpen ? '' : 'hidden'}`}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarClass} ${isOpen ? '' : 'closed'}`}>
        {/* Información del usuario */}
        <div className="user-info" style={{ opacity: isOpen ? 1 : 0 }}>
          <div className="user-avatar">
            <img
              src={mockUser.image}
              alt={mockUser.full_name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h3 className="user-name">
            {mockUser.full_name}
          </h3>
          <span className="user-role">
            {mockUser.role}
          </span>
        </div>

        <hr style={{ borderColor: '#e5e7eb', margin: '0 1rem 1rem 1rem' }} />

        {/* Navegación */}
        <nav className="nav-container" style={{ opacity: isOpen ? 1 : 0 }}>
          {sections.map((section) => (
            <div key={section.name} className="nav-section">
              {/* Header de la sección */}
              <button
                onClick={() => toggleSection(section.name)}
                className={`nav-section-header ${isSectionActive(section) ? 'active' : ''}`}
              >
                <div className="nav-section-content">
                  <section.icon className="nav-section-icon" />
                  <span className="nav-section-label">{section.label}</span>
                </div>
                {section.submenus.length > 0 && (
                  openSections.includes(section.name) ? (
                    <ChevronDownIcon className={`nav-chevron rotated`} />
                  ) : (
                    <ChevronRightIcon className="nav-chevron" />
                  )
                )}
              </button>

              {/* Submenús */}
              {openSections.includes(section.name) && section.submenus.length > 0 && (
                <div className="nav-submenu">
                  {section.submenus.map((submenu) => (
                    <Link
                      key={submenu.name}
                      to={submenu.path}
                      onClick={() => window.innerWidth < 1024 && onClose()}
                      className={`nav-submenu-item ${isActive(submenu.path) ? 'active' : ''}`}
                    >
                      <span>{submenu.label}</span>
                      {submenu.badge && (
                        <span className="nav-badge">
                          {submenu.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
