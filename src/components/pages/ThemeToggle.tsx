import { useThemeContext } from '../../context/ThemeContext';
import TemaClaro from '../../assets/icons/temaClaro.svg';
import TemaOscuro from '../../assets/icons/temaOscuro.svg';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

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


