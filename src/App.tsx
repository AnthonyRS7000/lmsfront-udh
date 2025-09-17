import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./Login";

// Contexto de autenticación
import RutaProtegidaPorRol from "./components/RutaProtegidaPorRol";
import { AuthProvider } from "./context/AuthContext";
import AuthCallback from "./context/AuthCallback";

// Importar dashboards por rol
import EstudianteDashboard from "./features/estudiante/pages/EstudianteDashboard";
import DocenteDashboard from "./features/docente/pages/DocenteDashboard";
import EscuelaDashboard from "./features/escuela/pages/EscuelaDashboard";
import FacultadDashboard from "./features/facultad/pages/FacultadDashboard";
import AdministrativoDashboard from "./features/administrativo/pages/AdministrativoDashboard";

// Importar páginas del módulo Gestión de Matrícula
import ProfilePage from "./components/ProfilePage";
import {
  Matricula,
  VerHorario,
  Reglamento
} from "./features/students/gestion-matricula";

// Importar páginas del módulo Registros Académicos
import {
  CursosLlevados,
  MiAsistencia,
  NotasParciales,
  EvaluacionDiaria,
  HistorialAcademico,
  PlanDeEstudios,
  MallaCurricular,
  RendimientoAcademico
} from "./features/students/registros-academicos";

// Titulación y Grados
import {
  ConsultaRegistroGradosTitulos,
  FichaInscripcionTitulacion,
  InscripcionTallerTrabInv,
  TramiteGradosTitulos as TramiteGradosTitulosTitulacion
} from "./features/students/titulacion-graduados";

// Servicios Universitarios
import {
  CarnetSunedu,
  TarjetaIdentificacionVirtual,
  BolsaTrabajoUDH,
  InscripcionIdiomaExtranjero,
  EducacionDistancia,
  CongresosOtros
} from './features/students/servicio-universitario';

// Trámite (nuevo módulo)
import { TramiteGenerar, TramiteSeguimiento} from './features/students/tramite-documentario';

// Soporte y Defensoría
import {
  ConsultasQuejas,
  ConsentimientoInformado,
} from './features/students/soporte-defensoria';

import Cursos from "./features/docente/pages/Cursos";
import SubirSilabo from './features/docente/pages/SubirSilabo';
import GestionHorarios from "./features/docente/pages/GestionHorarios";
import ReportesActividad from "./features/docente/pages/ReportesActividad";
import RegistroCalificaciones from "./features/docente/pages/RegistroCalificaciones";
import FirmaActas from "./features/docente/pages/FirmaActas";
import GestionCursos from "./features/docente/pages/GestionCursos";
import VerCursoGestionCursos from "./features/docente/pages/VerCursoGestionCursos";
import CrearEvaluaciones from "./features/docente/pages/CrearEvaluaciones";
import Evaluaciones from "./features/docente/pages/Evaluaciones";
import SeguimientoEstudiante from "./features/docente/pages/SeguimientoEstudiante";

