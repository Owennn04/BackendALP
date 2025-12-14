import { NextFunction, Response } from "express"
import { UserRequest } from "../middlewares/user-request"
import { ResponseError } from "../error/response-error"
import { CreateUpdateEventRequest } from "../models/event-model"
import { EventService } from "../services/event-service"

export class TodoController {
    static async getAllEvents(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await EventService.getAllEvents(req.user!)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getEvent(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const todoListId = Number(req.params.todoListId)

            const response = await EventService.getEvent(req.user!, todoListId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createEvent(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as CreateUpdateEventRequest

            const response = await EventService.create(req.user!, reqData)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateTodo(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as CreateUpdateEventRequest
            const todoListId = Number(req.params.todoListId)

            const response = await EventService.update(
                req.user!,
                reqData,
                todoListId
            )

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const todoListId = Number(req.params.todoListId)

            const response = await EventService.delete(req.user!, todoListId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

}