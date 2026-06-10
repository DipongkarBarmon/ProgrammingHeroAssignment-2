import { Router } from "express";
import { authController } from "./auth.controller.js";
const router = Router();
router.post('/signup', authController.userSignup);
router.post('/login', authController.userLogin);
export const authRouter = router;
//# sourceMappingURL=auth.route.js.map