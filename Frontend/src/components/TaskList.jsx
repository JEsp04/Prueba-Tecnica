import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-300">
        <i className="fas fa-clipboard-list text-4xl mb-2 opacity-30"></i>
        <p className="text-lg">No hay tareas aún</p>
        <p className="text-sm">Crea una usando el formulario de arriba</p>
      </div>
    );
  }

  const priorityOrder = { 'Alta': 0, 'Media': 1, 'Baja': 2 };
  const sortedTasks = [...tasks].sort((a, b) => {
    const pa = priorityOrder[a.prioridad] ?? 1;
    const pb = priorityOrder[b.prioridad] ?? 1;
    if (pa !== pb) return pa - pb;
    return (b.id || 0) - (a.id || 0);
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task}
        onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;