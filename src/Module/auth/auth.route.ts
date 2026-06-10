
import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

router.post('/signup',authController.userSignup)
 
export const authRouter = router