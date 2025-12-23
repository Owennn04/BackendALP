import { NextFunction, Response } from "express"
import { UserRequest } from "../middlewares/user-request"
import { ResponseError } from "../error/response-error"
import { CreateUpdateEventRequest } from "../models/event-model"
import { EventService } from "../services/event-service"

export class EventController {
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
            const eventId = Number(req.params.event_id)

            const response = await EventService.getEvent(req.user!, eventId)

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

    static async updateEvent(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as CreateUpdateEventRequest
            const eventId = Number(req.params.event_id)

            const response = await EventService.update(
                req.user!,
                reqData,
                eventId
            )

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteEvent(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const eventId = Number(req.params.event_id)

            const response = await EventService.delete(req.user!, eventId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

}