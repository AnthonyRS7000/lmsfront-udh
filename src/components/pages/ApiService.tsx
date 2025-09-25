const API_URL = import.meta.env.VITE_API_URL;

export const ApiService = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          ...options.headers,
        },
        credentials: "include", // Incluye cookies si es necesario
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
        }
        if (response.status === 403) {
          throw new Error("Acceso denegado.");
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error en la solicitud GET:", error);
      throw error;
    }
  },

  post: async (endpoint: string, body: any, options: RequestInit = {}) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        body: JSON.stringify(body),
        credentials: "include",
        ...options,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
        }
        if (response.status === 403) {
          throw new Error("Acceso denegado.");
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      throw error;
    }
  },

  // Métodos adicionales (PUT, DELETE, etc.)
  put: async (endpoint: string, body: any, options: RequestInit = {}) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        body: JSON.stringify(body),
        credentials: "include",
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
      throw error;
    }
  },

  delete: async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        credentials: "include",
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
      throw error;
    }
  },
};