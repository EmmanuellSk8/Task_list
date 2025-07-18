import { Task } from "./TaskProps"

export type ColumnProps = {
    id?: number
    className?: string
    bgNumberTask: string
    color: string
    TaskState: "pendientes" | "completadas"
    NumberTask: number
}