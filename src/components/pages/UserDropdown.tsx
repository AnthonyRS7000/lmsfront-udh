import { useState, useRef, useEffect } from 'react';
import '../css/UserDropdown.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

// Datos del usuario mock
const getUserDataFromLocalStorage = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const foto = localStorage.getItem("foto");

  return {
    full_name: `${usuario.nombres} ${usuario.apellidos}`,
    image: foto || "https://ui-avatars.com/api/?name=Usuario+Invitado&background=6B7280&color=fff",
  };
};

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Obtener datos del usuario desde localStorage
  const userData = getUserDataFromLocalStorage();

  // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar navegación al perfil
  const handleProfile = () => {
    setIsOpen(false);
    navigate('/estudiante/perfil');
  };

  // 🚪 Manejar cierre de sesión con sincronización
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsOpen(false);

    try {
      // 📢 Notificar al Aula Virtual que cierre sesión
      const aulavirtualWindow = (window as any).aulavirtualWindow;
      
      if (aulavirtualWindow && !aulavirtualWindow.closed) {
        console.log("📢 Enviando LOGOUT al Aula Virtual");
        
        // Enviar mensaje de logout
        aulavirtualWindow.postMessage(
          { type: "LOGOUT" },
          "http://localhost:5174"
        );

        // Esperar confirmación o timeout de 2 segundos
        await new Promise((resolve) => {
          const handleConfirm = (e: MessageEvent) => {
            if (e.origin === "http://localhost:5174" && e.data?.type === "LOGOUT_CONFIRMED") {
              console.log("✅ Confirmación de logout recibida desde Aula Virtual");
              window.removeEventListener("message", handleConfirm);
              resolve(true);
            }
          };

          window.addEventListener("message", handleConfirm);

          // Timeout de 2 segundos
          setTimeout(() => {
            window.removeEventListener("message", handleConfirm);
            console.log("⏱️ Timeout esperando confirmación de logout");
            resolve(false);
          }, 2000);
        });

        // Cerrar la ventana del Aula Virtual
        try {
          aulavirtualWindow.close();
          (window as any).aulavirtualWindow = null;
          console.log("🔒 Ventana de Aula Virtual cerrada");
        } catch (error) {
          console.warn("No se pudo cerrar la ventana del Aula Virtual:", error);
        }
      } else {
        console.log("ℹ️ Aula Virtual no está abierta o ya fue cerrada");
      }
    } catch (error) {
      console.error("❌ Error durante logout sincronizado:", error);
    } finally {
      // Hacer logout local en el proyecto principal
      logout();
      navigate("/login");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      {/* Botón del usuario en el topbar */}
      <div 
        className="topbar-user" 
        onClick={() => !isLoggingOut && setIsOpen(!isOpen)}
        style={{ cursor: isLoggingOut ? 'not-allowed' : 'pointer', opacity: isLoggingOut ? 0.6 : 1 }}
      >
        <div className="topbar-user-avatar">
          <img
            src={userData.image}
            alt={userData.full_name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="user-dropdown-menu">
          <div className="dropdown-content">
            <button 
              className="dropdown-btn profile-btn" 
              onClick={handleProfile}
              disabled={isLoggingOut}
            >
              Perfil
            </button>

            <button 
              className="dropdown-btn logout-btn" 
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;