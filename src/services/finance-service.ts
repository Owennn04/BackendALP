import { prismaClient } from "../utils/prisma";
import { Validation } from "../validations/validation";
import { FinanceValidation } from "../validations/finance-validation";
import { User } from "@prisma/client";

export class FinanceService {
    static async create(user: User, request: any) {
        const req = Validation.validate(FinanceValidation.CREATE, request);

        const record = await prismaClient.transaction.create({
            data: {
                type: req.type,
                amount: req.amount,
                category: req.category,
                date: new Date(req.date),
                userId: user.id
            }
        });

        return record;
    }

    static async list(user: User) {
        return await prismaClient.transaction.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' }
        });
    }
}