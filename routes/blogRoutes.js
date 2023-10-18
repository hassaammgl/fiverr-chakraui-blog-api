import express from "express";
import { auth } from "../utils/Auth.js";
import { BlogControllers } from "../controllers/blogs.js";

const router = express.Router();

export { router };
