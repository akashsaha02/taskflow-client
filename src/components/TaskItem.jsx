import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { createPortal } from "react-dom";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const TaskItem = ({ task, user, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await axiosSecure.delete(`/tasks/${task._id}`);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axiosSecure.put(`/tasks/${task._id}`, editedTask);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
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
        {...listeners}
        {...attributes}
        className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow relative flex flex-col"
      >
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{task.title}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              onPointerDown={(e) => e.stopPropagation()}
              className="text-blue-500 hover:text-blue-600"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={handleDelete}
              onPointerDown={(e) => e.stopPropagation()}
              className="text-red-500 hover:text-red-600"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{task.description}</p>
      </div>

      {/* Edit Modal rendered with Portal */}
      {isEditing &&
        createPortal(
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
              <h3 className="font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100">Edit Task</h3>
              <input
                type="text"
                className="input input-bordered w-full mb-4 dark:bg-gray-600 dark:text-gray-100"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                placeholder="Task Title"
              />
              <textarea
                className="textarea textarea-bordered w-full mb-4 dark:bg-gray-600 dark:text-gray-100"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
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
    </>
  );
};

export default TaskItem;
