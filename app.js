import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/Routes.js";
dotenv.config();

export const app = express();
export const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

// moment js format date
// moment().format('MMMM Do YYYY, h:mm:ss a');
