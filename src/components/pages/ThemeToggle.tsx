import { useTheme } from '../../hooks/useTheme';
import TemaClaro from '../../assets/icons/temaClaro.svg';
import TemaOscuro from '../../assets/icons/temaOscuro.svg';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle simple entre light y dark
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${theme === 'dark' ? 'dark' : 'light'}`}
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
        {theme === 'light' ? (
          <img 
            src={TemaClaro} 
            alt="Tema Claro" 
            className="theme-icon-light"
          />
        ) : (
          <img 
            src={TemaOscuro} 
            alt="Tema Oscuro" 
            className="theme-icon-dark"
          />
        )}
    </button>
  );
}


