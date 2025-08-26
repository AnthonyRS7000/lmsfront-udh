import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./features/dashboard/DashboardPage";
import StudentsPage from "./features/students/StudentsPage";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
