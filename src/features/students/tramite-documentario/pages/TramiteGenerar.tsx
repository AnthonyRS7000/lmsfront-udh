import React, { useState, Suspense } from 'react';
import '../css/TramiteGenerar.css';

import AnulacionNota from '../tramite/pages/AnulacionNota';
import AnulacionTaller from '../tramite/pages/AnulacionTaller';

const TIPOS_TRAMITE = [
  { value: '0', label: 'Seleccione un tipo de trámite' },
  { value: '0162', label: 'ANULACION DE NOTA' },
  { value: '0177', label: 'ANULACION DE TALLER' },
  { value: '0544', label: 'APROBACION DEL INFORME FINAL DE PPP' },
  { value: '2225', label: 'APROBACION DEL INFORME FINAL DEL TRABAJO DE INVESTIGACION (BACHILLER)' },
  { value: '1012', label: 'APROBACION DEL INFORME FINAL DEL TRABAJO DE INVESTIGACION (TESIS)' },
  { value: '2433', label: 'APROBACION DEL INFORME FINAL DEL TRABAJO DE SUFICIENCIA PROFESIONAL' },
  { value: '0383', label: 'APROBACION DEL PLAN DE  PRACTICAS PRE PROFESIONALES' },
  { value: '2221', label: 'APROBACIÓN DEL PROYECTO DEL TRABAJO DE INVESTIGACIÓN (BACHILLER)' },
  { value: '1011', label: 'APROBACIÓN DEL TRABAJO DE INVESTIGACIÓN (TESIS)' },
  { value: '2013', label: 'CAMBIO DE ASESOR DE TRABAJO DE INVESTIGACION (TESIS)' },
  { value: '0581', label: 'CAMBIO DE FILIAL TEMPORAL' },
  { value: '0375', label: 'CAMBIO DE SEDE/FILIAL DEFINITIVO' },
  { value: '2373', label: 'CARTA DE PRESENTACION (PLAN 2021)' },
  { value: '0003', label: 'CERTIFICADO DE ESTUDIOS' },
  { value: '2194', label: 'CERTIFICADO DE ESTUDIOS DEL CURSO DE INGLES (SAP)' },
  { value: '2449', label: 'CERTIFICADO DEL IDIOMA EXTRANJERO' },
  { value: '0035', label: 'CONSTANCIA DE CONDUCTA' },
  { value: '0080', label: 'CONSTANCIA DE EGRESADO' },
  { value: '0018', label: 'CONSTANCIA DE ESTUDIOS' },
  { value: '2384', label: 'CONSTANCIA DE ESTUDIOS PRONABEC' },
  { value: '0492', label: 'CONSTANCIA DE HABILITACIÓN PARA TRÁMITE' },
  { value: '2438', label: 'CONSTANCIA DE IDIOMA EXTRANJERO PLAN 2021 (BACHILLER)' },
  { value: '1017', label: 'CONSTANCIA DE INGLES' },
  { value: '2490', label: 'CONSTANCIA DE INGLES DEL SERVICIO PUBLICO(SAP)' },
  { value: '0050', label: 'CONSTANCIA DE INGRESO' },
  { value: '1296', label: 'CONSTANCIA DE PRIMERA MATRICULA' },
  { value: '0096', label: 'CONSTANCIA DE QUINTO SUPERIOR' },
  { value: '0564', label: 'CONSTANCIA DE TERCIO SUPERIOR' },
  { value: '2324', label: 'CONVALIDACION DE PRACTICAS PRE PROFESIONALES' },
  { value: '1223', label: 'CONVALIDACION DEL CURSO DE INGLES CON EL SERVICIO PUBLICO (SAP)' },
  { value: '0376', label: 'CONVALIDACIONES' },
  { value: '1371', label: 'CONVALIDACIONES PARA ALUMNOS DE OTRAS UNIVERSIDADES' },
  { value: '2319', label: 'DESIGNACION DE DOCENTE ASESOR PARA TRAB. SUF. PROF' },
  { value: '1892', label: 'DESIGNACION DE JURADOS PARA LA  REV. DEL TRABAJO DE INV. (TESIS)' },
  { value: '2415', label: 'DESIGNACION DE JURADOS PARA LA  REV. DEL TRABAJO DE SUFIC. PROF.' },
  { value: '2265', label: 'DESIGNACION DE JURADOS REV. PARA EL INF.FINAL DEL TRAB.  INV.(BACHILLER)' },
  { value: '1955', label: 'DESIGNACION DE JURADOS REV. PARA EL INF.FINAL DEL TRAB.  INV.(TESIS)' },
  { value: '1010', label: 'DESIGNACIÓN DEL DOCENTE ASESOR PARA LA TESIS' },
  { value: '2003', label: 'DEVOLUCIÓN DE DINERO' },
  { value: '0220', label: 'EXAMEN DE SUBSANACION' },
  { value: '0877', label: 'EXAMEN DE SUBSANACION (CATP)' },
  { value: '2104', label: 'EXAMEN DE SUBSANACION (SAP)' },
  { value: '1009', label: 'FECHA Y HORA DE SUSTENTACIÓN DE TESIS' },
  { value: '2446', label: 'FECHA Y HORA DE SUSTENTACION TRAB. DE SUFICIENCIA' },
  { value: '1118', label: 'LLEVAR CON CRUCE DE HORARIO (POR SER ULTIMO CICLO)' },
  { value: '2646', label: 'LLEVAR CON EXCESO DE CREDITOS (ULTIMO SEMESTRE)' },
  { value: '0377', label: 'LLEVAR CURSO DIRIGIDO' },
  { value: '0360', label: 'LLEVAR CURSO PARALELO (PARA ALUMNOS QUE ESTAN POR EGRESAR)' },
  { value: '1340', label: 'POSTERGACION DE ESTUDIOS' },
  { value: '2226', label: 'PROFORMA DE ESTUDIOS - PREGRADO' },
  { value: '0333', label: 'REINCORPORACIONES' },
  { value: '1331', label: 'REINICIO DE INSCRIPCION' },
  { value: '0534', label: 'RENUNCIA DE INGRESO A LA CARRERA PROFESIONAL' },
  { value: '0442', label: 'RESERVA DE MATRICULA' },
  { value: '1398', label: 'RETIRO DE CURSO' },
  { value: '0382', label: 'RETIRO DE SEMESTRE' },
  { value: '1926', label: 'TRANSFERENCIA DE PAGO' },
  { value: '0986', label: 'VALIDEZ DE REINCORPORACION' },
];

