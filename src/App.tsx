import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./features/dashboard/DashboardPage";
import StudentsPage from "./features/students/StudentsPage";

import UserDropdown from "./features/students/UserDropdown";
import ProfilePage from "./features/students/ProfilePage";
import CursosPage from "./features/students/CursosPage";
import ConsultaCursosPage from "./features/students/ConsultaCursosPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Layout unificado */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/students" element={<StudentsPage />} />
              {/* Rutas para estudiante */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Estudiante</h2><p>Aquí irán las rutas específicas del estudiante</p></div>} />
              
              <Route path="/perfil" element={<UserDropdown />} />
              <Route path="/estudiante/perfil" element={<ProfilePage />} />
              <Route path="/estudiante/cursos" element={<CursosPage />} />
              <Route path= "/estudiante/consultar_cursos" element={<ConsultaCursosPage />} />
              {/* Rutas para docente */}
              <Route path="/docente/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Docente</h2><p>Aquí irán las rutas específicas del docente</p></div>} />
              {/* Rutas para administrativo */}
              <Route path="/admin/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área Administrativa</h2><p>Aquí irán las rutas específicas del área administrativa</p></div>} />
              {/* Rutas para escuela */}
              <Route path="/escuela/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Escuela</h2><p>Aquí irán las rutas específicas de la escuela</p></div>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
