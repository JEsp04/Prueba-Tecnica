import { create } from "zustand";
import {
  getTareas,
  postTarea,
  patchTarea,
  deleteTarea,
} from "../services/tareaService";

export const useTareaStore = create((set) => ({
  tareas: [],
  loading: false,
  error: null,

  getTareas: async () => {
    set({ loading: true, error: null });
    try {
      const tareas = await getTareas();

      set({ tareas, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al obtener las tareas";
      set({ error: errorMessage, loading: false });
    }
  },
  postTarea: async (titulo, estado, prioridad) => {
    set({ loading: true, error: null });
    try {
      const nuevaTarea = await postTarea(titulo, estado, prioridad);
      set((state) => ({
        tareas: [...state.tareas, nuevaTarea],
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al crear la tarea";
      set({ error: errorMessage, loading: false });
    }
  },
  patchTarea: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updatedTarea = await patchTarea(id, data);
      set((state) => ({
        tareas: state.tareas.map((tarea) =>
          tarea.id === id ? updatedTarea : tarea,
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al actualizar la tarea";
      set({ error: errorMessage, loading: false });
    }
  },
  deleteTarea: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTarea(id);
      set((state) => {
        const nuevasTareas = state.tareas.filter((tarea) => tarea.id !== id);
        console.log("Tareas después de eliminar:", nuevasTareas);
        return {
          tareas: nuevasTareas,
          loading: false,
        };
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al eliminar la tarea";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  saveTasksToLocalStorage: () => {
    const tareas = JSON.stringify(get().tareas);
    localStorage.setItem("tareas", tareas);
  },
  setError: (error) => set({ error: error }),
}));
