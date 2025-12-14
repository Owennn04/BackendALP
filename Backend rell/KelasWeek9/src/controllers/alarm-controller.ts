import { Response, NextFunction } from "express";
import { AlarmService } from "../services/alarm-service";
import { UserRequest } from "../middlewares/user-request";

export class AlarmController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const result = await AlarmService.create(req.user!, req.body);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const result = await AlarmService.list(req.user!);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async toggle(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const alarmId = parseInt(req.params.id);
            const result = await AlarmService.toggle(req.user!, { id: alarmId, ...req.body });
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const alarmId = parseInt(req.params.id);
            await AlarmService.remove(req.user!, alarmId);
            res.status(200).json({ data: "OK" });
        } catch (e) { next(e); }
    }
}