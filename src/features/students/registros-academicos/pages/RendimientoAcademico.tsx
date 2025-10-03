import React, { useEffect, useState, useRef  } from 'react';
import { ApiService } from "../../../../components/pages/ApiService";
import '../css/RendimientoAcademico.css';
import TituloPage from "../../../../components/pages/TituloPage";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading";
import Tablas from "../../../../components/pages/Tablas";
import Card from "../../../../components/pages/Card";
import { EyeIcon } from '@heroicons/react/24/outline';

const obtenerFechaHora = () => {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const fechaStr = fecha.toLocaleDateString("es-PE", opciones);
    const horaStr = fecha.toLocaleTimeString("es-PE", { hour12: false });
    return { fechaStr, horaStr };
};

const RendimientoAcademico: React.FC = () => {
  const [rendimiento, setRendimiento] = useState([]);
  const [udhData, setUdhData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetalles, setLoadingDetalles] = useState(false);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [error, setError] = useState(false);
  
  const [detalle, setDetalle] = useState([]); 
  const [ranking, setRanking] = useState([]); 
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState<string | null>(null);

  const detalleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
    const datosUser = JSON.parse(localStorage.getItem("usuario") || "{}");
    setUdhData(datosUdh);
    setUserData(datosUser);
  }, []);

  useEffect(() => {
      if (udhData && udhData.codigo) {
      fetchRendimiento();
      }
  }, [udhData]);

  const fetchRendimiento = async () => {
    try {
      setLoading(true);
      const codigoAlumno = udhData?.codigo;
      const data_rendimiento = await ApiService.get(`/estudiantes/rendimiento-academico?codalu=${codigoAlumno}`);
      if (data_rendimiento.data.data && data_rendimiento.data.status === "error") {
        setError(true);
        setRendimiento([]);
      } else {
        setRendimiento(data_rendimiento.data.data);
        setError(false);
      }
    } catch (error) {
      console.error("Error al cargar los datos de rendimiento:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetalle = async (semestre: string) => {
    try {
      setLoadingDetalles(true);
      const codigoAlumno = udhData?.codigo;
      const escuela = udhData?.codesc;
      const sede = udhData?.sedalu;
      const data_detalle = await ApiService.get(`/estudiantes/rendimiento-tercio?codalu=${codigoAlumno}&semsem=${semestre}&codesc=${escuela}&sede=${sede}`);
      if (data_detalle.data.status === "error") {
        setDetalle([]);
      } else {
        setDetalle(data_detalle.data.data);
        setError(false);
      }
    } catch (error) {
      console.error("Error al cargar los datos de detalle:", error);
      setError(true);
    } finally {
      setLoadingDetalles(false);
    }
  };

  const fetchRanking = async (semestre: string) => {
    try {
      setLoadingRanking(true);
      const codigoAlumno = udhData?.codigo;
      const escuela = udhData?.codesc;
      const sede = udhData?.sedalu;
      const data_ranking = await ApiService.get(`/estudiantes/ranking-promocion?codalu=${codigoAlumno}&semsem=${semestre}&codesc=${escuela}&sede=${sede}`);
      if (data_ranking.data.status === "error") {
        setError(true);
        setRanking([]);
      } else {
        setError(false);
        setRanking(data_ranking.data.data);
      }
    } catch (error) {
      console.error("Error al cargar los datos de ranking:", error);
      setError(true);
    } finally {
      setLoadingRanking(false);
    }
  };

  const handleVerDetalle = (semestre: string) => {
    fetchDetalle(semestre);
    fetchRanking(semestre);
    setMostrarDetalle(true);
    setSemestreSeleccionado(semestre);
  };

  useEffect(() => {
    if (!loading && mostrarDetalle && detalleRef.current) {
      detalleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, mostrarDetalle]);

  const { fechaStr, horaStr } = obtenerFechaHora();

  const headersRendimiento = ["Semestre", "Promedio x Semestre", "Cantidad de Créditos", "Cantidad de Cursos", "Acción"];
  const rowRendimiento = rendimiento.map((r: any) => [
    r.semsem,
    r.Ponderado.toFixed(2),
    r.cred,
    r.cant,
    <button className="rend-acad-btn-ver" onClick={() => handleVerDetalle(r.semsem)}>
      <EyeIcon style={{ width: 18, height: 18, marginRight: 4 }} />
      Ver
    </button>
  ]);

  const headersDetalle = ["Semestre", "Promedio Ponderado", "Ubicación", "Total Alumnos", "Tercio Superior", "Cuarto Superior", "Quinto Superior"];
  const rowDetalle = detalle.map((r: any) => [
    semestreSeleccionado,
    r.prom.toFixed(4),
    r.ubicacion,
    r.Total,
    r.tercio ? "Sí" : "No",
    r.cuarto ? "Sí" : "No",
    r.quinto ? "Sí" : "No"
  ]);

  const headersRanking = ["Semestre", "Promedio Ponderado", "Ubicación", "Total Alumnos"];
  const rowRanking = ranking.map((r: any) => [
    semestreSeleccionado,
    r.prompond.toFixed(4),
    r.ubicacion,
    r.Total
  ]);

  const headersPromedioGlobal = ["Resultado"];
  const rowPromedioGlobal = ranking.map((r: any) => [
    r.PonderadoGlobal.toFixed(4)
  ]);

  const headersRankingEgresados = ["Semestre Egreso", "Promedio Ponderado Promocional*", "Ubicación", "Total Alumnos"];
  const rowRankingEgresados = detalle ? detalle.map((r: any) => [
    semestreSeleccionado,
    r.prom.toFixed(4), 
    r.ubicacion,
    r.Total,
  ]) : [];

  return (
    <div className="rend-acad-root">
      <TituloPage titulo="Rendimiento Académico" />
      {/* Card de datos usuario */}
      <Card>
        <div className="rend-acad-row">
          <label className="rend-acad-label">Código:</label>
          <input className="rend-acad-input" value={udhData?.codigo || ''} disabled />
        </div>
        <div className="rend-acad-row">
          <label className="rend-acad-label">Apellidos y Nombres:</label>
          <input className="rend-acad-input" value={`${userData?.apellidos}, ${userData?.nombres}` || ''} disabled />
        </div>
        <div className="rend-acad-row">
          <label className="rend-acad-label">Programa Académico:</label>
          <input className="rend-acad-input" value={udhData?.escuela || ''} disabled />
        </div>
      </Card>

      <Card>
        <h3 className="rend-acad-table-title">1. Rendimiento Académico</h3>
        {loading ? (
          <Loading />
        ) : error ? (
          <DatosNoEncontrados />
        ) : (
          <Tablas headers={headersRendimiento} rows={rowRendimiento} />
        )}
        <div className="rend-acad-table-foot">
          * Para el Ranking de Promoción y la Pertenencia al Tercio, Cuarto y Quinto Superior se considera a partir de 19 créditos y cursos aprobados.
        </div>
      </Card>

      {mostrarDetalle && (
        <Card ref={detalleRef} >
          <h3 className="rend-acad-table-title">2. Pertenencia al Tercio, Cuarto y Quinto Superior:</h3>
          {loadingDetalles ? (
            <Loading />
          ) : detalle.length > 0 ? (
            <Tablas headers={headersDetalle} rows={rowDetalle} />
          ) : ( 
            <div className="rend-acad-alert">
              <span>No califica para Tercio, Cuarto ni Quinto Superior. Tiene que haber llevado más de 19 créditos o puede que haya desaprobado por lo menos un curso en el semestre seleccionado.</span>
            </div>
          )}

          <h3 className="rend-acad-table-title">3. Ranking de Promoción:</h3>
          {loadingRanking ? (
            <Loading />
          ) : error ? (
            <DatosNoEncontrados />
          ) : ( 
            <Tablas headers={headersRanking} rows={rowRanking} />
          )}

          <h3 className="rend-acad-table-title">4. Promedio Ponderado Global:</h3>
          {loadingRanking ? (
            <Loading />
          ) : error ? (
            <DatosNoEncontrados />
          ) : ( 
            <Tablas headers={headersPromedioGlobal} rows={rowPromedioGlobal} />
          )}

          <h3 className="rend-acad-table-title">5. RANKING EGRESADOS (SERUM):</h3>
          {loadingDetalles ? (
            <Loading />
          ) : error ? (
            <DatosNoEncontrados />
          ) : ( 
            <Tablas headers={headersRankingEgresados} rows={rowRankingEgresados} />
          )}
          <div className="rend-acad-table-foot">
            *Promedio Ponderado Promocional (PPP): Es la nota que la universidad determina como resultado de la sumatoria del producto de las notas aprobadas y desaprobadas de las asignaturas desarrolladas durante el pregrado que INCLUYE LA NOTA DEL INTERNADO. (Resol.Ministerial 514-2024/MINSA, 31/07/2024)
          </div>
          <div className="rend-acad-table-foot" style={{ textAlign: "center", color: "#222", fontSize: "0.98rem" }}>
            Oficina de Matrícula {fechaStr}. Hora: {horaStr}
          </div>
        </Card>
      )}
    </div>
  );
};

export default RendimientoAcademico;