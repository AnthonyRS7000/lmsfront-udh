import React, { useState } from 'react';
import './TareasPage.css';

const TaskDeliveryPanel = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Mock data para cursos con tareas
  const mockCursos = [
    {
      id: 'MAT101',
      nombre: 'MATEMÁTICA BÁSICA',
      codigo: 'MAT101',
      horario: '07:00 - 09:00',
      creditos: 4,
      dias: 'L M V',
      profesor: 'Dr. García López',
      tipo: 'obligatorio',
      prerequisitos: [],
      descripcion: 'Fundamentos de matemática para ingeniería',
      tareas: [
        {
          id: 'tarea_1',
          titulo: 'Ejercicios de Álgebra Lineal',
          descripcion: 'Resolver los problemas 1-20 del capítulo 3',
          fechaVencimiento: '2025-09-10',
          horaVencimiento: '23:59',
          estado: 'pendiente',
          puntos: 20,
          intentos: 1
        },
        {
          id: 'tarea_2',
          titulo: 'Examen Parcial de Cálculo',
          descripcion: 'Evaluación de derivadas e integrales',
          fechaVencimiento: '2025-09-15',
          horaVencimiento: '14:00',
          estado: 'entregado',
          puntos: 50,
          intentos: 1
        }
      ]
    },
    {
      id: 'FIS201',
      nombre: 'FÍSICA GENERAL',
      codigo: 'FIS201',
      horario: '09:00 - 11:00',
      creditos: 3,
      dias: 'M J V',
      profesor: 'Mg. Rodríguez Silva',
      tipo: 'obligatorio',
      prerequisitos: ['MAT101'],
      descripcion: 'Principios básicos de la física aplicada',
      tareas: [
        {
          id: 'tarea_3',
          titulo: 'Laboratorio de Mecánica',
          descripcion: 'Informe del experimento de péndulo simple',
          fechaVencimiento: '2025-09-08',
          horaVencimiento: '18:00',
          estado: 'vencido',
          puntos: 30,
          intentos: 2
        }
      ]
    },
    {
      id: 'QUI301',
      nombre: 'QUÍMICA ORGÁNICA',
      codigo: 'QUI301',
      horario: '11:00 - 13:00',
      creditos: 4,
      dias: 'L M J',
      profesor: 'Dr. Martínez Pérez',
      tipo: 'obligatorio',
      prerequisitos: ['QUI201'],
      descripcion: 'Estudio de compuestos orgánicos y sus reacciones',
      tareas: [
        {
          id: 'tarea_4',
          titulo: 'Síntesis de Compuestos',
          descripcion: 'Proyecto de síntesis de aspirina en laboratorio',
          fechaVencimiento: '2025-09-20',
          horaVencimiento: '12:00',
          estado: 'pendiente',
          puntos: 40,
          intentos: 1
        }
      ]
    }
  ];

  // Mock data para el estudiante
  const mockEstudiante = {
    nombres: 'BENYAMIN FELIX',
    apellidos: 'ADRIAN LAZARO',
    codigo: '2019110501',
    semestre: '5° SEMESTRE',
    facultad: 'INGENIERÍA',
    programa: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA',
    creditosActuales: 12,
    creditosMaximos: 22,
    cursosAprobados: ['MAT101', 'PROG101', 'QUI201', 'BIO301', 'MAT201', 'PROG201']
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'entregado':
        return <span className="status-icon delivered">✓</span>;
      case 'vencido':
        return <span className="status-icon overdue">✗</span>;
      default:
        return <span className="status-icon pending">!</span>;
    }
  };

  const getStatusClass = (estado) => {
    switch (estado) {
      case 'entregado':
        return 'status-delivered';
      case 'vencido':
        return 'status-overdue';
      default:
        return 'status-pending';
    }
  };

  const handleFileUpload = (taskId, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [taskId]: file
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDeadline = (dateString) => {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Obtener todas las tareas de todos los cursos
  const allTasks = mockCursos.flatMap(curso => 
    curso.tareas.map(tarea => ({
      ...tarea,
      curso: curso
    }))
  );

  const pendingTasks = allTasks.filter(task => task.estado === 'pendiente');
  const deliveredTasks = allTasks.filter(task => task.estado === 'entregado');
  const overdueTasks = allTasks.filter(task => task.estado === 'vencido');

  return (
    <div className="task-delivery-container">
      {/* Header */}
      <div className="header">
        <div className="student-info">
          <div className="student-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="student-details">
            <h2>{mockEstudiante.nombres} {mockEstudiante.apellidos}</h2>
            <p>{mockEstudiante.codigo} • {mockEstudiante.semestre}</p>
            <p>{mockEstudiante.programa}</p>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card pending">
            <span className="stat-number">{pendingTasks.length}</span>
            <span className="stat-label">Pendientes</span>
          </div>
          <div className="stat-card delivered">
            <span className="stat-number">{deliveredTasks.length}</span>
            <span className="stat-label">Entregadas</span>
          </div>
          <div className="stat-card overdue">
            <span className="stat-number">{overdueTasks.length}</span>
            <span className="stat-label">Vencidas</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar - Lista de Tareas */}
        <div className="sidebar">
          <h3 className="sidebar-title">
            <span className="sidebar-icon">📚</span>
            Mis Tareas
          </h3>
          
          <div className="tasks-list">
            {allTasks.map(task => (
              <div 
                key={task.id} 
                className={`task-item ${selectedTask?.id === task.id ? 'selected' : ''} ${getStatusClass(task.estado)}`}
                onClick={() => setSelectedTask(task)}
              >
                <div className="task-header">
                  <div className="task-status">
                    {getStatusIcon(task.estado)}
                  </div>
                  <div className="task-info">
                    <h4 className="task-title">{task.titulo}</h4>
                    <p className="task-course">{task.curso.codigo} - {task.curso.nombre}</p>
                  </div>
                </div>
                
                <div className="task-meta">
                  <div className="task-deadline">
                    <span className="deadline-icon">📅</span>
                    <span>{formatDate(task.fechaVencimiento)}</span>
                  </div>
                  <div className="task-points">
                    {task.puntos} pts
                  </div>
                </div>

                {task.estado === 'pendiente' && (
                  <div className={`days-remaining ${getDaysUntilDeadline(task.fechaVencimiento) <= 3 ? 'urgent' : ''}`}>
                    {getDaysUntilDeadline(task.fechaVencimiento)} días restantes
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {selectedTask ? (
            <div className="task-detail">
              <div className="task-detail-header">
                <h2>{selectedTask.titulo}</h2>
                <div className={`status-badge ${getStatusClass(selectedTask.estado)}`}>
                  {getStatusIcon(selectedTask.estado)}
                  <span>{selectedTask.estado.toUpperCase()}</span>
                </div>
              </div>

              <div className="course-info">
                <h3>{selectedTask.curso.codigo} - {selectedTask.curso.nombre}</h3>
                <p><strong>Profesor:</strong> {selectedTask.curso.profesor}</p>
                <p><strong>Horario:</strong> {selectedTask.curso.horario} ({selectedTask.curso.dias})</p>
              </div>

              <div className="task-description">
                <h4>Descripción de la tarea</h4>
                <p>{selectedTask.descripcion}</p>
              </div>

              <div className="task-details-grid">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <div>
                    <span className="detail-label">Fecha límite</span>
                    <span className="detail-value">{formatDate(selectedTask.fechaVencimiento)}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">🕐</span>
                  <div>
                    <span className="detail-label">Hora límite</span>
                    <span className="detail-value">{selectedTask.horaVencimiento}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">📄</span>
                  <div>
                    <span className="detail-label">Puntos</span>
                    <span className="detail-value">{selectedTask.puntos} pts</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">⚠️</span>
                  <div>
                    <span className="detail-label">Intentos permitidos</span>
                    <span className="detail-value">{selectedTask.intentos}</span>
                  </div>
                </div>
              </div>

              {selectedTask.estado === 'pendiente' && (
                <div className="upload-section">
                  <h4>Entregar Tarea</h4>
                  <div className="upload-area">
                    <span className="upload-icon">📤</span>
                    <p>Arrastra tu archivo aquí o haz clic para seleccionar</p>
                    <input 
                      type="file" 
                      id={`file-${selectedTask.id}`}
                      className="file-input"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleFileUpload(selectedTask.id, file);
                        }
                      }}
                    />
                    <label htmlFor={`file-${selectedTask.id}`} className="upload-button">
                      Seleccionar Archivo
                    </label>
                  </div>
                  
                  {uploadedFiles[selectedTask.id] && (
                    <div className="uploaded-file">
                      <span className="file-icon">📄</span>
                      <span>{uploadedFiles[selectedTask.id].name}</span>
                      <button className="submit-button">
                        Entregar Tarea
                      </button>
                    </div>
                  )}
                </div>
              )}

              {selectedTask.estado === 'entregado' && (
                <div className="success-message">
                  <span className="message-icon">✅</span>
                  <p>Tarea entregada exitosamente</p>
                </div>
              )}

              {selectedTask.estado === 'vencido' && (
                <div className="error-message">
                  <span className="message-icon">❌</span>
                  <p>Esta tarea ha vencido. Contacta a tu profesor si necesitas una extensión.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="no-task-selected">
              <span className="no-task-icon">📚</span>
              <h3>Selecciona una tarea</h3>
              <p>Elige una tarea de la lista para ver los detalles y realizar la entrega</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDeliveryPanel;