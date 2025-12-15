import { z } from "zod";

export class UserValidation {
    static readonly REGISTER = z.object({
        username: z.string().min(1).max(100),
        email: z.string().email().min(1).max(100),
        password: z.string().min(6).max(100)
    });

    static readonly LOGIN = z.object({
        email: z.string().email().min(1).max(100),
        password: z.string().min(6).max(100)
    });
}