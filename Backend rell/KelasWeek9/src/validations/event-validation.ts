import { z } from "zod";

export class EventValidation {
    static readonly CREATE_UPDATE = z.object({
        date: z.string().min(1, "Date is required"), 
        eventName: z.string().min(1).max(255),
        startTime: z.string().min(1, "Start time required"),
        endTime: z.string().min(1, "End time required")
    });

    static readonly DELETE = z.object({
        id: z.number().positive()
    });
}
