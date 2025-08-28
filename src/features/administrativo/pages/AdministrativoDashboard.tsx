import { CogIcon, UsersIcon, ServerIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const adminStats = [
  { 
    name: 'Usuarios Activos', 
    value: '5,240', 
    icon: UsersIcon, 
    color: 'text-red-600',
    bg: 'bg-red-100 dark:bg-red-900' 
  },
  { 
    name: 'Sistemas Integrados', 
    value: '12', 
    icon: ServerIcon, 
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900' 
  },
  { 
    name: 'Reportes Generados', 
    value: '1,480', 
    icon: ChartBarIcon, 
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900' 
  },
  { 
    name: 'Uptime del Sistema', 
    value: '99.8%', 
    icon: CogIcon, 
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900' 
  },
];

export default function AdministrativoDashboard() {
  return (
    <div className="contenedor-principal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="main-title">Dashboard Administrativo</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            Configuración y monitoreo integral del sistema LMS
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat) => {
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
          {/* Gestión de usuarios */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Gestión de Usuarios
            </h3>
            <div className="space-y-3">
              {[
                { tipo: 'Estudiantes', cantidad: '3,850', estado: 'Activos' },
                { tipo: 'Docentes', cantidad: '245', estado: 'Activos' },
                { tipo: 'Administrativos', cantidad: '85', estado: 'Activos' },
                { tipo: 'Personal TI', cantidad: '12', estado: 'Activos' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.tipo}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.estado}</span>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {item.cantidad}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoreo del sistema */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Estado del Sistema
            </h3>
            <div className="space-y-3">
              {[
                { servicio: 'Base de Datos Principal', estado: 'Operativo', uptime: '99.9%' },
                { servicio: 'Servidor Web', estado: 'Operativo', uptime: '99.8%' },
                { servicio: 'Sistema de Archivos', estado: 'Operativo', uptime: '99.7%' },
                { servicio: 'Backup Automático', estado: 'Ejecutándose', uptime: '100%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.servicio}</span>
                    <span className="text-sm text-green-600 dark:text-green-400">{item.estado}</span>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {item.uptime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Configuraciones y reportes */}
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuraciones rápidas */}
            <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-2">
                {[
                  'Backup Manual',
                  'Reiniciar Servicios',
                  'Limpiar Cache',
                  'Generar Reporte'
                ].map((accion, index) => (
                  <button key={index} className="w-full text-left p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-900 dark:text-white">
                    {accion}
                  </button>
                ))}
              </div>
            </div>

            {/* Alertas del sistema */}
            <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Alertas y Notificaciones
              </h3>
              <div className="space-y-2">
                {[
                  { tipo: 'Info', mensaje: 'Actualización programada esta noche' },
                  { tipo: 'Warning', mensaje: 'Espacio en disco al 75%' },
                  { tipo: 'Success', mensaje: 'Backup completado exitosamente' }
                ].map((alerta, index) => (
                  <div key={index} className={`p-2 rounded-lg text-sm ${
                    alerta.tipo === 'Info' ? 'bg-blue-100 text-blue-800' :
                    alerta.tipo === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alerta.mensaje}
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas de uso */}
            <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Uso del Sistema (Hoy)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Logins</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">2,480</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Documentos subidos</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reportes generados</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Errores registrados</span>
                  <span className="text-sm font-medium text-red-600">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
