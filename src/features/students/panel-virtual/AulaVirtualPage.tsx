import React from 'react';

const AulaVirtualPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Acceso a Aulas Virtuales
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Accede a tus aulas virtuales y recursos de aprendizaje
            </p>
          </div>
          
          <div className="p-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                Módulo en Desarrollo
              </h3>
              <p className="text-indigo-700 dark:text-indigo-300">
                Esta funcionalidad estará disponible próximamente. Aquí podrás acceder a todas tus aulas virtuales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AulaVirtualPage;
