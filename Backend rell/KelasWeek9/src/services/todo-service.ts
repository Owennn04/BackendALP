import { prismaClient } from "../utils/prisma";
import { Validation } from "../validations/validation";
import { TodoValidation } from "../validations/todo-validation";
import { User } from "@prisma/client";
import { ResponseError } from "../error/response-error";

export class TodoService {
    static async create(user: User, request: any) {
        const req = Validation.validate(TodoValidation.CREATE, request);

        return await prismaClient.todo.create({
            data: {
                title: req.title,
                time: req.time,
                isReminder: req.isReminder ?? true,
                userId: user.id
            }
        });
    }

    static async list(user: User) {
        return await prismaClient.todo.findMany({
            where: { userId: user.id },
            orderBy: { id: 'desc' }
        });
    }

    static async toggle(user: User, todoId: number) {
        const todo = await prismaClient.todo.findFirst({
            where: { id: todoId, userId: user.id }
        });

        if (!todo) throw new ResponseError(404, "Todo not found");

        return await prismaClient.todo.update({
            where: { id: todoId },
            data: { isCompleted: !todo.isCompleted }
        });
    }

    static async remove(user: User, todoId: number) {
        const todo = await prismaClient.todo.findFirst({
            where: { id: todoId, userId: user.id }
        });

        if (!todo) throw new ResponseError(404, "Todo not found");

        return await prismaClient.todo.delete({
            where: { id: todoId }
        });
    }
}