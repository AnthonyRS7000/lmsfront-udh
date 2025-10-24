import ThemeToggle from './ThemeToggle';
import '../css/Topbar.css';
import '../css/ToastOverrides.css';
import UserDropdown from './UserDropdown';
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const handleAbrirAula = () => {
  const targetUrl = "http://localhost:5174/sso/receive";
  //https://aula.sistemasudh.com/

  const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
  const google_token = localStorage.getItem("google_token");
  
  let usuario: any = null;
  let datos_udh: any = null;

  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    datos_udh = JSON.parse(localStorage.getItem("datos_udh") || "null");
  } catch (e) {
    console.error("Error parseando datos del usuario:", e);
  }

  const getCurrentSemester = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = enero ... 11 = diciembre
    let term = "0";
    if (month >= 0 && month <= 1) {
      term = "0"; // Ene-Feb -> 0
    } else if (month >= 2 && month <= 6) {
      term = "1"; // Mar-Jul -> 1
    } else {
      term = "2"; // Ago-Dic -> 2
    }
    return `${year}-${term}`;
  };

  // Validación de matrícula en el último semestre (frontend)
  const ultMat = datos_udh?.ult_sem ?? usuario?.ult_sem ?? null;
  const latestSem = getCurrentSemester();

  if (!ultMat) {
    toast.error("No se encontró información de matrícula. No puede abrir el Aula Virtual.");
    return;
  }

  if (ultMat !== latestSem) {
    toast.error("Usted no está matriculado en el último semestre académico.");
    return;
  }

  const foto = localStorage.getItem("foto") || usuario?.foto || usuario?.image || null;
  const rol = localStorage.getItem("rol") || usuario?.rol || usuario?.role || "Estudiante";

  if (!token) {
    toast.error("No estás autenticado. Por favor, inicia sesión primero.");
    return;
  }

  const payload = {
    token,
    google_token,
    usuario,
    datos_udh,
    foto,
    rol
  };

  try {
    const encoded = btoa(JSON.stringify(payload));
    const fullUrl = `${targetUrl}?auth_payload=${encodeURIComponent(encoded)}`;
    

    // opcional: mostrar toast de éxito antes de redirigir
    toast.success("Abriendo Aula Virtual");
    setTimeout(() => {
      window.location.href = fullUrl;
    }, 600);
  } catch (error) {
    toast.error("Error al abrir el Aula Virtual");
  }
};

// Custom close button para react-toastify
const ToastCloseButton = ({ closeToast }: any) => {
  const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  return (
    <button
      onClick={closeToast}
      className={`toast-close-btn ${isDark ? 'dark' : 'light'}`}
      aria-label="Cerrar notificación"
      title="Cerrar"
    >
      ×
    </button>
  );
};

export default function Topbar({ onToggleSidebar, isSidebarOpen }: TopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="topbar-container">
        {/* Lado izquierdo */}
        <div className="topbar-left">
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="topbar-toggle"
              title="Abrir barra lateral"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Lado derecho */}
        <div className="topbar-right">
          {/* Aula Virtual button */}
          <button
            className="topbar-aula-btn"
            title="Aula Virtual"
            aria-label="Abrir Aula Virtual"
            onClick={handleAbrirAula}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
              <path d="M8 20h8"></path>
              <path d="M12 16v4"></path>
            </svg>
            <span className="topbar-aula-label">Aula Virtual</span>
          </button>

          {/* Selector de tema */}
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>

      {/* Toast container centrado y con close button personalizado */}
      <ToastContainer
        className="toast-center-container"
        toastClassName="toast-custom"
        position="bottom-right" /* se sobreescribe por CSS para centrar verticalmente */
        closeButton={<ToastCloseButton />}
        hideProgressBar
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
    </header>
  );
}