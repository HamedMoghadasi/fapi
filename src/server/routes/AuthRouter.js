import { Router } from "express";
import UserController from "../controllers/UserController";
import JwtHelper from "../utils/Jwt";

const router = Router();

router.post("/login", UserController.login);
router.post("/logout", JwtHelper.validateToken, UserController.logout);
router.post("/register", UserController.addUser);
router.post("/forgetPassword", UserController.forgetPassword);
router.get("/confirmation/:code", UserController.confirmUser);
router.post("/verifyUser", UserController.verifyUser);

router.post("/getAuthenticatedUser", UserController.getAuthenticatedUser);

export default router;
