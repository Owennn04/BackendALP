import { Todo } from "@prisma/client";

export type TodoResponse = {
    id: number;
    title: string;
    time: string;
    isReminder: boolean;
    isCompleted: boolean;
}

export type CreateTodoRequest = {
    title: string;
    time: string;
    isReminder?: boolean;
}

export type UpdateTodoRequest = {
    id: number;
    title?: string;
    time?: string;
    isCompleted?: boolean;
}

export function toTodoResponse(todo: Todo): TodoResponse {
    return {
        id: todo.id,
        title: todo.title,
        time: todo.time,
        isReminder: todo.isReminder,
        isCompleted: todo.isCompleted
    }
}