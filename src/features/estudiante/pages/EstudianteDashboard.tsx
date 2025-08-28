import { BookOpenIcon, ClipboardDocumentListIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const estudianteStats = [
  { 
    name: 'Cursos Activos', 
    value: '6', 
    icon: BookOpenIcon, 
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900' 
  },
  { 
    name: 'Tareas Pendientes', 
    value: '12', 
    icon: ClipboardDocumentListIcon, 
    color: 'text-red-600',
    bg: 'bg-red-100 dark:bg-red-900' 
  },
  { 
    name: 'Próximos Exámenes', 
    value: '3', 
    icon: CalendarIcon, 
    color: 'text-yellow-600',
    bg: 'bg-yellow-100 dark:bg-yellow-900' 
  },
  { 
    name: 'Promedio General', 
    value: '85%', 
    icon: ChartBarIcon, 
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900' 
  },
];

export default function EstudianteDashboard() {
  return (
    <div className="contenedor-principal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="main-title">Dashboard del Estudiante</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            Bienvenido a tu panel de control académico
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estudianteStats.map((stat) => {
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
          {/* Cursos recientes */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Cursos Activos
            </h3>
            <div className="space-y-3">
              {['Cálculo I', 'Programación Web', 'Base de Datos', 'Inglés Técnico'].map((curso, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">{curso}</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">Ver más</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas pendientes */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Tareas Pendientes
            </h3>
            <div className="space-y-3">
              {[
                { tarea: 'Ejercicios de Cálculo', fecha: 'Vence: 2 días' },
                { tarea: 'Proyecto Web Final', fecha: 'Vence: 1 semana' },
                { tarea: 'Ensayo de Base de Datos', fecha: 'Vence: 3 días' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.tarea}</span>
                    <span className="text-sm text-red-600 dark:text-red-400">{item.fecha}</span>
                  </div>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                    Ver
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendario de próximos eventos */}
        <div className="mt-8 main-2div p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Próximos Eventos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { evento: 'Examen de Cálculo I', fecha: '15 Marzo 2025', hora: '08:00 AM' },
              { evento: 'Presentación Proyecto Web', fecha: '18 Marzo 2025', hora: '10:00 AM' },
              { evento: 'Entrega Final BD', fecha: '20 Marzo 2025', hora: '11:59 PM' }
            ].map((evento, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white">{evento.evento}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{evento.fecha}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">{evento.hora}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
