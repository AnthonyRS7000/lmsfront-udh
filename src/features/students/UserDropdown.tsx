import React, { useState, useRef, useEffect } from 'react';
import './UserDropdown.css';
import { useNavigate } from 'react-router-dom';

// Datos del usuario mock
const mockUser = {
  full_name: 'ARMANDO ROJAS LUNA',
  email: 'armando.estudiante@udh.edu.pe',
  role: 'estudiante',
  image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
};

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    // Aquí puedes agregar la lógica de logout
    console.log('Cerrando sesión...');
    // navigate('/login');
  };

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      {/* Botón del usuario en el topbar */}
      <div className="topbar-user" onClick={() => setIsOpen(!isOpen)}>
        <div className="topbar-user-avatar">
          <img
            src={mockUser.image}
            alt={mockUser.full_name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <span className="topbar-user-name">
          {mockUser.full_name.split(' ')[0]}
        </span>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="user-dropdown-menu">
          <div className="dropdown-content">
            {/* Información del usuario oculta pero mantenida en mockUser */}
            <div className="user-info" style={{ display: 'none' }}>
              <img 
                src={mockUser.image} 
                alt={mockUser.full_name}
                className="dropdown-avatar"
              />
              <div className="user-details">
                <span className="user-name">{mockUser.full_name}</span>
                <span className="user-email">{mockUser.email}</span>
              </div>
            </div>
            
            <hr className="dropdown-divider" style={{ display: 'none' }} />
            
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