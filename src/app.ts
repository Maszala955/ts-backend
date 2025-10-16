import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from 'dotenv';
import apiRoutes from "./routes/index.js";
import type { Request, Response, NextFunction } from "express";

dotenv.config();
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route test
app.get("/", (_req: Request, res: Response) => {
    res.send("Api is running");
});

// API v1
app.use("/api", apiRoutes);

// Handle Errors
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error"})
})

export default app;