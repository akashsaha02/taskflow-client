// TaskBoard.js
import React, { useEffect, useState, useRef } from 'react';
import { DndContext, closestCorners, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { io } from 'socket.io-client';
import TaskColumn from './TaskColumn';
import useAxiosSecure from './../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { FiPlusCircle } from "react-icons/fi";
import toast from 'react-hot-toast';

const socket = io(import.meta.env.VITE_API_BASE_URL);

const TaskBoard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: 'To-Do',
        userId: user?.email,
    });
    const categories = ['To-Do', 'In Progress', 'Done'];
    const modalRef = useRef(null);
    const axiosSecure = useAxiosSecure();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200, // Reduce delay for better responsiveness
                tolerance: 5,  // Reduce movement threshold before drag starts
            },
        })
    );

    useEffect(() => {
        if (user) {
            const fetchTasksData = async () => {
                try {
                    const res = await axiosSecure.get(`/tasks/${user?.email}`);
                    setTasks(res.data);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            };
            fetchTasksData();
        }

        socket.on('taskUpdated', ({ action, task, taskId }) => {
            if (action === 'create') setTasks((prev) => [...prev, task]);
            if (action === 'update')
                setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
            if (action === 'delete')
                setTasks((prev) => prev.filter((t) => t._id !== taskId));
        });

        return () => socket.off('taskUpdated');
    }, [user, axiosSecure]);

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeTask = tasks.find((task) => task._id === active.id);
        if (!activeTask) return;

        const updatedCategory = over.id; // over.id holds the category id from the droppable
        if (activeTask.category === updatedCategory) return;

        const updatedTask = { ...activeTask, category: updatedCategory };

        // Update UI optimistically
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === activeTask._id ? updatedTask : task))
        );

        try {
            await axiosSecure.put(`/tasks/${activeTask._id}`, { category: updatedCategory });
            socket.emit('taskUpdated', { action: 'update', task: updatedTask });
        } catch (error) {
            console.error('Error updating task category:', error);
        }
    };

    const handleAddTask = async () => {
        try {
            const taskToAdd = { ...newTask, userId: user?.email };
            await axiosSecure.post('/tasks', taskToAdd);
            closeModal();
            toast.success('Task added successfully');
            setNewTask({ title: '', description: '', category: 'To-Do', userId: user?.email });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <button
                        onClick={openModal}
                        className="mb-6 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded shadow transition-all font-bold flex items-center gap-3"
                    >
                        <span className="">Add Task</span>
                        <FiPlusCircle className="text-xl" />
                    </button>
                </div>

                {/* Modal */}
                <dialog ref={modalRef} className="modal">
                    <form method="dialog" className="modal-box bg-white dark:bg-gray-800">
                        <h3 className="font-bold text-2xl mb-4">Add New Task</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full bg-gray-200 text-black dark:bg-gray-600 dark:text-gray-100"
                                value={newTask.title}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, title: e.target.value })
                                }
                            />
                            <textarea
                                placeholder="Description"
                                className="textarea textarea-bordered w-full bg-gray-200 text-black dark:bg-gray-600 dark:text-gray-100"
                                value={newTask.description}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, description: e.target.value })
                                }
                            />
                            <select
                                className="select select-bordered w-full bg-gray-200 text-black dark:bg-gray-600 dark:text-gray-100"
                                value={newTask.category}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, category: e.target.value })
                                }
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action mt-6">
                            <button
                                type="button"
                                onClick={handleAddTask}
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                            <button type="button" onClick={closeModal} className="btn">
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>

                {/* Drag and Drop Context */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                >
                    <div className="overflow-auto touch-pan-y grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <SortableContext
                                key={category}
                                items={tasks
                                    .filter((task) => task.category === category)
                                    .map((task) => task._id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <TaskColumn
                                    category={category}
                                    tasks={tasks.filter((task) => task.category === category)}
                                    user={user}
                                    setTasks={setTasks}
                                />
                            </SortableContext>
                        ))}
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default TaskBoard;
