import { useNavigate } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  BuildingLibraryIcon, 
  BuildingOfficeIcon,
  CogIcon 
} from '@heroicons/react/24/outline';

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
    <div className="contenedor-principal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="main-title">Selecciona tu Rol</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Elige el tipo de usuario para acceder a las funcionalidades correspondientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.route)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="main-2div h-64 flex flex-col items-center justify-center text-center p-8 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-lg">
                  <div className={`${role.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {role.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {role.description}
                  </p>
                  
                  <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Ingresar
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="main-2div p-8 border border-gray-200 dark:border-gray-600 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Sistema de Gestión Académica LMS
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Plataforma integral para la gestión académica universitaria. 
              Cada rol tiene acceso a funcionalidades específicas según sus responsabilidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}