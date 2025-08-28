import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  // Función para aplicar el tema
  const applyTheme = useCallback((selectedTheme: Theme) => {
    const root = document.documentElement;
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      setIsDark(true);
      if (favicon) {
        favicon.href = '/copiloto_ico_dark.png'; // Como en UDH
      }
    } else if (selectedTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      setIsDark(false);
      if (favicon) {
        favicon.href = '/copiloto_ico_light.png'; // Como en UDH
      }
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        root.classList.remove('light');
        setIsDark(true);
        if (favicon) {
          favicon.href = '/copiloto_ico_dark.png';
        }
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        setIsDark(false);
        if (favicon) {
          favicon.href = '/copiloto_ico_light.png';
        }
      }
    }
  }, []);

  // Función para cambiar tema con transición suave (como en UDH)
  const setTheme = useCallback((newTheme: Theme) => {
    // Verificar si el navegador soporta View Transitions API
    if (!document.startViewTransition) {
      // Si no soporta, aplicar normalmente
      applyTheme(newTheme);
      setThemeState(newTheme);
      localStorage.setItem('current-theme', newTheme);
      return;
    }

    // Usar View Transitions API para transición suave
    document.startViewTransition(() => {
      applyTheme(newTheme);
      setThemeState(newTheme);
      localStorage.setItem('current-theme', newTheme);
    });
  }, [applyTheme]);

  // Función para alternar entre light y dark (para botón flotante)
  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  // Inicializar tema al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('current-theme') as Theme || 'system';
    setThemeState(savedTheme);
    applyTheme(savedTheme);

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme, theme]);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme
  };
};
