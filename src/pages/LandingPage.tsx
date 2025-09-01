import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  ArrowRightIcon,
  PlayIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CloudArrowUpIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Inicio', href: '#home' },
    { name: 'Características', href: '#features' },
    { name: 'Soluciones', href: '#solutions' },
    { name: 'Precios', href: '#pricing' },
    { name: 'Contacto', href: '#contact' },
  ];

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Gestión Multi-Rol',
      description: 'Sistema completo para estudiantes, docentes, escuelas, facultades y administradores con interfaces especializadas y flujos de trabajo optimizados.'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Avanzado',
      description: 'Dashboards interactivos, reportes en tiempo real y métricas detalladas para tomar decisiones basadas en datos.'
    },
    {
      icon: CloudArrowUpIcon,
      title: 'Cloud Computing',
      description: 'Infraestructura en la nube escalable con 99.9% de uptime, backup automático y sincronización global.'
    },
    {
      icon: LockClosedIcon,
      title: 'Seguridad Enterprise',
      description: 'Encriptación end-to-end, autenticación multifactor y cumplimiento con estándares GDPR e ISO 27001.'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile First',
      description: 'Diseño responsivo optimizado para todos los dispositivos con aplicaciones nativas disponibles.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Alcance Global',
      description: 'Soporte multiidioma, múltiples zonas horarias y adaptación a diferentes sistemas educativos internacionales.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Estudiantes Activos', icon: '👥' },
    { value: '1,200+', label: 'Instituciones', icon: '🏫' },
    { value: '25+', label: 'Países', icon: '🌍' },
    { value: '99.9%', label: 'Uptime', icon: '⚡' }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <header style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              marginRight: '12px'
            }}>
              <AcademicCapIcon style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#1e293b',
                lineHeight: '1'
              }}>
                LMS UDH
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#64748b',
                lineHeight: '1'
              }}>
                Education Platform
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  color: '#64748b',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: '#64748b',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.color = '#1e293b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              Empezar Gratis
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: window.innerWidth < 768 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? (
                <XMarkIcon style={{ width: '24px', height: '24px', color: '#64748b' }} />
              ) : (
                <Bars3Icon style={{ width: '24px', height: '24px', color: '#64748b' }} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f1f5f9'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section id="home" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '4rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
            gap: '3rem',
            alignItems: 'center',
            minHeight: '600px'
          }}>
            {/* Hero Content */}
            <div style={{ zIndex: 10, position: 'relative' }}>
              <h1 style={{
                fontSize: window.innerWidth >= 768 ? '3.5rem' : '2.5rem',
                fontWeight: '900',
                lineHeight: '1.1',
                color: 'white',
                marginBottom: '1.5rem'
              }}>
                El Futuro de la{' '}
                <span style={{
                  background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Educación Digital
                </span>
              </h1>
              
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Transforma tu institución educativa con nuestra plataforma LMS integral. 
                Gestión académica, aprendizaje virtual y analytics avanzados en un solo lugar.
              </p>

              <div style={{
                display: 'flex',
                flexDirection: window.innerWidth >= 640 ? 'row' : 'column',
                gap: '1rem',
                marginBottom: '3rem'
              }}>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    backgroundColor: 'white',
                    color: '#667eea',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  Comenzar Ahora
                  <ArrowRightIcon style={{ width: '20px', height: '20px' }} />
                </button>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  <PlayIcon style={{ width: '20px', height: '20px' }} />
                  Ver Demo
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2rem'
              }}>
                {stats.map((stat, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '2rem',
                      marginBottom: '0.5rem'
                    }}>
                      {stat.icon}
                    </div>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: '700',
                      color: 'white',
                      marginBottom: '0.25rem'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Dashboard Preview */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{
                  width: '400px',
                  height: '250px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  position: 'relative'
                }}>
                  {/* Mock Dashboard Elements */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '8px'
                    }} />
                    <div style={{
                      width: '80px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      borderRadius: '8px'
                    }} />
                    <div style={{
                      width: '80px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      borderRadius: '8px'
                    }} />
                  </div>
                  
                  <div style={{
                    width: '100%',
                    height: '80px',
                    background: 'white',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid #e2e8f0'
                  }} />
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      flex: '2',
                      height: '40px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }} />
                    <div style={{
                      flex: '1',
                      height: '40px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{
          padding: '5rem 0',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Características Principales
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Todo lo que necesitas para digitalizar y optimizar tu institución educativa
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(3, 1fr)' : window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
              gap: '2rem'
            }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    padding: '2.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    marginBottom: '1.5rem'
                  }}>
                    <feature.icon style={{ width: '30px', height: '30px', color: 'white' }} />
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </h3>
                  
                  <p style={{
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" style={{
          padding: '5rem 0',
          backgroundColor: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
              gap: '4rem',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '1.5rem'
                }}>
                  Soluciones para Cada Rol
                </h2>
                
                <p style={{
                  fontSize: '1.1rem',
                  color: '#64748b',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  Nuestra plataforma se adapta perfectamente a las necesidades específicas 
                  de cada usuario en el ecosistema educativo.
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {[
                    { role: 'Estudiantes', desc: 'Acceso a cursos, tareas y calificaciones' },
                    { role: 'Docentes', desc: 'Gestión de clases y evaluación de estudiantes' },
                    { role: 'Administradores', desc: 'Control total del sistema y reportes' },
                    { role: 'Instituciones', desc: 'Gestión académica y administrativa completa' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{
                          fontWeight: '600',
                          color: '#1e293b',
                          marginBottom: '0.25rem'
                        }}>
                          {item.role}
                        </div>
                        <div style={{
                          color: '#64748b',
                          fontSize: '0.9rem'
                        }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '400px',
                  height: '300px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e2e8f0'
                }}>
                  <UserGroupIcon style={{
                    width: '120px',
                    height: '120px',
                    color: '#667eea'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '5rem 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1.5rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              ¿Listo para Transformar tu Institución?
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              Únete a miles de instituciones que ya confían en nuestra plataforma 
              para brindar educación de calidad en la era digital.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth >= 640 ? 'row' : 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  padding: '1rem 2.5rem',
                  backgroundColor: 'white',
                  color: '#667eea',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
              >
                Comenzar Prueba Gratuita
              </button>
              
              <button
                style={{
                  padding: '1rem 2.5rem',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
              >
                Solicitar Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#1e293b',
          padding: '3rem 0 2rem',
          color: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(4, 1fr)' : '1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Logo Column */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '10px',
                    marginRight: '12px'
                  }}>
                    <AcademicCapIcon style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '700'
                  }}>
                    LMS UDH
                  </div>
                </div>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  Transformando la educación a través de la tecnología y la innovación.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  Enlaces Rápidos
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {['Características', 'Precios', 'Documentación', 'Soporte'].map((link) => (
                    <a
                      key={link}
                      href="#"
                      style={{
                        color: '#94a3b8',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  Soluciones
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {['Para Universidades', 'Para Colegios', 'Para Institutos', 'Capacitación Empresarial'].map((solution) => (
                    <a
                      key={solution}
                      href="#"
                      style={{
                        color: '#94a3b8',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {solution}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  Contacto
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.9rem'
                }}>
                  <div>info@lmsudh.edu</div>
                  <div>+51 123 456 789</div>
                  <div>Lima, Perú</div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
              borderTop: '1px solid #334155',
              paddingTop: '2rem',
              display: 'flex',
              flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                color: '#94a3b8',
                fontSize: '0.9rem'
              }}>
                © 2024 LMS UDH. Todos los derechos reservados.
              </div>
              
              <div style={{
                display: 'flex',
                gap: '2rem'
              }}>
                {['Política de Privacidad', 'Términos de Servicio', 'Cookies'].map((legal) => (
                  <a
                    key={legal}
                    href="#"
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {legal}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
