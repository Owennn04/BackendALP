import { Response, NextFunction } from "express";
import { FinanceService } from "../services/finance-service";
import { UserRequest } from "../middlewares/user-request";

export class FinanceController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const result = await FinanceService.create(req.user!, req.body);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const result = await FinanceService.list(req.user!);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }
}