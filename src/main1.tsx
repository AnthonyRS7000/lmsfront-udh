import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import Login from './routes/Login.tsx'
//import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/*import Login from './routes/Login.tsx'
import Docente from './routes/Docente.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/docente",
    element: <Docente />
  },
]);*/
//<RouterProvider router={router} />
// Crear instancia de QueryClient
//const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)


