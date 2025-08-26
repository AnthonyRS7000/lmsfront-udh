import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import './AdminLayout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido principal - SIN clases condicionales, flexbox maneja todo */}
      <div className="admin-main-content">
        {/* Topbar */}
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        
        {/* Área de contenido */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
