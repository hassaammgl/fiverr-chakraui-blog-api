import express from "express";
import { helloWorld } from "../controllers/Hello.js";
import { UserControllers } from "../controllers/user.js";
const router = express.Router();

// test router
router.get("/", helloWorld);
// user routers
router.post("/register", UserControllers.registerUser);

export { router };
