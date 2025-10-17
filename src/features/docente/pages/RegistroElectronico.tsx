import React from "react";
import "../css/RegistroElectronico.css";
import Tablas from "../../../components/pages/Tablas";
import Card from "../../../components/pages/Card";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import ButtonSecundario from "../../../components/pages/ButtonSecundario";
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon, EyeIcon, ArrowRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const RegistroElectronico: React.FC = () => {
  const tablaHeaders = ["Código", "Curso", "Sección", "Escuela", "Sede", "CódModal"];
  const tablaRows = [
    ["CS101", "Introducción a la Programación", "A", "Ingeniería de Sistemas", "Central", "MOD01"],
    ["MA202", "Cálculo Avanzado", "B", "Ciencias Básicas", "Norte", "MOD02"],
    ["FI303", "Física II", "C", "Ingeniería Eléctrica", "Central", "MOD01"],
  ];

  const cronogramaHeaders = ["Actividad", "Fecha"];
  const cronogramaRows = [
    ["TA1", "Del 15.09.2025 al 22.09.2025"],
    ["TA2", "Del 06.10.2025 al 13.10.2025"],
    ["TA3", "Del 03.11.2025 al 07.11.2025"],
    ["TA4", "Del 01.12.2025 al 05.12.2025"],
    ["TA5", "Suspendida"],
    ["EMC", "Del 13.10.2025 al 16.10.2025"],
    ["EFC", "Del 10.12.2025 al 13.12.2025"],
    ["SUS", "Del 16.11.2025 al 18.12.2025"],
  ];

  return (
    <div className="registro-electronico-container">
      {/* Header */}
      <div className="registro-electronico-header">
        <h1 className="registro-electronico-title">Registro Electrónico</h1>
        <p className="registro-electronico-subtitle">
          Bienvenido, gestione sus cursos y notas.
        </p>
        <p className="registro-electronico-semestre">
          Semestre: <strong>2025-2</strong> &nbsp; Docente: <strong>Nombre Docente</strong> &nbsp; Sede: <strong>Sede Principal</strong>
        </p>
      </div>

      {/* Aviso */}
      <Card className="registro-electronico-card aviso">
        <InformationCircleIcon className="carpetas-digitales-footer-icon"/>
        <p>
          <strong>Primero haga clic en seleccionar</strong> (si le falta algún curso comuníquese con su Escuela o Matrícula: 518301 anexo 105).
        </p>
      </Card>

      {/* Botones */}
      <div className="registro-electronico-buttons">
        <ButtonPrincipal
          icon={<ClipboardDocumentIcon />}
          text="Ingreso de Notas"
          onClick={() => alert("Ingreso de Notas")}
        />
        <ButtonSecundario
          icon={<ClipboardDocumentCheckIcon />}
          text="Reporte de Asistencia"
          onClick={() => alert("Reporte de Asistencia")}
        />
        <ButtonSecundario
          icon={<EyeIcon />}
          text="Ver Todas las Notas"
          onClick={() => alert("Ver Todas las Notas")}
        />
      </div>

      {/* Tabla de cursos */}
      <Card className="registro-electronico-card">
        <Tablas headers={tablaHeaders} rows={tablaRows} />
      </Card>

      {/* Información importante */}
      <Card className="registro-electronico-card info-importante">
        <p>
          <strong>Información Importante:</strong> Una vez ingresado todas sus Notas acérquese a la Ofic. de Matrícula a firmar su Registro y Acta de Notas, para el respectivo cobro de sus haberes.
        </p>
      </Card>

      {/* Aviso urgente */}
      <Card className="registro-electronico-card aviso-urgente">
        <p>
          <strong>Aviso Urgente:</strong> A partir del año 2024 queda suspendida el ingreso de la <strong>TAREA ACADEMICA 5</strong>.
        </p>
      </Card>

      {/* Cronograma */}
      <div className="registro-electronico-cronograma">
        <Card className="registro-electronico-card">
          <h2 className="registro-electronico-section-title">Cronograma Semestre 2025-2</h2>
          <Tablas headers={cronogramaHeaders} rows={cronogramaRows} />
          <div className="registro-electronico-load-sem">
            <select className="registro-electronico-select">
              <option>2025-0</option>
              <option>2025-1</option>
              <option>2025-2</option>
            </select>
            <ButtonSecundario icon={<ArrowRightIcon />} text="Cargar Semestre" onClick={() => alert("Semestre cargado")} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegistroElectronico;