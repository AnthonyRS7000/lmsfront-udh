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
            color: '#dc2626',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Dashboard Administrativo
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Configuración y monitoreo integral del sistema LMS
          </p>
        </div>

        {/* Estadísticas principales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {adminStats.map((stat) => {
            const IconComponent = stat.icon;
            const iconColor = stat.color === 'text-red-600' ? '#dc2626' :
                            stat.color === 'text-blue-600' ? '#2563eb' :
                            stat.color === 'text-green-600' ? '#16a34a' :
                            stat.color === 'text-purple-600' ? '#9333ea' : '#6b7280';
            
            const bgColor = stat.bg === 'bg-red-100 dark:bg-red-900' ? '#fecaca' :
                           stat.bg === 'bg-blue-100 dark:bg-blue-900' ? '#dbeafe' :
                           stat.bg === 'bg-green-100 dark:bg-green-900' ? '#dcfce7' :
                           stat.bg === 'bg-purple-100 dark:bg-purple-900' ? '#e9d5ff' : '#f3f4f6';
            
            return (
              <div key={stat.name} style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
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
                      margin: '0'
                    }}>
                      {stat.name}
                    </p>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#111827',
                      margin: '0'
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
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}>
          {/* Gestión de usuarios */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Gestión de Usuarios
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { tipo: 'Estudiantes', cantidad: '3,850', estado: 'Activos' },
                { tipo: 'Docentes', cantidad: '245', estado: 'Activos' },
                { tipo: 'Administrativos', cantidad: '85', estado: 'Activos' },
                { tipo: 'Personal TI', cantidad: '12', estado: 'Activos' }
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
                      color: '#111827',
                      display: 'block'
                    }}>{item.tipo}</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>{item.estado}</span>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
                    {item.cantidad}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoreo del sistema */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Estado del Sistema
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { servicio: 'Base de Datos Principal', estado: 'Operativo', uptime: '99.9%' },
                { servicio: 'Servidor Web', estado: 'Operativo', uptime: '99.8%' },
                { servicio: 'Sistema de Archivos', estado: 'Operativo', uptime: '99.7%' },
                { servicio: 'Backup Automático', estado: 'Ejecutándose', uptime: '100%' }
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
                      color: '#111827',
                      display: 'block'
                    }}>{item.servicio}</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#16a34a'
                    }}>{item.estado}</span>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
                    {item.uptime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Configuraciones y reportes */}
        <div style={{
          marginTop: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2rem'
          }}>
            {/* Configuraciones rápidas */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Acciones Rápidas
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {[
                  'Backup Manual',
                  'Reiniciar Servicios',
                  'Limpiar Cache',
                  'Generar Reporte'
                ].map((accion, index) => (
                  <button key={index} style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    color: '#111827',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f9fafb'}>
                    {accion}
                  </button>
                ))}
              </div>
            </div>

            {/* Alertas del sistema */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Alertas y Notificaciones
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {[
                  { tipo: 'Info', mensaje: 'Actualización programada esta noche' },
                  { tipo: 'Warning', mensaje: 'Espacio en disco al 75%' },
                  { tipo: 'Success', mensaje: 'Backup completado exitosamente' }
                ].map((alerta, index) => (
                  <div key={index} style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: alerta.tipo === 'Info' ? '#dbeafe' :
                                  alerta.tipo === 'Warning' ? '#fef3c7' : '#dcfce7',
                    color: alerta.tipo === 'Info' ? '#1e40af' :
                          alerta.tipo === 'Warning' ? '#92400e' : '#166534'
                  }}>
                    {alerta.mensaje}
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas de uso */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Uso del Sistema (Hoy)
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>Logins</span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#111827'
                  }}>2,480</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>Documentos subidos</span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#111827'
                  }}>156</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>Reportes generados</span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#111827'
                  }}>24</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>Errores registrados</span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#dc2626'
                  }}>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
