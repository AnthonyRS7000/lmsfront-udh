import React, { useEffect, useState, useRef  } from 'react';
import { ApiService } from "../../../../components/pages/ApiService";
import '../css/RendimientoAcademico.css';
import TituloPage from "../../../../components/pages/TituloPage";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading";
import Tablas from "../../../../components/pages/Tablas";
import Card from "../../../../components/pages/Card";
import { EyeIcon } from '@heroicons/react/24/outline';

const datosDetalle = {
  pertenencia: {
    califica: false,
    mensaje: "No califica para Tercio, Cuarto ni Quinto Superior. Tiene que haber llevado mas de 19 creditos o puede que haya desaprobado por lo menos un curso en el semestre seleccionado;"
  },
  rankingPromocion: [
    { semestre: '2025-1', promedio: 11.000000, ubicacion: 6, total: 13 }
  ],
  promedioGlobal: 12.9484,
  rankingEgresados: [
    { semestre: '2025-1', promedio: 12.0500, ubicacion: 9, total: 27 }
  ]
};

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
  const [loading, setLoading] = useState(false);
  const [loadingDetalles, setLoadingDetalles] = useState(false);
  const [error, setError] = useState(false);
  
  const [detalle, setDetalle] = useState<any | null>(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState<string | null>(null);

  const detalleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
    setUdhData(datosUdh);
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
      if (data_rendimiento.data.data && data_rendimiento.status === "error") {
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

  // Cuando seleccionas un semestre, simula fetch de detalle
  const handleVerDetalle = (semestre: string) => {
    setMostrarDetalle(true);
    setSemestreSeleccionado(semestre);
    setDetalle(datosDetalle); 
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

  const headersRanking = ["Semestre", "Promedio Ponderado", "Ubicación", "Total Alumnos"];

  const rowRanking = detalle ? detalle.rankingPromocion.map((r: any) => [
    r.semestre,
    r.promedio.toFixed(4),
    r.ubicacion,
    r.total
  ]) : [];

  const headersPromedioGlobal = ["Resultado"];

  const rowPromedioGlobal = detalle ? [[detalle.promedioGlobal]] : [];

  const headersRankingEgresados = ["Semestre Egreso", "Promedio Ponderado Promocional*", "Ubicación", "Total Alumnos"];

  const rowRankingEgresados = detalle ? detalle.rankingEgresados.map((r: any) => [
    r.semestre,
    r.promedio.toFixed(4),
    r.ubicacion,
    r.total
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
          <input className="rend-acad-input" value={`${udhData?.apellido_paterno} ${udhData?.apellido_materno}, ${udhData?.nombres}` || ''} disabled />
        </div>
        <div className="rend-acad-row">
          <label className="rend-acad-label">Programa Académico:</label>
          <input className="rend-acad-input" value={udhData?.programa || ''} disabled />
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

      {mostrarDetalle && detalle && (
        <Card ref={detalleRef} >
          <h3 className="rend-acad-table-title">2. Pertenencia al Tercio, Cuarto y Quinto Superior:</h3>
          <div className="rend-acad-alert">
            {detalle.pertenencia.califica ? (
              <span>Califica para Tercio, Cuarto o Quinto Superior.</span>
            ) : (
              <span>{detalle.pertenencia.mensaje}</span>
            )}
          </div>

          <h3 className="rend-acad-table-title">3. Ranking de Promoción:</h3>
          {loadingDetalles ? (
            <Loading />
          ) : error ? (
            <DatosNoEncontrados />
          ) : ( 
            <Tablas headers={headersRanking} rows={rowRanking} />
          )}

          <h3 className="rend-acad-table-title">4. Promedio Ponderado Global:</h3>
          {loadingDetalles ? (
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