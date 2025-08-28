import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isLoading: boolean;
}

// Función para obtener el tema inicial de forma síncrona
const getInitialTheme = (): { theme: Theme; isDark: boolean } => {
  // Durante SSR o si no hay ventana, usar valores por defecto
  if (typeof window === 'undefined') {
    return { theme: 'system', isDark: false };
  }

  // Intentar usar el estado inicial del script en index.html
  if (window.__INITIAL_THEME__) {
    return window.__INITIAL_THEME__;
  }

  try {
    const savedTheme = localStorage.getItem('current-theme') as Theme || 'system';
    let isDark = false;

    if (savedTheme === 'dark') {
      isDark = true;
    } else if (savedTheme === 'light') {
      isDark = false;
    } else {
      // System theme - evaluar inmediatamente
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return { theme: savedTheme, isDark };
  } catch (error) {
    console.warn('Error reading theme from localStorage:', error);
    return { theme: 'system', isDark: false };
  }
};

// Aplicar tema inicial de forma síncrona antes del primer render
const applyInitialTheme = () => {
  if (typeof window === 'undefined') return;

  const { isDark } = getInitialTheme();
  const root = document.documentElement;
  
  // Aplicar clase inmediatamente
  if (isDark) {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
};

export const useTheme = (): UseThemeReturn => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Inicializar con valores síncronos
  const initialState = getInitialTheme();
  const [theme, setThemeState] = useState<Theme>(initialState.theme);
  const [isDark, setIsDark] = useState(initialState.isDark);

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
      try {
        localStorage.setItem('current-theme', newTheme);
      } catch (error) {
        console.warn('Error saving theme to localStorage:', error);
      }
      return;
    }

    // Usar View Transitions API para transición suave
    document.startViewTransition(() => {
      applyTheme(newTheme);
      setThemeState(newTheme);
      try {
        localStorage.setItem('current-theme', newTheme);
      } catch (error) {
        console.warn('Error saving theme to localStorage:', error);
      }
    });
  }, [applyTheme]);

  // Función para alternar entre light y dark (para botón flotante)
  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  // Inicializar tema al montar el componente
  useEffect(() => {
    // Aplicar tema inicial inmediatamente si no se ha aplicado
    applyInitialTheme();
    
    // Verificar si el estado actual coincide con lo que está aplicado
    const currentState = getInitialTheme();
    if (currentState.theme !== theme || currentState.isDark !== isDark) {
      setThemeState(currentState.theme);
      setIsDark(currentState.isDark);
      applyTheme(currentState.theme);
    }

    setIsLoading(false);

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []); // Solo ejecutar una vez al montar

  // Efecto separado para manejar cambios en el tema
  useEffect(() => {
    if (!isLoading && theme === 'system') {
      applyTheme('system');
    }
  }, [theme, applyTheme, isLoading]);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    isLoading
  };
};

// Ejecutar tema inicial antes de que React renderice
if (typeof window !== 'undefined') {
  applyInitialTheme();
}
