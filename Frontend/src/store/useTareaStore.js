import {create} from "zustand";
import { getTareas, postTarea, patchTarea, deleteTarea } from "../services/tareaService";

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
      set({ error: error.message, loading: false });
    }
  },
    postTarea: async (titulo, estado, prioridad) => {
        set ({ loading: true, error: null });
        try {
            const nuevaTarea = await postTarea(titulo, estado, prioridad);
            set((state) => ({ tareas: [...state.tareas, nuevaTarea], loading: false }));
        } catch (error) {
            set({ error: error.message, loading: false });  
        }
    },
    patchTarea: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const updatedTarea = await patchTarea(id, data);
            set((state) => ({
                tareas: state.tareas.map((tarea) =>
                    tarea.id === id ? updatedTarea : tarea
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    deleteTarea: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteTarea(id);
            set((state) => ({ tareas: state.tareas.filter((tarea) => tarea.id !== id), loading: false }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    saveTasksToLocalStorage: () => {
        const tareas = JSON.stringify(get().tareas);
        localStorage.setItem("tareas", tareas);
    },
    setError: (error) => set({ error: error}),
    
}));


