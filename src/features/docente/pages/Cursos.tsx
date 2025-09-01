import { useNavigate } from "react-router-dom";
import CardDocente from "../CardDocente";

// Agregar más cursos aquí luego configurar con datos reales
const cursos = [
  {
    id: 1,
    nombre: "Matemática Básica",
    codigo: "MAT101",
    grupo: "A",
    detalles: "Créditos: 4 | Semestre: 2025-I",
  },
  {
    id: 2,
    nombre: "Programación I",
    codigo: "INF102",
    grupo: "A",
    detalles: "Créditos: 3 | Semestre: 2025-I",
  },
  {
    id: 3,
    nombre: "Programación II",
    codigo: "INF103",
    grupo: "A",
    detalles: "Créditos: 3 | Semestre: 2025-I",
  },
  {
    id: 4,
    nombre: "Programación III",
    codigo: "INF104",
    grupo: "A",
    detalles: "Créditos: 3 | Semestre: 2025-I",
  },
  {
    id: 5,
    nombre: "Programación I",
    codigo: "INF105",
    grupo: "B",
    detalles: "Créditos: 3 | Semestre: 2025-I",
  },
  
];

function Cursos() {
    const navigate = useNavigate();

    const handleSubirSilabus = (cursoId: number) => {
    // Redirige a la página para subir el sílabo, puedes cambiar la ruta según tu app
    navigate(`/docente/cursos/${cursoId}/subir-silabus`);
    };
    return (
    <div style={{ padding: "2rem" }}>
        <h2 className="text-3xl font-bold mb-8 text-center text-azul dark:text-white uppercase">
            Cursos del Docente
        </h2>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {cursos.map((curso) => (
            <CardDocente
                key={curso.id}
                curso={curso}
                handleSubirSilabus={handleSubirSilabus}
            />
            ))}
        </div>
    </div>
    );
}

export default Cursos;


/*
<div style={{ padding: "2rem" }}>
        <h2>Cursos del Docente</h2>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {cursos.map((curso) => (
            <div
                key={curso.id}
                style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "300px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                background: "#fff",
                }}
            >
                <h3>{curso.nombre}</h3>
                <p>{curso.detalles}</p>
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
            ))}
        </div>
        </div>

*/

/*
<div className="p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-azul dark:text-white uppercase">
            Cursos del Docente
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
            {cursos.map((curso) => (
            <CardDocente
                key={curso.id}
                curso={curso}
                handleSubirSilabus={handleSubirSilabus}
            />
            ))}
        </div>
    </div>
*/

/*
    <div className="p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-azul dark:text-white uppercase">
            Cursos del Docente
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
            {cursos.map((curso) => (
            <div
                key={curso.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 w-80 flex flex-col items-center"
            >
                <h3 className="text-xl font-semibold mb-2 text-azul dark:text-white text-center">
                {curso.nombre}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                {curso.detalles}
                </p>
                <button
                className="mt-auto px-4 py-2 bg-azul hover:bg-blue-700 text-white rounded transition duration-200"
                onClick={() => handleSubirSilabus(curso.id)}
                >
                Subir Sílabus
                </button>
            </div>
            ))}
        </div>
    </div>
*/