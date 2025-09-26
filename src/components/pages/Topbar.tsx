// removed Bars3Icon import; using inline SVG for the menu toggle to avoid typing issues
import ThemeToggle from './ThemeToggle';
import '../css/Topbar.css';

import UserDropdown from './UserDropdown';

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// Mock user data - EXACTO COMO UDH
/* const mockUser = {
  full_name: 'ARMANDO ROJAS LUNA',
  email: 'armando.estudiante@udh.edu.pe',
  role: 'estudiante',
  image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
}; */

export default function Topbar({ onToggleSidebar, isSidebarOpen }: TopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="topbar-container">
        {/* Lado izquierdo */}
        <div className="topbar-left">
          {/* Botón toggle sidebar - SOLO visible cuando sidebar está cerrado */}
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="topbar-toggle"
              title="Abrir barra lateral"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          
        </div>

        {/* Lado derecho */}
        <div className="topbar-right">
          {/* Aula Virtual link (replaces notifications) */}
          <a className="topbar-aula-btn" title="Aula Virtual" aria-label="Abrir Aula Virtual" href="http://localhost:5174/estudiante/inicio">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
              <path d="M8 20h8"></path>
              <path d="M12 16v4"></path>
            </svg>
            <span className="topbar-aula-label">Aula Virtual</span>
          </a>

          {/* Selector de tema */}
          <ThemeToggle />

          {/* Usuario */}
          <UserDropdown />
          {/* <div className="topbar-user">
            <div className="topbar-user-avatar">
              <img
                src={mockUser.image}
                alt={mockUser.full_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span className="topbar-user-name">
              {mockUser.full_name.split(' ')[0]}
            </span>
          </div> */}
        </div>
      </div>
    </header>
  );
}
