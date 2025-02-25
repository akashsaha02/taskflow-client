import { useDraggable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update mobile flag on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const axiosSecure = useAxiosSecure();
  const formattedTime = moment(task.timestamp).format("DD MMM YYYY, hh:mm A");

  // For desktop, disable touch-action to prevent scrolling interference.
  // For mobile, let the container scroll normally.
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    ...(!isMobile ? { touchAction: "none" } : {}),
  };

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
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
      setIsEditing(false);
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow relative flex flex-col border border-gray-300 dark:border-gray-700 cursor-grab"
        // For desktop, attach drag listeners to entire card.
        {...(!isMobile ? { ...listeners, ...attributes } : {})}
      >
        {/* On mobile, show drag handle button */}
        {isMobile && (
          <button
            {...listeners}
            {...attributes}
            style={{ touchAction: "none" }}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing"
          >
            <FaGripVertical size={24} />
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {formattedTime}
        </p>

        {/* Task Title */}
        <p className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
          {task.title}
        </p>

        {/* Task Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
          {task.description}
        </p>

        {/* Edit & Delete Buttons */}
        <div className="flex justify-between mt-4 border-t border-gray-300 dark:border-gray-600 pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium border rounded px-2 py-1"
          >
            <FaEdit size={14} />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium border rounded px-2 py-1"
          >
            <FaTrash size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing &&
        createPortal(
          <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
              <h3 className="font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100">
                Edit Task
              </h3>
              <input
                type="text"
                className="input input-bordered bg-gray-200 text-black w-full mb-4 dark:bg-gray-600 dark:text-gray-100"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                placeholder="Task Title"
              />
              <textarea
                className="textarea textarea-bordered bg-gray-200 text-black w-full mb-4 dark:bg-gray-600 dark:text-gray-100"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                placeholder="Task Description"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleEdit}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FaSave size={16} />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn flex items-center gap-2"
                >
                  <FaTimes size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal &&
        createPortal(
          <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
              <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4">
                Are you sure you want to delete this task?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleDelete}
                  className="btn btn-error flex items-center gap-2"
                >
                  <FaTrash size={16} />
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <FaTimes size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default TaskItem;
