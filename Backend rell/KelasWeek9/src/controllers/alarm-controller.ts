import { Request, Response, NextFunction } from "express";
import { AlarmService } from "../services/alarm-service";
import { UserRequest } from "../middlewares/user-request";

export class AlarmController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AlarmService.create((req as UserRequest).user!, req.body);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AlarmService.list((req as UserRequest).user!);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async toggle(req: Request, res: Response, next: NextFunction) {
        try {
            const alarmId = parseInt(req.params.id);
            const result = await AlarmService.toggle((req as UserRequest).user!, { id: alarmId, ...req.body });
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const alarmId = parseInt(req.params.id);
            await AlarmService.remove((req as UserRequest).user!, alarmId);
            res.status(200).json({ data: "OK" });
        } catch (e) { next(e); }
    }
}