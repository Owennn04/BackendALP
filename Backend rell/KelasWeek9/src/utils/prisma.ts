import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from "./env-util";

export const prismaClient = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});
