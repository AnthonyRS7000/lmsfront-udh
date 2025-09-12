import React, { useState } from 'react';
import '../css/CursosLlevados.css';

type Course = {
  no: number;
  codigo: string;
  descripcion: string;
  creditos: number;
  ciclo: number;
  nota?: string;
  fecha?: string;
};

const sample: Course[] = [
  { no: 1, codigo: '04150106', descripcion: 'INFORMÁTICA APLICADA A LA INGENIERÍA', creditos: 3, ciclo: 1, nota: '11', fecha: '27/01/2021' },
  { no: 2, codigo: '04150105', descripcion: 'INGLÉS I', creditos: 3, ciclo: 1, nota: '14', fecha: '29/01/2021' },
  { no: 3, codigo: '062101061', descripcion: 'INTRODUCCIÓN A LA INGENIERÍA DE SISTEMAS E INFORMÁTICA', creditos: 3, ciclo: 1, nota: '14', fecha: '06/07/2021' },
  { no: 4, codigo: '04150101', descripcion: 'LENGUAJE I', creditos: 4, ciclo: 1, nota: '14', fecha: '25/01/2021' },
];

const CursosLlevados: React.FC = () => {
  const [codigo, setCodigo] = useState('202210328');
  const [rows] = useState(sample);

  return (
    <div className="cursos-llevados-root">
      <h2 className="cursos-llevados-title">Cursos llevados</h2>

      <div className="cursos-llevados-filter">
        <label>Código:</label>
        <input value={codigo} onChange={e => setCodigo(e.target.value)} />
        <button className="btn-show">Mostrar</button>
      </div>

      <div className="cursos-llevados-card table-wrap">
        <table className="cursos-table">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Créd.</th>
              <th>Ciclo</th>
              <th>Nota</th>
              <th>Fec.Exa.</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.no}>
                <td>{r.no}</td>
                <td>{r.codigo}</td>
                <td className="desc">{r.descripcion}</td>
                <td>{r.creditos}</td>
                <td>{r.ciclo}</td>
                <td>{r.nota}</td>
                <td>{r.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CursosLlevados;
