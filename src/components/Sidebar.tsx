import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">LMS UDH</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">
          Dashboard
        </Link>
        <Link to="/students" className="hover:bg-gray-700 px-3 py-2 rounded">
          Estudiantes
        </Link>
        <Link to="/admin-test" className="hover:bg-gray-700 px-3 py-2 rounded">
          🎯 AdminLayout Test
        </Link>
      </nav>
    </aside>
  );
}
