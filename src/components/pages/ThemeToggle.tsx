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
            style={{ width: '20px', height: '20px' }}
          />
        ) : (
          <img 
            src={TemaOscuro} 
            alt="Tema Oscuro" 
            className="theme-icon-dark"
            style={{ width: '20px', height: '20px' }}
          />
        )}
    </button>
  );
}


