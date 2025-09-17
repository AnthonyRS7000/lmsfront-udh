import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onToggle={toggleSidebar}
      />
      
      {/* Main content area */}
      <div className={`admin-main-content ${sidebarOpen ? 'ml-64' : 'ml-0'} lg:${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Topbar */}
        <Topbar 
          onToggleSidebar={toggleSidebar} 
          isSidebarOpen={sidebarOpen}
        />
        
        {/* Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}