import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/cursos.css';
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

export const cursos = [
    { id: 1, nombre: "Epidemiología", grupo: "E", destacado: false },
    { id: 2, nombre: "Salud Pública I", grupo: "F", destacado: false },
    { id: 3, nombre: "Farmacología", grupo: "C", destacado: false },
    { id: 4, nombre: "Farmacología", grupo: "A", destacado: false },
    { id: 5, nombre: "Farmacología", grupo: "B", destacado: false },
    { id: 6, nombre: "Farmacología", grupo: "C", destacado: false },
    { id: 7, nombre: "Farmacología", grupo: "A", destacado: false },

  // ...agrega más cursos para probar el scroll
];

function Cursos() {
    const [busqueda, setBusqueda] = useState("");
    const [filtroGrupo, setFiltroGrupo] = useState("Todos");

    const navigate = useNavigate();

    // Filtrado por búsqueda y grupo
    const cursosFiltrados = cursos.filter(curso => {
        const coincideBusqueda = curso.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideGrupo = filtroGrupo === "Todos" || curso.grupo === filtroGrupo;
        return coincideBusqueda && coincideGrupo;
    });

    // Obtener grupos únicos para el filtro
    const grupos = ["Todos", ...Array.from(new Set(cursos.map(c => c.grupo))).sort()];

  return (
    <div className="container">
        <h2 className="cursos-title">CURSOS ASIGNADOS</h2>
        <hr className="cursos-divider" />
        <div className="cursos-container">
            <div className="cursos-controls">
                <input
                type="text"
                placeholder="Buscar curso..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="cursos-search"
                />
                <select
                value={filtroGrupo}
                onChange={e => setFiltroGrupo(e.target.value)}
                className="cursos-select"
                >
                {grupos.map(grupo => (
                    <option key={grupo} value={grupo}>
                    {grupo === "Todos" ? "Todos los grupos" : `Grupo ${grupo}`}
                    </option>
                ))}
                </select>
            </div>
            <div className="cursos-grid">
                {cursosFiltrados.length === 0 && (
                <div className="cursos-cursos-vacio">
                    No se encontraron cursos.
                </div>
                )}
                {cursosFiltrados.map(curso => (
                <div
                    key={curso.id}
                    className={`cursos-card${curso.destacado ? " destacado" : ""}`}
                >
                    <div className="cursos-nombre">{curso.nombre}</div>
                    <div className="cursos-grupo">Grupo: {curso.grupo}</div>
                    <button className="cursos-btn" type="button" onClick={() => navigate(`/docente/subir-silabo/${curso.id}`)}>
                        <DocumentArrowUpIcon style={{ width: 20, height: 20, marginRight: 8 }} />
                        Subir Sílabo
                    </button>
                </div>
                ))}
            </div>
        </div>
        
    </div>
  );
}
 export default Cursos;