import PlanificacionCursos from "./features/administrativo/pages/PlanificacionCursos";
import AsignacionDocentes from "./features/administrativo/pages/AsignacionDocentes";
import GestionHorariosAulas from "./features/administrativo/pages/GestionHorariosAulas";
import MatriculaEstudiantes from "./features/administrativo/pages/MatriculaEstudiantes";
import ControlNotas from "./features/administrativo/pages/ControlNotas";
import SeguimientoAcademico from "./features/administrativo/pages/SeguimientoAcademico";
import EvaluacionDocente from "./features/administrativo/pages/EvaluacionDocente";
import Monitoreo from "./features/administrativo/pages/Monitoreo";
import Perfiles from "./features/administrativo/pages/Perfiles";
import Roles from "./features/administrativo/pages/Roles";
import Usuarios from "./features/administrativo/pages/Usuarios";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Rutas protegidas por rol */}
          <Route element={
            <RutaProtegidaPorRol rolPermitido="estudiante">
              <Layout />
            </RutaProtegidaPorRol>
          }>
            <Route path="/estudiante" element={<EstudianteDashboard />} />
            {/* Gestión de Matrícula */}
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/estudiante/perfil" element={<ProfilePage />} />
            <Route path="/estudiante/matricula" element={<Matricula />} />
            <Route path="/estudiante/ver-horario" element={<VerHorario />} />
            <Route path="/estudiante/reglamento" element={<Reglamento />} />
            <Route path="/estudiante/progreso_academico" element={<div />} />

            {/* Registros Académicos */}
            <Route path="/estudiante/cursos-llevados" element={<CursosLlevados />} />
            <Route path="/estudiante/mi-asistencia" element={<MiAsistencia />} />
            <Route path="/estudiante/notas-parciales" element={<NotasParciales />} />
            <Route path="/estudiante/evaluacion-diaria" element={<EvaluacionDiaria />} />
            <Route path="/estudiante/historial-academico" element={<HistorialAcademico />} />
            <Route path="/estudiante/plan-de-estudios" element={<PlanDeEstudios />} />
            <Route path="/estudiante/malla-curricular" element={<MallaCurricular />} />
            <Route path="/estudiante/rendimiento-academico" element={<RendimientoAcademico />} />

            {/* Titulación y Grados */}
            <Route path="/estudiante/titulacion/consulta-grados" element={<ConsultaRegistroGradosTitulos />} />
            <Route path="/estudiante/titulacion/ficha-inscripcion" element={<FichaInscripcionTitulacion />} />
            <Route path="/estudiante/titulacion/inscripcion-taller" element={<InscripcionTallerTrabInv />} />
            <Route path="/estudiante/titulacion/tramite-grados" element={<TramiteGradosTitulosTitulacion />} />

            {/* Servicios Universitarios */}
            <Route path="/estudiante/servicios/carnet-sunedu" element={<CarnetSunedu />} />
            <Route path="/estudiante/servicios/tarjeta-virtual" element={<TarjetaIdentificacionVirtual />} />
            <Route path="/estudiante/servicios/bolsa-trabajo" element={<BolsaTrabajoUDH />} />
            <Route path="/estudiante/servicios/inscripcion-idioma" element={<InscripcionIdiomaExtranjero />} />
            <Route path="/estudiante/servicios/educacion-distancia" element={<EducacionDistancia />} />
            <Route path="/estudiante/servicios/congresos-otros" element={<CongresosOtros />} />

            {/* Trámite */}
            <Route path="/estudiante/tramite/generar" element={<TramiteGenerar />} />
            <Route path="/estudiante/tramite/seguimiento" element={<TramiteSeguimiento />} />

            {/* Soporte y Defensoría */}
            <Route path="/estudiante/soporte/consultas-quejas" element={<ConsultasQuejas />} />
            <Route path="/estudiante/soporte/consentimiento-informado" element={<ConsentimientoInformado />} />
          </Route>

          <Route element={
            <RutaProtegidaPorRol rolPermitido="docente">
              <Layout />
            </RutaProtegidaPorRol>
          }>
            <Route path="/docente" element={<DocenteDashboard />} />
            {/* Rutas para docente */}
            <Route path="/docente/asignacion-cursos" element={<Cursos />} />
            <Route path="/docente/subir-silabo/:cursoId" element={<SubirSilabo />} />
            <Route path="/docente/gestion-horarios" element={<GestionHorarios />} />
            <Route path="/docente/reportes-actividad" element={<ReportesActividad />} />
            <Route path="/docente/registro-calificaciones" element={<RegistroCalificaciones />} />
            <Route path="/docente/firma-actas" element={<FirmaActas />} />
            <Route path="/docente/gestion-cursos" element={<GestionCursos />} />
            <Route path="/docente/ver-curso/:id" element={<VerCursoGestionCursos />} />
            <Route path="/docente/crear-evaluaciones" element={<CrearEvaluaciones />} />
            <Route path="/docente/evaluaciones" element={<Evaluaciones />} />
            <Route path="/docente/seguimiento-estudiantes" element={<SeguimientoEstudiante />} />
          </Route>

          <Route element={
            <RutaProtegidaPorRol rolPermitido="administrativo">
              <Layout />
            </RutaProtegidaPorRol>
          }>
            <Route path="/administrativo" element={<AdministrativoDashboard />} />
            {/* Rutas para administrativo */}
            <Route path="/administrativo/planificacion-cursos" element={<PlanificacionCursos />} />
            <Route path="/administrativo/asignacion-docentes" element={<AsignacionDocentes />} />
            <Route path="/administrativo/gestion-horarios-aulas" element={<GestionHorariosAulas />} />
            <Route path="/administrativo/matricula-estudiantes" element={<MatriculaEstudiantes />} />
            <Route path="/administrativo/control-notas" element={<ControlNotas />} />
            <Route path="/administrativo/seguimiento-academico" element={<SeguimientoAcademico />} />
            <Route path="/administrativo/evaluacion-docente" element={<EvaluacionDocente />} />
            <Route path="/administrativo/monitoreo" element={<Monitoreo />} />
            <Route path="/administrativo/perfiles" element={<Perfiles />} />
            <Route path="/administrativo/roles" element={<Roles />} />
            <Route path="/administrativo/usuarios" element={<Usuarios />} />
            <Route path="/administrativo" element={<AdministrativoDashboard />} />
          </Route>

          <Route element={
            <RutaProtegidaPorRol rolPermitido="escuela">
              <Layout />
            </RutaProtegidaPorRol>
          }>
            <Route path="/escuela" element={<EscuelaDashboard />} />
            <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Escuela</h2><p>Módulo en desarrollo</p></div>} />
          </Route>

          <Route element={
            <RutaProtegidaPorRol rolPermitido="facultad">
              <Layout />
            </RutaProtegidaPorRol>
          }>
            <Route path="/facultad" element={<FacultadDashboard />} />
            <Route path="/facultad/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Facultad</h2><p>Módulo en desarrollo</p></div>} />
          </Route>

          {/* Página no encontrada */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;