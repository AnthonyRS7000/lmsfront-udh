import { BuildingLibraryIcon, UserGroupIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const escuelaStats = [
  { 
    name: 'Programas Académicos', 
    value: '8', 
    icon: BuildingLibraryIcon, 
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900' 
  },
  { 
    name: 'Docentes Activos', 
    value: '45', 
    icon: UserGroupIcon, 
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900' 
  },
  { 
    name: 'Estudiantes Totales', 
    value: '1,250', 
    icon: UserGroupIcon, 
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900' 
  },
  { 
    name: 'Tasa de Aprobación', 
    value: '87%', 
    icon: ChartBarIcon, 
    color: 'text-orange-600',
    bg: 'bg-orange-100 dark:bg-orange-900' 
  },
];

export default function EscuelaDashboard() {
  return (
    <div className="contenedor-principal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="main-title">Dashboard de la Escuela</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            Administración y gestión de programas académicos
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {escuelaStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.name} className="main-2div p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center">
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Programas académicos */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Programas Académicos
            </h3>
            <div className="space-y-3">
              {[
                { programa: 'Ingeniería de Sistemas', estudiantes: '320', estado: 'Activo' },
                { programa: 'Ingeniería Industrial', estudiantes: '280', estado: 'Activo' },
                { programa: 'Ingeniería Civil', estudiantes: '350', estado: 'Activo' },
                { programa: 'Arquitectura', estudiantes: '300', estado: 'Activo' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.programa}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.estudiantes} estudiantes</span>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {item.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Docentes por programa */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Distribución de Docentes
            </h3>
            <div className="space-y-3">
              {[
                { programa: 'Ing. Sistemas', docentes: '12', tipo: 'Tiempo Completo' },
                { programa: 'Ing. Industrial', docentes: '10', tipo: 'Tiempo Completo' },
                { programa: 'Ing. Civil', docentes: '15', tipo: 'Tiempo Completo' },
                { programa: 'Arquitectura', docentes: '8', tipo: 'Tiempo Parcial' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.programa}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.tipo}</span>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {item.docentes} docentes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reportes y estadísticas */}
        <div className="mt-8 main-2div p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Indicadores Académicos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-2xl font-bold text-green-600">87%</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tasa de Graduación</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-2xl font-bold text-blue-600">92%</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Satisfacción Estudiantil</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-2xl font-bold text-purple-600">78%</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Empleabilidad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
