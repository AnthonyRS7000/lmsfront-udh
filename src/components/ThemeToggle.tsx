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

  const getCurrentIcon = () => {
    if (theme === 'dark') {
      return <MoonIcon className="w-5 h-5" />;
    } else if (theme === 'light') {
      return <SunIcon className="w-5 h-5" />;
    } else {
      // System - icono giratorio pequeño
      return (
        <svg 
          className="animate-spin h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
          />
        </svg>
      );
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón principal - igual que copiloto */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 flex overflow-hidden rounded-full focus:outline-none size-10 bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 from-gray-100 to-gray-300 dark:text-white text-gray-900 items-center justify-center hover:shadow-md transition-shadow"
        title="Cambiar tema"
      >
        {getCurrentIcon()}
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

