import React, { useState } from 'react';
import '../css/ProcessMatricula.css';

type Course = { code: string; name: string; ciclo: number; credit: number };

const sampleCourses: Course[] = [
  { code: '01150022', name: 'DERECHO PENAL I', ciclo: 4, credit: 4 },
  { code: '01150032', name: 'MEDICINA LEGAL', ciclo: 4, credit: 4 },
  { code: '01150062', name: 'CIENCIA POLITICA II', ciclo: 4, credit: 3 },
  { code: '01150074', name: 'INGLÉS IV', ciclo: 4, credit: 3 },
  { code: '01150011', name: 'DERECHO CIVIL III (FAMILIA)', ciclo: 5, credit: 4 },
  { code: '01150032A', name: 'DERECHO CONSTITUCIONAL II', ciclo: 5, credit: 4 },
  { code: '01150043', name: 'TEORIA DEL PROCESO', ciclo: 5, credit: 3 },
  { code: '01150062B', name: 'EPISTEMOLOGIA DEL DERECHO', ciclo: 5, credit: 3 },
  { code: '01150062C', name: 'TEORIA DE LA ARGUMENTACION JURIDICA', ciclo: 5, credit: 3 },
  { code: '01150071', name: 'SEMINARIO DE DERECHO CONSTIT. Y DD.HH.', ciclo: 5, credit: 3 },
  { code: '01150082', name: 'PROCEDIMIENTO ADMINISTRATIVO', ciclo: 6, credit: 3 },
  { code: '01150722', name: 'INFORMÁTICA JURÍDICA', ciclo: 6, credit: 3 },
  { code: '01150732', name: 'DERECHO LABORAL INDIVIDUAL', ciclo: 7, credit: 4 },
  { code: '01150731', name: 'LÓGICA JURÍDICA Y TÉCNICAS DE ARGUMENTACIÓN', ciclo: 7, credit: 3 },
  { code: '01150944', name: 'PRÁCTICA PRE-PROFESIONAL I', ciclo: 9, credit: 4 },
  { code: '01150962', name: 'DERECHO COMERCIAL I', ciclo: 9, credit: 4 },
  { code: '01151012', name: 'CONCILIACIÓN, NEGOCIACIÓN Y ARBITRAJE', ciclo: 11, credit: 3 },
  { code: '01151103', name: 'DERECHO MINERO Y DE ENERGÍA', ciclo: 11, credit: 3 },
  { code: '01151204', name: 'LIDERAZGO', ciclo: 12, credit: 3 },
  { code: '01151273', name: 'TALLER FORM. ORTOGRAFÍA Y REDACCIÓN', ciclo: 13, credit: 0 },
  { code: '01151401', name: 'TALLER: AJEDREZ', ciclo: 14, credit: 0 },
  { code: '01151402', name: 'TALLER: DANZAS', ciclo: 14, credit: 0 },
  { code: '01151403', name: 'TALLER: DIBUJO Y PINTURA', ciclo: 14, credit: 0 },
  { code: '01151405', name: 'TALLER: FÚTBOL', ciclo: 14, credit: 0 },
  { code: '01151406', name: 'TALLER: TENIS DE MESA', ciclo: 14, credit: 0 },
  { code: '01151411', name: 'TALLER: VOLEIBOL', ciclo: 14, credit: 0 }
];

const ProcessMatriculaPage: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const toggleCourse = (code: string) => {
    setSelected(prev => {
      const next = { ...prev, [code]: !prev[code] };
      // recalcular créditos
      const sum = sampleCourses.reduce((acc, c) => acc + (next[c.code] ? c.credit : 0), 0);
      setTotalCredits(sum);
      return next;
    });
  };

  const handleSave = () => {
    alert(`Cursos inscritos: ${Object.keys(selected).filter(k => selected[k]).length} - Créditos: ${totalCredits}`);
  };

  return (
    <div className="pm-root">
      <div className="pm-card">
        <h3 className="pm-title">Ficha de Inscripción</h3>

        {/* Header exactly like image 1: title bar + meta rows */}
        <div className="pm-header-frame">
          <div className="pm-header-top">
            <div className="pm-header-title">FICHA DE INSCRIPCIÓN POR CURSOS</div>
            <div className="pm-header-top-right">SIGUIENTE &gt;&gt;</div>
          </div>
          <div className="pm-header-body">
            <div className="pm-header-left">
              <div className="pm-meta-item"><span className="pm-meta-label">CÓDIGO:</span><span className="pm-meta-value">2015100100 1</span></div>
              <div className="pm-meta-item"><span className="pm-meta-label">SEMESTRE:</span><span className="pm-meta-value">2017-0</span></div>
              <div className="pm-meta-item"><span className="pm-meta-label">SEDE:</span><span className="pm-meta-value">HUÁNUCO</span></div>
              <div className="pm-meta-item"><span className="pm-meta-label">PLAN:</span><span className="pm-meta-value">2015</span></div>
            </div>
            <div className="pm-header-right">
              <div className="pm-meta-item"><span className="pm-meta-label">CICLO:</span><span className="pm-meta-value">0</span></div>
              <div className="pm-meta-item"><span className="pm-meta-label">CREDITOS PERMITIDOS:</span><span className="pm-meta-value">13</span></div>
            </div>
          </div>
        </div>
        <div className="pm-section">
          <div className="pm-courses">
            <div className="pm-courses-header">
              <div>CÓDIGO</div>
              <div>ASIGNATURAS</div>
              <div>CICLO</div>
              <div>CRÉD.</div>
              <div>SECCIÓN</div>
              <div>INSCRIBIR</div>
            </div>
            {sampleCourses.map(c => (
              <div className="pm-course-row" key={c.code}>
                <div className="col-code">{c.code}</div>
                <div className="col-name">{c.name}</div>
                <div className="col-ciclo">{c.ciclo}</div>
                <div className="col-credit">{c.credit}</div>
                <div className="col-section">A</div>
                <div className="col-action">
                  <input type="checkbox" checked={!!selected[c.code]} onChange={() => toggleCourse(c.code)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pm-actions">
          <div style={{ marginRight: 'auto', color: '#6b7280' }}>Promedio Ultimo Semestre (2016-2): 0.00</div>
          <div style={{ textAlign: 'right', marginRight: 12 }}>
            <div>TOTAL CRÉDITOS: <strong>{totalCredits}</strong></div>
            <div>CRÉDITOS ADICIONALES: <strong>0</strong></div>
          </div>
          <button className="pm-btn" onClick={handleSave}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default ProcessMatriculaPage;
