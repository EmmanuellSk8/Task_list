import { ContextProps } from "@/types/TaskContextProps";
import { Task } from "@/types/TaskProps";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const TaskContext = createContext<ContextProps | undefined>(undefined);

const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([])

useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');

            if (response.status === 204) {
                setTasks([]);
                return;
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                console.error("La respuesta no es un array:", data);
                setTasks([]);
                return;
            }

            setTasks(data);
        } catch (err) {
            console.error("Error al cargar tareas:", err);
            setTasks([]);
        }
    };
    fetchTasks();
}, []);


    const addTask = (task: Task) => {
        setTasks((prev) => [...prev, task]);
    };

    const markAsCompleted = (id: number | undefined) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === "pendientes" ? "completadas" : "pendientes" }
                    : task
            ));
    };

    const deleteTask = (id: number | undefined) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, markAsCompleted, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}

const UseTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error("UseTasks must be used within OrderProvider")
    return context;
}

export { UseTasks, TaskProvider }