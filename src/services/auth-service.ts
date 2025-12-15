import { prismaClient } from "../utils/prisma";
import { JWT_SECRET_KEY } from "../utils/env-util";
import { Validation } from "../validations/validation";
import { UserValidation } from "../validations/user-validation";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { toUserResponse, UserResponse } from "../models/user-model";

export class AuthService {
    static async register(request: any): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const countUser = await prismaClient.user.count({
            where: { email: registerRequest.email }
        });

        if (countUser > 0) {
            throw new ResponseError(400, "Email already exists");
        }

        const password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: {
                username: registerRequest.username,
                email: registerRequest.email,
                password: password
            }
        });

        return toUserResponse(user);
    }

    static async login(request: any): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where: { email: loginRequest.email }
        });

        if (!user) {
            throw new ResponseError(401, "Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Invalid email or password");
        }

        // Generate Token menggunakan JWT_SECRET_KEY dari utils
        if (!JWT_SECRET_KEY) {
            throw new ResponseError(500, "JWT_SECRET_KEY is not configured");
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '7d' });

        const updatedUser = await prismaClient.user.update({
            where: { id: user.id },
            data: { token: token }
        });

        return toUserResponse(updatedUser);
    }

    static async logout(user: any): Promise<string> {
        await prismaClient.user.update({
            where: { id: user.id },
            data: { token: null }
        });
        return "OK";
    }
}