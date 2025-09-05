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
import UserDropdown from "./features/students/UserDropdown";
import { 
  ProfilePage, 
  CursosPage, 
  ConsultaCursosPage, 
  EstadoMatriculaPage, 
  HistorialMatriculaPage, 
  TramitesPage 
} from "./features/students/gestion-matricula";

// Importar páginas del módulo Registros Académicos
import { 
  CalificacionesPage, 
  HistorialAcademicoPage, 
  ProgresoAcademicoPage, 
  CertificadosPage 
} from "./features/students/registros-academicos";

// Importaciones del módulo Panel Virtual
import AulaVirtualPage from "./features/students/panel-virtual/AulaVirtualPage";

import AulasVirtualesPage from "./features/students/AulasVirtualesPage";
import ClasesVivoPage from "./features/students/ClasesVivoPage";
import AccesGrabacionesPage from "./features/students/AccesGrabacionesPage";
import TareasPage  from "./features/students/TareasPage";
import PagosPage  from "./features/students/PagosPage";
import DetallePagosPage  from "./features/students/DetallePagosPage";


import Cursos from "./features/docente/pages/Cursos";
import SubirSilabo from './features/docente/pages/SubirSilabo';
import Perfil from "./features/docente/pages/Perfil";
import GestionHorarios from "./features/docente/pages/GestionHorarios";
import ReportesActividad from "./features/docente/pages/ReportesActividad";
import RegistroCalificaciones from "./features/docente/pages/RegistroCalificaciones";
import FirmaActas from "./features/docente/pages/FirmaActas";
import GestionCursos from "./features/docente/pages/GestionCursos";

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
              <Route path="/perfil" element={<UserDropdown />} />
              <Route path="/estudiante/perfil" element={<ProfilePage />} />
              <Route path="/estudiante/cursos" element={<CursosPage />} />
              <Route path="/estudiante/consultar_cursos" element={<ConsultaCursosPage />} />
              <Route path="/estudiante/estado_matricula" element={<EstadoMatriculaPage />} />
              <Route path="/estudiante/historial_matricula" element={<HistorialMatriculaPage />} />
              <Route path="/estudiante/tramites" element={<TramitesPage />} />
              <Route path="/estudiante/progreso_academico" element={<ProgresoAcademicoPage />} />

              <Route path="/estudiante/aulas_virtuales" element={<AulasVirtualesPage />} />
              <Route path="/estudiante/clases-vivo" element={<ClasesVivoPage />} />
              <Route path="/estudiante/grabaciones" element={<AccesGrabacionesPage />} />
              <Route path="/estudiante/tareas" element={<TareasPage />} />
              <Route path="/estudiante/pagos" element={<PagosPage />} />
              <Route path="/estudiante/historial-pagos" element={<DetallePagosPage />} />

              {/* Rutas para administrativo */}
              <Route path="/administrativo/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área Administrativa</h2><p>Aquí irán las rutas específicas del área administrativa</p></div>} />
              <Route path="/administrativo/monitoreo" element={<Monitoreo />} />
              <Route path="/administrativo/perfiles" element={<Perfiles />} />
              <Route path="/administrativo/roles" element={<Roles />} />
              <Route path="/administrativo/usuarios" element={<Usuarios />} />
              
              
              {/* Rutas para escuela */}
              <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Escuela</h2><p>Aquí irán las rutas específicas de la escuela</p></div>} />
              {/* Rutas específicas para estudiante - Registros Académicos */}
              <Route path="/estudiante/calificaciones" element={<CalificacionesPage />} />
              <Route path="/estudiante/historial" element={<HistorialAcademicoPage />} />
              <Route path="/estudiante/certificados" element={<CertificadosPage />} />
              <Route path="/estudiante/aula-virtual" element={<AulaVirtualPage />} />
              
              {/* Rutas generales fallback para cada área */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Estudiante</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Escuela</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/facultad/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Facultad</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/administrativo/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área Administrativa</h2><p>Módulo en desarrollo</p></div>} />
              {/* Rutas anidadas para cada rol (futuras implementaciones) */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Submódulos del Estudiante</h2><p>Aquí irán las rutas específicas del estudiante</p></div>} />
              <Route path="/docente/perfil" element={<Perfil/>} />
              <Route path="/docente/subir-silabo/:cursoId" element={<SubirSilabo />} />
              <Route path="/docente/asignacion-cursos" element={<Cursos/>} />
              <Route path="/docente/gestion-horarios" element={<GestionHorarios/>} />
              <Route path="/docente/reportes-actividad" element={<ReportesActividad />} />
              <Route path="/docente/registro-calificaciones" element={<RegistroCalificaciones />} />
              <Route path="/docente/firma-actas" element={<FirmaActas />} />
              <Route path="/docente/gestion-cursos" element={<GestionCursos />} />
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
