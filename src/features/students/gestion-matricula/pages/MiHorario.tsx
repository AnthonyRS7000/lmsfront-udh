import React, { useState, useEffect } from "react";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/MiHorario.css";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading"
import Tablas from "../../../../components/pages/Tablas";
import Titulo from "../../../../components/pages/TituloPage";
import Card from "../../../../components/pages/Card";

const calcularSemestre = (): string => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son 0-indexados

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

const MiHorario: React.FC = () => {
    const [miHorario, setMiHorario] = useState([]);
    const [udhData, setUdhData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [semestre, setSemestre] = useState(calcularSemestre());

    useEffect(() => {
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datosUdh);
    }, []);

    useEffect(() => {
    if (udhData && udhData.codigo) {
        fetchHorario(); // Llamar a la función de consulta
        }
    }, [udhData]);

    const fetchHorario = async () => {
        if (!udhData || !udhData.codigo) {
        setLoading(false);
        setError(true);
        return;
        }
        try {
        setLoading(true); // Mostrar el spinner mientras se realiza la consulta
        const codigoAlumno = udhData.codigo;
        const data = await ApiService.get(`/horario/${codigoAlumno}/${semestre}`);
        setMiHorario(data.data);
        setError(false);
        } catch (error) {
        console.error("Error al cargar mi horario:", error);
        setError(true);
        } finally {
        setLoading(false); // Ocultar el spinner después de la consulta
        }
    };

    // Encabezados de la tabla
    const headers = ["CÓDIGO", "CURSO", "CICLO", "CRÉD.", "HORARIO", "SEC."];

    // Filas de la tabla
    const rows = miHorario.map((horario) => [
        horario.codigo_curso,
        horario.nombre_curso,
        horario.ciclo,
        horario.creditos,
        [
        horario.lunes,
        horario.martes,
        horario.miercoles,
        horario.jueves,
        horario.viernes,
        horario.sabado,
        horario.domingo,
        ]
        .filter((dia) => dia)
        .map((dia, i) => <div key={i}>{dia}</div>),
        horario.seccion,
    ]);

    return (
        <div className="mi-horario-container">
            <Titulo titulo="Mi Horario" />
            <Card>
                <div className="mi-horario-filters">
                    <div className="filter-group">
                        <label htmlFor="ciclo-input">Cilco:</label>
                        <input
                        id="ciclo-input"
                        type="text"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        className="mi-horario-input"
                        placeholder="2025-2"
                        />
                        <button
                        className="mi-horario-button"
                        onClick={fetchHorario}
                        >
                        Ver
                        </button>
                    </div>
                </div>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <DatosNoEncontrados />
                ) : (
                    <Tablas headers={headers} rows={rows} />
                )}
            </Card>
        </div>
    );
};

export default MiHorario;