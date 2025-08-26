import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./features/dashboard/DashboardPage";
import StudentsPage from "./features/students/StudentsPage";
import AdminTestPage from "./pages/AdminTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para probar AdminLayout */}
        <Route path="/admin-test" element={<AdminTestPage />} />
        
        {/* Rutas existentes con Layout original */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/students" element={<StudentsPage />} />
              {/* Rutas para estudiante */}
              <Route path="/estudiante/*" element={<div className="p-6"><h2 className="text-2xl font-bold">Área de Estudiante</h2><p>Aquí irán las rutas específicas del estudiante</p></div>} />
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
