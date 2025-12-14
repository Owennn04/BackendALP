import { prismaClient } from "../utils/prisma";
import { Validation } from "../validations/validation";
import { EventValidation } from "../validations/event-validation";
import { User, Event } from "@prisma/client";
import { ResponseError } from "../error/response-error";
import { EventResponse } from "../models/event-model";
import { CreateUpdateEventRequest } from "../models/event-model";
import { EventResponseList } from "../models/event-model";

export class EventService {
    static async create(user: User, request: CreateUpdateEventRequest) {
        const req = Validation.validate(EventValidation.CREATE_UPDATE, request);

        return await prismaClient.event.create({
            data: {
                date: req.date,
                eventName: req.eventName,
                startTime: req.startTime,
                endTime: req.endTime,
                userId: user.id
            }
        });
    }
    static async checkEventIsEmpty(
        userId: number,
        eventId: number
    ): Promise<Event> {
        const todo = await prismaClient.event.findFirst({
            where: {
                id: eventId,
                userId: userId
            },
        })

        if (!todo) {
            throw new ResponseError(400, "Event not found!")
        }

        return todo
    }

    static async update(
        user: User,
        req: CreateUpdateEventRequest,
        eventId: number
    ) {
        const validatedData = Validation.validate(
            EventValidation.CREATE_UPDATE,
            req
        )

        await this.checkEventIsEmpty(eventId, user.id)

        await prismaClient.event.update({
            where: {
                userId: user.id,
                id: eventId,
            },
            data: {
                date: validatedData.date,
                eventName: validatedData.eventName,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
            },
        })

        return "Event data has been updated successfully!"
    }

    static async delete(user: User, eventId: number) {
        await this.checkEventIsEmpty(user.id, eventId)

        await prismaClient.todo.delete({
            where: {
                userId: user.id,
                id: eventId,
            },
        })

        return "Todo data has been deleted successfully!"
    }

    static async getAllEvents(user: User): Promise<EventResponse[]> {
        const todos = await prismaClient.event.findMany({
            where: {
                userId: user.id,
            },
        })

        return EventResponseList(todos)
    }

    static async getEvent(
        user: User,
        eventId: number
    ): Promise<EventResponse> {
        const todo = await this.checkEventIsEmpty(user.id, eventId)

        return EventResponse(todo)
    }
}