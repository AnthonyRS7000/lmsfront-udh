import React from "react";
import "../css/ActividadDocente.css";
import Tablas from "../../../components/pages/Tablas";
import Card from "../../../components/pages/Card";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import ButtonSecundario from "../../../components/pages/ButtonSecundario";
import { PrinterIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";

const ActividadDocente: React.FC = () => {
  const cargaAcademicaHeaders = ["Curso", "Facultad", "Horas"];
  const cargaAcademicaRows = [
    ["Cálculo Diferencial", "Facultad de Ingeniería", "4 horas"],
    ["Física I", "Facultad de Ciencias", "6 horas"],
    ["Estadística Aplicada", "Facultad de Economía", "6 horas"],
  ];

  const cargaNoLectivaHeaders = [
    "Actividad",
    "N° Resol.",
    "Fecha Inicio",
    "Fecha Término",
    "Horario de Clases",
    "Total Horas",
  ];
  const cargaNoLectivaRows = [
    [
      "2.1 INVESTIGACIÓN",
      "123-23",
      "01/08",
      "30/11",
      "Lun: 2, Mié: 2",
      "4",
    ],
    [
      "2.2 PROYECCIÓN SOCIAL Y EXTENSIÓN UNIVERSITARIA",
      "124-23",
      "15/08",
      "15/11",
      "Vie: 4",
      "4",
    ],
    ["2.3 TUTORÍA", "N/A", "01/08", "30/11", "Lun: 2", "2"],
    ["2.6 GESTIÓN UNIVERSITARIA", "125-23", "01/08", "30/11", "Jue: 4", "4"],
  ];

  const evaluacionesHeaders = [
    "Semestre",
    "Evaluación",
    "Conocimiento",
    "Metodología",
    "Actitud",
  ];
  const evaluacionesRows = [
    ["2010-2", "Encuesta", "12.5", "13.0", "12"],
    ["2011-1", "Encuesta", "14.0", "13.5", "14"],
  ];

  const registroAsistenciasHeaders = [
    "Año",
    "Mes",
    "Días Laborados",
    "Horas Trabajadas",
    "Días No Laborados",
  ];
  const registroAsistenciasRows = [
    ["2025", "09", "30", "176", "0"],
    ["2025", "08", "31", "152", "0"],
  ];

  return (
    <div className="actividad-docente-container">
      {/* Header */}
      <div className="actividad-docente-header">
        <h1 className="actividad-docente-title">
          Ficha de Carga Lectiva y No Lectiva de Docentes
        </h1>
        <p className="actividad-docente-subtitle">Semestre Académico 2023-II</p>
        <div className="actividad-docente-buttons">
          <ButtonPrincipal
            icon={<PrinterIcon />}
            text="Imprimir"
            onClick={() => alert("Imprimiendo...")}
          />
          <ButtonSecundario
            icon={<DocumentArrowDownIcon />}
            text="Exportar"
            onClick={() => alert("Exportando...")}
          />
        </div>
      </div>

      {/* Información del Docente */}
      <Card className="actividad-docente-card">
        <h2 className="actividad-docente-section-title">Información del Docente</h2>
        <div className="actividad-docente-info">
          <p>
            <strong>Nombre del Docente:</strong> Dr. Juan Pérez García
          </p>
          <p>
            <strong>Condición:</strong> Nombrado
          </p>
          <p>
            <strong>Categoría / Dedicación:</strong> Principal / Tiempo Completo
          </p>
        </div>
      </Card>

      {/* Carga Académica */}
      <Card className="actividad-docente-card">
        <h2 className="actividad-docente-section-title">Carga Académica</h2>
        <Tablas headers={cargaAcademicaHeaders} rows={cargaAcademicaRows} />
        <div className="actividad-docente-summary">
          <p>
            <strong>Total Carga Académica:</strong> 16 horas
          </p>
          <p>
            <strong>Porcentaje:</strong> 40%
          </p>
        </div>
      </Card>

      {/* Carga No Lectiva */}
      <Card className="actividad-docente-card">
        <h2 className="actividad-docente-section-title">Carga No Lectiva</h2>
        <Tablas headers={cargaNoLectivaHeaders} rows={cargaNoLectivaRows} />
        <div className="actividad-docente-summary">
          <p>
            <strong>Total de Horas No Lectivas:</strong> 24
          </p>
        </div>
      </Card>

      {/* Evaluaciones y Registro de Asistencias */}
      <div className="actividad-docente-evaluaciones-asistencias">
        <Card className="actividad-docente-card">
          <h2 className="actividad-docente-section-title">Resultado de Evaluaciones</h2>
          <Tablas headers={evaluacionesHeaders} rows={evaluacionesRows} />
        </Card>
        <Card className="actividad-docente-card">
          <h2 className="actividad-docente-section-title">Registro de Asistencias</h2>
          <Tablas headers={registroAsistenciasHeaders} rows={registroAsistenciasRows} />
        </Card>
      </div>

      {/* Footer */}
      <footer className="actividad-docente-footer">
        <p>
          La información contenida en el presente documento tiene carácter de
          Declaración Jurada. La Universidad de Huánuco se reserva el derecho de
          llevar a cabo las verificaciones correspondientes.
        </p>
        <p>Firma del Docente</p>
      </footer>
    </div>
  );
};

export default ActividadDocente;