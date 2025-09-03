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
            Dashboard de la Facultad
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Gestión integral de escuelas y recursos académicos
          </p>
        </div>

        {/* Estadísticas principales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {facultadStats.map((stat) => {
            const IconComponent = stat.icon;
            const iconColor = stat.color === 'text-orange-600' ? '#ea580c' :
                            stat.color === 'text-blue-600' ? '#2563eb' :
                            stat.color === 'text-green-600' ? '#16a34a' :
                            stat.color === 'text-purple-600' ? '#9333ea' : '#6b7280';
            
            const bgColor = stat.bg === 'bg-orange-100 dark:bg-orange-900' ? '#fed7aa' :
                          stat.bg === 'bg-blue-100 dark:bg-blue-900' ? '#dbeafe' :
                          stat.bg === 'bg-green-100 dark:bg-green-900' ? '#dcfce7' :
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
          {/* Escuelas de la facultad */}
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
              Escuelas de la Facultad
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { escuela: 'Ingeniería de Sistemas', estudiantes: '1,250', presupuesto: '$650K' },
                { escuela: 'Ingeniería Industrial', estudiantes: '980', presupuesto: '$520K' },
                { escuela: 'Ingeniería Civil', estudiantes: '1,100', presupuesto: '$580K' },
                { escuela: 'Arquitectura', estudiantes: '520', presupuesto: '$380K' }
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
                    }}>{item.escuela}</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>{item.estudiantes} estudiantes</span>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
                    {item.presupuesto}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos estratégicos */}
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
              Proyectos Estratégicos
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { proyecto: 'Modernización Laboratorios', estado: 'En Progreso', avance: '65%' },
                { proyecto: 'Campus Digital', estado: 'Planificación', avance: '25%' },
                { proyecto: 'Centro de Investigación', estado: 'En Progreso', avance: '80%' },
                { proyecto: 'Programa Intercambio', estado: 'Completado', avance: '100%' }
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
                    }}>{item.proyecto}</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>{item.estado}</span>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
                    {item.avance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores de gestión */}
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
            Indicadores de Gestión Anual
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem'
            }}>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#ea580c'
              }}>89%</h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Retención Estudiantil</p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem'
            }}>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#16a34a'
              }}>$2.1M</h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Ingresos Generados</p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem'
            }}>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#2563eb'
              }}>95%</h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Satisfacción Docente</p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem'
            }}>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#9333ea'
              }}>12</h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Nuevos Convenios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
