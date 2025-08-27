import { useState, useRef, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón principal - exactamente como copiloto */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 flex items-center justify-center overflow-hidden rounded-full focus:outline-none transition-all duration-200 hover:scale-105"
        style={{
          width: '40px',
          height: '40px',
          background: document.documentElement.classList.contains('dark') 
            ? 'linear-gradient(135deg, #374151 0%, #111827 100%)'
            : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          border: document.documentElement.classList.contains('dark')
            ? '1px solid #4b5563'
            : '1px solid #d1d5db',
          boxShadow: document.documentElement.classList.contains('dark')
            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
          color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#111827'
        }}
        title="Cambiar tema"
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontSize: '18px'
        }}>
          {theme === 'light' && (
            <span>☀</span>
          )}
          {theme === 'dark' && (
  <span style={{ 
    display: 'inline-block',
    color: 'currentColor',
    transform: 'scaleX(-1)'  // invierte horizontalmente
  }}>
    🌙
  </span>
)}

          {theme === 'system' && (
            <span>⊙</span>
          )}
        </div>
      </button>

      {/* Overlay para cerrar */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 w-full h-full" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown - Fondo adaptativo: blanco en claro, gris oscuro en oscuro */}
      {isOpen && (
        <div 
          className="fixed right-4 top-16 z-50 rounded-lg shadow-xl border"
          style={{
            position: 'fixed',
            top: '4rem',
            right: '3rem',
            zIndex: 9999,
            backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
            borderColor: document.documentElement.classList.contains('dark') ? '#4b5563' : '#d1d5db'
          }}
        >
          <div className="flex p-1 rounded-lg overflow-hidden" style={{backgroundColor: 'transparent'}}>
            {/* Claro */}
            <button
              onClick={() => handleThemeChange('light')}
              className="flex flex-col items-center justify-center px-1.5 py-1.5 transition-all duration-200"
              style={{ 
                minWidth: '50px',
                backgroundColor: theme === 'light' ? '#d1d5db' : 'transparent',
                color: document.documentElement.classList.contains('dark') ? 
                  (theme === 'light' ? '#111827' : '#f9fafb') : 
                  (theme === 'light' ? '#111827' : '#374151'),
                borderRadius: '8px 0 0 8px'
              }}
            >
              <SunIcon className="w-4 h-4 mb-0.5" />
              <span className="text-xs font-medium" style={{ fontSize: '10px' }}>Light</span>
            </button>

            {/* Oscuro */}
            <button
              onClick={() => handleThemeChange('dark')}
              className="flex flex-col items-center justify-center px-1.5 py-1.5 transition-all duration-200"
              style={{ 
                minWidth: '50px',
                backgroundColor: theme === 'dark' ? '#d1d5db' : 'transparent',
                color: document.documentElement.classList.contains('dark') ? 
                  (theme === 'dark' ? '#111827' : '#f9fafb') : 
                  (theme === 'dark' ? '#111827' : '#374151')
              }}
            >
              <MoonIcon className="w-4 h-4 mb-0.5" />
              <span className="text-xs font-medium" style={{ fontSize: '10px' }}>Dark</span>
            </button>

            {/* Auto */}
            <button
              onClick={() => handleThemeChange('system')}
              className="flex flex-col items-center justify-center px-1.5 py-1.5 transition-all duration-200"
              style={{ 
                minWidth: '50px',
                backgroundColor: theme === 'system' ? '#d1d5db' : 'transparent',
                color: document.documentElement.classList.contains('dark') ? 
                  (theme === 'system' ? '#111827' : '#f9fafb') : 
                  (theme === 'system' ? '#111827' : '#374151'),
                borderRadius: '0 8px 8px 0'
              }}
            >
              <svg 
                className="w-4 h-4 mb-0.5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {/* Icono simple como el copiloto: círculo con punto central */}
                <circle cx="12" cy="12" r="8"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
              <span className="text-xs font-medium" style={{ fontSize: '10px' }}>Auto</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


