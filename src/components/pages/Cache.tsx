export const cache = {
  /**
   * Guarda datos en el caché con una clave y tiempo de expiración.
   * @param key Clave única para identificar los datos.
   * @param data Datos a almacenar.
   * @param expirationMinutes Tiempo de expiración en minutos.
   */
  set: (key: string, data: any, expirationMinutes: number) => {
    const expirationDate = new Date().getTime() + expirationMinutes * 60 * 1000; // Tiempo de expiración en milisegundos
    const cacheData = {
      data,
      expirationDate,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  },

  /**
   * Obtiene datos del caché si no han expirado.
   * @param key Clave única para identificar los datos.
   * @returns Los datos almacenados o null si han expirado.
   */
  get: (key: string) => {
    const cacheData = localStorage.getItem(key);
    if (!cacheData) return null;

    const parsedData = JSON.parse(cacheData);
    const now = new Date().getTime();

    // Verificar si los datos han expirado
    if (parsedData.expirationDate < now) {
      localStorage.removeItem(key); // Eliminar datos expirados
      return null;
    }

    return parsedData.data; // Retornar los datos si no han expirado
  },

  /**
   * Elimina datos del caché.
   * @param key Clave única para identificar los datos.
   */
  clear: (key: string) => {
    localStorage.removeItem(key);
  },
};