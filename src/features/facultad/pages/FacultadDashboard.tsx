import { BuildingOfficeIcon, BuildingLibraryIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const facultadStats = [
  { 
    name: 'Escuelas', 
    value: '5', 
    icon: BuildingLibraryIcon, 
    color: 'text-orange-600',
    bg: 'bg-orange-100 dark:bg-orange-900' 
  },
  { 
    name: 'Estudiantes Totales', 
    value: '3,850', 
    icon: BuildingOfficeIcon, 
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900' 
  },
  { 
    name: 'Presupuesto Anual', 
    value: '$2.5M', 
    icon: CurrencyDollarIcon, 
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900' 
  },
  { 
    name: 'Eficiencia Académica', 
    value: '89%', 
    icon: ChartBarIcon, 
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900' 
  },
];

export default function FacultadDashboard() {
  return (
    <div className="contenedor-principal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="main-title">Dashboard de la Facultad</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            Gestión integral de escuelas y recursos académicos
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {facultadStats.map((stat) => {
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
          {/* Escuelas de la facultad */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Escuelas de la Facultad
            </h3>
            <div className="space-y-3">
              {[
                { escuela: 'Ingeniería de Sistemas', estudiantes: '1,250', presupuesto: '$650K' },
                { escuela: 'Ingeniería Industrial', estudiantes: '980', presupuesto: '$520K' },
                { escuela: 'Ingeniería Civil', estudiantes: '1,100', presupuesto: '$580K' },
                { escuela: 'Arquitectura', estudiantes: '520', presupuesto: '$380K' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.escuela}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.estudiantes} estudiantes</span>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {item.presupuesto}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos estratégicos */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Proyectos Estratégicos
            </h3>
            <div className="space-y-3">
              {[
                { proyecto: 'Modernización Laboratorios', estado: 'En Progreso', avance: '65%' },
                { proyecto: 'Campus Digital', estado: 'Planificación', avance: '25%' },
                { proyecto: 'Centro de Investigación', estado: 'En Progreso', avance: '80%' },
                { proyecto: 'Programa Intercambio', estado: 'Completado', avance: '100%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.proyecto}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.estado}</span>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {item.avance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores de gestión */}
        <div className="mt-8 main-2div p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Indicadores de Gestión Anual
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-2xl font-bold text-orange-600">89%</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Retención Estudiantil</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-2xl font-bold text-green-600">$2.1M</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos Generados</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-2xl font-bold text-blue-600">95%</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Satisfacción Docente</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-2xl font-bold text-purple-600">12</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nuevos Convenios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
