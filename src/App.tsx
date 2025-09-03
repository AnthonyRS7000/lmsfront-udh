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
import Cursos from "./features/docente/pages/Cursos";
import SubirSilabo from './features/docente/pages/SubirSilabo';
import Perfil from "./features/docente/pages/Perfil";
import GestionHorarios from "./features/docente/pages/GestionHorarios";
import ReportesActividad from "./features/docente/pages/ReportesActividad";
import RegistroCalificaciones from "./features/docente/pages/RegistroCalificaciones";

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
              
              {/* Rutas anidadas para cada rol (futuras implementaciones) */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Submódulos del Estudiante</h2><p>Aquí irán las rutas específicas del estudiante</p></div>} />
              <Route path="/docente/perfil" element={<Perfil/>} />
              <Route path="/docente/subir-silabo/:cursoId" element={<SubirSilabo />} />
              <Route path="/docente/asignacion-cursos" element={<Cursos/>} />
              <Route path="/docente/gestion-horarios" element={<GestionHorarios/>} />
              <Route path="/docente/reportes-actividad" element={<ReportesActividad />} />
              <Route path="/docente/registro-calificaciones" element={<RegistroCalificaciones />} />
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
