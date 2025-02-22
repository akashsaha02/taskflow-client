import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { createPortal } from "react-dom";
import { FaEdit, FaTrash, FaSave, FaTimes, FaGripVertical } from "react-icons/fa";
import moment from "moment";
import toast from "react-hot-toast";

const TaskItem = ({ task, user, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const axiosSecure = useAxiosSecure();
  const formattedTime = moment(task.timestamp).format("DD MMM YYYY, hh:mm A");

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/tasks/${task._id}`);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      setShowDeleteModal(false);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axiosSecure.put(`/tasks/${task._id}`, editedTask);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
      setIsEditing(false);
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow relative flex flex-col border border-gray-300 dark:border-gray-700"
      >
        {/* Drag Handle Button - Only visible on mobile (hidden on large screens) */}
        <button
          {...listeners}
          {...attributes}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing block md:hidden"
        >
          <FaGripVertical size={24} />
        </button>

        {/* Timestamp */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{formattedTime}</p>

        {/* Task Title */}
        <p className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">{task.title}</p>

        {/* Task Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">{task.description}</p>

        {/* Edit & Delete Buttons */}
        <div className="flex justify-between mt-4 border-t border-gray-300 dark:border-gray-600 pt-3">
          <button
            onClick={() => setIsEditing(true)}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium border rounded px-2 py-1"
          >
            <FaEdit size={14} />
            Edit
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium border rounded px-2 py-1"
          >
            <FaTrash size={14} />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
