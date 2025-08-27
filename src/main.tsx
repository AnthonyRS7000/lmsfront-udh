import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Crear instancia de QueryClient
const queryClient = new QueryClient();

/*
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
