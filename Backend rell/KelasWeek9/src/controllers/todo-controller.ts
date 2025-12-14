import { Response, NextFunction } from "express";
import { TodoService } from "../services/todo-service";
import { UserRequest } from "../middlewares/user-request";

export class TodoController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const result = await TodoService.create(req.user!, req.body);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const result = await TodoService.list(req.user!);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async toggle(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const todoId = parseInt(req.params.id);
            const result = await TodoService.toggle(req.user!, todoId);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const todoId = parseInt(req.params.id);
            await TodoService.remove(req.user!, todoId);
            res.status(200).json({ data: "OK" });
        } catch (e) { next(e); }
    }
}