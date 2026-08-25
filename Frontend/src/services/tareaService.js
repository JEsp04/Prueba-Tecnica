import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});


export const getTareas = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tareas:", error);
    throw error;
  }
};

export const postTarea = async (titulo, estado, prioridad) => {
  try {
    const response = await api.post("/", {titulo, estado, prioridad });
    return response.data;
  } catch (error) {
    console.error("Error creando tarea:", error.response.data || error.message);
    throw error;
  }
};


export const patchTarea = async (id, data) =>  {
    try {
        const response = await api.patch(`/${id}/toggle`, data);
        return response.data;
    } catch (error) {
        console.error("Error actualizando tarea:", error.response.data || error.message);
        throw error;
    }
};


export const deleteTarea = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error eliminando tarea:", error.response.data || error.message);
        throw error;
    }
};



