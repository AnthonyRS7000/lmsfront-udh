const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const ApiService = {
  get: async (endpoint: string, options: RequestInit = {}) => {
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
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  post: async (endpoint: string, body: any, options: RequestInit = {}) => {
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
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  },
};