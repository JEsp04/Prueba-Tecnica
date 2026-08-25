import React, { useState } from "react";
import { useTareaStore } from "../store/useTareaStore";

const TaskItem = ({ task }) => {
  const { patchTarea, deleteTarea, loading } = useTareaStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const { id, titulo, estado, prioridad } = task;

  const getPriorityStyles = (priority) => {
    const styles = {
      Alta: "bg-red-100 text-red-700 border-l-4 border-red-500",
      Media: "bg-yellow-50 text-yellow-700 border-l-4 border-yellow-400",
      Baja: "bg-green-50 text-green-700 border-l-4 border-green-400",
    };
    return styles[priority] || styles["Media"];
  };

  const getBadgeStyles = (priority) => {
    const styles = {
      Alta: "bg-red-100 text-red-700",
      Media: "bg-yellow-100 text-yellow-700",
      Baja: "bg-green-100 text-green-700",
    };
    return styles[priority] || styles["Media"];
  };

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await patchTarea(id, { estado: !estado });
    } catch (error) {
      console.error("Error toggling task:", error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${titulo}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTarea(id);
    } catch (error) {
      console.error("Error deleting task:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`task-card flex flex-wrap items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-200/80 hover:shadow-md transition-all ${estado ? "opacity-75" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-[180px]">
        <input
          type="checkbox"
          checked={estado}
          onChange={handleToggle}
          disabled={loading || isToggling || isDeleting}
          className="w-5 h-5 accent-blue-600 cursor-pointer disabled:opacity-50"
        />
        <span
          className={`text-gray-800 font-medium text-base break-words ${estado ? "line-through opacity-60" : ""}`}
        >
          {titulo}
        </span>
      </div>

      <div className="flex items-center gap-2 ml-auto flex-wrap">
        <span
          className={`badge-priority text-xs font-semibold px-3 py-1 rounded-full ${getBadgeStyles(prioridad)}`}
        >
          {prioridad}
        </span>
        <button
          onClick={handleDelete}
          disabled={loading || isDeleting || isToggling}
          className={`
    flex items-center justify-center
    w-8 h-8 rounded-full
    bg-red-50 hover:bg-red-100
    text-red-600 hover:text-red-800
    border border-red-200 hover:border-red-300
    transition-all duration-200
    ${isDeleting ? "bg-red-100 text-red-700" : ""}
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-110 active:scale-95
  `}
          title="Eliminar tarea"
        >
          {isDeleting ? (
            <i className="fas fa-spinner fa-spin text-sm"></i>
          ) : (
            <i className="fas fa-trash-alt text-sm"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
