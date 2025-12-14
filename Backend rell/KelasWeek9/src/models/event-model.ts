import { Event } from "@prisma/client";
import { date } from "zod";

export interface EventResponse {
    id: number
    date: string
    eventName: string
    startTime: string
    endTime: string
}

export type CreateUpdateEventRequest = {
    date: string
    eventName: string
    startTime: string
    endTime: String
}

export function EventResponse(event: Event): EventResponse {
    return {
        id: event.id,
        date: event.date,
        eventName: event.eventName,
        startTime: event.startTime,
        endTime: event.endTime
    }
}

export function EventResponseList(prismaTodo: Event[]): EventResponse[] {
    const result = prismaTodo.map((event) => {
        return {
            id: event.id,
            date: event.date,
            eventName: event.eventName,
            startTime: event.startTime,
            endTime: event.endTime,
        }
    })

    return result
}