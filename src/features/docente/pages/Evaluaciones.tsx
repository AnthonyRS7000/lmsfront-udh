import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import "../css/evaluaciones.css";

const cursos = ["Epidemiología", "Salud Pública I", "Farmacología"];
const tipos = ["Todos", "Practicas", "Examen", "Quiz", "Otro"];
const grupos = ["Todos", "A", "B", "C", "D", "E", "F"];

const mockEvaluaciones = [
  {
    id: 1,
    titulo: "Practica N° 1",
    curso: "Epidemiología",
    tipo: "Practica",
    grupo: "A",
    destacado: false,
  },
  {
    id: 2,
    titulo: "Practica N°2",
    curso: "Epidemiología",
    tipo: "Practica",
    grupo: "C",
    destacado: false,
  },
  {
    id: 3,
    titulo: "EMC",
    curso: "Epidemiología",
    tipo: "Practica",
    grupo: "A",
    destacado: false,
  },
  {
    id: 4,
    titulo: "EFC",
    curso: "Epidemiología",
    tipo: "Practica",
    grupo: "B",
    destacado: false,
  },
];

const Evaluaciones = () => {
  const navigate = useNavigate();

  // Filtros
  const [curso, setCurso] = useState(cursos[0]);
  const [tipo, setTipo] = useState("Todos");
  const [grupo, setGrupo] = useState("Todos");

  // Evaluaciones (simulación, reemplaza por fetch/backend si lo tienes)
  const [evaluaciones] = useState(mockEvaluaciones);

  // Filtrado
  const evaluacionesFiltradas = evaluaciones.filter(
    (ev) =>
      ev.curso === curso &&
      (tipo === "Todos" || ev.tipo.toLowerCase().includes(tipo.toLowerCase())) &&
      (grupo === "Todos" || ev.grupo === grupo)
  );

  return (
    <div className="eva-bg">
        <h2 className="eva-title">EVALUACIONES</h2>
        <hr className="eva-divider" />
        <div className="eva-main">
            <div className="eva-filtros">
            <div>
                <label>Curso:</label>
                <select className="eva-input" value={curso} onChange={e => setCurso(e.target.value)}>
                {cursos.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label>Tipo de Evaluacion:</label>
                <select className="eva-input" value={tipo} onChange={e => setTipo(e.target.value)}>
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div>
                <label>Grupo:</label>
                <select className="eva-input" value={grupo} onChange={e => setGrupo(e.target.value)}>
                {grupos.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
            </div>
            <button
                className="eva-btn-nueva"
                onClick={() => navigate("/docente/crear-evaluaciones", { state: { curso } })}
            >
                <PlusIcon style={{ width: 20, height: 20, marginRight: 6 }} />
                Nueva Evaluacion
            </button>
            </div>
            <div className="eva-grid">
            {evaluacionesFiltradas.map(ev => (
                <div
                key={ev.id}
                className={`eva-card${ev.destacado ? " eva-card-destacado" : ""}`}
                >
                <div className="eva-card-title">{ev.titulo}</div>
                <div className="eva-card-info">
                    <div>Grupo: {ev.grupo}</div>
                    <div>Tipo: {ev.tipo}</div>
                </div>
                <div className="eva-card-actions">
                    <button className={`eva-btn-ver${ev.destacado ? " eva-btn-ver-destacado" : ""}`}>
                    <EyeIcon style={{ width: 20, height: 20, marginRight: 4 }} />
                    Ver
                    </button>
                    <button className={`eva-btn-editar${ev.destacado ? " eva-btn-editar-destacado" : ""}`}>
                    <PencilSquareIcon style={{ width: 20, height: 20, marginRight: 4 }} />
                    Editar
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};

export default Evaluaciones;