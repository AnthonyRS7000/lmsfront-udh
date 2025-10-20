import { useState, useRef, useEffect } from 'react';
import '../css/UserDropdown.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import DocenteSimuladoPhoto from '../../assets/soporte.png';

// Datos del usuario desde localStorage
const getUserDataFromLocalStorage = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const foto = localStorage.getItem("foto");

  // Si no hay datos de usuario, retornar datos simulados del docente para permitir acceso sin autenticación
  if (!usuario || !usuario.nombres) {
    return {
      full_name: "Aldo Ramirez Chaupis",
      image: DocenteSimuladoPhoto,
    };
  }

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

  const userData = getUserDataFromLocalStorage();

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegar al perfil
  const handleProfile = () => {
    setIsOpen(false);
    navigate('/estudiante/perfil');
  };

  // Cerrar sesión sincronizado
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsOpen(false);

    try {
      const aulavirtualWindow = (window as any).aulavirtualWindow;
      
      if (aulavirtualWindow && !aulavirtualWindow.closed) {
        aulavirtualWindow.postMessage(
          { type: "LOGOUT" },
          "http://localhost:5174"
        );

        await new Promise((resolve) => {
          const handleConfirm = (e: MessageEvent) => {
            if (e.origin === "http://localhost:5174" && e.data?.type === "LOGOUT_CONFIRMED") {
              window.removeEventListener("message", handleConfirm);
              resolve(true);
            }
          };

          window.addEventListener("message", handleConfirm);

          setTimeout(() => {
            window.removeEventListener("message", handleConfirm);
            resolve(false);
          }, 2000);
        });

        try {
          aulavirtualWindow.close();
          (window as any).aulavirtualWindow = null;
        } catch {}
      }
    } catch {}
    finally {
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
