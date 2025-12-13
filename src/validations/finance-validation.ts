import { z } from "zod";

export class FinanceValidation {
    static readonly CREATE = z.object({
        type: z.enum(["INCOME", "EXPENSE"]),
        amount: z.number().positive(),
        category: z.string().min(1).max(100),
        date: z.string().datetime() 
    });
}