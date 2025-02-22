import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

const TaskColumn = ({ category, tasks, user, setTasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: category,
  });

  const dynamicStyle = {
    backgroundColor: isOver ? "#e0f2fe" : "inherit", // Tailwind's blue-100 color
  };

  return (
    <div
      ref={setNodeRef}
      style={dynamicStyle}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md w-full sm:w-1/2 md:w-1/3 mb-4"
    >
      <h2 className="text-xl font-semibold mb-4">{category}</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} user={user} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default TaskColumn;
