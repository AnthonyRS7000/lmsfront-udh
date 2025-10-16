import ThemeToggle from './ThemeToggle';
import '../css/Topbar.css';
import UserDropdown from './UserDropdown';

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Topbar({ onToggleSidebar, isSidebarOpen }: TopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="topbar-container">
        {/* Lado izquierdo */}
        <div className="topbar-left">
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="topbar-toggle"
              title="Abrir barra lateral"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Lado derecho */}
        <div className="topbar-right">
          {/* Aula Virtual link (replaces notifications) */}
         {/*  <a className="topbar-aula-btn" title="Aula Virtual" aria-label="Abrir Aula Virtual" href="https://udhvirtual.sistemasudh.com/estudiante/inicio"> */}
         <button
           className="topbar-aula-btn"
           title="Aula Virtual"
           aria-label="Abrir Aula Virtual"
           onClick={() => {
             const targetOrigin = 'http://localhost:5174';
             const targetUrl = `${targetOrigin}/estudiante/inicio`;
             const win = window.open(targetUrl, '_blank');

             // Guardar referencia accesible globalmente para poder notificar logout más tarde
             try {
               (window as any).aulavirtualWindow = win;
             } catch {}

             if (!win) return;

             // Construir payload con token + datos de usuario desde localStorage
             const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
             let usuario = null;
             let datos_udh = null;
             let foto = null;
             let rol = null;
             try {
               usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
             } catch { usuario = null; }
             try {
               datos_udh = JSON.parse(localStorage.getItem('datos_udh') || 'null');
             } catch { datos_udh = null; }
             foto = localStorage.getItem('foto') || null;
             rol = localStorage.getItem('rol') || usuario?.rol || null;

             const payload = { token, usuario, datos_udh, foto, rol };

             const onMessage = (e: MessageEvent) => {
               if (e.source === win && e.data?.type === 'READY_FOR_TOKEN') {
                 // Enviar payload completo
                 win.postMessage({ type: 'AUTH_PAYLOAD', payload }, targetOrigin);
                 window.removeEventListener('message', onMessage);
               }
             };

             window.addEventListener('message', onMessage);

            // Vigilar cierre de la ventana remota y limpiar la referencia
            const checkClosed = () => {
              try {
                if ((window as any).aulavirtualWindow && (window as any).aulavirtualWindow.closed) {
                  (window as any).aulavirtualWindow = null;
                  clearInterval(checkInterval);
                }
              } catch {
                clearInterval(checkInterval);
              }
            };
            const checkInterval = setInterval(checkClosed, 700);
            // limpiar referencia si la pestaña principal se cierra/recarrega
            window.addEventListener('beforeunload', () => {
              try { (window as any).aulavirtualWindow = null; } catch {}
            });
           }}
         >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
             <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
             <path d="M8 20h8"></path>
             <path d="M12 16v4"></path>
           </svg>
           <span className="topbar-aula-label">Aula Virtual</span>
         </button>
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}