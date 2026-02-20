import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Circle, Plus, ListTodo } from 'lucide-react';
import api from "../api/axios.js";

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTask, setNewTask] = useState("");

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error("Помилка при завантаженні завдань:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, is_completed: !t.is_completed } : t));
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const newTaskObj = { id: Date.now(), title: newTask, is_completed: false };
        setTasks([newTaskObj, ...tasks]);
        setNewTask("");
    };

    return (
        <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                    <ListTodo size={28} />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800">Мій список справ</h1>
            </div>

            <form onSubmit={handleAddTask} className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Що плануєте зробити?"
                    className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-blue-200"
                >
                    <Plus size={20} />
                    <span>Додати</span>
                </button>
            </form>

            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center py-10 text-gray-400 animate-pulse">
                        Завантаження завдань...
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-48 h-48 mb-6 text-gray-200">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                <path d="M9 16l2 2 4-4"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">У вас немає завдань</h3>
                        <p className="text-gray-500 max-w-sm">
                            Виглядає так, ніби ви все виконали! Час відпочити або додати нове завдання на сьогодні.
                        </p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
                                <button className="transition-transform active:scale-90">
                                    {task.is_completed ? (
                                        <CheckCircle className="text-blue-500" size={24} />
                                    ) : (
                                        <Circle className="text-gray-400 group-hover:text-blue-400 transition-colors" size={24} />
                                    )}
                                </button>
                                <span className={`text-lg transition-all duration-300 ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                                    {task.title}
                                </span>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Todo;