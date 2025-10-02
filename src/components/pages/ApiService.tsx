const API_URL = import.meta.env.VITE_API_URL;

export const ApiService = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no disponible. Por favor, inicia sesión.");
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 405) {
          // Redirigir al usuario a la página de inicio de sesión si el token expira
          localStorage.removeItem("token"); // Eliminar el token inválido
          window.location.href = "/login"; // Redirigir al inicio de sesión
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
      if (!token) {
        throw new Error("Token no disponible. Por favor, inicia sesión.");
      }

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
      if (!token) {
        throw new Error("Token no disponible. Por favor, inicia sesión.");
      }

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
      if (!token) {
        throw new Error("Token no disponible. Por favor, inicia sesión.");
      }

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