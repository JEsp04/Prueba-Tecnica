import React, { useState } from 'react';
import { useTareaStore } from '../store/useTareaStore';

const TaskForm = () => {
  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [error, setError] = useState('');
  
  const { postTarea, loading } = useTareaStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      setError('El título no puede estar vacío');
      return;
    }

    setError('');
    try {
      await postTarea(titulo, false, prioridad);
      setTitulo('');
      setPrioridad('Media');
    } catch (err) {
      setError(err.message || 'Error al crear la tarea');
    }
  };

  return (
    <div className="bg-gray-50/70 rounded-2xl p-5 mb-8 border border-gray-200/80 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <i className="fas fa-pencil-alt text-gray-400 mr-1"></i> Título
          </label>
          <input
            type="text"
            id="tituloInput"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              if (error) setError('');
            }}
            placeholder="Escribe una tarea..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white text-gray-800 shadow-sm"
            disabled={loading}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <i className="fas fa-exclamation-circle"></i> {error}
            </p>
          )}
        </div>
        
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <i className="fas fa-flag text-gray-400 mr-1"></i> Prioridad
          </label>
          <select
            id="prioridadSelect"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white text-gray-800 shadow-sm"
            disabled={loading}
          >
            <option value="Alta">🔴 Alta</option>
            <option value="Media">🟡 Media</option>
            <option value="Baja">🟢 Baja</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-xl shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Guardando...
            </>
          ) : (
            <>
              <i className="fas fa-plus-circle"></i> Guardar
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;