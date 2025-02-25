import React, { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

const TaskColumn = ({ category, tasks, user, setTasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: category });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  const dynamicStyle = {
    backgroundColor: isOver
      ? isDarkMode
        ? "#334155" // dark hover
        : "#e0f2fe" // light hover
      : isDarkMode
      ? "#1e293b" // dark default
      : "#f8fafc", // light default
  };

  return (
    <div ref={setNodeRef} style={dynamicStyle} className="p-4 rounded-xl shadow-md w-full mb-4 transition-all duration-200">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center">{category}</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} user={user} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default TaskColumn;
