import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as userRoutes } from "./routes/userRoutes.js";
dotenv.config();

export const app = express();
export const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user/", userRoutes);

// moment js format date
// moment().format('MMMM Do YYYY, h:mm:ss a');
