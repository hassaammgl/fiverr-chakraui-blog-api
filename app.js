import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as userRoutes } from "./routes/userRoutes.js";
dotenv.config();

export const app = express();
export const port = process.env.PORT || 5000;

// middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true
}));

// routes
app.use("/api/v1/user", userRoutes);

// moment js format date
// moment().format('MMMM Do YYYY, h:mm:ss a');
