import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

const TaskColumn = ({ category, tasks, user, setTasks }) => {
  // Initialize the useDroppable hook with a unique id for the droppable area
  const { setNodeRef, isOver } = useDroppable({
    id: category,
  });

  // Optional: Style adjustments when an item is dragged over the droppable area
  const style = {
    backgroundColor: isOver ? 'lightblue' : 'inherit',
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-200 p-4 rounded w-1/3">
      <h2 className="font-bold mb-2">{category}</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} user={user} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default TaskColumn;
