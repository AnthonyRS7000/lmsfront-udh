import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

export default function ButtonFloatTheme() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-40 rounded-full w-12 h-12 flex items-center justify-center bg-gray-800 dark:bg-slate-100 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {!isDark ? (
        <MoonIcon className="w-5 h-5 text-white" />
      ) : (
        <SunIcon className="w-5 h-5 text-azul" />
      )}
    </button>
  );
}
