import { z } from "zod";

export class TodoValidation {
    static readonly CREATE = z.object({
        title: z.string().min(1).max(255),
        time: z.string().min(1), // Format string bebas ("YYYY-MM-DD HH:mm")
        isReminder: z.boolean().optional()
    });

    static readonly UPDATE = z.object({
        id: z.number().positive(),
        title: z.string().min(1).max(255).optional(),
        time: z.string().optional(),
        isCompleted: z.boolean().optional()
    });
}