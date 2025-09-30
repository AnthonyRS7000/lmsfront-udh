import React from 'react';
import '../css/EducacionDistancia.css';

const EducacionDistancia: React.FC = () => {
  return (
    <div className="tramites-root educacion-distancia-root">
      <h2 className="tramites-title educacion-distancia-title">Educación a Distancia</h2>

      <div className="tramites-card educacion-distancia-card">
        <div className="tramites-card-header">
          <h3 style={{ margin: 0, fontWeight: 800, color: 'var(--title-color)' }}>Programas semipresenciales</h3>
        </div>
        <div className="tramites-card-body">
          <p style={{ marginTop: 4, color: 'var(--muted)', fontWeight: 600 }}>Accede a cursos y contenidos diseñados para la modalidad semipresencial.</p>
          <div className="action-center">
            <a className="btn-primary" href="https://semipresencial.udh.edu.pe/" target="_blank" rel="noreferrer">Ir a Educación a Distancia</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducacionDistancia;
