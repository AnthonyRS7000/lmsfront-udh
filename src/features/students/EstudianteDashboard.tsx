import React, { useEffect, useState } from 'react';
import { BookOpenIcon, ClipboardDocumentListIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { cache } from "../../components/pages/Cache";
import { ApiService } from "../../components/pages/ApiService";
import './EstudianteDashboard.css';

const estudianteStats = [
{ name: 'Cursos Activos', value: '6', icon: BookOpenIcon, color: '#2563eb', bgColor: '#dbeafe' },
  { name: 'Tramites en Proceso', value: '2', icon: ClipboardDocumentListIcon, color: '#dc2626', bgColor: '#fecaca' },
  { name: 'Próximos Exámenes', value: '15/10/2025', icon: CalendarIcon, color: '#d97706', bgColor: '#fef3c7' },
  { name: 'Promedio', value: '85%', icon: ChartBarIcon, color: '#16a34a', bgColor: '#dcfce7' },
];

const calcularSemestre = (): string => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;

    if (mes >= 1 && mes <= 3) {
        return `${año}-0`;
    } else if (mes >= 4 && mes <= 7) {
        return `${año}-1`;
    } else if (mes >= 8 && mes <= 11) {
        return `${año}-2`;
    } else {
        return `${año}-2`;
    }
};

export default function EstudianteDashboard() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [notas, setNotas] = useState([]); 
  const [udhData, setUdhData] = useState<any>(null);
  const [loadingNotas, setLoadingNotas] = useState(false);
  const [errorNotas, setErrorNotas] = useState(false);
  const [loadingCursos, setLoadingCursos] = useState(false);
  const [errorCursos, setErrorCursos] = useState<string | null>(null);
  const [fechaActual, setFechaActual] = useState(new Date());
  const [ultimoSemestre, setUltimoSemestre] = useState("");

  /*
  useEffect(() => {
      const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
      setUdhData(datosUdh);
      setUltimoSemestre(datosUdh.ult_sem);
  }, []);
  
  const CACHE_KEY = `notasParciales_${ultimoSemestre}`;
  const CACHE_EXPIRATION_MINUTES = 30;

  useEffect(() => {
      if (udhData && udhData.codigo) {
          const cachedData = cache.get(CACHE_KEY);
          if (cachedData) {
              setNotas(cachedData);
              setErrorNotas(false);
          } else {
              fetchNotas();
          }
      }
  }, [udhData]);

  const fetchNotas = async () => {
      try {
      setLoadingNotas(true); 
      const codigoAlumno = udhData.codigo;
      
      const data_notas = await ApiService.get(`/estudiantes/notas?codalu=${codigoAlumno}&semsem=${ultimoSemestre}`);

      if (data_notas.data.status === "error") {
        setErrorCursos('No se encuentra matriculado en el presente ciclo.');
        return;
      }

      if (!data_notas.data || data_notas.status === "error") {
          setErrorNotas(true);
          setNotas([]); 
      } else {
          setNotas(data_notas.data);
          setErrorNotas(false);
          cache.set(CACHE_KEY, data_notas.data, CACHE_EXPIRATION_MINUTES);
      }
      } catch (error) {
      console.error("Error al cargar las notas:", error);
      setErrorNotas(true);
      } finally {
      setLoadingNotas(false);
      }
  };*/

  
  useEffect(() => {
    // Obtener el último semestre desde localStorage
    const datosUdh = localStorage.getItem('datos_udh');
    const ultimoSemestre = datosUdh ? JSON.parse(datosUdh).ult_sem : null;

    if (ultimoSemestre !== calcularSemestre()) {
      setErrorCursos('No se encuentra matriculado en el presente ciclo.');
      return;
    }

    // Simulación de consulta a la API (reemplaza con tu endpoint)
    setLoadingCursos(true);
    setTimeout(() => {
      const respuestaApi = {
        status: 'success', // Cambia a 'error' para probar el mensaje de error
        data: [
          {
            nombre_curso: 'Cálculo I',
            TA1: 15,
            TA2: 14,
            TA3: 16,
            fecha_inicio: '2025-10-01',
            fecha_fin: '2025-11-01',
          },
          {
            nombre_curso: 'Programación Web',
            TA1: 18,
            TA2: 17,
            TA3: 19,
            fecha_inicio: '2025-11-01',
            fecha_fin: '2025-12-01',
          },
        ],
      };

      if (respuestaApi.status === 'error') {
        setErrorCursos('No se encuentra matriculado en el presente ciclo.');
      } else {
        const cursosFiltrados = respuestaApi.data.filter((curso: any) => {
          const fechaInicio = new Date(curso.fecha_inicio);
          const fechaFin = new Date(curso.fecha_fin);
          return fechaActual >= fechaInicio && fechaActual <= fechaFin;
        });
        setCursos(cursosFiltrados);
      }

      setLoadingCursos(false);
    }, 1000); // Simulación de tiempo de respuesta
  }, [fechaActual]);

  return (
    <div className="estudiante-dash-root">
      <div className="estudiante-dash-container">
        <div className="estudiante-dash-header">
          <h1 className="estudiante-dash-title">Dashboard del Estudiante</h1>
          <p className="estudiante-dash-subtitle">Bienvenido a tu panel de control académico</p>
        </div>

        {/* Estadísticas principales */}
        <div className="estudiante-dash-stats">
          {estudianteStats.map((stat) => (
            <div key={stat.name} className="estudiante-dash-stat-card">
              <div className="estudiante-dash-stat-content">
                <div
                  className="estudiante-dash-stat-icon"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon
                    className="estudiante-dash-stat-icon-svg"
                    style={{ color: stat.color }}
                  />
                </div>
                <div className="estudiante-dash-stat-text">
                  <p className="estudiante-dash-stat-name">{stat.name}</p>
                  <p className="estudiante-dash-stat-value">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secciones principales */}
        <div className="estudiante-dash-sections">
          {/* Cursos recientes */}
          <div className="estudiante-dash-section-card">
            <h3 className="estudiante-dash-section-title">Ultimas Notas</h3>
            <div className="estudiante-dash-section-content">
              {loadingCursos && <div>Cargando cursos...</div>}
              {errorCursos && <div className="estudiante-dash-error">{errorCursos}</div>}
              {cursos.map((curso, index) => (
                <div key={index} className="estudiante-dash-section-item">
                  <span className="estudiante-dash-section-item-name">{curso.nombre_curso}</span>
                  <span className="estudiante-dash-section-item-link">
                    T3: {curso.TA3}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas pendientes */}
          <div className="estudiante-dash-section-card">
            <h3 className="estudiante-dash-section-title">Tramites en Proceso</h3>
            <div className="estudiante-dash-section-content">
              {[
                { tramite: 'Ejercicios de Cálculo', estado: 'Pendiente' },
                { tramite: 'Proyecto Web Final', estado: 'Secretaria' },
                { tramite: 'Ensayo de Base de Datos', estado: 'Vence: 3 días' },
              ].map((item, index) => (
                <div key={index} className="estudiante-dash-section-item">
                  <div>
                    <span className="estudiante-dash-section-item-name">{item.tramite}</span>
                    <span className="estudiante-dash-section-item-link">{item.estado}</span>
                  </div>
                  <button className="estudiante-dash-button">Ver</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendario de próximos eventos */}
        <div className="estudiante-dash-calendar">
          <h3 className="estudiante-dash-calendar-title">Próximos Eventos</h3>
          <div className="estudiante-dash-calendar-grid">
            {[
              { evento: 'Examen de Cálculo I', fecha: '15 Marzo 2025', hora: '08:00 AM' },
              { evento: 'Presentación Proyecto Web', fecha: '18 Marzo 2025', hora: '10:00 AM' },
              { evento: 'Entrega Final BD', fecha: '20 Marzo 2025', hora: '11:59 PM' },
            ].map((evento, index) => (
              <div key={index} className="estudiante-dash-calendar-item">
                <h4 className="estudiante-dash-calendar-item-title">{evento.evento}</h4>
                <p className="estudiante-dash-calendar-item-date">{evento.fecha}</p>
                <p className="estudiante-dash-calendar-item-time">{evento.hora}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}