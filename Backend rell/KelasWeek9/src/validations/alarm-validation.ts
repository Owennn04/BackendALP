import { z } from "zod";

export class AlarmValidation {
    static readonly CREATE = z.object({
        time: z.string().min(1), // "HH:mm"
        label: z.string().max(100).optional(),
        days: z.array(z.boolean()), // [true, false, ...]
        isActive: z.boolean().optional()
    });

    static readonly UPDATE = z.object({
        id: z.number().positive(),
        isActive: z.boolean()
    });
}