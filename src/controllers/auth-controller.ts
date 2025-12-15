import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth-service";
import { UserRequest } from "../middlewares/user-request";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthService.register(req.body);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({ data: result });
        } catch (e) { next(e); }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await AuthService.logout(req.user);
            res.status(200).json({ data: "OK" });
        } catch (e) { next(e); }
    }
}