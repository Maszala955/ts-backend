import { Router } from "express";
import { validateBody } from "../lib/validate.js";
import { createUserSchema } from "../schemas/user.schema.js";
import {
  listUsersCtrl,
  getUserCtrl,
  createUserCtrl,
  deleteUserCtrl
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", listUsersCtrl);                          
router.get("/:id", getUserCtrl);                         
router.post("/", validateBody(createUserSchema), createUserCtrl); 
router.delete("/:id", deleteUserCtrl);                   

export default router;
