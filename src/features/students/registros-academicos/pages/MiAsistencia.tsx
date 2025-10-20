import React, { useState, useEffect, useRef } from "react";
import { ApiService } from "../../../../components/pages/ApiService";
import "../css/MiAsistencia.css";
import TituloPage from "../../../../components/pages/TituloPage";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading";
import Tablas from "../../../../components/pages/Tablas";
import Card from "../../../../components/pages/Card";
import { EyeIcon, PrinterIcon } from "@heroicons/react/24/outline";
import ButtonSecundario from "../../../../components/pages/ButtonSecundario";

const calcularSemestre = (): string => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;

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

const MiAsistencia: React.FC = () => {
  const [cursos, setCursos] = useState([]);
  const [asistencia, setAsistencia] = useState([]);
  const [udhData, setUdhData] = useState<any>(null);
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAsistencia, setLoadingAsistencia] = useState(false); 
  const [error, setError] = useState(false);
  const [semestre, setSemestre] = useState(calcularSemestre());
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [mostrarTabla1, setMostrarTabla1] = useState(false);

  const cardCursosRef = useRef<HTMLDivElement>(null);
  const cardAsistenciaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
    const nombresUser = JSON.parse(localStorage.getItem("usuario") || "{}");
    setUdhData(datosUdh);
    setNombreEstudiante(`${nombresUser.apellidos}, ${nombresUser.nombres}`);
  }, []);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const codigoAlumno = udhData?.codigo;
      const data_cursos = await ApiService.get(`/horario?codalu=${codigoAlumno}&semsem=${semestre}`);
      if (!data_cursos.horario || data_cursos.status === "error" || data_cursos.horario.length === 0) {
        setError(true);
        setCursos([]);
      } else {
        setCursos(data_cursos.horario);
        setError(false);
      }
    } catch (error) {
      console.error("Error al cargar los cursos:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAsistencia = async (codigoCurso: string, seccion: string, codigoPeriodo: string) => {
    try {
      setLoadingAsistencia(true);
      const codigoAlumno = udhData?.codigo;
      const data_asistencia = await ApiService.get(
        `/estudiantes/asistencia?codalu=${codigoAlumno}&semsem=${semestre}&codcur=${codigoCurso}&secsem=${seccion}&codper=${codigoPeriodo}`
      );
      if (!data_asistencia.data.data || data_asistencia.data.data.length === 0 || data_asistencia.data.status === "error") {
        setError(true);
        setAsistencia([]);
      } else {
        setAsistencia(data_asistencia.data.data);
        setError(false);
      }
    } catch (error) {
      console.error("Error al cargar la asistencia:", error);
      setError(true);
    } finally {
      setLoadingAsistencia(false); 
    }
  };

  const handleMostrar = () => {
    setMostrarTabla(true);
    fetchCursos();
  };

  useEffect(() => {
    if (!loading && mostrarTabla && cardCursosRef.current) {
      cardCursosRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, mostrarTabla]);

  const handleVerAsistencia = (codigoCurso: string, seccion: string, codigoPeriodo: string) => {
    setMostrarTabla1(true);
    fetchAsistencia(codigoCurso, seccion, codigoPeriodo);
  };

  useEffect(() => {
    if (!loadingAsistencia && mostrarTabla1 && cardAsistenciaRef.current) {
      cardAsistenciaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loadingAsistencia, mostrarTabla1]);

  const handleImprimir = () => {
    window.print();
  };

  const headersCursos = ["CÓDIGO", "CURSO", "CICLO", "CRÉD.", "SEC.", "ASISTENCIA"];
  const rowsCursos = cursos.map((curso: any) => [
    curso.codigo_curso,
    <div className="curso-nombre">
      <div className="curso-nombre-principal">{curso.nombre_curso.split("\n")[0]}</div>
      <div className="curso-horario">
        {[curso.lunes, curso.martes, curso.miercoles, curso.jueves, curso.viernes, curso.sabado, curso.domingo]
          .filter((dia) => dia)
          .map((dia, i) => (
            <div key={i}>{dia}</div>
          ))}
      </div>
    </div>,
    curso.ciclo,
    curso.creditos,
    curso.seccion,
    <button className="asistencia-btn-ver" onClick={() => handleVerAsistencia(curso.codigo_curso, curso.seccion, curso.codper)}>
      <EyeIcon className="asistencia-icono-ojo" />
      Ver
    </button>,
    /*<ButtonSecundario
      icon={<EyeIcon/>}
      text="Ver"
      onClick={() => handleVerAsistencia(curso.codigo_curso, curso.seccion, curso.codper)}
    />*/
  ]);

  const headersAsistencia = ["Fecha", "Día", "Entrada", "Salida", "¿Asistió?"];
  const rowsAsistencia = asistencia?.map((item: any) => [
    item.fechaasis,
    item.NomDia,
    item.HE,
    item.HS,
    <input type="checkbox" checked={item.asis} readOnly />,
  ]);

  return (
    <div className="asistencia-container asistencia-print">
      <TituloPage titulo="Mi Asistencia" />
      <Card>
        <div className="asistencia-estudiante-header">
          <div className="asistencia-nombre-estudiante">{nombreEstudiante}</div>
        </div>
        <div className="asistencia-estudiante-info">
          <div><b>CÓDIGO:</b> {udhData?.codigo}</div>
          <div><b>SEDE:</b> {udhData?.sedalu === 1 ? "HUÁNUCO" : udhData?.sedalu === 2 ? "TINGO MARÍA" : ""}</div>
          <div><b>PLAN:</b> 2021*</div>
        </div>
        <div className="asistencia-estudiante-semestre">
          <b>SEMESTRE:</b>
          <input
            type="text"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            className="asistencia-input-semestre"
          />
          <ButtonSecundario
            icon={<EyeIcon />}
            text="Mostrar"
            onClick={handleMostrar}
          />
        </div>
      </Card>

      {mostrarTabla && (
        <Card ref={cardCursosRef}>
          <h3 className="asistencia-titulo-cursos">MI HORARIO/ASISTENCIA</h3>
          {loading ? <Loading /> : error ? <DatosNoEncontrados /> : <Tablas headers={headersCursos} rows={rowsCursos} />}
        </Card>
      )}

      {mostrarTabla1 && (
        <Card ref={cardAsistenciaRef}>
          <h3 className="asistencia-titulo-asistencia">REPORTE DE ASISTENCIA</h3>
          {loadingAsistencia ? (
            <Loading />
          ) : error ? (
            <DatosNoEncontrados />
          ) : (
            <>
              <Tablas headers={headersAsistencia} rows={rowsAsistencia} />
              <div className="asistencia-resumen-asistencia">
                <span>
                  TOTAL: {String(asistencia[0]?.Total)}  Asistencias: {String(asistencia[0]?.Asist)} 
                  {" "}
                  Inasistencias: {String(asistencia[0]?.Inasi)}  Inasist.%:{" "}
                  {((asistencia[0]?.Inasi / asistencia[0]?.Total) * 100).toFixed(2)}%
                </span>
                <button className="asistencia-btn-imprimir" onClick={handleImprimir}>
                  <PrinterIcon className="asistencia-icono-impresora" />
                  Imprimir
                </button>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default MiAsistencia;