import { Router } from "express";
import UserController from "../controllers/UserController";
import JwtHelper from "../utils/Jwt";

const router = Router();
const role = require("../constants/roles");

router.get("/", JwtHelper.authurize(role.Admin), UserController.getAllUsers);
router.get("/:id", UserController.getAUser);
router.put("/:id", UserController.updatedUser);
router.delete("/:id", UserController.deleteUser);

export default router;
