import { prismaClient } from "../utils/prisma";
import { Validation } from "../validations/validation";
import { AlarmValidation } from "../validations/alarm-validation";
import { User } from "@prisma/client";
import { ResponseError } from "../error/response-error";

export class AlarmService {
    static async create(user: User, request: any) {
        const req = Validation.validate(AlarmValidation.CREATE, request);

        return await prismaClient.alarm.create({
            data: {
                time: req.time,
                label: req.label ?? "Alarm",
                days: req.days,
                isActive: req.isActive ?? true,
                userId: user.id
            }
        });
    }

    static async list(user: User) {
        return await prismaClient.alarm.findMany({
            where: { userId: user.id },
            orderBy: { id: 'asc' }
        });
    }

    static async toggle(user: User, request: any) {
        const req = Validation.validate(AlarmValidation.UPDATE, request);

        const alarm = await prismaClient.alarm.findFirst({
            where: { id: req.id, userId: user.id }
        });

        if (!alarm) throw new ResponseError(404, "Alarm not found");

        return await prismaClient.alarm.update({
            where: { id: req.id },
            data: { isActive: req.isActive }
        });
    }

    static async remove(user: User, alarmId: number) {
        const alarm = await prismaClient.alarm.findFirst({
            where: { id: alarmId, userId: user.id }
        });

        if (!alarm) throw new ResponseError(404, "Alarm not found");

        return await prismaClient.alarm.delete({
            where: { id: alarmId }
        });
    }
}