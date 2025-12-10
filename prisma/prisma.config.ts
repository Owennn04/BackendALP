import { PrismaClient } from "@prisma/client";

export const prismaConfig = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

