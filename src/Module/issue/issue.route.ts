import { Router } from "express";
import { issueController } from "./issue.controller.js";
import { auth } from "../../Middleware/auth.js";
  
const router = Router()

router.post('/', auth('contributor','maintainer') ,issueController.createIssue)
 


export const issueRouter = router
