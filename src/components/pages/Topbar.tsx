import ThemeToggle from './ThemeToggle';
import '../css/Topbar.css';
import UserDropdown from './UserDropdown';

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const handleAbrirAula = () => {
  const targetUrl = "http://localhost:5174/sso/receive";

  const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
  const google_token = localStorage.getItem("google_token");
  
  let usuario = null;
  let datos_udh = null;

  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    datos_udh = JSON.parse(localStorage.getItem("datos_udh") || "null");
  } catch (e) {
    console.error("Error parseando datos del usuario:", e);
  }

  const foto = localStorage.getItem("foto") || usuario?.foto || usuario?.image || null;
  const rol = localStorage.getItem("rol") || usuario?.rol || usuario?.role || "Estudiante";

  // Validar que tenemos al menos el token
  if (!token) {
    alert("No estás autenticado. Por favor, inicia sesión primero.");
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
    const fullUrl = `${targetUrl}#${encoded}`;
    
    console.log("➡️ Redirigiendo a Aula Virtual con datos:", {
      tiene_token: !!token,
      tiene_google_token: !!google_token,
      tiene_usuario: !!usuario,
      url: fullUrl.substring(0, 50) + "..."
    });

    window.location.href = fullUrl;
  } catch (error) {
    console.error("Error al redirigir:", error);
    alert("Error al abrir el Aula Virtual");
  }
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
    </header>
  );
}