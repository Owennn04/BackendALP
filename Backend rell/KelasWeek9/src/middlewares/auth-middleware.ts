import { Response, NextFunction } from "express";
import { prismaClient } from "../utils/prisma";
import { UserRequest } from "../middlewares/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).json({ errors: "Unauthorized" });
    } else {
        const user = await prismaClient.user.findFirst({
            where: { token: token }
        });

        if (!user) {
            res.status(401).json({ errors: "Unauthorized" });
        } else {
            req.user = user;
            next();
        }
    }
}