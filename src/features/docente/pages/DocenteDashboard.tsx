import { UserGroupIcon, BookOpenIcon, ClipboardDocumentCheckIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const docenteStats = [
  { 
    name: 'Cursos Asignados', 
    value: '4', 
    icon: BookOpenIcon, 
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900' 
  },
  { 
    name: 'Estudiantes Totales', 
    value: '180', 
    icon: UserGroupIcon, 
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900' 
  },
  { 
    name: 'Tareas por Revisar', 
    value: '25', 
    icon: ClipboardDocumentCheckIcon, 
    color: 'text-yellow-600',
    bg: 'bg-yellow-100 dark:bg-yellow-900' 
  },
  { 
    name: 'Promedio Clases', 
    value: '92%', 
    icon: AcademicCapIcon, 
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900' 
  },
];

export default function DocenteDashboard() {
  return (
    <div className="contenedor-principal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="main-title">Dashboard del Docente</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            Panel de control para gestión académica y evaluación
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {docenteStats.map((stat) => {
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
          {/* Cursos que enseña */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Mis Cursos
            </h3>
            <div className="space-y-3">
              {[
                { curso: 'Programación Web Avanzada', estudiantes: '45' },
                { curso: 'Base de Datos II', estudiantes: '38' },
                { curso: 'Ingeniería de Software', estudiantes: '52' },
                { curso: 'Sistemas Distribuidos', estudiantes: '45' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.curso}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.estudiantes} estudiantes</span>
                  </div>
                  <button className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700">
                    Gestionar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas por revisar */}
          <div className="main-2div p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Pendientes de Revisión
            </h3>
            <div className="space-y-3">
              {[
                { tarea: 'Proyecto Final - Web Avanzada', cantidad: '12 entregas' },
                { tarea: 'Examen Parcial - Base de Datos', cantidad: '8 exámenes' },
                { tarea: 'Ensayo - Ing. Software', cantidad: '5 ensayos' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{item.tarea}</span>
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">{item.cantidad}</span>
                  </div>
                  <button className="text-sm bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700">
                    Revisar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horario de clases */}
        <div className="mt-8 main-2div p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Horario de Clases - Esta Semana
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { dia: 'Lunes', clases: ['Web Avanzada 08:00', 'Base de Datos 14:00'] },
              { dia: 'Martes', clases: ['Ing. Software 10:00'] },
              { dia: 'Miércoles', clases: ['Web Avanzada 08:00', 'Sistemas Dist. 16:00'] },
              { dia: 'Jueves', clases: ['Base de Datos 14:00'] },
              { dia: 'Viernes', clases: ['Ing. Software 10:00', 'Sistemas Dist. 16:00'] }
            ].map((dia, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{dia.dia}</h4>
                {dia.clases.map((clase, idx) => (
                  <p key={idx} className="text-sm text-gray-600 dark:text-gray-400 mb-1">{clase}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
