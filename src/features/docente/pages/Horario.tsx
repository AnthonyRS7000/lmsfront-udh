import React, { useState } from "react";
import Card from "../../../components/pages/Card";
import Table from "../../../components/pages/Tablas";
import "../../../features/docente/css/Horario.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import TituloPage from "../../../components/pages/TituloPage";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";

const Horario: React.FC = () => {
    const [filtro, setFiltro] = useState("ambos");

    const horarios = [
        { hora: "08:00 - 10:00", lunes: "Permanencia", martes: "Permanencia", miercoles: "Permanencia", jueves: "Permanencia", viernes: "Permanencia", sabado: "-", domingo: "-" },
        { hora: "10:00 - 12:00", lunes: "Permanencia", martes: "Permanencia", miercoles: "Permanencia", jueves: "Permanencia", viernes: "Permanencia", sabado: "-", domingo: "-" },
        { hora: "12:00 - 14:00", lunes: "-", martes: "-", miercoles: "Clase: Física I", jueves: "-", viernes: "-", sabado: "-", domingo: "-" },
        { hora: "14:00 - 16:00", lunes: "-", martes: "Clase: Cálculo", miercoles: "Clase: Física I", jueves: "Clase: Programación", viernes: "-", sabado: "-", domingo: "-" },
        { hora: "16:00 - 18:00", lunes: "-", martes: "Clase: Cálculo", miercoles: "-", jueves: "Clase: Programación", viernes: "-", sabado: "-", domingo: "-" },
        { hora: "18:00 - 20:00", lunes: "Permanencia", martes: "Permanencia", miercoles: "Permanencia", jueves: "Permanencia", viernes: "Permanencia", sabado: "-", domingo: "-" },
    ];

    const filtrarHorarios = () => {
        if (filtro === "ambos") return horarios;
        return horarios.map((row) => ({
        ...row,
        lunes: row.lunes.includes(filtro) ? row.lunes : "-",
        martes: row.martes.includes(filtro) ? row.martes : "-",
        miercoles: row.miercoles.includes(filtro) ? row.miercoles : "-",
        jueves: row.jueves.includes(filtro) ? row.jueves : "-",
        viernes: row.viernes.includes(filtro) ? row.viernes : "-",
        sabado: row.sabado.includes(filtro) ? row.sabado : "-",
        domingo: row.domingo.includes(filtro) ? row.domingo : "-",
        }));
    };

    return (
        <div className="horario-page">
        <TituloPage titulo="Mi Horario" />

        <Card>
            <div className="horario-filtros">
                <div className="horario-filtros-group">
                    <button
                        className={`horario-filtro-btn ${filtro === "ambos" ? "activo" : ""}`}
                        onClick={() => setFiltro("ambos")}
                    >
                        Ambos
                    </button>
                    <button
                        className={`horario-filtro-btn ${filtro === "Permanencia" ? "activo" : ""}`}
                        onClick={() => setFiltro("Permanencia")}
                    >
                        Permanencia
                    </button>
                    <button
                        className={`horario-filtro-btn ${filtro === "Clase" ? "activo" : ""}`}
                        onClick={() => setFiltro("Clase")}
                    >
                        Clases
                    </button>
                </div>
                <ButtonPrincipal
                    onClick={() => alert("Funcionalidad de exportar a Calendar no implementada")}
                    text="Exportar a Calendar"
                    icon={<CalendarIcon className="horario-icon" />}
                />
            </div>

            <Table
            headers={["HORA", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"]}
            rows={filtrarHorarios().map((row) => [
                row.hora,
                row.lunes,
                row.martes,
                row.miercoles,
                row.jueves,
                row.viernes,
                row.sabado,
                row.domingo,
            ])}
            />
        </Card>
        </div>
    );
};

export default Horario;