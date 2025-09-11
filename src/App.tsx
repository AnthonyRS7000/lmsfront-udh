import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import StudentsPage from "./features/students/StudentsPage";
import Login from "./Login";

// Importar las nuevas páginas de dashboard por rol
import EstudianteDashboard from "./features/estudiante/pages/EstudianteDashboard";
import DocenteDashboard from "./features/docente/pages/DocenteDashboard";
import EscuelaDashboard from "./features/escuela/pages/EscuelaDashboard";
import FacultadDashboard from "./features/facultad/pages/FacultadDashboard";
import AdministrativoDashboard from "./features/administrativo/pages/AdministrativoDashboard";

// Importar páginas del módulo Gestión de Matrícula
import ProfilePage from "./features/students/ProfilePage";
import {
  Matricula,
  VerHorario,
  TramiteDocumentario,
  TramiteGradosTitulos,
  TramiteSeguimiento,
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
  SubirFotografia,
  BolsaTrabajoUDH,
  InscripcionIdiomaExtranjero,
  EducacionDistancia
} from './features/students/servicio-universitario';

// Soporte y Defensoría
import {
  ConsultasQuejas,
  ConsentimientoInformado,
  CongresosOtros
} from './features/students/soporte-defensoria';

// Importaciones del módulo Panel Virtual
// AulaVirtualPage removed as module deleted

// Panel Virtual pages removed
// Pagos module removed


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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page sin Layout */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        
        {/* Rutas con Layout unificado */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/students" element={<StudentsPage />} />
              
              {/* Dashboards específicos por rol */}
              <Route path="/estudiante" element={<EstudianteDashboard />} />
              <Route path="/docente" element={<DocenteDashboard />} />
              <Route path="/escuela" element={<EscuelaDashboard />} />
              <Route path="/facultad" element={<FacultadDashboard />} />
              <Route path="/administrativo" element={<AdministrativoDashboard />} />
              
              {/* Rutas específicas para estudiante - Gestión de Matrícula */}
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/estudiante/perfil" element={<ProfilePage />} />
              <Route path="/estudiante/matricula" element={<Matricula />} />
              <Route path="/estudiante/ver-horario" element={<VerHorario />} />
              <Route path="/estudiante/tramite-documentario" element={<TramiteDocumentario />} />
              <Route path="/estudiante/tramite-grados" element={<TramiteGradosTitulos />} />
              <Route path="/estudiante/tramite-seguimiento" element={<TramiteSeguimiento />} />
              <Route path="/estudiante/reglamento" element={<Reglamento />} />
              <Route path="/estudiante/progreso_academico" element={<div />} />
              {/* Rutas del nuevo módulo académico */}
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
              <Route path="/estudiante/servicios/subir-fotografia" element={<SubirFotografia />} />
              <Route path="/estudiante/servicios/bolsa-trabajo" element={<BolsaTrabajoUDH />} />
              <Route path="/estudiante/servicios/inscripcion-idioma" element={<InscripcionIdiomaExtranjero />} />
              <Route path="/estudiante/servicios/educacion-distancia" element={<EducacionDistancia />} />

              {/* Soporte y Defensoría */}
              <Route path="/estudiante/soporte/consultas-quejas" element={<ConsultasQuejas />} />
              <Route path="/estudiante/soporte/consentimiento-informado" element={<ConsentimientoInformado />} />
              <Route path="/estudiante/soporte/congresos-otros" element={<CongresosOtros />} />

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


              {/* Rutas para administrativo */}
              <Route path="/administrativo/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área Administrativa</h2><p>Aquí irán las rutas específicas del área administrativa</p></div>} />
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
              

              
              {/* Rutas para escuela */}
              <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Escuela</h2><p>Aquí irán las rutas específicas de la escuela</p></div>} />
              {/* Rutas específicas para estudiante - Registros Académicos */}
              <Route path="/estudiante/calificaciones" element={<NotasParciales />} />
              <Route path="/estudiante/historial" element={<HistorialAcademico />} />
              <Route path="/estudiante/certificados" element={<div className='p-6'>Descarga de certificados (pendiente)</div>} />
              {/* Aula virtual removed */}
              
              {/* Rutas generales fallback para cada área */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Estudiante</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Escuela</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/facultad/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Facultad</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/administrativo/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área Administrativa</h2><p>Módulo en desarrollo</p></div>} />
              {/* Rutas anidadas para cada rol (futuras implementaciones) */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Submódulos del Estudiante</h2><p>Aquí irán las rutas específicas del estudiante</p></div>} />
              <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Submódulos de la Escuela</h2><p>Aquí irán las rutas específicas de la escuela</p></div>} />
              <Route path="/facultad/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Submódulos de la Facultad</h2><p>Aquí irán las rutas específicas de la facultad</p></div>} />
              <Route path="/administrativo/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Submódulos Administrativos</h2><p>Aquí irán las rutas específicas del área administrativa</p></div>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
