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
            Dashboard del Estudiante
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Bienvenido a tu panel de control académico
          </p>
        </div>

        {/* Estadísticas principales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {estudianteStats.map((stat) => {
            const IconComponent = stat.icon;
            const iconColor = stat.color === 'text-blue-600' ? '#2563eb' :
                            stat.color === 'text-red-600' ? '#dc2626' :
                            stat.color === 'text-yellow-600' ? '#d97706' :
                            stat.color === 'text-green-600' ? '#16a34a' : '#6b7280';
            
            const bgColor = stat.bg === 'bg-blue-100 dark:bg-blue-900' ? '#dbeafe' :
                          stat.bg === 'bg-red-100 dark:bg-red-900' ? '#fecaca' :
                          stat.bg === 'bg-yellow-100 dark:bg-yellow-900' ? '#fef3c7' :
                          stat.bg === 'bg-green-100 dark:bg-green-900' ? '#dcfce7' : '#f3f4f6';
            
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
          {/* Cursos recientes */}
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
              Cursos Activos
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {['Cálculo I', 'Programación Web', 'Base de Datos', 'Inglés Técnico'].map((curso, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem'
                }}>
                  <span style={{
                    fontWeight: '500',
                    color: '#1f2937'
                  }}>{curso}</span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#2563eb',
                    cursor: 'pointer'
                  }}>Ver más</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas pendientes */}
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
              Tareas Pendientes
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { tarea: 'Ejercicios de Cálculo', fecha: 'Vence: 2 días' },
                { tarea: 'Proyecto Web Final', fecha: 'Vence: 1 semana' },
                { tarea: 'Ensayo de Base de Datos', fecha: 'Vence: 3 días' }
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
                      color: '#dc2626'
                    }}>{item.fecha}</span>
                  </div>
                  <button style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    Ver
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendario de próximos eventos */}
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
            Próximos Eventos
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { evento: 'Examen de Cálculo I', fecha: '15 Marzo 2025', hora: '08:00 AM' },
              { evento: 'Presentación Proyecto Web', fecha: '18 Marzo 2025', hora: '10:00 AM' },
              { evento: 'Entrega Final BD', fecha: '20 Marzo 2025', hora: '11:59 PM' }
            ].map((evento, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <h4 style={{
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>{evento.evento}</h4>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>{evento.fecha}</p>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#2563eb'
                }}>{evento.hora}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
