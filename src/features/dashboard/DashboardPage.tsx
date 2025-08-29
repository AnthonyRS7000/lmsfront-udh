import { useNavigate } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  BuildingLibraryIcon, 
  BuildingOfficeIcon,
  CogIcon 
} from '@heroicons/react/24/outline';
import '../../index.css';

const roles = [
  {
    id: 'estudiante',
    title: 'Estudiante',
    description: 'Acceso a cursos, tareas y calificaciones',
    icon: AcademicCapIcon,
    color: 'bg-blue-500',
    route: '/estudiante'
  },
  {
    id: 'docente',
    title: 'Docente',
    description: 'Gestión de cursos y evaluaciones',
    icon: UserGroupIcon,
    color: 'bg-green-500',
    route: '/docente'
  },
  {
    id: 'escuela',
    title: 'Escuela',
    description: 'Administración de programas académicos',
    icon: BuildingLibraryIcon,
    color: 'bg-purple-500',
    route: '/escuela'
  },
  {
    id: 'facultad',
    title: 'Facultad',
    description: 'Gestión de escuelas y recursos',
    icon: BuildingOfficeIcon,
    color: 'bg-orange-500',
    route: '/facultad'
  },
  {
    id: 'administrativo',
    title: 'Administrativo',
    description: 'Configuración y reportes del sistema',
    icon: CogIcon,
    color: 'bg-red-500',
    route: '/administrativo'
  }
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleRoleSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100%',
      backgroundColor: 'transparent'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2563eb',
            marginBottom: '1rem'
          }}>
            Selecciona tu Rol
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280'
          }}>
            Elige el tipo de usuario para acceder a las funcionalidades correspondientes
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.route)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  height: '16rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backgroundColor: role.color === 'bg-blue-500' ? '#3b82f6' :
                                    role.color === 'bg-green-500' ? '#10b981' :
                                    role.color === 'bg-purple-500' ? '#8b5cf6' :
                                    role.color === 'bg-orange-500' ? '#f97316' :
                                    role.color === 'bg-red-500' ? '#ef4444' : '#6b7280'
                  }}>
                    <IconComponent style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      color: 'white'
                    }} />
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    {role.title}
                  </h3>
                  
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    {role.description}
                  </p>
                  
                  <div style={{
                    marginTop: '1.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#2563eb'
                  }}>
                    Ingresar
                    <svg style={{
                      marginLeft: '0.5rem',
                      width: '1rem',
                      height: '1rem'
                    }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '4rem',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Sistema de Gestión Académica LMS
            </h2>
            <p style={{
              color: '#6b7280',
              maxWidth: '42rem',
              margin: '0 auto'
            }}>
              Plataforma integral para la gestión académica universitaria. 
              Cada rol tiene acceso a funcionalidades específicas según sus responsabilidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}