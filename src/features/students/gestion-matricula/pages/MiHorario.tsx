import React, { useState, useEffect } from "react";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/MiHorario.css";
import Homero from "../../../../assets/homero-pensando.png"

const MiHorario: React.FC = () => {
    const [miHorario, setMiHorario] = useState([]);
    const [udhData, setUdhData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datosUdh);
    }, []);

    useEffect(() => {
        const fetchHorario = async () => {
        if (!udhData || !udhData.codigo) {
            setLoading(false);
            setError(true);
            return;
        }
        try {
            const codigoAlumno = udhData.codigo;
            const semestre = "2025-2";
            const data = await ApiService.get(`/horario/${codigoAlumno}/${semestre}`);
            setMiHorario(data.data);
            setError(false);
        } catch (error) {
            console.error("Error al cargar mi horario:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
        };

        if (udhData) {
        fetchHorario();
        }
    }, [udhData]);

    return (
        <div className="mi-horario-container">
            <h1 className="mi-horario-title">Mi Horario</h1>
            <div className="mi-horario-card">
                {loading ? (
                <div className="spinner-container">
                    <div className="spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                ) : error ? (
                <div className="error-container">
                    <img
                    src={Homero}
                    alt="homero-pensando"
                    className="error-image"
                    />
                    <p className="error-message">
                    Datos no encontrados o no te encuentras registrado en el presente ciclo
                    </p>
                </div>
                ) : (
                <div className="mi-horario-table-container">
                    <table className="mi-horario-table">
                        <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>CURSO</th>
                            <th>CICLO</th>
                            <th>CRÉD.</th>
                            <th>HORARIO</th>
                            <th>SEC.</th>
                        </tr>
                        </thead>
                        <tbody>
                        {miHorario.map((horario, index) => (
                            <tr
                            key={horario.codigo_curso}
                            className={index % 2 === 0 ? "row-par" : "row-impar"}
                            >
                            <td>{horario.codigo_curso}</td>
                            <td>{horario.nombre_curso}</td>
                            <td>{horario.ciclo}</td>
                            <td>{horario.creditos}</td>
                            <td>
                                {[horario.lunes, horario.martes, horario.miercoles, horario.jueves, horario.viernes, horario.sabado, horario.domingo]
                                .filter((dia) => dia) // Filtrar días vacíos
                                .map((dia, i) => (
                                <div key={i}>{dia}</div>
                            ))}
                            </td>
                            <td>{horario.seccion}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </div>
    );
};

export default MiHorario;