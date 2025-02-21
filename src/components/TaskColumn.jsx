import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

const TaskColumn = ({ category, tasks, user, setTasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: category, // Ensure droppable ID is category
  });

  const style = {
    backgroundColor: isOver ? 'lightblue' : 'inherit',
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-200 p-4 rounded w-1/3 task-column">
      <h2 className="font-bold mb-2">{category}</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} user={user} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default TaskColumn;
