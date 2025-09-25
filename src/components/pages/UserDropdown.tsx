import { useState, useRef, useEffect } from 'react';
import '../css/UserDropdown.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

// Datos del usuario mock
const getUserDataFromLocalStorage = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  //const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
  const foto = localStorage.getItem("foto");

  return {
    full_name: `${usuario.nombres} ${usuario.apellidos}`,
    /*email: usuario.email || "Correo no disponible",
    role: usuario.rol || "Invitado",*/
    image: foto || "https://ui-avatars.com/api/?name=Usuario+Invitado&background=6B7280&color=fff",
  };
};

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Manejar cierre de sesión
  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      {/* Botón del usuario en el topbar */}
      <div className="topbar-user" onClick={() => setIsOpen(!isOpen)}>
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
            {/* Información del usuario oculta pero mantenida en mockUser 
            <div className="user-info" style={{ display: 'none' }}>
              <img 
                src={userData.image} 
                alt={userData.full_name}
                className="dropdown-avatar"
              />
              <div className="user-details">
                <span className="user-name">{userData.full_name}</span>
                <span className="user-email">{userData.email}</span>
              </div>
            </div>
            
            <hr className="dropdown-divider" style={{ display: 'none' }} />*/}
            
            <button 
              className="dropdown-btn profile-btn" 
              onClick={handleProfile}
            >
              Perfil
            </button>

            
            <button 
              className="dropdown-btn logout-btn" 
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;