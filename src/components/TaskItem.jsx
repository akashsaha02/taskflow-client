import { useDraggable } from "@dnd-kit/core";
import { axiosSecure } from "../hooks/useAxiosSecure";
// import { deleteTask } from "../api";

const TaskItem = ({ task, user, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const handleDelete = async () => {
    await axiosSecure.delete(`/tasks/${task._id}`);
    // setTasks((prev) => prev.filter((t) => t._id !== task._id));
  };

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-black p-2 mb-2 rounded shadow"
    >
      <p>{task.title}</p>
      <button onClick={handleDelete} className="text-red-500 text-xs px-2 py-1 border border-red-500 rounded">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
