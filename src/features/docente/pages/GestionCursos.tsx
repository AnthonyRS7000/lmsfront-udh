import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/gestion-cursos.css";
import { EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

const cursos = [
  { id: 1, nombre: "Epidemiología", grupo: "A", estudiantes: 15 },
  { id: 2, nombre: "Salud Pública I", grupo: "C", estudiantes: 29 },
  { id: 3, nombre: "Farmacología", grupo: "A", estudiantes: 25 },
  { id: 4, nombre: "Farmacología", grupo: "B", estudiantes: 18 },
];

const GestionCursos: React.FC = () => {
  const navigate = useNavigate();

  // Simulación de meet, en producción se obtiene del backend
  const crearMeet = (cursoId: number) => {
    // Ejemplo: redireccionar a una URL de meet simulada
    window.location.href = `https://meet.example.com/curso/${cursoId}`;
  };

  const verCurso = (cursoId: number) => {
    // Redirecciona al módulo VerCursoGestionCursos con el id del curso
    navigate(`/docente/ver-curso/${cursoId}`);
  };

  return (
    <div className="container">
      <h2 className="gestion-cursos-title">CURSOS</h2>
      <hr className="gestion-cursos-divider" />
      <div className="gestion-cursos-container">
        <div className="gestion-cursos-grid">
          {cursos.map(curso => (
            <div key={curso.id} className="gestion-curso-card">
              <div className="gestion-curso-nombre">{curso.nombre}</div>
              <div className="gestion-curso-grupo">Grupo: {curso.grupo}</div>
              <div className="gestion-curso-estudiantes">Estudiantes: {curso.estudiantes}</div>
              <div className="gestion-curso-actions">
                <button
                  className="gestion-curso-btn"
                  onClick={() => verCurso(curso.id)}
                >
                  <EyeIcon style={{ width: '20px', height: '20px' }} />
                  Ver Curso
                </button>
                <button
                  className="gestion-curso-btn"
                  onClick={() => crearMeet(curso.id)}
                >
                  <VideoCameraIcon style={{ width: '20px', height: '20px' }} />
                  Crear Meet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestionCursos;