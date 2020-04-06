import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.addUser);

export default router;
