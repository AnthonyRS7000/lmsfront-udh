import React, { useEffect, useState, useRef  } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import '../css/RendimientoAcademico.css';

// Simulación de datos de la API
const datosUsuario = {
  codigo: '2018110403',
  apellidosNombres: 'CALDERON SOBRADO, JAHIR WALTHER',
  programa: 'INGENIERÍA DE SISTEMAS E INFORMÁTICA'
};

const datosRendimiento = [
  { semestre: '2025-1', promedio: 11.0000, creditos: 9, cursos: 3 },
  { semestre: '2025-0', promedio: 12.0000, creditos: 6, cursos: 2 },
  { semestre: '2024-2', promedio: 14.2500, creditos: 12, cursos: 4 },
  { semestre: '2024-1', promedio: 13.7500, creditos: 12, cursos: 4 },
  { semestre: '2024-0', promedio: 12.5000, creditos: 6, cursos: 2 },
  { semestre: '2023-2', promedio: 10.1875, creditos: 16, cursos: 5 },
  { semestre: '2023-1', promedio: 14.6154, creditos: 22, cursos: 7 },
  { semestre: '2022-2', promedio: 11.4615, creditos: 18, cursos: 7 },
  { semestre: '2022-1', promedio: 13.1667, creditos: 18, cursos: 6 },
  { semestre: '2021-2', promedio: 12.2857, creditos: 21, cursos: 7 },
  { semestre: '2019-2', promedio: 10.3333, creditos: 18, cursos: 6 },
  { semestre: '2019-1', promedio: 9.1905, creditos: 21, cursos: 7 },
  { semestre: '2018-2', promedio: 13.1000, creditos: 20, cursos: 6 },
  { semestre: '2018-1', promedio: 13.9500, creditos: 20, cursos: 6 },
];

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

const RendimientoAcademico: React.FC = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [rendimiento, setRendimiento] = useState<any[]>([]);
  const [detalle, setDetalle] = useState<any | null>(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState<string | null>(null);

  const detalleRef = useRef<HTMLDivElement>(null);

  // Simula fetch de datos
  useEffect(() => {
    // Aquí iría tu fetch real
    setUsuario(datosUsuario);
    setRendimiento(datosRendimiento);
  }, []);

  // Cuando seleccionas un semestre, simula fetch de detalle
  const handleVerDetalle = (semestre: string) => {
    setSemestreSeleccionado(semestre);
    setDetalle(datosDetalle); // Aquí iría tu fetch real por semestre
    setMostrarDetalle(true);
    // 2. Espera a que el card se muestre y haz scroll
    setTimeout(() => {
      detalleRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="rend-acad-root">
      <h2 className="rend-acad-title">Rendimiento Academico</h2>
      {/* Card de datos usuario */}
      <div className="rend-acad-card rend-acad-card-user">
        <div className="rend-acad-row">
          <label className="rend-acad-label">Código:</label>
          <input className="rend-acad-input" value={usuario?.codigo || ''} disabled />
        </div>
        <div className="rend-acad-row">
          <label className="rend-acad-label">Apellidos y Nombres:</label>
          <input className="rend-acad-input" value={usuario?.apellidosNombres || ''} disabled />
        </div>
        <div className="rend-acad-row">
          <label className="rend-acad-label">Programa Académico:</label>
          <input className="rend-acad-input" value={usuario?.programa || ''} disabled />
        </div>
      </div>

      {/* Card de tabla de rendimiento */}
      <div className="rend-acad-card rend-acad-card-tabla">
        <h3 className="rend-acad-table-title">1. Rendimiento Académico</h3>
        <div className="rend-acad-table-wrapper">
          <table className="rend-acad-table">
            <thead>
              <tr>
                <th>Semestre</th>
                <th>Promedio x Semestre</th>
                <th>Cantidad de Créditos</th>
                <th>Cantidad de Cursos</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {rendimiento.map((r, idx) => (
                <tr key={r.semestre}>
                  <td>{r.semestre}</td>
                  <td>{r.promedio.toFixed(4)}</td>
                  <td>{r.creditos}</td>
                  <td>{r.cursos}</td>
                  <td>
                    <button
                      className="rend-acad-btn-ver"
                      onClick={() => handleVerDetalle(r.semestre)}
                    >
                      <EyeIcon style={{ width: 18, height: 18, marginRight: 4 }} />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rend-acad-table-foot">
          * Para el Ranking de Promoción y la Pertenencia al Tercio, Cuarto y Quinto Superior se considera a partir de 19 créditos y cursos aprobados.
        </div>
      </div>

      {/* Card de detalle (solo si mostrarDetalle) */}
      {mostrarDetalle && detalle && (
        <div className="rend-acad-card rend-acad-card-detalle" ref={detalleRef} >
          <h3 className="rend-acad-table-title">2. Pertenencia al Tercio, Cuarto y Quinto Superior:</h3>
          <div className="rend-acad-alert">
            {detalle.pertenencia.califica ? (
              <span>Califica para Tercio, Cuarto o Quinto Superior.</span>
            ) : (
              <span>{detalle.pertenencia.mensaje}</span>
            )}
          </div>

          <h3 className="rend-acad-table-title">3. Ranking de Promoción:</h3>
          <div className="rend-acad-table-wrapper">
            <table className="rend-acad-table">
              <thead>
                <tr>
                  <th>Semestre</th>
                  <th>Promedio Ponderado</th>
                  <th>Ubicación</th>
                  <th>Total Alumnos</th>
                </tr>
              </thead>
              <tbody>
                {detalle.rankingPromocion.map((r: any) => (
                  <tr key={r.semestre}>
                    <td>{r.semestre}</td>
                    <td>{r.promedio.toFixed(6)}</td>
                    <td>{r.ubicacion}</td>
                    <td>{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="rend-acad-table-title">4. Promedio Ponderado Global:</h3>
          <div className="rend-acad-table-wrapper">
            <table className="rend-acad-table">
              <thead>
                <tr>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{detalle.promedioGlobal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="rend-acad-table-title">5. RANKING EGRESADOS (SERUM):</h3>
          <div className="rend-acad-table-wrapper">
            <table className="rend-acad-table">
              <thead>
                <tr>
                  <th>Semestre Egreso</th>
                  <th>Promedio Ponderado Promocional*</th>
                  <th>Ubicación</th>
                  <th>Total Alumnos</th>
                </tr>
              </thead>
              <tbody>
                {detalle.rankingEgresados.map((r: any) => (
                  <tr key={r.semestre}>
                    <td>{r.semestre}</td>
                    <td>{r.promedio.toFixed(4)}</td>
                    <td>{r.ubicacion}</td>
                    <td>{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rend-acad-table-foot">
            *Promedio Ponderado Promocional (PPP): Es la nota que la universidad determina como resultado de la sumatoria del producto de las notas aprobadas y desaprobadas de las asignaturas desarrolladas durante el pregrado que INCLUYE LA NOTA DEL INTERNADO. (Resol.Ministerial 514-2024/MINSA, 31/07/2024)
          </div>
          <div className="rend-acad-table-foot" style={{ textAlign: "center", color: "#222", fontSize: "0.98rem" }}>
            Oficina de Informática viernes, 12 de setiembre de 2025. Hora: 11:39:49
          </div>
        </div>
      )}
    </div>
  );
};

export default RendimientoAcademico;