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
            Dashboard de la Escuela
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Administración y gestión de programas académicos
          </p>
        </div>

        {/* Estadísticas principales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {escuelaStats.map((stat) => {
            const IconComponent = stat.icon;
            const iconColor = stat.color === 'text-purple-600' ? '#9333ea' :
                            stat.color === 'text-blue-600' ? '#2563eb' :
                            stat.color === 'text-green-600' ? '#16a34a' :
                            stat.color === 'text-orange-600' ? '#ea580c' : '#6b7280';
            
            const bgColor = stat.bg === 'bg-purple-100 dark:bg-purple-900' ? '#f3e8ff' :
                          stat.bg === 'bg-blue-100 dark:bg-blue-900' ? '#dbeafe' :
                          stat.bg === 'bg-green-100 dark:bg-green-900' ? '#dcfce7' :
                          stat.bg === 'bg-orange-100 dark:bg-orange-900' ? '#fed7aa' : '#f3f4f6';
            
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
          {/* Programas académicos */}
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
              Programas Académicos
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { programa: 'Ingeniería de Sistemas', estudiantes: '320', estado: 'Activo' },
                { programa: 'Ingeniería Industrial', estudiantes: '280', estado: 'Activo' },
                { programa: 'Ingeniería Civil', estudiantes: '350', estado: 'Activo' },
                { programa: 'Arquitectura', estudiantes: '300', estado: 'Activo' }
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
                    }}>{item.programa}</span>
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
                    {item.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Docentes por programa */}
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
              Distribución de Docentes
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { programa: 'Ing. Sistemas', docentes: '12', tipo: 'Tiempo Completo' },
                { programa: 'Ing. Industrial', docentes: '10', tipo: 'Tiempo Completo' },
                { programa: 'Ing. Civil', docentes: '15', tipo: 'Tiempo Completo' },
                { programa: 'Arquitectura', docentes: '8', tipo: 'Tiempo Parcial' }
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
                    }}>{item.programa}</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>{item.tipo}</span>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
                    {item.docentes} docentes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reportes y estadísticas */}
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
            Indicadores Académicos
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
                color: '#16a34a'
              }}>87%</h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Tasa de Graduación</p>
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
              }}>92%</h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Satisfacción Estudiantil</p>
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
              }}>78%</h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>Empleabilidad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
