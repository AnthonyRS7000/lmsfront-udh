import React, { useState } from 'react';
import '../css/VerHorario.css';

type Row = {
  codigo: string;
  curso: string;
  docente: string;
  seccion: string;
  ciclo: string;
  lunes?: string;
  martes?: string;
  miercoles?: string;
  jueves?: string;
  viernes?: string;
  sabado?: string;
  domingo?: string;
};

const sampleRows: Row[] = [
  {
    codigo: '062101011',
    curso: 'LENGUAJE I',
    docente: '',
    seccion: 'A',
    ciclo: '1',
    lunes: '08:00-10:15 P6-506 Presencial',
    viernes: '08:45-10:15 P6-506 Presencial'
  },
  {
    codigo: '062101021',
    curso: 'MATEMÁTICA BÁSICA I',
    docente: '',
    seccion: 'A',
    ciclo: '1',
    miercoles: '06:30-08:00 P6-506 Presencial',
    viernes: '06:30-08:45 P6-506 Presencial'
  },
  {
    codigo: '062101031',
    curso: 'MÉTODOS Y TÉCNICAS DE ESTUDIO',
    docente: '',
    seccion: 'A',
    ciclo: '1',
    martes: '06:30-08:00 P6-506 Presencial',
    miercoles: '06:30-08:00 P6-506 Presencial'
  },
  {
    codigo: '062101041',
    curso: 'ÉTICA Y LIDERAZGO',
    docente: '',
    seccion: 'A',
    ciclo: '1',
    jueves: '11:00-13:15 P6-506 Presencial'
  },
  {
    codigo: '062101051',
    curso: 'PSICOLOGÍA GENERAL',
    docente: '',
    seccion: 'A',
    ciclo: '1',
    miercoles: '08:45-11:00 P6-506 Presencial'
  },
  // Sección B ejemplo (repetido)
  {
    codigo: '062101011',
    curso: 'LENGUAJE I',
    docente: '',
    seccion: 'B',
    ciclo: '1',
    lunes: '14:00-16:15 P6-506 Presencial',
    martes: '14:00-15:30 P6-506 Presencial'
  },
  {
    codigo: '062101021',
    curso: 'MATEMÁTICA BÁSICA I',
    docente: '',
    seccion: 'B',
    ciclo: '1',
    martes: '17:00-19:15 P6-506 Presencial'
  }
];

function renderCell(text: string) {
  // Intentar separar 'hora' del resto. Buscamos el primer grupo de formato HH:MM o HH:MM-HH:MM
  const match = text.match(/^([0-9]{2}:[0-9]{2}(?:-[0-9]{2}:[0-9]{2})?)(?:\s*)(.*)$/);
  if (match) {
    const hora = match[1];
    const resto = match[2];
    return (
      <div className="cell-content">
        <div className="cell-time">{hora}</div>
        <div className="cell-info">{resto}</div>
      </div>
    );
  }
  return <div className="cell-content"><div className="cell-info">{text}</div></div>;
}

const VerHorario: React.FC = () => {
  const [cicloFilter, setCicloFilter] = useState('1');

  const rows = sampleRows.filter(r => r.ciclo === cicloFilter);

  return (
    <div className="ver-horario-root">
      <h2 className="ver-horario-title">Horario del Estudiante</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}>
        <label style={{ marginRight: 8, alignSelf: 'center' }}>Filtrar por Ciclo:</label>
        <select value={cicloFilter} onChange={e => setCicloFilter(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>

      <div className="ver-horario-card full-table">
        <table className="ver-horario-table schedule-table">
          <thead>
            <tr>
              <th>CODIGO</th>
              <th>CURSO</th>
              <th>DOCENTE</th>
              <th>SECCION</th>
              <th>CICLO</th>
              <th>LUNES</th>
              <th>MARTES</th>
              <th>MIERCOLES</th>
              <th>JUEVES</th>
              <th>VIERNES</th>
              <th>SABADO</th>
              <th>DOMINGO</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.codigo}</td>
                <td className="curso-cell">{r.curso}</td>
                <td>{r.docente}</td>
                <td>{r.seccion}</td>
                <td>{r.ciclo}</td>
                <td className="cell-detail">{r.lunes ? renderCell(r.lunes) : ''}</td>
                <td className="cell-detail">{r.martes ? renderCell(r.martes) : ''}</td>
                <td className="cell-detail">{r.miercoles ? renderCell(r.miercoles) : ''}</td>
                <td className="cell-detail">{r.jueves ? renderCell(r.jueves) : ''}</td>
                <td className="cell-detail">{r.viernes ? renderCell(r.viernes) : ''}</td>
                <td>{r.sabado || ''}</td>
                <td>{r.domingo || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="btn-download" onClick={() => exportToPdf()}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default VerHorario;

function exportToPdf() {
  const content = document.querySelector('.ver-horario-card');
  if (!content) return;
  const html = `
    <html>
      <head>
        <title>Horario</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #234a9e; padding: 8px; }
          thead th { background: #2F63D6; color: #fff; }
        </style>
      </head>
      <body>
        ${content.outerHTML}
      </body>
    </html>
  `;

  const w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
  // Esperar a que el contenido cargue
  setTimeout(() => { w.print(); w.close(); }, 500);
}
