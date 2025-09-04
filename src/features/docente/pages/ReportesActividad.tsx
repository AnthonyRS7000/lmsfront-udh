import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line, ResponsiveContainer
} from "recharts";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import "../css/reportes-actividad.css";
import { useState } from "react";

function ReportesActividad() {
  // Datos simulados
  const cursos = ["EpidemiologiaI", "EpidemiologiaII", "Química", "Biología", "Historia", "Geografía", "Lengua", "Arte"];

  // Notas por curso: cada curso tiene array de notas de estudiantes
  const notasPorCursoData: Record<string, number[]> = {
    EpidemiologiaI: [18, 15, 16, 10, 18, 15, 14, 17, 16, 15],
    EpidemiologiaII: [15, 14, 13, 18, 17, 16, 15, 12, 14, 13],
    Química: [14, 12, 16, 18, 15, 14, 13, 12, 16, 15],
    Biología: [17, 18, 16, 15, 14, 13, 12, 18, 17, 16],
    Historia: [12, 13, 14, 15, 16, 17, 18, 12, 13, 14],
    Geografía: [13, 14, 15, 16, 17, 18, 13, 14, 15, 16],
    Lengua: [16, 15, 14, 13, 12, 18, 17, 16, 15, 14],
    Arte: [11, 12, 13, 14, 15, 16, 17, 18, 11, 12],
  };

  // Aprobados/desaprobados por curso
  const aprobadosPorCursoData = cursos.map(curso => {
    const notas = notasPorCursoData[curso];
    const aprobados = notas.filter(n => n >= 13).length;
    const desaprobados = notas.length - aprobados;
    return { curso, aprobados, desaprobados };
  });

  // Asistencias por curso (para dashboard abajo izquierda)
  const asistenciasPorCurso = [
    { curso: "EpidemiologiaI", asistencias: 120 },
    { curso: "EpidemiologiaII", asistencias: 110 },
    { curso: "Química", asistencias: 105 },
    { curso: "Biología", asistencias: 130 },
    { curso: "Historia", asistencias: 90 },
    { curso: "Geografía", asistencias: 95 },
    { curso: "Lengua", asistencias: 100 },
    { curso: "Arte", asistencias: 80 },
  ];

  // Rendimiento por fecha y curso (simulado)
  const fechas = [
    "2025-08-01",
    "2025-08-08",
    "2025-08-15",
    "2025-08-22",
    "2025-08-29",
    "2025-09-05",
  ];
  // Simulación de datos de rendimiento por curso y fecha
  const rendimientoPorCursoFecha: Record<string, { fecha: string; promedio: number; estado: string }[]> = {
    Biología: [
      { fecha: "2025-08-01", promedio: 17.2, estado: "Bueno" },
      { fecha: "2025-08-08", promedio: 13.5, estado: "Normal" },
      { fecha: "2025-08-15", promedio: 11.8, estado: "Malo" },
      { fecha: "2025-08-22", promedio: 18.1, estado: "Excelente" },
      { fecha: "2025-08-29", promedio: 15.0, estado: "Bueno" },
      { fecha: "2025-09-05", promedio: 14.2, estado: "Normal" },
    ],
    EpidemiologiaII: [
      { fecha: "2025-08-01", promedio: 15.2, estado: "Normal" },
      { fecha: "2025-08-08", promedio: 18.5, estado: "Excelente" },
      { fecha: "2025-08-15", promedio: 16.8, estado: "Bueno" },
      { fecha: "2025-08-22", promedio: 12.1, estado: "Malo" },
      { fecha: "2025-08-29", promedio: 14.0, estado: "Normal" },
      { fecha: "2025-09-05", promedio: 17.2, estado: "Bueno" },
    ],
    EpidemiologiaI: [
      { fecha: "2025-08-01", promedio: 13.2, estado: "Normal" },
      { fecha: "2025-08-08", promedio: 12.5, estado: "Malo" },
      { fecha: "2025-08-15", promedio: 15.8, estado: "Bueno" },
      { fecha: "2025-08-22", promedio: 16.1, estado: "Bueno" },
      { fecha: "2025-08-29", promedio: 18.0, estado: "Excelente" },
      { fecha: "2025-09-05", promedio: 14.2, estado: "Normal" },
    ],
    Química: [
      { fecha: "2025-08-01", promedio: 14.2, estado: "Normal" },
      { fecha: "2025-08-08", promedio: 13.5, estado: "Normal" },
      { fecha: "2025-08-15", promedio: 12.8, estado: "Malo" },
      { fecha: "2025-08-22", promedio: 16.1, estado: "Bueno" },
      { fecha: "2025-08-29", promedio: 17.0, estado: "Bueno" },
      { fecha: "2025-09-05", promedio: 18.2, estado: "Excelente" },
    ],
    Historia: [
      { fecha: "2025-08-01", promedio: 12.2, estado: "Malo" },
      { fecha: "2025-08-08", promedio: 13.5, estado: "Normal" },
      { fecha: "2025-08-15", promedio: 14.8, estado: "Normal" },
      { fecha: "2025-08-22", promedio: 15.1, estado: "Bueno" },
      { fecha: "2025-08-29", promedio: 16.0, estado: "Bueno" },
      { fecha: "2025-09-05", promedio: 17.2, estado: "Bueno" },
    ],
    Geografía: [
      { fecha: "2025-08-01", promedio: 13.2, estado: "Normal" },
      { fecha: "2025-08-08", promedio: 14.5, estado: "Normal" },
      { fecha: "2025-08-15", promedio: 15.8, estado: "Bueno" },
      { fecha: "2025-08-22", promedio: 16.1, estado: "Bueno" },
      { fecha: "2025-08-29", promedio: 17.0, estado: "Bueno" },
      { fecha: "2025-09-05", promedio: 18.2, estado: "Excelente" },
    ],
    Lengua: [
      { fecha: "2025-08-01", promedio: 14.2, estado: "Normal" },
      { fecha: "2025-08-08", promedio: 13.5, estado: "Normal" },
      { fecha: "2025-08-15", promedio: 12.8, estado: "Malo" },
      { fecha: "2025-08-22", promedio: 16.1, estado: "Bueno" },
      { fecha: "2025-08-29", promedio: 17.0, estado: "Bueno" },
      { fecha: "2025-09-05", promedio: 18.2, estado: "Excelente" },
    ],
    Arte: [
      { fecha: "2025-08-01", promedio: 11.2, estado: "Malo" },
      { fecha: "2025-08-08", promedio: 13.5, estado: "Normal" },
      { fecha: "2025-08-15", promedio: 14.8, estado: "Normal" },
      { fecha: "2025-08-22", promedio: 15.1, estado: "Bueno" },
      { fecha: "2025-08-29", promedio: 16.0, estado: "Bueno" },
      { fecha: "2025-09-05", promedio: 17.2, estado: "Bueno" },
    ],
  };

  // Filtros
  const [cursoSeleccionado, setCursoSeleccionado] = useState(cursos[0]);
  const [aprobadoFiltro, setAprobadoFiltro] = useState<"aprobados" | "desaprobados">("aprobados");
  const [cursoRendimiento, setCursoRendimiento] = useState(cursos[0]);

  // Datos para gráfico de barras (notas por curso seleccionado)
  const notasBarData = Array.from(new Set(notasPorCursoData[cursoSeleccionado]))
    .sort((a, b) => b - a)
    .map(nota => ({
      nota,
      cantidad: notasPorCursoData[cursoSeleccionado].filter(n => n === nota).length,
    }));

  // Datos para gráfico de pastel (aprobados/desaprobados por curso)
  const pieData = aprobadosPorCursoData.map(c => ({
    curso: c.curso,
    value: aprobadoFiltro === "aprobados" ? c.aprobados : c.desaprobados,
  }));

  // Datos para rendimiento por fecha y curso seleccionado
  const rendimientoPorFecha = rendimientoPorCursoFecha[cursoRendimiento];

  // Ranking de asistencias
  const rankingAsistencias = [...asistenciasPorCurso].sort((a, b) => b.asistencias - a.asistencias);

  // Descargar PDF corregido
  const handleDescargar = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Actividad", 14, 18);

    doc.setFontSize(14);
    doc.text("Notas por curso:", 14, 30);
    doc.autoTable({
      startY: 34,
      head: [["Curso", "Nota", "Cantidad"]],
      body: cursos.map(curso => {
        const notas = Array.from(new Set(notasPorCursoData[curso])).sort((a, b) => b - a);
        return notas.map(nota => [
          curso,
          nota,
          notasPorCursoData[curso].filter(n => n === nota).length,
        ]);
      }).flat(),
    });

    doc.text("Aprobados por curso:", 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 14,
      head: [["Curso", "Aprobados", "Desaprobados"]],
      body: aprobadosPorCursoData.map(a => [a.curso, a.aprobados, a.desaprobados]),
    });

    doc.text("Ranking de cursos con más asistencias:", 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 14,
      head: [["Posición", "Curso", "Asistencias"]],
      body: rankingAsistencias.map((a, idx) => [idx + 1, a.curso, a.asistencias]),
    });

    doc.text(`Rendimiento promedio por fecha (${cursoRendimiento}):`, 14, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 14,
      head: [["Fecha", "Promedio", "Estado"]],
      body: rendimientoPorFecha.map(r => [r.fecha, r.promedio, r.estado]),
    });

    doc.save("reporte_actividad.pdf");
  };

  const COLORS = ["#4CAF91", "#FFD966", "#E57373", "#81C784", "#90CAF9", "#CF2C17", "#388e6c", "#3D3C3B"];

  // Colores para estados de rendimiento
  const estadoColor: Record<string, string> = {
    "Excelente": "#4CAF91",
    "Bueno": "#388e6c",
    "Normal": "#FFD966",
    "Malo": "#CF2C17",
  };

  return (
    <div className="reportes-actividad-container">
      <h2 className="reportes-actividad-title">REPORTES DE ACTIVIDAD</h2>
      <hr className="reportes-actividad-divider" />
      <div className="reportes-actividad-grid">
        {/* Notas por curso */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            Notas por curso:
            <select
              className="dashboard-select"
              value={cursoSeleccionado}
              onChange={e => setCursoSeleccionado(e.target.value)}
              style={{ marginLeft: 12 }}
            >
              {cursos.map(curso => (
                <option key={curso} value={curso}>{curso}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={notasBarData}>
              <XAxis dataKey="nota" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#4CAF91" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Aprobados por curso */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            Aprobados por curso:
            <select
              className="dashboard-select"
              value={aprobadoFiltro}
              onChange={e => setAprobadoFiltro(e.target.value as "aprobados" | "desaprobados")}
              style={{ marginLeft: 12 }}
            >
              <option value="aprobados">Aprobados</option>
              <option value="desaprobados">Desaprobados</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="curso"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Ranking de cursos con más asistencias */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            Ranking de cursos con más asistencias:
          </div>
          <ol className="ranking-list">
            {rankingAsistencias.map((curso, idx) => (
              <li key={curso.curso} className="ranking-item">
                <span className="ranking-pos">{idx + 1}.</span>
                <span className="ranking-nombre">{curso.curso}</span>
                <span className="ranking-asistencias">{curso.asistencias} asistencias</span>
              </li>
            ))}
          </ol>
        </div>
        {/* Rendimiento promedio por curso y fecha con filtro */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            Rendimiento promedio por fecha:
            <select
              className="dashboard-select"
              value={cursoRendimiento}
              onChange={e => setCursoRendimiento(e.target.value)}
              style={{ marginLeft: 12 }}
            >
              {cursos.map(curso => (
                <option key={curso} value={curso}>{curso}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rendimientoPorFecha}>
              <XAxis dataKey="fecha" fontSize={12} />
              <YAxis />
              <Tooltip
                formatter={(value: any, name: any, props: any) => {
                  const estado = rendimientoPorFecha[props.payload.index]?.estado;
                  return [`${value} (${estado})`, "Promedio"];
                }}
              />
              <Line
                type="monotone"
                dataKey="promedio"
                stroke="#CF2C17"
                strokeWidth={3}
                dot={(props: any) => (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={6}
                    stroke="#fff"
                    strokeWidth={2}
                    fill={estadoColor[rendimientoPorFecha[props.index]?.estado] || "#CF2C17"}
                  />
                )}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="estado-leyenda">
            <span style={{ color: estadoColor["Excelente"], fontWeight: 600 }}>● Excelente</span>
            <span style={{ color: estadoColor["Bueno"], fontWeight: 600, marginLeft: 12 }}>● Bueno</span>
            <span style={{ color: estadoColor["Normal"], fontWeight: 600, marginLeft: 12 }}>● Normal</span>
            <span style={{ color: estadoColor["Malo"], fontWeight: 600, marginLeft: 12 }}>● Malo</span>
          </div>
        </div>
      </div>
      <div className="reportes-actividad-download">
        <button className="reportes-actividad-btn" onClick={handleDescargar}>
          <DocumentArrowDownIcon style={{ width: 20, marginRight: 8 }} />
          Descargar Reporte
        </button>
      </div>
    </div>
  );
}

export default ReportesActividad;