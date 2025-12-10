import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiRouter } from "./routes/api";
import { errorMiddleware } from "./middlewares/error-middleware";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

// Setup Middleware
app.use(cors()); // Agar Android Emulator (10.0.2.2) bisa akses
app.use(express.json());

// Setup Routes
app.use(apiRouter);

// Error Middleware (Harus paling bawah)
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Momentum Backend Running on port ${port}`);
    console.log(`Test via Postman: http://localhost:${port}/api/users/register`);
});