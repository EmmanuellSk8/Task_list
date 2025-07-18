import { ColumnProps } from "@/types/ColumnProps"

import React from "react";
import { UseTasks } from "./context/TaskContext";
import { TaskCard } from "./TaskItem";

const Column = ({ NumberTask, color, bgNumberTask, TaskState, className, children }: ColumnProps & { children?: React.ReactNode }) => {

    return (
        <section className="w-full">
            <div className={`flex gap-2 mb-6 items-center`}>
                <h2 className="text-[24px] font-semibold">Tareas {TaskState}</h2>
                <p className={`text-lg font-semibold py-0.5 px-2.5 rounded-full mt-1.5 ${bgNumberTask}`}><span>{NumberTask}</span></p>
            </div>
            <div className={`border-2 border-dashed rounded-md p-4 min-h-72 gap-5 flex flex-col ${color}`}>
                {children}
            </div>
        </section>
    )
}

const TaskColumns = () => {
    const { tasks } = UseTasks();
    const completed = tasks.filter((t) => t.status == "completadas")
    const pending = tasks.filter((t) => t.status == "pendientes")

    return (
        <section className="w-full flex gap-10 max-[900px]:flex-wrap">
            <Column
                TaskState="pendientes"
                bgNumberTask="bgNumberTaskPending"
                color="pending"
                NumberTask={pending.length}>

                {pending.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </Column>

            <Column
                TaskState="completadas"
                bgNumberTask="bgNumberTaskCompleted"
                color="completed"
                NumberTask={completed.length}>
                {completed.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </Column>
        </section>
    )
}

export { TaskColumns }