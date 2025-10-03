import React, { useState, useEffect, Suspense } from 'react';
import '../css/TramiteGenerar.css';

import AnulacionNota from '../tramite/pages/AnulacionNota';
import Loading from '../../../../components/pages/Loading';
import Card from '../../../../components/pages/Card';
import { ApiService } from '../../../../components/pages/ApiService';
import Titulo from '../../../../components/pages/TituloPage';

const FORMULARIOS: Record<string, React.FC> = {
  '0162': AnulacionNota,
  /*'0177': AnulacionTaller,
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
  '1017': 'ConstanciaIngles',
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
  const [tiposTramite, setTiposTramite] = useState<{ codTipTra: string; destiptra: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
    const codigoEscuela = datosUdh?.codesc;
    const fetchTiposTramite = async () => {
      setLoading(true);
      try {
        const data_tramites = await ApiService.get(`/escuelas/tramites?codesc=${codigoEscuela}`);

        if (Array.isArray(data_tramites.data)) {
          setTiposTramite(data_tramites.data); // Asignar los datos al estado
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error al cargar los tipos de trámite:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposTramite();
  }, []);

  // Obtiene el formulario correspondiente
  const Formulario = FORMULARIOS[tipoTramite];
  return (
    <div className="tramite-documentario-root">
      <Titulo titulo="Trámite Documentario" />
      
      <Card>
        <label className="tramite-documentario-label" htmlFor="tipo-tramite">
          TIPO DE TRÁMITE:
        </label>
        {loading ? (
          <Loading />
        ) : error ? (
          <div style={{ color: "red" }}>Error al cargar los tipos de trámite.</div>
        ) : (
          <select
            id="tipo-tramite"
            className="tramite-documentario-select"
            value={tipoTramite}
            onChange={(e) => setTipoTramite(e.target.value)}
          >
            <option value="0">Seleccione un tipo de trámite</option>
            {tiposTramite.map((t) => (
              <option key={t.codTipTra} value={t.codTipTra}>
                {t.destiptra}
              </option>
            ))}
          </select>
        )}
      </Card>
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