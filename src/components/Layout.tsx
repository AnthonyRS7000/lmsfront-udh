import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