// Se relaciona el value del select con el componente correspondiente
const FORMULARIOS: Record<string, React.FC> = {
  '0162': AnulacionNota,
  '0177': AnulacionTaller,
  '0544': AnulacionNota,
  '2225': AnulacionNota,
  '1012': AnulacionNota,
  '2433': AnulacionNota,
  '0383': AnulacionNota,
  '2221': AnulacionNota,
  '1011': AnulacionNota,
  '2013': AnulacionNota,
  '0581': AnulacionNota,
  '0375': AnulacionNota,
  '2373': AnulacionNota,
  '0003': AnulacionNota,
  '2194': AnulacionNota,
  '2449': AnulacionNota,
  '0035': AnulacionNota,
  '0080': AnulacionNota,
  '0018': AnulacionNota,
  '2384': AnulacionNota,
  '0492': AnulacionNota,
  '2438': AnulacionNota,
  /*'1017': 'ConstanciaIngles',
  '2490': 'ConstanciaInglesServicioPublicoSAP',
  '0050': 'ConstanciaIngreso',
  '1296': 'ConstanciaPrimeraMatricula',
  '0096': 'ConstanciaQuintoSuperior',
  '0564': 'ConstanciaTercioSuperior',
  '2324': 'ConvalidacionPracticasPreProfesionales',
  '1223': 'ConvalidacionCursoInglesServicioPublicoSAP',
  '0376': 'Convalidaciones',
  '1371': 'ConvalidacionesAlumnosOtrasUniversidades',
  '2319': 'DesignacionDocenteAsesorTrabajoSuficienciaProfesional',
  '1892': 'DesignacionJuradosRevisionTrabajoInvestigacionTesis',
  '2415': 'DesignacionJuradosRevisionTrabajoSuficienciaProfesional',
  '2265': 'DesignacionJuradosRevisionInformeFinalTrabajoInvestigacionBachiller',
  '1955': 'DesignacionJuradosRevisionInformeFinalTrabajoInvestigacionTesis',
  '1010': 'DesignacionDocenteAsesorTesis',
  '2003': 'DevolucionDinero',
  '0220': 'ExamenSubsanacion',
  '0877': 'ExamenSubsanacionCATP',
  '2104': 'ExamenSubsanacionSAP',
  '1009': 'FechaHoraSustentacionTesis',
  '2446': 'FechaHoraSustentacionTrabajoSuficiencia',
  '1118': 'LlevarCruceHorarioUltimoCiclo',
  '2646': 'LlevarExcesoCreditosUltimoSemestre',
  '0377': 'LlevarCursoDirigido',
  '0360': 'LlevarCursoParaleloEgresar',
  '1340': 'PostergacionEstudios',
  '2226': 'ProformaEstudiosPregrado',
  '0333': 'Reincorporaciones',
  '1331': 'ReinicioInscripcion',
  '0534': 'RenunciaIngresoCarreraProfesional',
  '0442': 'ReservaMatricula',
  '1398': 'RetiroCurso',
  '0382': 'RetiroSemestre',
  '1926': 'TransferenciaPago',
  '0986': 'ValidezReincorporacion',*/
};

const TramiteDocumentario: React.FC = () => {
  const [tipoTramite, setTipoTramite] = useState('0');

  // Obtiene el formulario correspondiente
  const Formulario = FORMULARIOS[tipoTramite];
  return (
    <div className="tramite-documentario-root">
      <h2 className="rend-acad-title">Generar Trámite Documentario</h2>
      {/* Card de selección de trámite */}
      <div className="tramite-documentario-card tramite-documentario-card-select">
        <label className="tramite-documentario-label" htmlFor="tipo-tramite">
          TIPO DE TRÁMITE:
        </label>
        <select
          id="tipo-tramite"
          className="tramite-documentario-select"
          value={tipoTramite}
          onChange={e => setTipoTramite(e.target.value)}
        >
          {TIPOS_TRAMITE.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      {Formulario ? (
          <Suspense fallback={<div>Cargando formulario...</div>}>
            <Formulario />
          </Suspense>
        ) : (
          <div style={{ color: "#888", textAlign: "center", margin: "24px 0" }}>
            Seleccione un tipo de trámite para continuar.
          </div>
        )}
    </div>
  );
};

export default TramiteDocumentario;