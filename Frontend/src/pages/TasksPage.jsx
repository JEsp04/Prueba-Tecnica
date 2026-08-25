import React, { useEffect, useState } from "react";
import { useTareaStore } from "../store/useTareaStore";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ErrorBanner from "../components/ErrorBanner";

const TasksPage = () => {
  const { tareas, loading, error, getTareas, setError } = useTareaStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getTareas();
  }, [getTareas]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getTareas();
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/80 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 md:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <i className="fas fa-list-check text-blue-600"></i> Tareas
            <span className="text-sm font-normal text-gray-400 ml-2">
              · prioridad y estado
            </span>
          </h1>
        </div>

        <ErrorBanner message={error} onClose={() => setError(null)} />

        <TaskForm />

        <div className="mt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <i className="fas fa-tasks text-blue-500"></i> Mis tareas
              <span className="text-sm font-normal text-gray-400 bg-gray-100 px-3 py-0.5 rounded-full">
                {tareas.length}
              </span>
            </h2>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="text-gray-400 hover:text-blue-600 transition text-sm bg-gray-100 hover:bg-blue-50 px-3 py-1.5 rounded-full flex items-center gap-1 disabled:opacity-50"
            >
              {isRefreshing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Cargando...
                </>
              ) : (
                <>
                  <i className="fas fa-sync-alt"></i> Actualizar
                </>
              )}
            </button>
          </div>

          {loading && tareas.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-3xl text-blue-500"></i>
              <p className="mt-2 text-gray-500">Cargando tareas...</p>
            </div>
          ) : (
            <TaskList tasks={tareas} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
