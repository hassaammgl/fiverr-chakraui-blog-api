import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as blogRouter } from "./routes/blogRoutes.js";
dotenv.config();

export const app = express();
export const port = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    credentials: true,
    origin: [process.env.ORGIN_URL],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRouter);
