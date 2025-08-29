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
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2563eb',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Dashboard del Docente
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Panel de control para gestión académica y evaluación
          </p>
        </div>

        {/* Estadísticas principales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {docenteStats.map((stat) => {
            const IconComponent = stat.icon;
            const iconColor = stat.color === 'text-green-600' ? '#16a34a' :
                            stat.color === 'text-blue-600' ? '#2563eb' :
                            stat.color === 'text-yellow-600' ? '#d97706' :
                            stat.color === 'text-purple-600' ? '#9333ea' : '#6b7280';
            
            const bgColor = stat.bg === 'bg-green-100 dark:bg-green-900' ? '#dcfce7' :
                          stat.bg === 'bg-blue-100 dark:bg-blue-900' ? '#dbeafe' :
                          stat.bg === 'bg-yellow-100 dark:bg-yellow-900' ? '#fef3c7' :
                          stat.bg === 'bg-purple-100 dark:bg-purple-900' ? '#f3e8ff' : '#f3f4f6';
            
            return (
              <div key={stat.name} style={{
                backgroundColor: 'white',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{
                    backgroundColor: bgColor,
                    padding: '0.75rem',
                    borderRadius: '0.5rem'
                  }}>
                    <IconComponent style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      color: iconColor
                    }} />
                  </div>
                  <div style={{
                    marginLeft: '1rem'
                  }}>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#6b7280',
                      marginBottom: '0.25rem'
                    }}>
                      {stat.name}
                    </p>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#1f2937'
                    }}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secciones principales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Cursos que enseña */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Mis Cursos
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { curso: 'Programación Web Avanzada', estudiantes: '45' },
                { curso: 'Base de Datos II', estudiantes: '38' },
                { curso: 'Ingeniería de Software', estudiantes: '52' },
                { curso: 'Sistemas Distribuidos', estudiantes: '45' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem'
                }}>
                  <div>
                    <span style={{
                      fontWeight: '500',
                      color: '#1f2937',
                      display: 'block'
                    }}>{item.curso}</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>{item.estudiantes} estudiantes</span>
                  </div>
                  <button style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                  >
                    Gestionar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas por revisar */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Pendientes de Revisión
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { tarea: 'Proyecto Final - Web Avanzada', cantidad: '12 entregas' },
                { tarea: 'Examen Parcial - Base de Datos', cantidad: '8 exámenes' },
                { tarea: 'Ensayo - Ing. Software', cantidad: '5 ensayos' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem'
                }}>
                  <div>
                    <span style={{
                      fontWeight: '500',
                      color: '#1f2937',
                      display: 'block'
                    }}>{item.tarea}</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#d97706'
                    }}>{item.cantidad}</span>
                  </div>
                  <button style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#d97706',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b45309'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                  >
                    Revisar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horario de clases */}
        <div style={{
          marginTop: '2rem',
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Horario de Clases - Esta Semana
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { dia: 'Lunes', clases: ['Web Avanzada 08:00', 'Base de Datos 14:00'] },
              { dia: 'Martes', clases: ['Ing. Software 10:00'] },
              { dia: 'Miércoles', clases: ['Web Avanzada 08:00', 'Sistemas Dist. 16:00'] },
              { dia: 'Jueves', clases: ['Base de Datos 14:00'] },
              { dia: 'Viernes', clases: ['Ing. Software 10:00', 'Sistemas Dist. 16:00'] }
            ].map((dia, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <h4 style={{
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>{dia.dia}</h4>
                {dia.clases.map((clase, idx) => (
                  <p key={idx} style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                  }}>{clase}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
