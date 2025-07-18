import { Trash2 } from "lucide-react"
import { UseTasks } from "./context/TaskContext"
import { Task } from "@/types/TaskProps";
import { useEffect, useState } from "react";

type Props = {
    task: Task
}

const TaskCard = ({ task }: Props) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const { deleteTask, markAsCompleted } = UseTasks();

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');

            if (res.status === 204) {
                setTasks([]);
                return;
            }

            if (!res.ok) {
                throw new Error('Error al obtener las tareas');
            }

            const data = await res.json();

            if (!Array.isArray(data)) {
                throw new Error('La respuesta no es un array');
            }
            setTasks(data);
        } catch (error) {
            console.error('Error al hacer fetch de las tareas:', error);
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleToggleStatus = async (id: number | undefined, currentStatus: "completadas" | "pendientes") => {
        const newStatus = currentStatus === 'pendientes' ? 'completadas' : 'pendientes';

        await fetch('/api/tasks', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
        });
        fetchTasks();
    };

    const handleDelete = async (id: number | undefined) => {
        await fetch('/api/tasks', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        fetchTasks();
    };

    return (
        <div className="border-1 border-gray-300 w-full flex justify-between py-5 px-3 rounded-lg items-center">
            <div className="flex items-center gap-2 text-lg w-[93%]">
                <input
                    checked={task.status === "completadas"}
                    type="checkbox" className="size-5"
                    onClick={() => { markAsCompleted(task.id) }}
                    onChange={() => handleToggleStatus(task.id, task.status)}
                />
                <p className={`flex-1 cursor-pointer ${task.status === "completadas" ? "line-through text-gray-500" : ""
                    }`}
                >{task.title}</p>
            </div>
            <Trash2 onClick={() => { deleteTask(task.id); handleDelete(task.id) }} color="red" size={24} />
        </div>
    )
}

export { TaskCard }