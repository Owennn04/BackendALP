import dotenv from "dotenv"

dotenv.config()

export const PORT: number = parseInt(process.env.PORT || "3000", 10);
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "your-secret-key-change-me";
export const DATABASE_URL: string = process.env.DATABASE_URL || "";