import { useState, type ReactNode } from "react";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
          {children}
        </main>
      </div>
    </div>
  );
}
