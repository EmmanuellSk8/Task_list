import AddTask from "./AddTask";
import { UseTasks } from "./context/TaskContext";
import { TaskColumns } from "./TaskColumn";

export default function TaskList() {
    const { tasks } = UseTasks();
    const completed = tasks.filter((t) => t.status == "completadas")

    return (
        <section className="w-[1400px] mx-4 mt-20 mb-4">
            <div className="border-gray-400 border-1 p-10 rounded-md bg-white w-full">
                <div className="flex flex-col text-center mb-8">
                    <h2 className="text-3xl font-semibold">Lista de tareas</h2>
                    <p className="text-lg text-gray-500 font-semibold"><span>{completed.length}</span> de <span>{tasks.length}</span> tareas completadas</p>
                </div>
                <div className="">
                    <AddTask />
                    <TaskColumns />
                </div>
                <TaskResume />
            </div>
        </section>
    )
}

const TaskResume = () => {
    const { tasks } = UseTasks();
    const completed = tasks.filter((t) => t.status == "completadas")
    const pending = tasks.filter((t) => t.status == "pendientes")
    return (
        <div className="mt-10">
            <div className="border-1 border-gray-300 mb-4"></div>
            <div className="w-full flex justify-between flex-wrap gap-3 max-[500px]:flex-col">
                <p className="text-gray-500 font-semibold flex max-[500px]:justify-between gap-1">Tareas totales: <span>{tasks.length}</span></p>
                <p className="text-gray-500 font-semibold flex max-[500px]:justify-between gap-1">Completadas: <span>{completed.length}</span></p>
                <p className="text-gray-500 font-semibold flex max-[500px]:justify-between gap-1">Pendientes: <span>{pending.length}</span></p>
            </div>
        </div>
    )
}