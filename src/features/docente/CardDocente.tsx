import React from 'react';

interface CursoProps {
  curso: {
    id: number;
    nombre: string;
    codigo: string;
    grupo: string;
    detalles: string;
  };
  handleSubirSilabus: (id: number) => void;
}

const CardDocente: React.FC<CursoProps> = ({ curso, handleSubirSilabus }) => (
  <div
  style={{
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "1rem",
  width: "300px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  background: "#fff",
  }}>
    <h3 className="text-xl font-semibold mb-2 text-azul dark:text-white text-center">
      {curso.nombre}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-1 text-center">
      Código: {curso.codigo}
    </p>
    <p className="text-gray-600 dark:text-gray-300 mb-1 text-center">
      Grupo: {curso.grupo}
    </p>
    <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
      {curso.detalles}
    </p>
    <button
      style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
      }}
      onClick={() => handleSubirSilabus(curso.id)}
    >
      Subir Sílabus
    </button>
  </div>
);

export default CardDocente