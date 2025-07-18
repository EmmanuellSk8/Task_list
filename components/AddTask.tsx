import { FormEvent, useState } from "react";
import { UseTasks } from "./context/TaskContext";
import { Plus } from "lucide-react";

export default function AddTask() {
    const { addTask } = UseTasks();
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (title.trim().length < 7) {
            setError("La tarea debe tener al menos 7 caracteres.");
            return;
        }

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title.trim(), status: 'pendientes' }),
            });

            if (!res.ok) {
                throw new Error('error in the request');
            }

            const data = await res.json();
            addTask(data);
            setTitle("");
            setError("");
        } catch (error) {
            console.error("Error creating the task:", error);
            setError("No se pudo crear la tarea. Intenta de nuevo.");
        }
    };
    
    return (
        <div className="mb-8">
            <form onSubmit={handleSubmit} className="flex gap-2">

                <input
                    type="text"
                    placeholder="Añadir tarea..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                />
                <button className="bg-black text-white p-2.5 rounded-md cursor-pointer">
                    <Plus type="submit" size={20} />
                </button>
            </form>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}