import React, { useState, useEffect } from "react";
import { cache } from "../../../../components/pages/Cache";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/MiHorario.css";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading"
import Tablas from "../../../../components/pages/Tablas";
import Titulo from "../../../../components/pages/TituloPage";
import Card from "../../../../components/pages/Card";
import { EyeIcon } from "@heroicons/react/24/outline";

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
    const [isHorarioFetched, setIsHorarioFetched] = useState(false);

    const CACHE_KEY = `miHorario_${semestre}`;
    const CACHE_EXPIRATION_MINUTES = 10;

    useEffect(() => {
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datosUdh);
    }, []);

    useEffect(() => {
    if (udhData && udhData.codigo && !isHorarioFetched) {
        setIsHorarioFetched(true);
        const cachedData = cache.get(CACHE_KEY); // Verificar si hay datos en caché
        if (cachedData) {
            setMiHorario(cachedData); // Cargar datos desde el caché
            setError(false);
        } else {
            fetchHorario(); // Consumir la API si no hay datos en caché
        }
    }
    }, [udhData, isHorarioFetched]);

    const fetchHorario = async () => {
        if (!udhData || !udhData.codigo || !semestre) {
        setError(true);
        return;
        }

        try {
        setLoading(true);
        const codigoAlumno = udhData.codigo;
        const data = await ApiService.get(`/horario?codalu=${codigoAlumno}&semsem=${semestre}`);
        if (!data.horario || data.status === "error" || data.horario.length === 0 ) {
            setError(true);
            setMiHorario([]);
        } else {
            setMiHorario(data.horario);
            setError(false);
            cache.set(CACHE_KEY, data.horario, CACHE_EXPIRATION_MINUTES);
        }
        } catch (error) {
        console.error("Error al cargar mi horario:", error);
        setError(true);
        } finally {
        setLoading(false);
        }
    };

    const handleVerClick = () => {
        const cachedData = cache.get(CACHE_KEY); // Verificar si hay datos en caché
        if (cachedData) {
        setMiHorario(cachedData); // Cargar datos desde el caché
        setError(false);
        } else {
        fetchHorario(); // Consumir la API si no hay datos en caché
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
                        <label htmlFor="ciclo-input">Ciclo:</label>
                        <input
                        id="ciclo-input"
                        type="text"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        className="mi-horario-input"
                        placeholder="2025-2"
                        />
                        <button
                            className="mi-horario-btn"
                            onClick={handleVerClick}
                            disabled={loading}
                        >
                            <EyeIcon className="mi-horario-icon" />
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