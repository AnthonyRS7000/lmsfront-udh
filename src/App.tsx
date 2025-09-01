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

import UserDropdown from "./features/students/UserDropdown";
import ProfilePage from "./features/students/ProfilePage";
import CursosPage from "./features/students/CursosPage";
import ConsultaCursosPage from "./features/students/ConsultaCursosPage";

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
              
              {/* Rutas específicas para estudiante - de Benya */}
              <Route path="/perfil" element={<UserDropdown />} />
              <Route path="/estudiante/perfil" element={<ProfilePage />} />
              <Route path="/estudiante/cursos" element={<CursosPage />} />
              <Route path="/estudiante/consultar_cursos" element={<ConsultaCursosPage />} />
              
              {/* Rutas generales fallback para cada área */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Estudiante</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/docente/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Docente</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Escuela</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/facultad/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Facultad</h2><p>Módulo en desarrollo</p></div>} />
              <Route path="/administrativo/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área Administrativa</h2><p>Módulo en desarrollo</p></div>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
