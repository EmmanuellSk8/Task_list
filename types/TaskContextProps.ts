import { Task } from "./TaskProps"

export type ContextProps = {
    tasks: Task[];
    addTask: (task: Task) => void;
    markAsCompleted: (id: number | undefined) => void;
    deleteTask: (id: number | undefined) => void;
}