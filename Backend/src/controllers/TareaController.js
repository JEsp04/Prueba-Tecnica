import Tarea from '../models/Tarea.js';


export const getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll(
        {order : [['fecha_creacion', 'DESC']]}
    );
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const postTarea = async (req, res) => {
  const { titulo, estado, prioridad } = req.body;
  try {
    const nuevaTarea = await Tarea.create({ titulo, estado, prioridad });
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const patchTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, estado, prioridad } = req.body;
  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    tarea.titulo = titulo !== undefined ? titulo : tarea.titulo;
    tarea.estado = estado !== undefined ? estado : tarea.estado;
    tarea.prioridad = prioridad !== undefined ? prioridad : tarea.prioridad;
    await tarea.save();

    res.json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteTarea = async (req, res) => {
  const { id } = req.params;
    try {
        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        await tarea.destroy();
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
