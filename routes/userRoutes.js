import express from "express";
import { helloWorld } from "../controllers/Hello.js";
import { UserControllers } from "../controllers/user.js";
import { auth } from "../utils/Auth.js";

const router = express.Router();

// test router
router.get("/", helloWorld);
// user routers
router.post("/register", UserControllers.registerUser);
router.post("/login", UserControllers.loginUser);
router.post("/security-qna", auth, UserControllers.securityQuestion);
router.post("/forget-pass", UserControllers.forgetpassword);

export { router };
